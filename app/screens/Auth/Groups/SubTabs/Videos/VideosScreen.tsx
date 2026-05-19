import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, BackHandler } from "react-native";

// Import the external lib.
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";

// Import the custom function,styles and common components.
import { Loader, EmptyView, LoadMore } from "@components/index";
import { getMyGroupVideoList } from "@app/services/api/groups";
import commonStyle from "@app/theme/commonStyle";
import { VideoItem } from "./VideoItem";
import { FULL, BODY } from "./Style";
import { color } from "@theme/index";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import useAppNavigation from "@app/navigation/navigation";

/***
 * VideosProps
 */
export interface VideosProps {
  title: string;
  publishedText: string;
  thumbnail: string;
  onPress: Function;
  link: string;
  uniqueIds: string;
}

/***
 * RootStackParamList
 */
export type RootStackParamList = {
  ViewVideoScreen: { link: string; title: string };
  YoutubeVideoScreen: { link: string; title: string };
};

/***
 * VideosScreen
 */
export const VideosScreen: React.FC<any> = () => {
  const navigation = useAppNavigation();
  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  const uniqueId = group_detail.uniqueId;

  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    myGroupVideoListApiCall();
  }, []);

  const myGroupVideoListApiCall = () => {
    setVideoList([]);
    setIsLoader(true);
    getMyGroupVideoList(1, uniqueId)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setVideoList(res.data[0].objectList);
          } else {
            setVideoList([]);
          }
        } else {
          setVideoList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setVideoList([]);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const loadMoreData = (page: number) => {
    console.log("Page", page);
    setMoreLoader(true);
    setEndReach(false);
    getMyGroupVideoList(page, uniqueId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setVideoList(
              page === 1 ? groupObjectList : [...videoList, ...groupObjectList]
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
    if (!endReachedMomentum && totalRecords > videoList.length) {
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
    setVideoList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    myGroupVideoListApiCall();
  };

  const renderRaw = (item: VideosProps) => {
    let thumbnail = "";
    if (!item.link.includes("www.youtube.com")) {
      if (item.link.includes("https")) {
        thumbnail = item.link.replace("vimeo", "vumbnail") + ".jpg";
      } else {
        thumbnail =
          item.link.replace("http", "https").replace("vimeo", "vumbnail") +
          ".jpg";
      }
    } else {
      thumbnail = item.thumbnail;
    }

    return (
      <VideoItem
        thumbnail={thumbnail}
        title={item.title}
        publishedText={item.publishedText}
        onPress={() => Checkurl(item.link, item.title)}
      />
    );
  };

  const Checkurl = (link: string, title: string) => {
    console.log("link ====>",link);
    
    if (link.includes("www.youtube.com/")) {
      navigation.navigate("YoutubeVideoScreen", {
        link,
        title,
      });
    } else {
      navigation.navigate("ViewVideoScreen", {
        link,
        title,
      });
    }
  };

  return (
    <View testID="VideosScreen" style={FULL}>
      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && videoList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyVideo")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={videoList}
            renderItem={({ item }) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={commonStyle.flatBottomSpace}
            style={commonStyle.flatRadiousStyle}
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
    </View>
  );
};
