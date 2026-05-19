import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Keyboard,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

// import external libraries
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";

// import custom function & component
import {
  Loader,
  EmptyView,
  Button,
  LoadMore,
  AlertBox,
} from "@components/index";
import {
  getConnectionList,
  addFriends,
  removeFriends,
} from "@app/services/api/profile";
import { ConnectionItem } from "./ConnectionItem";
import { MODULES, PROFILE, SafeOverlay } from "@app/constants";

// import custom styling & utils
import commonStyle from "@app/theme/commonStyle";
import { color, fontSize } from "@theme/index";
import {
  FULL,
  BODY,
  SearchWrapper,
  TextInputStyle,
  OverTitle,
  TextInputs,
  TagContainer,
  OverLayText,
  OverLayRowContainer1,
  overlay,
  backdropStyle,
  OverLayInputContainer,
  OverLayRowContainer,
  MainOverLayContainer,
  OverLayImageContainer,
  OverLayTitleContainer,
  OverLayImage,
  loginButtonContainer,
  BottonTitle,
  OverLayButtonContainer1,
  OverLayButtonText,
  styles,
} from "./Style";
import { profileStyle } from "@app/screens/Auth/UserProfile/ProfileStyle";
import moment from "moment";
import ShowImage from "@app/components/FastImage/ShowImage";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { trackApiEvent } from "@app/utils/appReport/ActivityReport";
import { points } from "@app/utils/appReport/ReportPoint";
import { method } from "@app/services/api/Method";

/**
 * ConnectionScreen Props
 */
export interface ConnectionProps {
  setReload?: any;
}

// declare variable
let SearchValue = "";
let listType = "mine";
let dataItam: any = [];

/**
 * ConnectionScreen component
 */
export const ConnectionScreen = (props: ConnectionProps) => {
  const navigation = useNavigation<any>();
  const { groups } = content;
  const { login_detail } = useRedux([groups.loginDetail]);
  let loginData = login_detail;
  const [connectionList, setConnectionList] = useState([]);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [cancelAlert, setCancelAlert] = useState(false);
  const [showOverlayPost, setShowOverlayPost] = useState(false);
  const [request, setRequest] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [userDetail, setUserDetail] = useState({ uniqueId: "", title: "" });

  const debouncedCall = useCallback(
    debounce(() => myActivitiesApiCall(), 1000),
    []
  );

  const onAddFriend = (item) => {
    dataItam = item;
    setShowOverlayPost(!showOverlayPost);
  };

  const myActivitiesApiCall = () => {
    setConnectionList([]);
    setIsLoader(true);
    setPage(1);

    getConnectionList(1, listType, SearchValue)
      .then(async (res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res?.data?.[0]?.status?.total ?? 0);
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              if (val.uniqueId !== loginData?.userUniqueId) {
                cleanedArray.push(val);
              }
            });
            props?.setReload(true);
            setConnectionList(cleanedArray);
          } else {
            setConnectionList([]);
          }
        } else {
          setConnectionList([]);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${PROFILE.Connections}`,
          endpoint: points.profileList,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        setConnectionList([]);
      });
  };

  const loadMoreData = (page: number) => {
    if (isMoreLoader || endReach) return;

    setIsMoreLoader(true);
    getConnectionList(page, listType, SearchValue)
      .then((res) => {
        const list = res?.data?.[0]?.objectList ?? [];

        if (list.length === 0) {
          setEndReach(true);
        } else {
          const cleanedArray = list.filter(
            (val) => val.uniqueId !== loginData?.userUniqueId
          );

          setConnectionList((prev) => [...prev, ...cleanedArray]);
        }

        setIsMoreLoader(false);
      })
      .catch(() => {
        setIsMoreLoader(false);
        setEndReach(true);
      });
  };

  const loadMorePage = () => {
    if (!isMoreLoader && !endReach && totalRecords > connectionList.length) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMoreData(nextPage);
    }
  };
  useEffect(() => {
    myActivitiesApiCall();
    listType = "mine";
    SearchValue = "";
    setSearchText("");
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setConnectionList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setTotalRecords(0);
    myActivitiesApiCall();
  };

  const AddFriendsApiCall = (uniqueiD: any) => {
    setIsLoader(true);
    addFriends(uniqueiD)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${I18n.t("Userprofile.addFriends")}_${PROFILE.Connections}`,
          endpoint: points.addFriend,
          method: method.POST,
          status: statusCode,
          response: res,
        });
        setIsLoader(false);
        console.log("id of user", res.data[0]);
        if (res.data[0].status.code === 0) {
          Snackbar.show({
            text: I18n.t("Userprofile.FriendRequestSent"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setShowOverlayPost(false);
          setRequest("");
          clearSearch();
        } else {
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${I18n.t("Userprofile.addFriends")}_${PROFILE.Connections}`,
          endpoint: points.addFriend,
          method: method.POST,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const removeFriendsApiCall = (uniqueiD: any) => {
    setIsLoader(true);
    removeFriends(uniqueiD)
      .then(async (res) => {
        setIsLoader(false);

        if (res.data[0].status.code === 0) {
          Snackbar.show({
            text: I18n.t("Userprofile.FriendRequestCancel"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setShowOverlayPost(false);
          setRemoveAlert(false);
          setCancelAlert(false);
          setRequest("");
          myActivitiesApiCall();
          setSearchText("");
          props?.setReload();
        } else {
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${I18n.t("Userprofile.removeFriends")}_${
            PROFILE.Connections
          }`,
          endpoint: points.addFriend,
          method: method.POST,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const unFollowService = (uniqueiD: string, title: string) => {
    setUserDetail({ uniqueId: uniqueiD, title: title });
    setRemoveAlert(true);
  };
  const cancelService = (uniqueiD: string, title: string) => {
    setUserDetail({ uniqueId: uniqueiD, title: title });
    setCancelAlert(true);
  };

  const listFooterComponent = () => {
    return isMoreLoader ? <LoadMore animating /> : null;
  };

  const onSearchCall = useCallback(
    (text) => {
      SearchValue = text;
      setSearchText(text);

      if (SearchValue.length > 0) {
        listType = "all";
      } else {
        listType = "mine";
      }

      SearchValue.length > 0 ? debouncedCall() : myActivitiesApiCall();
    },
    [searchText]
  );

  const clearSearch = useCallback(() => {
    let temp = "";
    SearchValue = temp;
    setSearchText("");
    listType = "mine";
    Keyboard.dismiss();
    myActivitiesApiCall();
  }, []);

  const stopAction = () => {
    setCancelAlert(false);
    setRemoveAlert(false);
    Keyboard.dismiss();
  };

  const renderRaw = (item: any) => {
    const navigateToScreen = () => {
      navigation.navigate(MODULES.FriendDetailScreen, { item });
    };

    const city = item?.location ? `${item.location}, ` : "";
    const address = item?.country ? item.country : "";
    const location = `${city}${address}`;
    const date = item?.startDate
      ? moment(Number(item.startDate)).format("MMM DD, YYYY")
      : "";

    return (
      <ConnectionItem
        title={item.title}
        imageUrl={item.imageUrl}
        location={location}
        description={item.description}
        date={date}
        isActiveMember={item.isActiveMember}
        isPendingMember={item.isPendingMember}
        onPressAddFriend={() => onAddFriend(item)}
        onPressRemoveFriend={() => unFollowService(item.uniqueId, item.title)}
        onPressCancelFriend={() => cancelService(item.uniqueId, item.title)}
        onPress={navigateToScreen}
      />
    );
  };

  return (
    <View testID="ConnectionScreen" style={FULL}>
      <AlertBox
        visible={removeAlert}
        title={`${I18n.t("Userprofile.RemoveFriend")}`}
        titleStyle={styles.titleStyle}
        messageStyle={styles.messageStyle}
        message={`${I18n.t("Userprofile.confirmRemove")} ${
          userDetail?.title
        } ${I18n.t("Userprofile.fromFriendlist")}`}
        onTouchOutside={() => setRemoveAlert(false)}
        onYes={() => {
          removeFriendsApiCall(userDetail?.uniqueId);
        }}
        onCancel={() => {
          setRemoveAlert(false);
        }}
        next={false}
        onYesText={I18n.t("Userprofile.Yes")}
        onCancelText={I18n.t("Userprofile.No")}
        onNext={undefined}
        onNextText={""}
      />
      <AlertBox
        visible={cancelAlert}
        title={`${I18n.t("Userprofile.CancelFriend")}`}
        titleStyle={styles.titleStyle}
        messageStyle={styles.messageStyle}
        message={`${I18n.t("Userprofile.confirmCancelFrinedRequest")} ${
          userDetail?.title
        } ${I18n.t("Userprofile.fromFriendlist")}`}
        onTouchOutside={() => setCancelAlert(false)}
        onYes={() => {
          removeFriendsApiCall(userDetail?.uniqueId);
        }}
        onCancel={() => {
          setCancelAlert(false);
        }}
        next={false}
        onYesText={I18n.t("Userprofile.Yes")}
        onCancelText={I18n.t("Userprofile.No")}
        onNext={undefined}
        onNextText={""}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          stopAction();
        }}
      >
        <View style={BODY}>
          <SafeOverlay
            overlayStyle={overlay}
            backdropStyle={backdropStyle}
            isVisible={showOverlayPost}
            onBackdropPress={() => {}}
          >
            <KeyboardAwareScrollView
              style={{ width: undefined, height: undefined }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <TouchableWithoutFeedback
                style={profileStyle.subSheetSpaceTop}
                onPress={() => stopAction()}
              >
                <View style={MainOverLayContainer}>
                  <View style={OverLayRowContainer}>
                    <View style={OverLayImageContainer}>
                      <ShowImage
                        imageStyle={OverLayImage}
                        url={dataItam.image200Url}
                      />
                    </View>
                    <View style={OverLayTitleContainer}>
                      <Text style={OverTitle}>{dataItam.title}</Text>
                    </View>
                  </View>

                  <View style={OverLayRowContainer1}>
                    <Entypo
                      name={"info-with-circle"}
                      size={fontSize(22)}
                      color={color.white}
                    />
                    <Text style={OverLayText}>
                      {I18n.t("Userprofile.requestFriendsWarningText")}
                    </Text>
                  </View>

                  <View style={OverLayInputContainer}>
                    <View style={TagContainer}>
                      <TextInput
                        multiline={true}
                        value={request}
                        style={TextInputs}
                        onChangeText={(text) => {
                          setRequest(text);
                        }}
                        autoCorrect={false}
                        autoCapitalize="none"
                        selectionColor={color.palette.black}
                      />
                    </View>
                  </View>

                  <Button
                    tx={"Userprofile.AddFriends"}
                    isLoader={isLoader}
                    style={loginButtonContainer}
                    textStyle={BottonTitle}
                    onPress={() => AddFriendsApiCall(dataItam.uniqueId)}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();

                      setShowOverlayPost(!showOverlayPost);
                    }}
                    style={OverLayButtonContainer1}
                  >
                    <Text style={OverLayButtonText}>
                      {I18n.t("Userprofile.Cancel")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
          </SafeOverlay>
          <View style={SearchWrapper}>
            <View style={profileStyle.connectionSpaceLeft}>
              <Feather
                name={"search"}
                size={fontSize(22)}
                color={color.white}
              />
            </View>
            <TextInput
              placeholder={I18n.t("Userprofile.searchname")}
              placeholderTextColor={color.white}
              returnKeyType="default"
              style={TextInputStyle}
              selectionColor={color.searchIcon}
              onChangeText={(text) => onSearchCall(text)}
              value={searchText}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {SearchValue != "" ? (
              <Entypo
                name={"circle-with-cross"}
                size={fontSize(20)}
                style={profileStyle.connectionSpaceRight}
                color={color.searchIcon}
                onPress={clearSearch}
              />
            ) : null}
          </View>
          {isLoader ? <Loader /> : null}

          {!isLoader && connectionList.length === 0 ? (
            <EmptyView
              title={I18n.t("EmptyView.EmptyConnectiont")}
              onPressRefresh={onRefresh}
            />
          ) : (
            <FlatList
              data={connectionList}
              renderItem={({ item }) => renderRaw(item)}
              keyExtractor={(item) => item.uniqueId?.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={commonStyle.flatBottomSpace}
              onEndReached={loadMorePage}
              onEndReachedThreshold={0.5}
              // onMomentumScrollBegin={() => setEndReachedMomentum(false)}
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
