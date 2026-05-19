import React, { useState, useCallback, useEffect } from "react";
import {
  BackHandler,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  RefreshControl,
  FlatList,
  Linking,
  Alert,
} from "react-native";

// import external libraries
import { useNavigation } from "@react-navigation/native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { debounce } from "lodash";
import Entypo from "react-native-vector-icons/Entypo";
import I18n from "i18n-js";
import Feather from "react-native-vector-icons/Feather";

// import custom function
import { RxDrugsItem } from "./RxDrugsItem";
import { Header, LoadMore, Loader, EmptyView } from "@components/index";
import { searchRxDrugList } from "@app/services/api/groups";
import { MODULES } from "@app/constants";

// import custom styling & utils
import {
  FULL,
  HEADERTOP,
  BODY,
  SearchWrapper,
  ContainerWraper,
  FlatListWrapper,
  TextInputStyle,
  Style,
} from "./Style";
import commonStyle from "@app/theme/commonStyle";
import { color, fontSize } from "@app/theme";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";

// TextInput.defaultProps.selectionColor = 'white';
let SearchValue = "";

/**
 *  RxDrugsSearch Props
 */
export interface RxDrugsSearchProps {
  uniqueId: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  startDate?: string;
  webPage: string;
  onPress: Function;
  onPressWeb: Function;
}

/**
 * SearchDrugsScreen component
 */
export const SearchDrugsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  const {
    title: titles,
    imageUrl: imageUrls,
    canEditInfo: canEditInfo,
    uniqueId: profileUniqueId,
  } = group_detail;

  const [isLoader, setIsloader] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const [isMoreLoader, setMoreLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const debouncedCall = useCallback(
    debounce(() => searchApiCall(), 1000),
    []
  );

  useEffect(() => {
    SearchValue = "";
    setSearchText("");
    searchApiCall();
  }, []);

  useEffect(() => {
    const subscibe = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => subscibe.remove();
  }, []);

  const backAction = () => {
    navigation.goBack(null);
    return true;
  };

  const searchApiCall = () => {
    setIsloader(true);
    setUserList([]);

    searchRxDrugList(1, SearchValue)
      .then((res) => {
        console.log("searchInUser", JSON.stringify(res?.data));
        setIsloader(false);
        if (
          res?.data &&
          res?.data.length > 0 &&
          res?.data[0]?.objectList.length > 0
        ) {
          setTotalRecords(res.data[0].status.total);

          setUserList(res.data[0].objectList);
        } else {
          setUserList([]);
        }
      })
      .catch((err) => {
        setIsloader(false);
        setUserList([]);
      });
  };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setUserList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    SearchValue = "";
    setSearchText("");
    searchApiCall();
  };

  const loadMoreData = (page: number) => {
    console.log("Page", page);
    setMoreLoader(true);
    setEndReach(false);
    searchRxDrugList(page, SearchValue)
      .then((res) => {
        console.log("loadMoreData", JSON.stringify(res));

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let moreData = res.data[0].objectList;
            setUserList(page === 1 ? moreData : [...userList, ...moreData]);
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
        setIsloader(false);
      });
  };

  const checkType = () => {
    if (SearchValue.length > 0 && SearchValue != "" && SearchValue != null) {
      debouncedCall();
    }
  };

  const ViewDrugWebInfo = async (webPage: string) => {
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
      // showErrorMessage(error?.message);
    }
  };

  const navigateToScreen = useCallback(
    (item) => {
      navigation.navigate(MODULES.AddDrugsScreen, {
        imageUrls: imageUrls,
        grptitle: titles,
        title: item.title,
        uniqueId: item.uniqueId,
        profileUniqueId: profileUniqueId,
        canEditInfo: canEditInfo,
      });
    },
    [navigation]
  );

  const renderRaw = (item: RxDrugsSearchProps) => {
    return (
      <RxDrugsItem
        title={item.title}
        category={item.category}
        subcategory={item.subcategory}
        createDate={item.startDate}
        description={item.description}
        webPage={item.webPage}
        onPressWeb={() => {
          ViewDrugWebInfo(item.webPage);
        }}
        onPress={() => navigateToScreen(item)}
      />
    );
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > userList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  return (
    <View testID="SearchDrugsScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t("rxDrug.SearchDrug")}
          icon="chevron-left"
          onPressLeft={goBack}
        />
      </View>

      <View style={BODY}>
        <TouchableWithoutFeedback
          style={{ marginTop: -24 }}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            style={{ ...commonStyle.flexStyle, ...Style.wrapperOne }}
            contentContainerStyle={Style.wrapperSecond}
          >
            <View style={SearchWrapper}>
              <View style={Style.connectionSpaceLeft}>
                <Feather
                  name={"search"}
                  size={fontSize(22)}
                  color={color.white}
                />
              </View>
              <TextInput
                placeholder={I18n.t("Userprofile.searchDrug")}
                placeholderTextColor={color.white}
                returnKeyType="default"
                style={TextInputStyle}
                selectionColor={color.searchIcon}
                onChangeText={(text) => {
                  SearchValue = text;
                  setSearchText(text);
                  checkType();
                }}
                value={searchText}
                autoCorrect={false}
                autoCapitalize="none"
              />
              {SearchValue != "" ? (
                <Entypo
                  name={"circle-with-cross"}
                  size={fontSize(20)}
                  style={Style.connectionSpaceRight}
                  color={color.white}
                  onPress={() => {
                    onRefresh();
                  }}
                />
              ) : null}
            </View>
            <View style={ContainerWraper}>
              {isLoader ? <Loader /> : null}

              {!isLoader && userList.length == 0 ? (
                <EmptyView
                  title={I18n.t("EmptyView.EmptyDrugs")}
                  onPressRefresh={() => onRefresh()}
                />
              ) : (
                <View style={FlatListWrapper}>
                  <FlatList
                    data={userList}
                    renderItem={({ item }) => renderRaw(item)}
                    showsVerticalScrollIndicator={false}
                    style={commonStyle.flatSearchDrugStyle}
                    contentContainerStyle={{ alignItems: "center" }}
                    keyExtractor={(item) => item.id}
                    onEndReachedThreshold={0.1}
                    onEndReached={() =>
                      endReach == false ? loadMorePage() : null
                    }
                    onMomentumScrollBegin={() => setEndReachedMomentum(false)}
                    ListFooterComponent={() => {
                      return isMoreLoader ? (
                        <LoadMore animating={isMoreLoader} />
                      ) : null;
                    }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                  />
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
