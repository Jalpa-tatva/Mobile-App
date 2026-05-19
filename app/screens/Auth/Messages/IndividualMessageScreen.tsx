import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  BackHandler,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";

// import external libraries
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";

// import custom function & component
import { Loader, EmptyView, LoadMore } from "@components/index";
import {
  getIndividualMessages,
} from "@app/services/api/groups";
import { color, fontSize } from "@theme/index";
import { MESSAGE } from "@app/constants";
import { GroupItem } from "./GroupItem";

// import custom styling & utils
import {
  FULL,
  BODY,
  ActionButtonWrapper,
  actionButtonTouchStyle,
  ChatTitle,
} from "./GroupStyle";
import { styles } from "./Styles";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { MaterialIcons } from "@app/utils/icons/VectorIcons";
import { translate } from "@app/i18n";
import commonStyle from "@app/theme/commonStyle";

/**
 * IndividualMessageScreen Props
 */
export interface GroupsProps {
  profile?: string;
  title: string;
  email: string;
  profileImageUrl?: string;
  lastMessage?: string;
  lastMessageDate?: string;
  uniqueId: string;
  onPress: Function;
  description: string;
}

let SearchValue = "";

/**
 * Create Custom component of children
 */

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
 * IndividualMessageScreen component
 */

const IndividualMessageScreen: React.FC = () => {
  const { groups } = content;
  const { login_detail } = useRedux([groups.loginDetail]);

  const navigation = useNavigation<any>();

  const [groupList, setGroupList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      global.screenName = "Individual";
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
    },[])
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
   * Indiavidual user message detail api call
   */
  const myGroupApiCall = () => {
    setGroupList([]);
    setIsLoader(true);
    getIndividualMessages(1, SearchValue)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            let cleanedArray = [];

            res.data[0].objectList.forEach((val) => {
              if (val.uniqueId !== login_detail?.userUniqueId) {
                cleanedArray.push({
                  ...val,
                  uniqueId: Math.random().toString(36).substring(2, 10), // 8-character random string
                });
              }
            });

            setGroupList(cleanedArray);
          } else {
            setGroupList([]);
          }
        } else {
          setGroupList([]);
        }
      })
      .catch((err) => {
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
    getIndividualMessages(page, SearchValue)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];

            res.data[0].objectList.forEach((val) => {
              if (val.uniqueId !== login_detail?.userUniqueId) {
                cleanedArray.push(val);
              }
            });
            setGroupList(
              page === 1 ? cleanedArray : [...groupList, ...cleanedArray]
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

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setGroupList([]);
    setEndReach(false);
    setIsMoreLoader(false);
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

      <View style={ActionButtonWrapper}>
        <TouchableOpacity
          style={actionButtonTouchStyle}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(MESSAGE.userSelection, {
              type: translate("common.individual"),
            });
          }}
        >
          <MaterialIcons
            name="chat-bubble-outline"
            size={fontSize(20)}
            color={color.white}
          />
          <Text style={ChatTitle}>{translate("common.startChat")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IndividualMessageScreen;
