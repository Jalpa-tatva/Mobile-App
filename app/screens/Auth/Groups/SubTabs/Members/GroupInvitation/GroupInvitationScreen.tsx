import React, { useState, useEffect } from "react";
import {
  View,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

// import external libraries
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";
import { useNavigation, useRoute } from "@react-navigation/native";

// Components, function & Context
import { searchInUser, inviteUsers } from "@app/services/api/groups";
import { Header, Loader, LoadMore } from "@components/index";
import AlertShow from "@app/components/AlertBox/AlertBox";
import ShowImage from "@app/components/FastImage/ShowImage";
import { useRedux } from "@app/redux/hooks";

// Services, styles & Utils
import {
  FULL,
  HEADERTOP,
  BODY,
  WrapperInvite,
  MainOverLayContainer,
  OverLayInputContainer,
  OverLayLabelText,
  TextInputStyle,
  OverLayLabelTextNoUser,
  FormContainer,
  OverLayLabelText3,
  OverLayButtonText,
  OverLayButtonContainerCencel,
  InviteUser,
  InviteUserWrapper,
  InviteLable,
  TotalMemberLbl,
  TotalMember,
  style,
} from "./Style";
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import { AntDesign, FontAwesome } from "@app/utils/icons/VectorIcons";

let SearchValue = "";

/**
 *  GroupInvitationScreen
 */
export const GroupInvitationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { groups } = content;
  const { group_detail, member_detail, map_detail } = useRedux([
    groups.groupsDetail,
    groups.memberDetail,
    groups.mapDetail,
  ]);

  const { uniqueId } =
    route?.params?.froms == "invite_org"
      ? map_detail
      : group_detail;

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const [isEmail, setIseEmail] = useState(false);

  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserItem, setSelectedUserItem] = useState([]);
  const [isLoader, setIsloader] = useState(false);
  const [isLoaderInvite, setIsloaderInvite] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [commonArray, setCommonArray] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  let memberData = member_detail;

  useEffect(() => {
    const subscibe = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => subscibe.remove();
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      onRefresh();
    });

    return focus;
  }, []);

  const searchApiCall = () => {
    setIsloader(true);
    setUserList([]);
    const memberArray = Object.values(memberData);
    searchInUser(SearchValue, 1, Number(memberArray?.length))
      .then((res) => {
        setIsloader(false);
        if (
          res?.data &&
          res?.data.length > 0 &&
          res?.data[0]?.objectList.length > 0
        ) {
          const memberUniqueIds = new Set(
            memberArray.map((member: any) => member.uniqueId)
          );

          // Filter out users who are present in memberArray
          const filteredUsers = res.data[0].objectList.filter(
            (user) => !memberUniqueIds.has(user.uniqueId) // Remove users that exist in memberArray
          );

          setTotalRecords(
            Number(res.data[0]?.status?.total) - Number(memberArray.length)
          );
          console.log("Filtered Users Length:", filteredUsers.length);
          console.log("Filtered Users:", filteredUsers);

          setUserList(filteredUsers);
        } else {
          setUserList([]);
          Snackbar.show({
            text: "No result found...",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsloader(false);
        setUserList([]);
      });
  };
  const checkType = () => {
    if (SearchValue.length > 0 && SearchValue != "" && SearchValue != null) {
      searchApiCall();
    }
  };
  const selectUser = (item, emailText?) => {
    const isEmailMode = Boolean(emailText);
    const key = isEmailMode ? "email" : "uniqueId";
    const selectedValue = isEmailMode ? item : item?.uniqueId;

    const exists = selectedUser.some((u) => u[key] === selectedValue);

    if (exists) {
      // Remove user
      setSelectedUser((prev) => prev.filter((u) => u[key] !== selectedValue));
      setSelectedUserItem((prev) =>
        prev.filter((u) =>
          isEmailMode ? u !== item : u?.uniqueId !== item?.uniqueId
        )
      );
      return;
    }

    // Add user
    const newUser = isEmailMode
      ? { email: item }
      : { uniqueId: item?.uniqueId, name: item?.title };

    setSelectedUser((prev) => [...prev, newUser]);
    setSelectedUserItem((prev) => [...prev, item]);
    setSearchText("");
    setIseEmail(false);
  };

  const renderRaw = (item) => {
    return (
      <TouchableOpacity
        style={style.memberWrapper}
        onPress={() => {
          emailRegex.test(item)
            ? selectUser(item, true)
            : selectUser(item, false);
        }}
      >
        <View>
          <ShowImage url={item?.imageUrl} imageStyle={style.useImage} />
        </View>

        <View style={style.userDetail}>
          <Text style={OverLayLabelText3}>{item.title || item}</Text>
          {(item?.location || item?.country) && (
            <View style={style.userLocation}>
              <FontAwesome
                name="map-marker"
                size={fontSize(14)}
                color={color.searchIcon}
              />
              <Text style={style.userLocationLbl}>
                {item?.location ?? item?.country}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedUser.find((data) => data?.uniqueId === item?.uniqueId) ? (
            <AntDesign
              name="checksquare"
              size={fontSize(23)}
              color={color.secondary}
            />
          ) : (
            <AntDesign
              name="checksquareo"
              size={fontSize(23)}
              color={color.secondary}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const inviteUserService = () => {
    setIsloaderInvite(true);

    inviteUsers(uniqueId, selectedUser)
      .then((res) => {
        // console.log('res:', res?.data[0]?.objectList[0]?.profileInvitation);
        setIsloaderInvite(false);
        // if (
        //   res?.data &&
        //   res?.data.length > 0 &&
        //   res?.data[0]?.objectList.length > 0 &&
        //   res?.data[0]?.objectList[0]?.profileInvitation === 'ok'
        // ) {
        if (res.data[0] && res.data[0]?.status.code == 0) {
          Keyboard.dismiss();
          setSelectedUser([]);
          setSearchText("");
          setUserList([]);
          setSelectedUserItem([]);
          setIseEmail(false);

          Snackbar.show({
            text: I18n.t("groupDetails.Invitatedsuccessfully"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          onCancel();
          navigation.goBack();
        } else {
          Snackbar.show({
            text: res.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsloaderInvite(false);
        console.log("err==", err);
      });
  };
  const loadMoreData = (page: number) => {
    setMoreLoader(true);
    setEndReach(false);
    searchInUser(SearchValue, page)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setUserList(
              page === 1 ? groupObjectList : [...userList, ...groupObjectList]
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
        setIsloader(false);
      });
  };

  const loadMorePage = () => {
    console.log("enter here", page);

    if (!endReachedMomentum && totalRecords > userList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };
  const onCancel = () => {
    SearchValue = "";
    setPage(1);
    setTotalRecords(0);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    setSelectedUser([]);
    setSearchText("");
    setUserList([]);
    setSelectedUserItem([]);
    setIseEmail(false);
    searchApiCall();
  };
  const sendInvite = () => {
    let Invitationuser = selectedUser;
    Invitationuser.forEach((val) => {
      const unqueId = val?.uniqueId ? val.uniqueId : val.email;
      commonArray.push(val?.name ?? unqueId);
      console.log("Array of commonArray: ", commonArray);

      // eventArray.push(val);
    });
    setAlert(true);
  };

  const onRefresh = () => {
    setPage(1);
    SearchValue = "";
    setTotalRecords(0);
    setUserList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    searchApiCall();
  };
  return (
    <View testID="GroupInvitationScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t("groupDetails.InvitePeople")}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={BODY}>
        <View style={{ marginHorizontal: 14, flex: 1 }}>
          {/* <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps="always"> */}
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, marginTop: 50 }}>
              <View style={WrapperInvite}>
                <View style={MainOverLayContainer}>
                  <View style={InviteUser}>
                    <TextInput
                      placeholder={I18n.t("groupDetails.Inviteemailorname")}
                      placeholderTextColor={color.searchBg}
                      returnKeyType="default"
                      style={TextInputStyle}
                      onChangeText={(text) => {
                        SearchValue = text;
                        setSearchText(text);
                        emailRegex.test(SearchValue)
                          ? setIseEmail(true)
                          : setIseEmail(false);
                        checkType();
                      }}
                      selectionColor={color.palette.black}
                      value={searchText}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onSubmitEditing={() => {
                        emailRegex.test(searchText)
                          ? selectUser(searchText, true)
                          : null;
                      }}
                    />
                    <TouchableOpacity
                      style={InviteUserWrapper}
                      onPress={sendInvite}
                      disabled={selectedUser.length === 0}
                    >
                      {!isLoaderInvite ? (
                        <Text style={InviteLable}>{"Invite"}</Text>
                      ) : (
                        <ActivityIndicator
                          animating={isLoaderInvite}
                          color={color.white}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {isLoader ? <Loader /> : null}

                  {/* <Text style={OverLayLabelText}>
                      {I18n.t('groupDetails.Touseroremail')}
                      <Text style={OverLayLabelText1}>*</Text>
                    </Text> */}

                  <View style={OverLayInputContainer}>
                    {!isLoader &&
                    !isEmail &&
                    userList.length == 0 &&
                    searchText.length !== 0 ? (
                      <View
                        style={{
                          marginHorizontal: 20,
                          width: "100%",
                          marginTop: fontSize(30),
                        }}
                      >
                        <Text style={OverLayLabelTextNoUser}>
                          {I18n.t("groupDetails.NoUserFound")}
                        </Text>
                      </View>
                    ) : null}
                    {userList?.length > 0 && (
                      <View style={TotalMember}>
                        <Text
                          style={TotalMemberLbl}
                        >{`Charlottesville's ${totalRecords} Members`}</Text>
                        <TouchableOpacity
                          style={OverLayButtonContainerCencel}
                          onPress={onCancel}
                        >
                          <Text style={OverLayButtonText}>
                            {I18n.t("groupDetails.Cancel")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={{
                        alignItems: "center",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "pink",
                      }}
                    >
                      <View style={FormContainer}>
                        <>
                          {/* {selectedUser.length > 0 ? (
                              {!isEmail &&
                                userList.length > 0 &&
                                searchText.length !== 0 && ( */}
                          <View style={{ width: "100%", flex: 1 }}>
                            {/* <Text style={OverLayLabelText}>
                                      {I18n.t('groupDetails.Searchedresult')}
                                    </Text> */}

                            <FlatList
                              data={userList}
                              renderItem={({ item }) => renderRaw(item)}
                              showsVerticalScrollIndicator={false}
                              style={[
                                commonStyle.flexStyle,
                                { marginTop: 12, flex: 1 },
                              ]}
                              keyExtractor={(item) => item.id}
                              onEndReachedThreshold={0.1}
                              onEndReached={() =>
                                endReach == false ? loadMorePage() : null
                              }
                              onMomentumScrollBegin={() =>
                                setEndReachedMomentum(false)
                              }
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
                          {/* )} */}
                          {selectedUser.length > 0 && (
                            <View style={{ flex: 1 }}>
                              <Text style={OverLayLabelText}>
                                {I18n.t("groupDetails.Selectedusers")} (
                                {selectedUser.length > 0
                                  ? selectedUser.length
                                  : null}
                                ){" "}
                              </Text>

                              <FlatList
                                data={selectedUserItem}
                                renderItem={({ item }) => renderRaw(item)}
                                showsVerticalScrollIndicator={false}
                                style={[
                                  commonStyle.flexStyle,
                                  { marginTop: 12 },
                                ]}
                                keyExtractor={(item) => item.id}
                                onEndReachedThreshold={0.1}
                                // style={{
                                //   borderWidth: 1,
                                //   borderColor: color.border,
                                //   borderRadius: 8,
                                //   padding: 5,
                                // }}
                              />
                            </View>
                          )}
                        </>
                        {/* ) : (
                            checkSerachType()
                          )} */}
                      </View>
                    </View>
                  </View>

                  {/* <TouchableOpacity
                      style={[OverLayButtonContainer]}
                      disabled={selectedUser.length > 0 ? false : true}>
                      {console.log('selectedUserlength', selectedUser.length)}

                      <Button
                        tx={'groupDetails.Send'}
                        onPress={() => {
                          let Invitationuser = selectedUser;
                          console.log('Invitationuser', Invitationuser);

                          Invitationuser.forEach(val => {
                            console.log('val', val);

                            commonArray.push(
                              val?.uniqueId ? val.uniqueId : val.email,
                            );

                            // eventArray.push(val);
                          });
                          console.log('commonArray', commonArray);
                          setAlert(true);
                        }}
                        isLoader={isLoaderInvite}
                        style={[
                          loginButtonContainer,
                          {opacity: selectedUser.length > 0 ? 1 : 0.6},
                        ]}
                        textStyle={BottonTitle}
                        disabled={selectedUser.length > 0 ? false : true}
                      />
                    </TouchableOpacity> */}
                  {alert ? (
                    <AlertShow
                      visible={alert}
                      title={I18n.t("groupDetails.InviteUsers")}
                      message={
                        I18n.t("groupDetails.AreyouToinvite") +
                        ` ${commonArray}`
                      }
                      noCancel={false}
                      onCancelText={I18n.t("groupDetails.Cancel")}
                      onYesText={I18n.t("groupDetails.SendInvitation")}
                      onYes={() => {
                        setAlert(false);
                        inviteUserService();
                        setCommonArray([]);
                      }}
                      onCancel={() => {
                        () => {};
                        setAlert(false);
                        setCommonArray([]);
                      }}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </View>
    </View>
  );
};
