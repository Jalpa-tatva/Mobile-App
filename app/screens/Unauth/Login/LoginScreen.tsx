import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Linking,
  View,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  Image,
} from "react-native";

// External libraries
import InAppBrowser from "react-native-inappbrowser-reborn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Config } from "react-native-config";
import DeviceInfo from "react-native-device-info";
import * as Keychain from "react-native-keychain";
import ReactNativeBiometrics from "react-native-biometrics";

// Components & Context
import { Input, Button, Text } from "@app/components";
import ShowImage from "@app/components/FastImage/ShowImage";
import { useRedux } from "@app/redux/hooks";
import { loginDetail } from "@app/redux/reducer/loginReducer";
import {
  biometricPermission,
  checkBiometricAvailability,
  getAllBiometricUsers,
  getUserCredentials,
  saveCredentials,
  saveotherUserDetail,
  saveUserIdentifier,
  setBiometricPromptShown,
  verifyBiometric,
} from "@app/components/Biometric/biometric";
import { BiometricEnableModal } from "@app/components/AlertBox/BiometricAlert";

// Services & Utils
import { checkAuthorization, saveDeviceToken } from "@services/api/auth";
import { showErrorMessage } from "@utils/commonFunction";
import { translate } from "@app/i18n/translate";

// Constants
import I18n from "@app/i18n/i18n";
import { MODULES, STACK } from "../../../constants";
import { assets, splashScreenAssets } from "../../../../assets/images";

// Styles & Theme
import {
  FullContainer,
  ScreenContainer,
  TopImageContainer1,
  LogoIcon,
  LogoIcon1,
  TitleContainer,
  TitleText,
  TextInputStyle,
  styleLable,
  ButtonContainer,
  BottonTitle,
  ForgotContainer,
  ForgotText,
  BottomContainer,
  BottomTextLeft,
  BottomTextRight,
  styles,
} from "./LoginScreenStyle";
import { color, fontSize } from "@app/theme";
import styleConfig from "@app/theme/styleConfig";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import { loadString, saveString } from "@app/utils/storage";
import { KEYCHAIN_SERVICES } from "@app/components/Biometric/types";
import { requestUserPermission } from "@app/utils/pushnotifications_helper";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";

// Validation Schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label(I18n.t("signIn.email"))
    .email(I18n.t("signIn.enterEmailValid"))
    .required(I18n.t("signIn.emailRequired")),
  password: yup
    .string()
    .label(I18n.t("signIn.password"))
    .required(I18n.t("signIn.passwordRequired")),
});

// Types
interface LoginValues {
  email: string;
  password: string;
}

type browserRes = {
  type?: string;
  url?: string;
};

/**
 * LoginScreen Component
 */
const biometrics = new ReactNativeBiometrics();
export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { groups } = content;
  const { dispatches } = useRedux([groups.dispatch]);
  const insets = useSafeAreaInsets();
  const deviceId = DeviceInfo.getDeviceId();
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const [showBiometric, setShowBiometric] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [authStatus, setAuthStatus] = useState<any>("");
  const [isLoader, setIsLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [biometricCred, setBiometricCred] = useState<any>();
  const initialValues: LoginValues = { email: "", password: "" };
  const [lockoutSecondsLeft, setLockoutSecondsLeft] = useState(0);
  const [isBiometricLocked, setIsBiometricLocked] = useState(false);

  const saveNotch = () => {
    if (styleConfig.isAndroid) {
      return fontSize(10);
    } else if (insets.top >= 50) {
      return fontSize(35);
    } else {
      return fontSize(22);
    }
  };
  // When iOS locks biometrics (LAError -8), show a 30s countdown on the login screen.
  // After countdown completes, re-enable the "Login with biometric" option.
  useEffect(() => {
    if (!isBiometricLocked || lockoutSecondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setLockoutSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isBiometricLocked, lockoutSecondsLeft]);

  useEffect(() => {
    if (isBiometricLocked && lockoutSecondsLeft === 0) {
      setIsBiometricLocked(false);
      if (authStatus === "lock") setAuthStatus("");
    }
  }, [isBiometricLocked, lockoutSecondsLeft, authStatus]);

  const getUserCred = async () => {
    try {
      const creds = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICES.USER_IDENTIFIER,
      });
      if (!creds) return null;

      const last_user_login = JSON.parse(creds?.password);

      const res = await getUserCredentials(last_user_login?.email);
      console.log("res are saved", res?.user);
      if (res?.user?.biometric !== null) {
        setBiometricCred(res.user);
      }
    } catch (error) {
      console.log("error while storing biometric credentials", error);

      setBiometricCred({});
    }
  };

  // Lifecycle: Initial load and navigation listeners
  useEffect(() => {
    saveNotificationDetail();
    const unsubscribeBlur = navigation.addListener("blur", () => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    });

    return unsubscribeBlur;
  }, []);

  const saveNotificationDetail = () => {
    setTimeout(() => {
      requestUserPermission();
    }, 1000);
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getUserCred();
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    });

    return unsubscribeFocus;
  }, []);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  const loginByFingerprint = async () => {
    const lockKey = `lock-${biometricCred?.email}`;
    const lockStatus = await loadString(lockKey);

    setAuthStatus("");

    const verifyStatus = await verifyBiometric(
      biometricCred?.public_key,
      biometricCred?.user_id,
      biometricCred?.email
    );

    if (biometricCred?.biometric?.enabled && verifyStatus === true) {
      await loginApiCall(
        biometricCred?.email,
        biometricCred?.password,
        biometricCred?.biometric?.enabled
      );
      return;
    }

    if (verifyStatus === "cancel") {
      setAuthStatus("cancel");
      setShowModel(true);
      return;
    }

    if (verifyStatus === "lock" && !lockStatus) {
      setAuthStatus("lock");
      setIsBiometricLocked(true);
      setLockoutSecondsLeft(30);

      // save lock only once

      await saveString(lockKey, "true");

      return;
    }

    setAuthStatus("");
  };

  const saveBiometric = async (biometricData: any) => {
    const { available, email } = biometricData;
    const { user } = await getUserCredentials(email);

    if (!user?.email) {
      setBiometricCred(user);
    }

    const check = user?.biometric?.asked;

    if (available && !check) {
      await setBiometricPromptShown(email);
      setShowBiometric(true);
      setBiometricCred(biometricData);
    } else {
      navigation.replace(STACK.RootStack);
    }
  };

  // API Call
  const loginApiCall = async (
    email: string,
    password: string,
    biometric?: any
  ) => {
    !biometric && setIsLoader(true);

    try {
      const response = await checkAuthorization(email, password);
      const data = response?.data?.[0]?.objectList?.[0];
      const fcmtoken = await AsyncStorage.getItem("fcmtoken");
      if (data) {
        const userData = {
          email,
          password,
          isLogedIn: true,
          userUniqueId: data.userUniqueId,
          userImageUrl: data?.userImageUrl,
          user_name: data?.userName,
        };

        const loginUser = {
          email: email,
          password: password,
        };

        saveString("@LoginUser", JSON.stringify(loginUser));
        dispatches(loginDetail(userData));

        const tokenData = {
          uniqueId: data.userUniqueId,
          token: fcmtoken,
          type: "Login",
        };

        const tokenResponse = await saveDeviceToken(tokenData);
        if (tokenResponse?.data?.length > 0) {
          console.log("Token saved successfully");
        } else {
          console.log("Error saving token");
        }
        /// const alreadyAsked = await hasShownBiometricPrompt();
        /// const biometricCreds = await getCredentials();

        const { available } = await checkBiometricAvailability();
        console.log("AVAILABLE BIOMETRIC", available);

        const biometricData = {
          available: available,
          email: email,
          password: password,
          user_name: data.userName,
          user_id: data.userUniqueId,
          device_id: deviceId,
          platform: Platform.OS,
        };

        await saveUserIdentifier(biometricData);

        saveBiometric(biometricData);

        /// navigation.replace(STACK.RootStack);
      } else {
        showErrorMessage(I18n.t("signIn.loginError"));
      }
    } catch (error) {
      console.log("error --->", error);
      showErrorMessage(I18n.t("signIn.loginError"));
    } finally {
      setIsLoader(false);
    }
  };

  // Handlers
  const onFormSubmit = useCallback(async (values: LoginValues) => {
    if (values.email && values.password) {
      Keyboard.dismiss();
      loginApiCall(values.email.toLowerCase(), values.password, false);
    }
  }, []);

  const onSubmitEditing = useCallback((type?: string) => {
    if (type === "email") {
      passwordInput.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }, []);

  const updatePinStatus = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const navigateToSignup = useCallback(() => {
    navigation.navigate(MODULES.SignUp);
  }, []);

  const resetPassword = async (resetLink: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result: browserRes = await InAppBrowser.open(resetLink);
        if (result?.type === "success" && result?.url) {
          Linking.openURL(result.url);
        }
      } else {
        Linking.openURL(resetLink);
      }
    } catch (error: any) {
      showErrorMessage(error?.message);
    }
  };

  const onYes = async (active?: string) => {
    setAuthStatus("");
    setShowBiometric(false);
    const {
      available,
      email,
      password,
      user_name,
      user_id,
      device_id,
      platform,
    } = biometricCred;

    const status = await biometricPermission(
      available,
      email,
      password,
      user_name,
      user_id,
      device_id,
      platform,
      translate("BIOMETRIC.PROMPT_TITLE")
    );
    setAuthStatus(status);

    if (status === true) {
      navigation.replace(STACK.RootStack);
    } else if (status === "cancel") {
      setShowModel(true);
    } else if (status === "lock") {
      setIsBiometricLocked(true);
      setLockoutSecondsLeft(30);
    }
  };

  const onYesOther = async () => {
    setShowModel(false);

    if (authStatus === "cancel") {
      const permissionAsk = await biometrics.simplePrompt({
        promptMessage: translate("BIOMETRIC.AUTH_PROMPT"),
      });

      const {
        available,
        email,
        password,
        user_name,
        user_id,
        device_id,
        platform,
      } = biometricCred;

      if (permissionAsk) {
        setAuthStatus("");
        await saveCredentials(
          email,
          password,
          user_name,
          user_id,
          device_id,
          platform
        );
        if (
          biometricCred?.biometric?.enabled &&
          permissionAsk?.success === true
        ) {
          await loginApiCall(
            biometricCred?.email,
            biometricCred?.password,
            biometricCred?.biometric?.enabled
          );
          return;
        }
      } else {
        console.log("my permission ask", permissionAsk);
      }
    }
  };

  const onNoOther = async () => {
    setShowModel(false);
  };

  const onNo = async () => {
    const existingStore = await getAllBiometricUsers(biometricCred?.email);
    saveotherUserDetail(existingStore, biometricCred?.email, false);
    setShowBiometric(false);
    navigation.replace(STACK.RootStack);
  };

  const titleText =
    biometricCred?.biometric?.enabled && biometricCred?.user_name
      ? `${translate("signIn.hi")} ${biometricCred.user_name}, ${translate(
          "signIn.loginToApp"
        )}`
      : `${translate("signIn.loginToApp")}`;

  // Render
  return (
    <View
      testID="LoginScreen"
      style={[FullContainer, { paddingTop: saveNotch() }]}
    >
      <StatusBar backgroundColor={color.secondary} barStyle="light-content" />
      {showBiometric && (
        <BiometricEnableModal
          visible={showBiometric}
          onYes={() => onYes()}
          onNo={() => onNo()}
          title={translate("BIOMETRIC.ENABLE_TITLE")}
          subTitle={translate("BIOMETRIC.ENABLE_MESSAGE")}
          yesText={translate("BIOMETRIC.ENABLE_BUTTON")}
          cancelText={translate("BIOMETRIC.CANCEL_BUTTON")}
        />
      )}
      {showModel && (
        <BiometricEnableModal
          visible={showModel}
          onYes={() => onYesOther()}
          onNo={() => onNoOther()}
          title={translate("BIOMETRIC.BIOMETRICCANCELTITLE")}
          subTitle={translate("BIOMETRIC.BIOMETRICCANCEL")}
          yesText={translate("BIOMETRIC.OK")}
          // cancelText={translate("BIOMETRIC.CANCEL")}
        />
      )}
      <RNKeyboardView
        keyboardVerticalOffset={
          styleConfig?.isIphone ? fontSize(10) : fontSize(46)
        }
      >
        <View style={ScreenContainer}>
          <View style={TopImageContainer1}>
            <ShowImage
              imageStyle={{ ...LogoIcon, ...LogoIcon1 }}
              source={splashScreenAssets.splashBottomImage}
              resizeMode="contain"
            />
          </View>
          <View style={TitleContainer}>
            <Text style={TitleText}>{`${
              biometricCred?.biometric?.enabled && biometricCred?.user_name
                ? `${translate("signIn.hi")} ${
                    biometricCred?.user_name
                  }, ${translate("signIn.loginToApp")}`
                : `${translate("signIn.loginToApp")}`
            }`}</Text>
          </View>

          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onFormSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              touched,
              values,
              errors,
            }) => (
              <>
                <Input
                  dataTestId="email"
                  label={translate("signIn.EmailLbl")}
                  mandatory={false}
                  leftIcon={assets.user}
                  style={TextInputStyle}
                  styleLable={styleLable}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  validation={() => setFieldTouched("email")}
                  error={touched.email && errors.email}
                  ref={emailInput}
                  onSubmitEditing={() => onSubmitEditing("email")}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("signIn.enterEmailAddress")}
                />

                <Input
                  dataTestId="password"
                  label={translate("signIn.PasswordLbl")}
                  mandatory={false}
                  leftIcon={assets.lock}
                  style={TextInputStyle}
                  styleLable={styleLable}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  validation={() => setFieldTouched("password")}
                  error={touched.password && errors.password}
                  ref={passwordInput}
                  onSubmitEditing={() => onSubmitEditing()}
                  blurOnSubmit={false}
                  secureTextEntry={passwordVisible}
                  passwordVisible={passwordVisible}
                  onPressPassword={updatePinStatus}
                  returnKeyType="done"
                  placeholder={translate("signIn.enterPassword")}
                />
                {biometricCred?.biometric?.enabled && (
                  <>
                    {isBiometricLocked && lockoutSecondsLeft > 0 ? (
                      <View style={styles.loginWithBio}>
                        <Image
                          source={assets.biometric}
                          style={styles.biometricImg}
                          tintColor={color.secondary}
                        />

                        <Text style={styles.biometricLabel}>
                          {`Try again in ${lockoutSecondsLeft}s`}
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => loginByFingerprint()}
                        style={styles.loginWithBio}
                      >
                        <Image
                          source={assets.biometric}
                          style={styles.biometricImg}
                          tintColor={color.secondary}
                        />
                        <Text style={styles.biometricLabel}>
                          {translate("signIn.loginUsingFingerprint")}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}

                <Button
                  testID="login"
                  tx="signIn.login"
                  onPress={() => handleSubmit()}
                  isLoader={isLoader}
                  style={ButtonContainer}
                  textStyle={BottonTitle}
                />

                <TouchableOpacity
                  testID="forgotPassword"
                  style={ForgotContainer}
                  onPress={() =>
                    resetPassword(`${Config.BASE_URL}/login/reset?app=true`)
                  }
                >
                  <Text tx="signIn.forgotPassword" style={ForgotText} />
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>

        <View style={BottomContainer}>
          <Text tx="signIn.createAc" style={BottomTextLeft} />
          <TouchableOpacity onPress={navigateToSignup}>
            <Text tx="signIn.signUp" style={BottomTextRight} />
          </TouchableOpacity>
        </View>
        {/* {biometricCred?.biometric?.enabled && (
            <View style={Fingerprint_view}>
              <Icon
                name="fingerprint"
                size={fontSize(22)}
                color={color.placeholder}
              />
              {/* onPress={() => loginByFingerprint()} */}
        {/* <TouchableOpacity
                onPress={() => loginByFingerprint()}
                activeOpacity={0.5}
              >
                <Text style={FingerprintTxt}>
                  {translate("signIn.loginUsingFingerprint")}
                </Text>
              </TouchableOpacity>
            </View>
          )} */}
      </RNKeyboardView>
    </View>
  );
};
