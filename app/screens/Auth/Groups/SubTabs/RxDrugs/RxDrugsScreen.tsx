import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, RefreshControl, Linking, Alert } from "react-native";

// import external libraries
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";

// import custom function
import { Loader, EmptyView, LoadMore } from "@components/index";
import { getRxDrugList } from "@app/services/api/groups";
import { RxDrugsItem } from "./RxDrugsItem";
import { MODULES } from "@app/constants";

// import custom styling & utils
import { FULL, BODY, SUB_BODY } from "./styles";
import { color } from "@theme/index";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";

/**
 *  RxDrugs Props
 */

export interface RxDrugsProps {
  description: string;
  customDataDosage: string;
  customDataFrequency: string;
  customDataMedicationForm: string;
  imageUrl: string;
  notes: string;
  webPage: string;
  id: number;
  HasNotes: boolean;
  HasWebInfo: boolean;
  onPress: Function;
  onPressWeb: Function;
}

type RxDrugsRouteProps = {
  RxDrugsScreen: {
    setActiveTab?: (string) => void;
    profile: any;
    activeTab: string;
    reload: boolean;
    setReload: (boolean) => void;
    screen?: string;
  };
};
type RxDrugScreenType = RouteProp<RxDrugsRouteProps, "RxDrugsScreen">;

/**
 * RxDrugsScreen component
 */
export const RxDrugsScreen: React.FC = () => {
  const route = useRoute<RxDrugScreenType>();

  const { setActiveTab, activeTab } = route?.params;
  const navigation = useNavigation<any>();
  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  const uniqueId = group_detail.uniqueId;
  const imageUrls = group_detail.imageUrl;
  const titles = group_detail.title;
  const canEditInfo = group_detail.canEditInfo;

  const [rxDrugList, setRxDrugList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      setActiveTab(activeTab);
    });
    return focus;
  }, []);

  useEffect(() => {
    myRxDrugApiCall();
  }, []);

  const myRxDrugApiCall = () => {
    setRxDrugList([]);
    setIsLoader(true);
    getRxDrugList(1, uniqueId)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setRxDrugList(res.data[0].objectList);
          } else {
            setRxDrugList([]);
          }
        } else {
          setRxDrugList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setRxDrugList([]);
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
    getRxDrugList(page, uniqueId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setRxDrugList(
              page === 1 ? groupObjectList : [...rxDrugList, ...groupObjectList]
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
    if (!endReachedMomentum && totalRecords > rxDrugList.length) {
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
    setRxDrugList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    myRxDrugApiCall();
  };

  const navigateToScreen = useCallback(
    (item) => {
      navigation.navigate(MODULES.ViewDrugScreen, {
        item: item,
        uniqueId: uniqueId,
        imageUrls: imageUrls,
        titles: titles,
        canEditInfo: canEditInfo,
      });
    },
    [navigation]
  );

  const ViewDrugWebInfo = async (webPage: any) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(webPage).then((response: any) => {
          if (response.type === "success" && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else {
        Linking.openURL(webPage);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const renderRaw = useCallback(
    (item: RxDrugsProps) => {
      return (
        <RxDrugsItem
          tablateName={item.description}
          weight={item.customDataDosage}
          perDay={item.customDataFrequency}
          customDataMedicationForm={item.customDataMedicationForm}
          desc={item.notes}
          webPage={item.webPage}
          imageUrl={item.imageUrl}
          id={item.id}
          HasNotes={item.HasNotes}
          HasWebInfo={item.HasWebInfo}
          onPressWeb={() => ViewDrugWebInfo(item.webPage)}
          onPress={() => navigateToScreen(item)}
        />
      );
    },
    [rxDrugList]
  );

  return (
    <View testID="RxDrugsScreen" style={FULL}>
      <View style={{ ...BODY, ...SUB_BODY }}>
        {isLoader ? <Loader /> : null}
        {!isLoader && rxDrugList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyRxDrugs")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={rxDrugList}
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
