import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";

// Import the external lib.
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";

// Import the custom function and common components.
import { Loader, EmptyView, LoadMore } from "@components/index";
import { getMyGroupPhotoList } from "@app/services/api/groups";
import commonStyle from "@app/theme/commonStyle";
import { PhotoItem } from "./PhotoItem";

// Import the style and utils
import { styles } from "./Styles";
import { color } from "@theme/index";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import ImagePreview from "@app/components/ImagePreview/ImagePreview";
/**
 * Photo props
 */
interface PhotosProps {
  imageUrl: string;
  onPress: Function;
  link: string;
}

/**
 * PhotosScreen components
 */
export const PhotosScreen: React.FC<{
  reload?: boolean;
  setReload: any;
}> = ({ reload, setReload }) => {
  const route: any = useRoute();
  const { groups } = content;
  const { group_detail, map_detail } = useRedux([
    groups.groupsDetail,
    groups.mapDetail,
  ]);

  const uniqueId =
    route?.params?.isType == "maps"
      ? map_detail?.uniqueId
      : group_detail?.uniqueId;
  const [photoList, setPhotoList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [photosUrl, setPhotosUrl] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (reload) {
      onRefresh();
      setReload(false);
    }
  }, [reload]);

  const getMyGroupPhotoListApiCall = () => {
    let photoArr = [];
    setPhotoList([]);
    setIsLoader(true);
    getMyGroupPhotoList(1, uniqueId)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setPhotoList(res.data[0].objectList);
            res.data[0].objectList.map(async (photos) => {
              photoArr.push({ uri: photos.imageUrl });
            });
            setPhotosUrl(photoArr);
          } else {
            setPhotoList([]);
          }
        } else {
          setPhotoList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setPhotoList([]);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const loadMoreData = (page: number) => {
    console.log("Page", page);
    setMoreLoader(true);
    setEndReach(false);
    getMyGroupPhotoList(page, uniqueId)
      .then((res) => {
        console.log("loadMoreData", JSON.stringify(res));

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setPhotoList(
              page === 1 ? groupObjectList : [...photoList, ...groupObjectList]
            );
            setMoreLoader(false);
          } else {
            setMoreLoader(false);
            setEndReach(true);
          }
        } else {
          setMoreLoader(false);
          setEndReach(true);
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > photoList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setPhotoList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    getMyGroupPhotoListApiCall();
  };

  const renderRaw = (item: PhotosProps, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item.imageUrl);
          setVisible(true);
        }}
        style={styles.rawItemContainer}
      >
        <FastImage
          source={{ uri: item.imageUrl }}
          style={styles.imageWrapper}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View testID="PhotosScreen" style={styles.full}>
      <View style={styles.body}>
        {isLoader ? <Loader /> : null}
        {!isLoader && photoList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyPhoto")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={photoList}
            renderItem={({ item, index }) => renderRaw(item, index)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[commonStyle.flatBottomSpace]}
            style={{ ...commonStyle.flatRadiousStyle, ...styles.padLeft }}
            numColumns={3}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={() => (endReach == false ? loadMorePage() : null)}
            onMomentumScrollBegin={() => setEndReachedMomentum(false)}
            ListFooterComponent={() => {
              return isMoreLoader ? (
                <LoadMore animating={isMoreLoader} />
              ) : null;
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
      {visible && (
        <ImagePreview
          visible={visible}
          imageUri={selectedImage ?? ""}
          onClose={() => setVisible(false)}
          caption="Preview Image"
        />
      )}
    </View>
  );
};
