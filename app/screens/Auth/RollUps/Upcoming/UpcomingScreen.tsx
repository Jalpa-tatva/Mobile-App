import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";

// import external libraries
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";

// import custom function
import { Loader, EmptyView, LoadMore } from "@components/index";
import { RollUpItem } from "./RollUpItem";
import { getUpcomingEventList } from "@app/services/api/rollup";
import { MODULES, ROLLUP } from "@app/constants";

// import custom styling & utils
import { color } from "@theme/index";
import { Full, Body } from "./styles";
import commonStyle from "@app/theme/commonStyle";
import useAppNavigation from "@app/navigation/navigation";

/**
 *  PreviousEvents Props
 */
export interface UpcomingProps {
  id: string;
  profile: string;
  title: string;
  startDateHead: string;
  startDateText: string;
  address: string;
  startDateNew: string;
  endDateNew: string;
  startDate: string;
  country: string;
  city: string;
  state: string;
  endDate: string;
  onPress: Function;
}

/**
 * UpcomingScreen component
 */
export const UpcomingScreen: React.FC = () => {
  const navigation = useAppNavigation();
  /*//const viewableItems = useSharedValue<ViewToken[]>([]);*/
  const [upcomingEventList, setUpcomingEventList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const upcomingEventApiCall = () => {
    setUpcomingEventList([]);
    setIsLoader(true);

    getUpcomingEventList(1)
      .then((res) => {
        const eventArray = [];

        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);

            res.data[0].objectList.forEach((val) => {
              val.startDateHead = moment(
                val.startDate.slice(0, -3) * 1000
              ).format("MMM/DD/YYYY/dddd/HH:mm a");
              val.startDateNew = moment(
                val.startDate.slice(0, -3) * 1000
              ).format("MMM DD, YYYY, HH:mm a");
              val.originalStartDate = val.startDate;
              val.originalEndDate = val.endDate;
              val.endDateNew = moment(val.endDate.slice(0, -3) * 1000).format(
                "MMM DD, YYYY, HH:mm a"
              );

              val.startDate = moment(val.startDate.slice(0, -3) * 1000).format(
                "MM/DD/YYYY"
              );
              val.endDate = moment(val.endDate.slice(0, -3) * 1000).format(
                "MM/DD/YYYY"
              );

              eventArray.push(val);
            });
            setUpcomingEventList(eventArray);
          } else {
            setUpcomingEventList([]);
          }
        } else {
          setUpcomingEventList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setUpcomingEventList([]);
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
    getUpcomingEventList(page)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];

            res.data[0].objectList.forEach((val) => {
              val.startDateHead = moment(
                val.startDate.slice(0, -3) * 1000
              ).format("MMM/DD/YYYY/dddd/HH:mm a");
              val.startDateNew = moment(
                val.startDate.slice(0, -3) * 1000
              ).format("MMM DD, YYYY, HH:mm a");
              val.originalStartDate = val.startDate;
              val.originalEndDate = val.endDate;
              val.endDateNew = moment(val.endDate.slice(0, -3) * 1000).format(
                "MMM DD, YYYY, HH:mm a"
              );

              val.startDate = moment(val.startDate.slice(0, -3) * 1000).format(
                "MM/DD/YYYY"
              );
              val.endDate = moment(val.endDate.slice(0, -3) * 1000).format(
                "MM/DD/YYYY"
              );

              cleanedArray.push(val);
            });

            setUpcomingEventList(
              page === 1
                ? cleanedArray
                : [...upcomingEventList, ...cleanedArray]
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
    if (!endReachedMomentum && totalRecords > upcomingEventList.length) {
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
    setUpcomingEventList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setEndReachedMomentum(false);
    upcomingEventApiCall();
  };

  const navigateToScreen = useCallback((item) => {
    navigation.navigate(MODULES.RollUpDetailsScreen, {
      eventId: item.id,
      item: item,
      From: ROLLUP.Upcoming,
    });
  }, []);

  const onListFooterCompo = () => {
    if (isMoreLoader) {
      return <LoadMore animating={isMoreLoader} />;
    } else {
      return null;
    }
  };

  const onEndReach = () => {
    if (!endReach) {
      loadMorePage();
    }
  };

  const renderRaw = (item: UpcomingProps) => {
    return (
      <RollUpItem
        profile={item.profile}
        title={item.title}
        // viewableItems={viewableItems}
        // id={item?.id}
        startDateHead={item.startDateHead}
        startDateNew={item.startDateNew}
        address={item.address ? item.address : item.country}
        endDateNew={item.endDateNew}
        endDate={item.endDate}
        startDate={item.startDate}
        onPress={() => navigateToScreen(item)}
      />
    );
  };

  return (
    <View testID="UpcomingScreen" style={Full}>
      <View style={Body}>
        {isLoader ? <Loader type={"bottom"} /> : null}
        {!isLoader && upcomingEventList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyUpcomingEvent")}
            onPressRefresh={() => onRefresh()}
            type={"bottom"}
          />
        ) : (
          <FlatList
            data={upcomingEventList}
            renderItem={({ item }) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={commonStyle.flatGroupSpace}
            style={commonStyle.flatBottomListingSpace}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={onEndReach}
            onMomentumScrollBegin={() => setEndReachedMomentum(false)}
            ListFooterComponent={onListFooterCompo}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};
