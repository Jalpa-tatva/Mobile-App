import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";

// import external libraries
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";
import moment from "moment";

// import custom function
import { Loader, EmptyView, LoadMore } from "@components/index";
import { getDeviceTimeZone } from "@app/utils/commonFunction";
import { getActivityList } from "@app/services/api/groups";
import { ActivityItem } from "./ActivityItem";

// import custom styling & utils
import { Full, Body } from "./style";
import { color } from "@theme/index";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";

/**
 *  Activities Props
 */
export interface ActivityItemProps {
  relativeText: string;
  imageUrl: string;
  user: string;
  messageText: string;
  originalImageUrl: string;
  relativeDate?: string;
}

type RouteParam = {
  uniqueIds: { uniqueIds: string } | undefined;
};

/**
 * ActivitiesScreen component
 */
const { groups } = content;
export const ActivityScreen: React.FC<{
  reload?: boolean;
  setReload?: any;
}> = ({ reload, setReload }) => {
  const route = useRoute<RouteProp<RouteParam, "uniqueIds">>();
  const uniqueId = route.params?.uniqueIds;
  const [activityList, setActivityList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigation = useNavigation<any>();
  const { login_detail } = useRedux([groups.loginDetail]);

  useEffect(() => {
    activityApiCall();
  }, []);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      global.screenName = "ActivityScreen";
      global.getMessage = true;
      global.conversationid = uniqueId;
      activityApiCall();
    });
    return focus;
  }, [navigation]);

  useEffect(() => {
    if (reload) {
      onRefresh();
      setReload(false);
    }
  }, [reload]);

  const activityApiCall = () => {
    setActivityList([]);
    setIsLoader(true);
    getActivityList(1, login_detail.userUniqueId)
      .then(async (res) => {
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
      .catch(async (err) => {
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
    setIsMoreLoader(true);
    setEndReach(false);
    getActivityList(page, login_detail.userUniqueId)
      .then(async (res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setActivityList(
              page === 1
                ? groupObjectList
                : [...activityList, ...groupObjectList]
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
      .catch(async (err) => {
        setIsLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > activityList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setIsMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const listFooterWrapper = () => {
    return isMoreLoader ? <LoadMore animating={isMoreLoader} /> : null;
  };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setActivityList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setEndReachedMomentum(false);
    activityApiCall();
  };

  const renderRaw = (item: ActivityItemProps) => {
    let msg = item?.messageText.substring(item?.messageText.indexOf(":") + 1);
    msg = msg.trim();
    const startDate =
      moment(Number(item?.relativeDate)).format("ddd DD MMM YYYY, hh:mm A") +
      " " +
      getDeviceTimeZone();

    return (
      <ActivityItem
        publishText={item.relativeText}
        publishedByImageUrl={item.imageUrl}
        subject={msg}
        publishedBy={item.user}
        startDate={startDate}
      />
    );
  };

  return (
    <View testID="ActivitiesScreen" style={Full}>
      <TouchableWithoutFeedback>
        <View style={Body}>
          {isLoader ? <Loader /> : null}
          {!isLoader && activityList.length == 0 ? (
            <EmptyView
              title={I18n.t("EmptyView.EmptyActivities")}
              onPressRefresh={() => onRefresh()}
            />
          ) : (
            <FlatList
              data={activityList}
              renderItem={({ item }) => renderRaw(item)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[commonStyle.flatBottomSpace]}
              style={commonStyle.flatRadiousStyle}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.1}
              onEndReached={() => (!endReach ? loadMorePage() : null)}
              onMomentumScrollBegin={() => setEndReachedMomentum(false)}
              ListFooterComponent={listFooterWrapper}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
