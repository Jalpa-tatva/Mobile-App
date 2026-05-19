import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";

// External libraries
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";
import { useNavigation } from "@react-navigation/native";

// Components & Context
import { Loader, EmptyView, LoadMore } from "@components/index";
import { getOpenIssueList } from "@app/services/api/groups";
import { GROUP_DETAILS, MODULES } from "@app/constants";
import { useRedux } from "@app/redux/hooks";
import { IssuesListItem } from "./IssuesListItem";

// Services, styles & Utils
import { FULL, BODY, SUB_BODY } from "./Style";
import commonStyle from "@app/theme/commonStyle";
import { color } from "@theme/index";
import { content } from "@app/utils/string";

/**
 *  OpenIssuesListProps
 */
export interface OpenIssuesListProps {
  status: string;
  createdBy: string;
  problem: string;
  severity: string;
  createdByImageUrl: string;
  enteredText: string;
  assignedTo: string;
  onPress: Function;
}

/**
 *  OpenIssuesList
 */
export const OpenIssuesList: React.FC<{
  activeTab?: any;
  setActiveTab: any;
}> = ({ activeTab, setActiveTab }) => {
  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  const { uniqueId } = group_detail;
  const navigation = useNavigation<any>();
  const [issueList, setIssueList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    // setActiveTab(activeTab);
    myGroupApiCall();
  }, []);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      // setActiveTab(activeTab);
    });

    return focus;
  }, []);

  const myGroupApiCall = () => {
    setIssueList([]);
    setIsLoader(true);
    getOpenIssueList(1, uniqueId)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setIssueList(res.data[0].objectList);
          } else {
            setIssueList([]);
          }
        } else {
          setIssueList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIssueList([]);
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
    getOpenIssueList(page, uniqueId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setIssueList(
              page === 1 ? groupObjectList : [...issueList, ...groupObjectList]
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
    if (!endReachedMomentum && totalRecords > issueList.length) {
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
    setIssueList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    myGroupApiCall();
  };

  const navigateToScreen = useCallback(
    (item) => {
      navigation.navigate(MODULES.IssueDetailScreen, {
        item: item,
        type: GROUP_DETAILS.OpenIssue,
      });
    },
    [navigation]
  );

  const renderRaw = (item: OpenIssuesListProps) => {
    return (
      <IssuesListItem
        status={item.status}
        createdByImageUrl={item.createdByImageUrl}
        problem={item.problem}
        severity={item.severity}
        createdBy={item.createdBy}
        enteredText={item.enteredText}
        assignedTo={item.assignedTo}
        onPress={() => navigateToScreen(item)}
      />
    );
  };

  return (
    <View testID="OpenIssuesList" style={FULL}>
      <View style={{ ...BODY, ...SUB_BODY }}>
        {isLoader ? <Loader /> : null}
        {!isLoader && issueList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyOpenIssues")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={issueList}
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
