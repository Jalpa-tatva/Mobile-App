import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  BackHandler,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

// import external libraries
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// import custom function & component
import { getgroupMessages } from "@app/services/api/groups";
import { GroupItem } from "./GroupItem";
import { color } from "@theme/index";
import { MESSAGE } from "@app/constants";

// import custom styling & utils
import { FULL, BODY } from "./GroupStyle";
import { EmptyView, Loader, LoadMore } from "@app/components";
import { styles } from "./Styles";
import commonStyle from "@app/theme/commonStyle";

/**
 * GroupMessageScreen Props
 */
export interface GroupsProps {
  title?: string;
  uniqueId?: string;
  profileImageUrl?: string;
  privacyType?: string;
  documentsCount?: string;
  videosCount?: string;
  sensorsCount?: string;
  message?: string;
  lastMessageDate?: string;
  lastMessage?: string;
  count?: string;
  profile?: string;
}

export interface ListProps {
  isLoader?: boolean;
  refreshing?: any;
  isMoreLoader?: boolean;
  setEndReachedMomentum?: Function;
  groupList?: Array<{}>;
  onRefresh?: Function;
  loadMorePage: any;
  navigation: any;
  endReach: boolean;
}

/**
 * Create Custom component of children
 */
const RenderListing = (props: ListProps) => {
  const {
    isLoader,
    refreshing,
    isMoreLoader,
    setEndReachedMomentum,
    groupList,
    onRefresh,
    loadMorePage,
    navigation,
    endReach,
  } = props;

  const onEndReach = () => {
    if (!endReach) {
      loadMorePage();
    }
  };

  const renderRaw = (item: GroupsProps) => {
    let upateImage = item?.profileImageUrl;

    const navigateToscreen = () => {
      navigation.navigate(MESSAGE.messageDetail, {
        imageUrl: upateImage,
        conversationid: item.profile,
        title: item.title,
        profileDetail: item,
        isGroup: "true",
      });
    };

    return (
      <GroupItem
        imageUrl={upateImage}
        title={item.title}
        description={item?.lastMessage}
        dateTime={item?.lastMessageDate}
        onPress={navigateToscreen}
      />
    );
  };

  const onListFooterCompo = () => {
    if (isMoreLoader) {
      return <LoadMore animating={isMoreLoader} />;
    } else {
      return null;
    }
  };

  if (!isLoader && groupList.length == 0) {
    return (
      <EmptyView
        title={I18n.t("EmptyView.EmptyGroup")}
        onPressRefresh={() => onRefresh()}
        type={"bottom"}
      />
    );
  } else {
    return (
      <FlatList
        data={groupList}
        renderItem={({ item }) => renderRaw(item)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        style={styles.spaceTop}
        contentContainerStyle={commonStyle.flatGroupSpace}
        onEndReached={onEndReach}
        onMomentumScrollBegin={() => setEndReachedMomentum(false)}
        ListFooterComponent={onListFooterCompo}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      />
    );
  }
};

/**
 * GroupMessageScreen component
 */
let SearchValue = "";
const GroupMessageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [groupList, setGroupList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      global.screenName = "Group";
      global.getMessage = true;
    });

    return focus;
  }, []);

  useFocusEffect(
    useCallback(() => {
      onRefresh();

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        backHandler.remove();
      };
    }, [navigation])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      global.getMessage = false;
      global.conversationid = "";
      global.screenName = "";
    });

    return unsubscribe;
  }, []);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  /**
   * Group messages api call
   */
  const myGroupApiCall = () => {
    setGroupList([]);
    setIsLoader(true);
    getgroupMessages(1, SearchValue)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          console.log("length of groups",res.data[0].objectList?.length);
          
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              cleanedArray.push({
                ...val,
                uniqueId: Math.random().toString(36).substring(2, 10), // 8-character random string
              });
            });
            setGroupList(cleanedArray);
            console.log("res.data[0].objectList ", cleanedArray);

            setTotalRecords(res.data[0].status.total);
          } else {
            setGroupList([]);
          }
        } else {
          setGroupList([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoader(false);
        setGroupList([]);
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
    setIsMoreLoader(true);
    setEndReach(false);
    console.log("loadmoredata", page);

    getgroupMessages(page, searchText)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setGroupList(
              page === 1 ? groupList : [...groupList, ...res.data[0].objectList]
            );
            setIsMoreLoader(false);
          } else {
            setIsMoreLoader(false);
            setEndReach(true);
          }
        } else {
          setIsMoreLoader(false);
          setEndReach(true);
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const onLoadMorePage = () => {
    if (!endReach) {
      return loadMorePage();
    } else {
      return null;
    }
  };

  const updateMoments = () => {
    setEndReachedMomentum(false);
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > groupList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setIsMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setGroupList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setSearchText("");
    setEndReachedMomentum(false);
    myGroupApiCall();
  };

  return (
    <View testID="GroupsScreen" style={FULL}>
      <View style={BODY}>
        {isLoader ? <Loader type={"bottom"} /> : null}
        <RenderListing
          isLoader={isLoader}
          refreshing={refreshing}
          endReach={endReach}
          isMoreLoader={isMoreLoader}
          setEndReachedMomentum={setEndReachedMomentum}
          groupList={groupList}
          onRefresh={onRefresh}
          loadMorePage={onLoadMorePage}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default GroupMessageScreen;
