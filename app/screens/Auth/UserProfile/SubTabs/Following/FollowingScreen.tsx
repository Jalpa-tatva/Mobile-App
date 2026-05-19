import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";

// import external libraries
import I18n from "i18n-js";
import moment from "moment";

// import custom function & component
import { Loader, EmptyView, LoadMore } from "@components/index";
import { getFollowingList } from "@app/services/api/profile";
import { FollowingItem } from "./FollowingItem";
import { method } from "@app/services/api/Method";
import { GROUP_DETAILS, MODULES, PROFILE } from "@app/constants";
import { useRedux } from "@app/redux/hooks";
import { groups } from "@app/redux/reducer/groupsReducer";

// import custom styling & utils
import commonStyle from "@app/theme/commonStyle";
import { FULL, BODY, Style } from "./styles";
import { trackApiEvent } from "@app/utils/appReport/ActivityReport";
import { points } from "@app/utils/appReport/ReportPoint";
import { content } from "@app/utils/string";
import useAppNavigation from "@app/navigation/navigation";

/**
 * FollowingsProps
 */
export interface FollowingsProps {
  title: string;
  imageUrl: string;
  country: string;
  category: string;
  location: string;
  startDate: string;
  description: string;
  onPress: Function;
}

interface FollowingProps {
  tab?: string;
  setReload?: any;
  reload?: any;
}

/**
 * FollowingScreen
 */
export const FollowingScreen = (props: FollowingProps) => {
  const navigation = useAppNavigation();
  const { dispatches } = useRedux([
    content?.groups.drawerStatus,
    content?.groups.dispatch,
  ]);

  const [activitiesList, setActivitiesList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  // Optional: reload on screen focus (only if list empty)
  useEffect(() => {
    followinglistApiCall();
  }, [props?.tab]);

  useEffect(() => {
    followinglistApiCall();
  }, [props?.reload]);

  /** Fetch first page */
  const followinglistApiCall = () => {
    setActivitiesList([]);
    setIsLoader(true);
    setPage(1);
    getFollowingList(1)
      .then(async (res) => {
        const list = res?.data?.[0]?.objectList ?? [];
        setTotalRecords(res?.data?.[0]?.status?.total ?? 0);

        const cleanedArray = list.filter(
          (val) =>
            val.isActiveMember === "true" &&
            val.category !== "People" &&
            val.category !== "Forum" &&
            val.category !== "Drugs"
        );

        setActivitiesList(cleanedArray);
        setIsLoader(false);
        setEndReach(cleanedArray.length === 0);
      })
      .catch(async (err) => {
        setIsLoader(false);
        setActivitiesList([]);
      });
  };

  /** Load next page */
  const loadMoreData = (nextPage: number) => {
    if (isMoreLoader || endReach) return;

    setIsMoreLoader(true);
    getFollowingList(nextPage)
      .then(async (res) => {
        const list = res?.data?.[0]?.objectList ?? [];
        if (list.length === 0) {
          setEndReach(true);
        }

        const cleanedArray = list.filter(
          (val) =>
            val.isActiveMember === "true" &&
            val.category !== "People" &&
            val.category !== "Forum" &&
            val.category !== "Drugs"
        );

        setActivitiesList((prev) => [...prev, ...cleanedArray]);
        setTimeout(() => {
          setIsMoreLoader(false);
        }, 500);
      })
      .catch(async (err) => {
        setIsMoreLoader(false);
        await trackApiEvent({
          screen: `${PROFILE.Following}`,
          endpoint: points.profileList,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
      });
  };

  /** Triggered when scrolled near end */
  const loadMorePage = () => {
    if (!isMoreLoader && !endReach && totalRecords > activitiesList.length) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMoreData(nextPage);
    }
  };

  /** Pull to refresh */
  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setActivitiesList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setTotalRecords(0);
    followinglistApiCall();
  };

  const navigateToDetail = useCallback(
    (item: any) => {
      dispatches(groups(item));
      navigation.navigate(MODULES.GroupDetailsScreen, {
        issueTabs: GROUP_DETAILS.OpenIssue,
        fromss: PROFILE?.Activity,
        screen: "profile",
      });
    },
    [navigation]
  );

  const listFooterComponent = () => {
    return isMoreLoader ? <LoadMore animating={isMoreLoader} /> : null;
  };

  const navigateEditGroupScreen = useCallback(
    (item) => {
      navigation.navigate(MODULES.EditGroupScreen, {
        item,
        setReload: props?.setReload,
      });
    },
    [navigation]
  );

  const renderRaw = (item: FollowingsProps) => {
    const city = item?.location ? `${item?.location}, ` : "";
    const address = item?.country || "";
    const location = `${city}${address}`;
    const date = item?.startDate
      ? moment(Number(item?.startDate)).format("MMM DD, YYYY")
      : "";

    return (
      <FollowingItem
        imageUrl={item.imageUrl}
        title={item.title}
        location={location}
        description={item.description}
        date={date}
        onOpenDetail={() => navigateToDetail(item)}
        onPress={() => navigateEditGroupScreen(item)}
      />
    );
  };

  return (
    <View testID="FollowingScreen" style={FULL}>
      <TouchableWithoutFeedback>
        <View style={BODY}>
          {isLoader && (
            <View style={Style.loaderWrapper}>
              <Loader />
            </View>
          )}

          {!isLoader && activitiesList.length === 0 && (
            <EmptyView
              title={I18n.t("EmptyView.EmptyFollowing")}
              onPressRefresh={onRefresh}
            />
          )}
          {!isLoader && activitiesList?.length != 0 && (
            <FlatList
              data={activitiesList}
              renderItem={({ item }) => renderRaw(item)}
              keyExtractor={(item) => item.id?.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={commonStyle.flatBottomSpace}
              style={commonStyle.flatRadiousStyle}
              onEndReachedThreshold={0.5}
              onEndReached={loadMorePage}
              ListFooterComponent={listFooterComponent}
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
