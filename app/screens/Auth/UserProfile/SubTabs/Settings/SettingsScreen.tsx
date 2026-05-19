import React, { useState, useEffect } from "react";
import { Button, Text, AlertBox, Header, Loader } from "@app/components";

import Snackbar from "react-native-snackbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import I18n from "@app/i18n/i18n";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  Platform,
  Switch,
  Image,
} from "react-native";
import {
  FULL,
  BODY,
  ButtonWrapper1,
  ExtraTItle,
  DetailsWrapper,
  BottonTitle,
  signUpButtonContainer,
  HEADERTOP,
  detailCal,
  style,
  ExtraTItle1,
} from "./Style";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { translate } from "@app/i18n";
import { color, font, fontSize } from "@app/theme";
import { MODULES, PROFILE } from "@app/constants";
import { getMySettings, postMySettings } from "@app/services/api/profile";
import { deleteAccount } from "@app/services/api/groups";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import useAppNavigation from "@app/navigation/navigation";
import { MaterialIcons } from "@app/utils/icons/VectorIcons";
import { profileDetail } from "@app/redux/reducer/profileReducer";
import { trackApiEvent } from "@app/utils/appReport/ActivityReport";
import { points } from "@app/utils/appReport/ReportPoint";
import { method } from "@app/services/api/Method";
import {
  biometricPermission,
  checkBiometricAvailability,
  getUserCredentials,
  removeBiometric,
} from "@app/components/Biometric/biometric";
import DeviceInfo from "react-native-device-info";
import { assets } from "../../../../../../assets/images";
import { BiometricEnableModal } from "@app/components/AlertBox/BiometricAlert";

export interface SettingsProps {
  firstName: string;
  lastName: string;
  email: string;
  mobileno: string;
  description: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const SettingsScreen: React.FC = () => {
  const { groups } = content;
  const { drawer_status, login_detail, dispatches, profile_detail } = useRedux([
    groups.drawerStatus,
    groups.loginDetail,
    groups.dispatch,
    groups.profileDetail,
  ]);

  const [openModel, setOpenModel] = useState(false);
  const [openDisableModel, setOpenDisableModel] = useState(false);
  const [passwordReset] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  const [privacy, setPrivacy] = useState("");
  const [privacyType, setPrivacyType] = useState("");

  const [emailDigest, setEmailDigest] = useState(profile_detail.emailDigest);
  const [emailDigestType, setEmailDigestType] = useState("");

  const [emailOptIn, setEmailOptIn] = useState(profile_detail.emailOptIn);
  const [emailOptInType, setEmailOptInType] = useState("");

  const [dialogPrivacy, setDialogPrivacy] = useState(false);
  const [dialogEmailDigest, setDialogEmailDigest] = useState(false);
  const [dialogEmailOptIn, setDialogEmailOptIn] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userProfile, setUserProfile] = useState<any>({});

  const [accountDelete, setAccountDelete] = useState(false);
  const navigation = useAppNavigation();
  const deviceId = DeviceInfo.getDeviceId();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isBiometricEnable, setIsBiometricEnable] = useState(false);

  const toggleSwitch = () => {
    if (isEnabled) {
      setOpenDisableModel(true);
    } else {
      enableBiometric();
    }
  };

  const enableBiometric = async () => {
    try {
      const { available } = await checkBiometricAvailability();
      if (available) setOpenModel(true);
    } catch (error) {
      console.error("====>>>>>>", error);
    }
  };

  useEffect(() => {
    checkBiometric();
    getKeyValue();
  }, []);

  const checkBiometric = async () => {
    const { available } = await checkBiometricAvailability();
    setIsBiometricEnable(available);
  };

  const getKeyValue = async () => {
    try {
      const { user } = await getUserCredentials(login_detail?.email);
      setIsEnabled(user?.biometric?.enabled);
    } catch (error) {
      console.log("===============>>>>>", error);
    }
  };
  let userUniqueId = login_detail.userUniqueId;

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      getSettingAPIService();
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    });

    return focus;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    });

    return unsubscribe;
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const setUserType = (data) => {
    if (data.privacy == "friends") {
      setPrivacyType("friends");
      setPrivacy("Friends");
    }
    if (data.privacy == "public") {
      setPrivacyType("members");
      setPrivacy("Everyone");
    }
    if (data.privacy == "users") {
      setPrivacyType("users");
      setPrivacy("All");
    }

    if (data.emailOptIn == "true") {
      setEmailOptIn("true");
      setEmailOptInType("Yes");
    }

    if (data.emailOptIn == "false") {
      setEmailOptIn("false");
      setEmailOptInType("No");
    }

    if (data.emailDigest == "true") {
      setEmailDigest("true");
      setEmailDigestType("Yes");
    }

    if (data.emailDigest == "false") {
      setEmailDigest("false");
      setEmailDigestType("No");
    }
  };

  const getSettingAPIService = () => {
    getMySettings()
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${PROFILE.Settings}`,
          endpoint: points.settings,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        let newArray = res.data;
        let data = {
          email: newArray[0].objectList[0].email,
          firstName: newArray[0].objectList[0].firstName,
          lastName: newArray[0].objectList[0].lastName,
          city: newArray[0].objectList[0].city,
          state: newArray[0].objectList[0].state,
          country: newArray[0].objectList[0].country,
          postalCode: newArray[0].objectList[0].postalCode,
          description: newArray[0].objectList[0].description,
          mobileno: newArray[0].objectList[0].mobileno,
          privacy: newArray[0].objectList[0].privacy,
          emailOptIn: newArray[0].objectList[0].emailOptIn,
          emailDigest: newArray[0].objectList[0].emailDigest,
        };
        dispatches(profileDetail(data));
        setUserType(data);
        setUserProfile(data);
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${PROFILE.Settings}`,
          endpoint: points.settings,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        console.log("err", err);
      });
  };

  const onRegisterUserApiService = async () => {
    const {
      firstName,
      email,
      lastName,
      city,
      state,
      country,
      mobileno,
      postalCode,
      description,
    }: any = userProfile;

    let userData = {
      firstName: firstName,
      email: email,
      lastName: lastName,
      city: city,
      state: state,
      country: country,
      mobileno: mobileno,
      postalCode: postalCode,
      description: description,
      privacy: privacyType,
      emailOptIn: emailOptIn,
      emailDigest: emailDigest,
    };

    setIsLoader(true);
    await postMySettings(userData)
      .then(async (response: any) => {
        const statusCode = response?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${PROFILE.Settings}`,
          endpoint: points.settings,
          method: method.POST,
          status: statusCode,
          response: response,
        });
        if (response.status == 200) {
          setIsLoader(false);

          if (response.data[0] && response.data[0]?.status.code == 0) {
            console.log("Success");
            setIsEdit(false);
            if (passwordReset) {
              Snackbar.show({
                text: I18n.t("Userprofile.ResetSuccessfully"),
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.palette.lightGreen,
                textColor: color.palette.white,
                numberOfLines: 5,
              });
            } else {
              Snackbar.show({
                text: I18n.t("Userprofile.ProfileUpdated"),
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.palette.lightGreen,
                textColor: color.palette.white,
                numberOfLines: 5,
              });
            }

            getSettingAPIService();
          } else {
            console.log("Fail");
          }
        }
      })
      .catch(async (error) => {
        await trackApiEvent({
          screen: `${PROFILE.Settings}`,
          endpoint: points.settings,
          method: method.POST,
          status: error?.response?.status || 500,
          response: error,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        console.log("error:", error);
        setIsLoader(false);
      });
  };

  const deleteAccountApiCall = async () => {
    setAccountDelete(false);
    setDeleteLoader(true);
    await deleteAccount(userUniqueId)
      .then((response: any) => {
        if (response.data && response.data.length > 0) {
          if (response.data[0].status.code == 0) {
            setDeleteLoader(false);
            Snackbar.show({
              text: "Account deleted successfully",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            AsyncStorage.clear();
            navigation.replace(MODULES.Splash);
          } else {
            setDeleteLoader(false);
            Snackbar.show({
              text: "Something went wrong",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        }
      })
      .catch((error) => {
        console.log("error:", error);
        setDeleteLoader(false);
      });
  };
  const updatePrivacy = (type) => {
    const isChanged =
      userProfile?.privacy !== type.toLowerCase() ||
      userProfile.emailOptIn !== emailOptIn ||
      userProfile.emailDigest !== emailDigest;
    setIsEdit(isChanged);
  };

  const updateEmailDigest = (type) => {
    const isChanged =
      userProfile?.emailDigest !== type ||
      userProfile.emailOptIn !== emailOptIn ||
      userProfile.privacy !== privacy.toLowerCase();
    setIsEdit(isChanged);
  };

  const updateEmailOptIn = (type) => {
    const isChanged =
      userProfile?.emailOptIn !== type ||
      userProfile.emailDigest !== emailDigest ||
      userProfile.privacy !== privacy.toLowerCase();
    setIsEdit(isChanged);
  };

  const onYes = async () => {
    try {
      const { user } = await getUserCredentials(login_detail?.email);
      setOpenModel(false);
      setIsEnabled((previous) => !previous);
      await biometricPermission(
        true,
        login_detail?.email,
        login_detail?.password,
        login_detail?.user_name,
        login_detail?.userUniqueId,
        deviceId,
        Platform?.OS,
        "",
        user?.biometric?.asked
      );
    } catch (error) {
      console.log("error are stored", error);
    }
  };

  const onDisable = async () => {
    setOpenDisableModel(false);
    await removeBiometric(login_detail?.email);
    setIsEnabled((previous) => !previous);
  };

  const onNo = (status: string) => {
    if (status == "enable") {
      setOpenDisableModel(false);
    } else {
      setOpenModel(false);
    }
  };

  return (
    <View testID="SettingsScreen" style={FULL}>
      {deleteLoader && (
        <View style={style.deleteLoaderView}>
          <Loader />
        </View>
      )}
      {openModel && (
        <BiometricEnableModal
          visible={openModel}
          onYes={() => onYes()}
          onNo={() => onNo("disable")}
          title={translate("BIOMETRIC.ENABLE_TITLE")}
          subTitle={translate("BIOMETRIC.ENABLE_MESSAGE")}
          yesText={translate("BIOMETRIC.ENABLE_BUTTON")}
          cancelText={translate("BIOMETRIC.CANCEL_BUTTON")}
        />
      )}
      {openDisableModel && (
        <BiometricEnableModal
          visible={openDisableModel}
          onYes={() => onDisable()}
          onNo={() => onNo("enable")}
          title={translate("BIOMETRIC.LOACKEDDISABLE")}
          subTitle={translate("BIOMETRIC.BIOMETRICDISABLE")}
          yesText={translate("BIOMETRIC.OK")}
          cancelText={translate("BIOMETRIC.CANCEL")}
        />
      )}
      {dialogPrivacy ? (
        <AlertBox
          visible={dialogPrivacy}
          title={I18n.t("Userprofile.ProfilePrivacy")}
          titleStyle={{ width: "100%", fontFamily: font.Poppins_Bold }}
          messageStyle={{
            fontFamily: font.Poppins_Italic,
            fontSize: fontSize(12),
            color: color.palette.blackSecondary,
          }}
          message={
            I18n.t("Userprofile.sharingUpdatesFriends") +
            "\n\n" +
            I18n.t("Userprofile.withWhomShare")
          }
          onTouchOutside={() => setDialogPrivacy(false)}
          onYes={() => {
            setPrivacy("Friends");
            setPrivacyType("friends");
            setDialogPrivacy(false);
            updatePrivacy("Friends");
          }}
          onNext={() => {
            setPrivacy("Everyone");
            setPrivacyType("public");
            setDialogPrivacy(false);
            updatePrivacy("Everyone");
          }}
          onCancel={() => {
            setPrivacy("All");
            setPrivacyType("users");
            setDialogPrivacy(false);
            updatePrivacy("All");
          }}
          next={true}
          onYesText={I18n.t("Userprofile.Friends")}
          onNextText={I18n.t("Userprofile.Everyone")}
          onCancelText={I18n.t("Userprofile.All")}
        />
      ) : null}

      {dialogEmailOptIn ? (
        <AlertBox
          visible={dialogEmailOptIn}
          title={I18n.t("Userprofile.EmailUpdates")}
          titleStyle={{ width: "100%", fontFamily: font.Poppins_Bold }}
          messageStyle={{
            fontFamily: font.Poppins_Italic,
            fontSize: fontSize(12),
            color: color.palette.blackSecondary,
          }}
          message={I18n.t("Userprofile.receivingDailyUpdateEmail")}
          onTouchOutside={() => setDialogEmailOptIn(false)}
          onYes={() => {
            setEmailOptIn("true");
            setEmailOptInType("Yes");
            setDialogEmailOptIn(false);
            updateEmailOptIn("true");
          }}
          onCancel={() => {
            setEmailOptIn("false");
            setEmailOptInType("No");
            setDialogEmailOptIn(false);
            updateEmailOptIn("false");
          }}
          next={false}
          onYesText={I18n.t("Userprofile.Yes")}
          onCancelText={I18n.t("Userprofile.No")}
          onNext={undefined}
          onNextText={""}
        />
      ) : null}

      {dialogEmailDigest ? (
        <AlertBox
          visible={dialogEmailDigest}
          title={I18n.t("Userprofile.EmailUpdates")}
          titleStyle={{ width: "100%", fontFamily: font.Poppins_Bold }}
          messageStyle={{
            fontFamily: font.Poppins_Italic,
            fontSize: fontSize(12),
            color: color.palette.blackSecondary,
          }}
          message={I18n.t("Userprofile.receiveImportantEmailsFromGroup")}
          onTouchOutside={() => setDialogEmailDigest(false)}
          onYes={() => {
            setDialogEmailDigest(false);
            setEmailDigest("true");
            setEmailDigestType("Yes");
            updateEmailDigest("true");
          }}
          onCancel={() => {
            setIsEdit(true);
            setDialogEmailDigest(false);
            setEmailDigest("false");
            setEmailDigestType("No");
            updateEmailDigest("false");
          }}
          next={false}
          onYesText={I18n.t("Userprofile.Yes")}
          onCancelText={I18n.t("Userprofile.No")}
          onNext={undefined}
          onNextText={""}
        />
      ) : null}

      <View style={HEADERTOP}>
        <Header
          title={I18n.t("AppDrawer.Settings")}
          icon={drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"}
          onPressLeft={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View style={{ ...BODY, ...style.subBody }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAwareScrollView
            style={{
              width: undefined,
              height: undefined,
              paddingBottom: 50,
              marginTop: 20,
              marginHorizontal: 14,
            }}
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps="handled"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <>
              <View style={ButtonWrapper1}>
                <Text style={ExtraTItle}>
                  {translate("profile.preferences")}
                </Text>
              </View>

              <View style={DetailsWrapper}>
                <View style={style.detailMainCal}>
                  <TouchableOpacity
                    style={detailCal}
                    onPress={() => {
                      setDialogPrivacy(true);
                    }}
                  >
                    <View style={style.fullFlex}>
                      <Text style={style.lblprivacy}>
                        {translate("profile.lblprivacy")}
                      </Text>
                    </View>

                    <View style={style.privacyCal}>
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={fontSize(20)}
                        color={color.palette.blackSecondary}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={style.prefVal}>{privacy}</Text>
                </View>

                <View style={style.detailMainCal}>
                  <TouchableOpacity
                    style={detailCal}
                    onPress={() => {
                      setDialogEmailOptIn(true);
                    }}
                  >
                    <View style={style.fullFlex}>
                      <Text style={style.lblprivacy}>
                        {translate("profile.lblemailOptIn")}
                      </Text>
                    </View>

                    <View style={style.privacyCal}>
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={fontSize(20)}
                        color={color.palette.blackSecondary}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={style.prefVal}>{emailOptInType}</Text>
                </View>
                <View style={style.detailMainCal}>
                  <TouchableOpacity
                    onPress={() => {
                      setDialogEmailDigest(true);
                    }}
                    style={detailCal}
                  >
                    <View style={style.fullFlex}>
                      <Text style={style.lblprivacy}>
                        {translate("profile.lblemailDigest")}
                      </Text>
                    </View>

                    <View style={style.privacyCal}>
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={fontSize(20)}
                        color={color.palette.blackSecondary}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={style.prefVal}>{emailDigestType}</Text>
                </View>
              </View>

              <View style={ButtonWrapper1}>
                <Text style={ExtraTItle}>{translate("profile.account")}</Text>
              </View>
              <View style={DetailsWrapper}>
                <View style={style.detailMainCal}>
                  <TouchableOpacity
                    style={detailCal}
                    onPress={() => {
                      navigation.navigate(MODULES.ChangePasswordScreen);
                    }}
                  >
                    <View style={style.fullFlex}>
                      <Text style={style.lblprivacy}>
                        {translate("profile.changePassword")}
                      </Text>
                    </View>

                    <View style={style.privacyCal}>
                      <MaterialIcons
                        name="navigate-next"
                        size={fontSize(20)}
                        color={color.palette.blackSecondary}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={style.detailMainCal}>
                  <TouchableOpacity
                    onPress={() => {
                      setAccountDelete(true);
                    }}
                    style={detailCal}
                  >
                    <View style={style.fullFlex}>
                      <Text style={style.lblprivacy}>
                        {translate("profile.deleteAccount")}
                      </Text>
                    </View>

                    <View style={style.privacyCal}>
                      <MaterialIcons
                        name="navigate-next"
                        size={fontSize(20)}
                        color={color.palette.blackSecondary}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {isBiometricEnable && (
                <View style={style.generalWrapper}>
                  <View style={style.fullFlex}>
                    <Text style={{ ...ExtraTItle, ...ExtraTItle1 }}>
                      {translate("AppDrawer.Security")}
                    </Text>
                  </View>

                  <View style={style.contents}>
                    <View style={style.fingerprintWrapper}>
                      <View style={style.iconWrapper}>
                        <Image
                          style={style.biometricImg}
                          tintColor={color.secondary}
                          source={assets.biometric}
                        />
                      </View>
                      <Text>{`${translate("AppDrawer.Biometric")} ${translate(
                        "AppDrawer.Authentication"
                      )}`}</Text>
                    </View>
                    <View>
                      <Switch
                        value={isEnabled}
                        trackColor={{
                          false: color.trackColor,
                          true: color.secondary,
                        }}
                        thumbColor={
                          isEnabled ? color.secondary : color.thumbColor
                        }
                        onValueChange={toggleSwitch}
                      />
                    </View>
                  </View>
                </View>
              )}

              {accountDelete ? (
                <AlertBox
                  visible={accountDelete}
                  title={"Delete Account"}
                  message={"Are you sure you want to delete your account ?"}
                  onTouchOutside={() => setAccountDelete(false)}
                  onYes={() => {
                    deleteAccountApiCall();
                  }}
                  onCancel={() => setAccountDelete(false)}
                  onYesText={"Yes"}
                  onCancelText={"No"}
                />
              ) : null}
            </>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        {isEdit && (
          <View style={style.updateWrapper}>
            <Button
              tx={"Userprofile.updatePreferences"}
              style={signUpButtonContainer}
              isLoader={isLoader}
              disabled={isLoader}
              textStyle={BottonTitle}
              // onPress={handleSubmit}
              onPress={() => onRegisterUserApiService()}
            />
          </View>
        )}
      </View>
    </View>
  );
};
