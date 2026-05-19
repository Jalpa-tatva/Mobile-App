import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
} from "react-native";

// import external libraries
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Snackbar from "react-native-snackbar";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import I18n from "i18n-js";

// import custom components & functions
import { Loader, Header, Button, AlertBox } from "@components/index";
import { closeIssue, deleteIssue } from "@app/services/api/groups";
import {
  MODULES,
  GROUP_DETAILS,
  SafeOverlay,
  useRBSheetRef,
  SafeRBSheet,
} from "@app/constants";
import ShowImage from "@app/components/FastImage/ShowImage";
import { useRedux } from "@app/redux/hooks";

// import custom styling & utils
import {
  FULL,
  HEADERTOP,
  BODY,
  DetailsContainer,
  profileStyle,
  ImageBg,
  sub1ContainerStyle,
  titleStyle,
  text1Style,
  textStyle,
  OverLayButtonText,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  BottomlWrapperMain,
  Title,
  loginButtonContainer,
  OverLayButtonContainer1,
  BottonCloseTitle,
  TitleLocation,
  overlay,
  backdropStyle,
  MainOverLayContainer,
  OverLayRowContainer,
  OverLayTitleContainer,
  OverTitle,
  OverLayRowContainer1,
  OverLayText,
  OverLayInputContainer,
  TextInputs,
  TagContainer,
  userDetail,
  locationWrapper,
  spaceLeft,
  titleMainWrapper,
  DateWrapper,
  SpaceLeftMain,
  TitleLocationBlack,
  DetailActions,
  DetailActionsSpace,
  StyleWrapper,
  styles,
} from "./Style";
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@app/utils/icons/VectorIcons";

/**
 * IssueDetailsProps
 */
export interface IssueDetailsProps {
  id: number;
  title: string;
  value: string;
  time: string;
  onPress: Function;
}

/**
 * IssueDetailScreen
 */
export const IssueDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  console.log("group_detail",group_detail);
  
  const { canEditInfo } = group_detail;
  const item = route.params.item;
  const type = route.params.type;

  const [isLoader, setIsLoader] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [showOverlayPost, setShowOverlayPost] = useState(false);
  const [request, setRequest] = useState("");
  const refRBSheet = useRBSheetRef();
  var enteredDate = moment(item.enteredDate.slice(0, -3) * 1000).format(
    "MMM DD, YYYY, HH:mm a"
  );
  const profileAddress = item?.profileAddress ?? "";
  const profileCity = item?.profileCity ?? "";
  const profileCountry = item?.profileCountry ?? "";
  const location = `${profileAddress} ${profileCity} ${profileCountry}`.trim();

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

  const deleteServiceApicall = () => {
    setIsLoader(true);
    deleteIssue(item.uniqueId, item.id)
      .then((res) => {
        console.log("deleteIssue", JSON.stringify(res));
        setIsLoader(false);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t("addIssue.IssueDeleted"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: MODULES.GroupDetailsScreen,
                    params: {
                      fromss: "Issues",
                      issueTabs: type,
                    },
                  },
                ],
              }),
            });
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          Snackbar.show({
            text: res.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        console.log("err", err);
      });
  };

  const confirmAction = useCallback(() => {
    setDelete(false);
    deleteServiceApicall();
    refRBSheet.current.close();
  }, [isDelete]);

  const closeIssueServiceApicall = () => {
    setIsLoader(true);

    closeIssue(request, item.id, true)
      .then((res) => {
        setIsLoader(false);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setShowOverlayPost(false);
            Snackbar.show({
              text: I18n.t("addIssue.IssueClosed"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: MODULES.GroupDetailsScreen,
                    params: {
                      fromss: GROUP_DETAILS.Issues,
                      issueTabs: type,
                    },
                  },
                ],
              }),
            });
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          Snackbar.show({
            text: res.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        console.log("err", err);
      });
  };

  const onPressLeft = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const sheertAction = useCallback(() => {
    refRBSheet.current.open();
  }, [refRBSheet?.current]);

  return (
    <View testID="IssueDetailScreen" style={FULL}>
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
            style={{ marginTop: -24 }}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={MainOverLayContainer}>
              <View style={OverLayRowContainer}>
                <View style={OverLayTitleContainer}>
                  <Text style={OverTitle}>
                    {I18n.t("addIssue.CloseTheIssue")}
                  </Text>
                </View>
              </View>

              <View style={OverLayRowContainer1}>
                <Entypo
                  name={"info-with-circle"}
                  size={fontSize(20)}
                  color={color.white}
                />
                <Text style={OverLayText}>
                  {I18n.t("addIssue.WhatSolution")}
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
                      console.log("request change:", request);
                    }}
                    selectionColor={color.palette.black}
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={{ flex: 1, alignContent: "center" }}>
                <Button
                  tx={"addIssue.CloseIssue"}
                  isLoader={isLoader}
                  style={loginButtonContainer}
                  textStyle={BottonCloseTitle}
                  onPress={() => closeIssueServiceApicall()}
                />

                <TouchableOpacity
                  onPress={() => {
                    setShowOverlayPost(!showOverlayPost);
                  }}
                  style={OverLayButtonContainer1}
                >
                  <Text style={OverLayButtonText}>
                    {I18n.t("groupDetails.Cancel")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeOverlay>

      <SafeRBSheet
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={{ marginTop: -24 }}>
          <View style={commonStyle.subSheetContainer}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => {
                refRBSheet.current.close();
              }}
              color={color.palette.blackSecondary}
            />
          </View>

          <View style={SheetWrapper}>
            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                navigation.navigate(MODULES.AddIssueScreen, {
                  item: item,
                  issueTabs: type,
                  fromEdit: true,
                });

                refRBSheet.current.close();
              }}
            >
              <FontAwesome5
                name="edit"
                size={25}
                color={color.palette.white}
                style={{ paddingLeft: 30 }}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("addIssue.EditIssue")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                //setIsLine(false);
                refRBSheet.current.close();
                setDelete(true);
                // deleteServiceApicall();
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={25}
                color={color.palette.white}
                style={{ paddingLeft: 30 }}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("addIssue.DeleteIssue")}
              </Text>
            </TouchableOpacity>

            {type === GROUP_DETAILS.OpenIssue ? (
              <TouchableOpacity
                style={WrapperContainer}
                onPress={() => {
                  //setIsLine(false);
                  refRBSheet.current.close();

                  setTimeout(() => {
                    setShowOverlayPost(true);
                  }, 1000);
                }}
              >
                <AntDesign
                  name="closecircleo"
                  size={25}
                  color={color.palette.white}
                  style={{ paddingLeft: 30 }}
                />

                <Text style={ButtonSheetTitle}>
                  {I18n.t("addIssue.CloseIssue")}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("groupDetails.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <View style={HEADERTOP}>
        <Header
          title={I18n.t("addIssue.IssueDetails")}
          icon="chevron-left"
          iconRight={canEditInfo == "true" ? "dots-three-vertical" : null}
          onPressLeft={onPressLeft}
          onPressRight={sheertAction}
        />
      </View>
      <View style={BODY}>
        <View style={DetailsContainer}>
          {isLoader == true ? (
            <Loader />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={sub1ContainerStyle}>
                <View style={ImageBg}>
                  <ShowImage
                    url={
                      item?.ticketImageUrl
                        ? item?.ticketImageUrl
                        : item?.profileImageUrl
                    }
                    imageStyle={profileStyle}
                  />
                </View>
                <View style={userDetail}>
                  <View style={titleStyle}>
                    <Text numberOfLines={2} style={text1Style}>
                      By {item.createdBy}
                    </Text>
                  </View>
                  {location != "" && (
                    <View style={locationWrapper}>
                      <FontAwesome
                        name="map-marker"
                        size={fontSize(14)}
                        color={color.palette.blackSecondary}
                      />
                      <Text numberOfLines={3} style={spaceLeft}>
                        {location}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={{ ...BottomlWrapperMain, ...DateWrapper }}>
                <View style={SpaceLeftMain}>
                  {/* <Text style={Title}>Issue Date</Text>
                   */}
                  <FontAwesome
                    name="calendar-check-o"
                    size={fontSize(17)}
                    color={color.palette.darkGray}
                  />
                </View>
                <Text style={{ ...TitleLocation, ...TitleLocationBlack }}>
                  {enteredDate}
                </Text>
              </View>
              <View style={titleMainWrapper}>
                <Text numberOfLines={1} style={textStyle}>
                  {item.profile}
                </Text>
              </View>
              <View style={BottomlWrapperMain}>
                {/* <View>
                  <Text style={Title}>{I18n.t('addIssue.descriptionLbl')}</Text>
                </View> */}
                <Text numberOfLines={4} style={TitleLocation}>
                  {item.problem}
                </Text>
              </View>

              {/* {item.comment ? (
                <View style={BottomlWrapperMain}>
                  <View>
                    <Text style={Title}>{I18n.t('addIssue.commentLbl')}</Text>
                  </View>
                  <Text style={TitleLocation}>{item.comment}</Text>
                </View>
              ) : null} */}

              {/* <View style={BottomlWrapperMain}>
                <View>
                  <Text style={Title}>{I18n.t('addIssue.CountryLbl')}</Text>
                </View>
                <Text style={TitleLocation}>{item.profileCountry} </Text>
              </View> */}
              <View style={DetailActions}>
                <View style={{ ...BottomlWrapperMain, ...DetailActionsSpace }}>
                  <View>
                    <Text style={Title}>{I18n.t("addIssue.Severity")}</Text>
                  </View>
                  <Text style={TitleLocation}>{item.severity}</Text>
                </View>

                {item.assignedTo ? (
                  <View
                    style={{ ...BottomlWrapperMain, ...DetailActionsSpace }}
                  >
                    <View>
                      <Text style={Title}>{I18n.t("addTask.assignedTo")}</Text>
                    </View>
                    <Text style={TitleLocation}>{item.assignedTo}</Text>
                  </View>
                ) : null}

                <View style={{ ...BottomlWrapperMain, ...DetailActionsSpace }}>
                  <View>
                    <Text style={Title}>{I18n.t("addIssue.Status")}</Text>
                  </View>
                  <Text style={TitleLocation}>{item.status}</Text>
                </View>
              </View>
              {item.comment ? (
                <View style={BottomlWrapperMain}>
                  <View>
                    <Text style={Title}>{I18n.t("addIssue.commentLbl")}</Text>
                  </View>
                  <View style={StyleWrapper}>
                    <Text style={TitleLocation} numberOfLines={3}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
              ) : null}
            </ScrollView>
          )}
        </View>
      </View>

      {isDelete ? (
        <AlertBox
          visible={isDelete}
          title={item?.profile ?? I18n.t("groupDetails.DeleteIssue")}
          message={I18n.t("groupDetails.AreyouToDeleteIssue")}
          titleStyle={styles.msgTitleStyle}
          messageStyle={styles.messageLabel}
          onTouchOutside={() => setDelete(false)}
          onYes={confirmAction}
          onCancel={() => setDelete(false)}
          onYesText={"Yes"}
          onCancelText={"No"}
          onClear={undefined}
        />
      ) : null}
    </View>
  );
};
