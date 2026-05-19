import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";

// import external libraries
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";
import moment from "moment";
import { useRoute } from "@react-navigation/native";

// import custom function
import { Loader, EmptyView, LoadMore, Header } from "@components/index";
import { getActivityList } from "@app/services/api/groups";
import { CommentItem } from "./CommentItem";
import { useRedux } from "@app/redux/hooks";
import useAppNavigation, {
  RootStackParamList,
} from "@app/navigation/navigation";
import { translate } from "@app/i18n";
import { GROUP_DETAILS } from "@app/constants";

// import custom styling & utils
import { Full, Body, styles } from "../styles";
import { color } from "@theme/index";
import commonStyle from "@app/theme/commonStyle";
import styleConfig from "@app/theme/styleConfig";
import { getDeviceTimeZone } from "@app/utils/commonFunction";
import { content } from "@app/utils/string";

/**
 *  Activities Props
 */
export interface ActivitiesProps {
  relativeText: string;
  imageUrl: string;
  user: string;
  messageText: string;
  originalImageUrl: string;
  relativeDate?: string;
  uniqueId?: string;
  commentCount?: string;
  id?: string;
}

/**
 * ActivitiesScreen component
 */
export const Comment: React.FC<{
  reload?: boolean;
  setReload?: any;
}> = ({ reload, setReload }) => {
  const route = useRoute<any>();
  const navigation = useAppNavigation();
  const { groups } = content;
  const { group_detail, map_detail, chat_detail } = useRedux([
    groups.groupsDetail,
    groups.chatDetail,
    groups.mapDetail,
  ]);
  const uniqueId =
    route?.params?.isType == "maps"
      ? map_detail?.uniqueId
      : group_detail.uniqueId;
  const [activityList, setActivityList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    activityApiCall();
  }, []);

  useEffect(() => {
    let cloneData = activityList;
    let notifyData = chat_detail?.data;
    let fromss = notifyData?.fromss;
    let message = styleConfig?.isIphone
      ? chat_detail?.notification?.body
      : chat_detail?.message;

    let title = styleConfig?.isIphone
      ? chat_detail?.notification?.title
      : chat_detail?.title;

    const username = title?.split(" has posted")[0];
    const messageTxt = `${username} @${notifyData?.title}: ${message}`;

    if (fromss === "Activity") {
      const newMsg = {
        recordNumber: Math.floor(Math.random() * 20),
        recordName: "message",
        id: notifyData?.messageId,
        subject: "Individual message",
        messageText: messageTxt,
        user: username,
        relativeText: "moment ago",
        uniqueId: notifyData?.uniqueId,
        imageUrl: notifyData?.imageUrl,
        relativeDate: Date.now().toString(),
      };

      cloneData.unshift(newMsg);
      setActivityList(cloneData);
    }
  }, [chat_detail?.id || chat_detail?.messageId]);

  useEffect(() => {
    if (reload) {
      onRefresh();
      setReload(false);
    }
  }, [reload]);

  const activityApiCall = () => {
    setActivityList([]);
    setIsLoader(true);
    getActivityList(1, uniqueId, route?.params?.id, true)
      .then((res) => {
        console.log("ACTIVITY LISTING", res.data[0].objectList);

        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setActivityList(res.data[0].objectList);
          } else {
            setActivityList([]);
          }
        } else {
          setActivityList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setActivityList([]);
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
    setMoreLoader(true);
    setEndReach(false);
    getActivityList(page, uniqueId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setActivityList(
              page === 1
                ? groupObjectList
                : [...activityList, ...groupObjectList]
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
    if (!endReachedMomentum && totalRecords > activityList.length) {
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
    setActivityList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    activityApiCall();
  };

  const removeItem = (id: string) => {
    const updateList = activityList?.filter(
      (activity: any) => activity.id != id
    );
    setActivityList(updateList);
  };

  const navigateToComment = useCallback(
    (id: string) => {
      navigation.push(GROUP_DETAILS.Comment, {
        id: id,
      });
    },
    [navigation]
  );

  const renderRaw = (item: ActivitiesProps) => {
    let msg = "";

    if (item?.messageText && item.messageText.includes(":")) {
      msg = item.messageText
        .substring(item.messageText.indexOf(":") + 1)
        .trim();
    }

    const startDate =
      moment(Number(item?.relativeDate)).format("ddd DD MMM YYYY, hh:mm A") +
      " " +
      getDeviceTimeZone();

    return (
      <CommentItem
        publishText={item.relativeText}
        publishedByImageUrl={item.imageUrl}
        subject={msg}
        publishedBy={item.user}
        startDate={startDate}
        userId={item.uniqueId}
        replyParentId={item.id}
        commentCount={item?.commentCount}
        removeItem={() => removeItem(item?.id ?? "")}
        onPress={() => navigateToComment(item?.id ?? "")}
        updateList={activityApiCall}
      />
    );
  };

  const leftAction = () => {
    navigation.goBack();
  };

  return (
    <View testID="ActivitiesScreen" style={Full}>
      <View style={styles.headerTop}>
        <Header
          title={`${translate("TabTitle.Replies")}`}
          icon={"chevron-left"}
          onPressLeft={leftAction}
          iconRight={""}
          iconRightother={""}
          onPressRight={undefined}
          onPressRightOther={undefined}
        />
      </View>
      <View style={{ ...Body, ...styles.curvBorder }}>
        {isLoader ? <Loader /> : null}
        {!isLoader && activityList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyReplies")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={activityList}
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
