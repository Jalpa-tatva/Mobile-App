import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Keyboard,
  Linking,
  BackHandler,
  StatusBar,
  Platform,
} from "react-native";

// import external libraries
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { useNavigation } from "@react-navigation/native";
import { Country } from "react-native-country-picker-modal";

// import custom function & component
import I18n from "@app/i18n/i18n";
import { assets, splashScreenAssets } from "../../../../assets/images/index";
import { Config } from "react-native-config";
import {
  notchSpace,
  showErrorMessage,
  showSuccessMessage,
} from "@app/utils/commonFunction";
import { registerUser } from "@app/services/api/auth";
import { translate } from "@app/i18n";
import { color, fontSize } from "@app/theme";
import { Text, Button, Input } from "@app/components";

// import custom styling & utils
import {
  FullContainer,
  CheckboxContainer,
  TitleContainer,
  TitleText,
  ButtonContainer,
  BottonTitle,
  LogoIcon,
  LogoIcon1,
  InputWrapper,
  LableText,
  BottomTextLeft,
  BottomTextRight,
  CountryText,
  CountryBody,
  CountryIcon,
  TopImageContainer1,
  styles,
} from "./style";
import ShowImage from "@app/components/FastImage/ShowImage";
import { SafeCountryPicker } from "@app/constants";
import { ElementIcon } from "@app/utils/icons/VectorIcons";
import styleConfig from "@app/theme/styleConfig";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";

const re = /(\d{3})(\d{3})(\d{4})/;

// Validation schema
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .label(translate("signUp.firstName"))
    .required(translate("signUpFormsValidation.firstName")),
  lastName: yup
    .string()
    .trim()
    .label(translate("signUp.lastName"))
    .required(translate("signUpFormsValidation.lastName")),
  email: yup
    .string()
    .label(translate("signUp.email"))
    .email(translate("signUpFormsValidation.notVaildEmailAddres"))
    .required(translate("signUpFormsValidation.emailAddress")),
  confirmEmail: yup
    .string()
    .label(translate("signUp.confirmemail"))
    .required(translate("signUpFormsValidation.confrimEmail"))
    .oneOf(
      [yup.ref("email"), null],
      translate("signUpFormsValidation.notMatchEmail")
    ),
  password: yup
    .string()
    .label(translate("signUp.password"))
    .required(translate("signUpFormsValidation.password"))
    .min(8, "Password is too short - it should be minimum 8 characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 characters,one uppercase,one lowercase,one number and one special case character"
    ),

  confirmPassword: yup
    .string()
    .label(translate("signUp.confirmPassword"))
    .required(translate("signUpFormsValidation.confrimPassword"))
    .oneOf(
      [yup.ref("password"), null],
      translate("signUpFormsValidation.notMatch")
    )
    .min(8, "Password is too short - it should be minimum 8 characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 characters,one uppercase,one lowercase,one number and one special case character"
    ),
  country: yup
    .string()
    .label(translate("signUp.country"))
    .required(I18n.t("signUpFormsValidation.country")),
  postalCode: yup
    .string()
    .trim()
    .label(translate("signUp.zipCode"))
    .required(translate("signUpFormsValidation.zipCode")),
  organization: yup.string().trim(),
  mobileno: yup
    .string()
    .trim()
    .label(translate("signUp.mobileno"))
    .required(translate("signUpFormsValidation.mobileno")),
});

export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  organization: string;
  country: string;
  mobileno: string;
  postalCode: string;
  city: string;
  state: string;
}

type browserRes = {
  type?: string;
  url?: string;
};

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [isCountryVisible, setisCountryVisible] = useState(false);
  const [country, setCountry] = useState<any>({});
  const [cityVisible, setCityVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>("United States");
  const [stateVisible, setStateVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [withCountryNameButton] = useState(false);
  const [withFlag] = useState(true);
  const [withEmoji] = useState(false);
  const [withFilter] = useState(true);
  const [withAlphaFilter] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisibleConf, setPasswordVisibleConf] = useState(true);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const confirmEmail = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const organization = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const mobileNo = useRef(null);
  const zipCode = useRef(null);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  const backAction = () => {
    navigation.goBack(null);
    return true;
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setSelectedCountry(country.name);
    setCountry(country);
    if (country.cca2 == "US") {
      setCityVisible(false);
      setStateVisible(false);
    } else {
      setCityVisible(true);
      setStateVisible(true);
    }
  };

  const initialValues: SignUpValues = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    organization: "",
    country: "United States",
    postalCode: "",
    mobileno: "",
    city: "",
    state: "",
  };

  const onPressSubmit = (userData: object) => {
    if (isAgree === true) {
      setLoading(true);
      onRegisterUserApiService(userData);
    } else {
      Snackbar.show({
        text: translate("signUpFormsValidation.pleaseAgreeTerms"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.red,
        textColor: color.white,
        numberOfLines: 5,
      });
    }
  };

  const onRegisterUserApiService = (userData: any) => {
    setLoading(true);
    registerUser(userData)
      .then((response: any) => {
        if (response.status == 200) {
          if (response.data[0] && response.data[0]?.status.code == 0) {
            setLoading(false);

            showSuccessMessage(response.data[0]?.objectList[0]?.message);

            setTimeout(() => {
              navigation.goBack(null);
            }, 1000);
          } else {
            showErrorMessage(
              response.data[0]?.status?.errorText ??
                translate("signUp.apiError")
            );
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showErrorMessage(I18n.t("EmptyView.somethingWentWrong"));
        console.log("error:", error);
      });
  };

  const openTermsInappBrowser = async () => {
    const link = `${Config.BASE_URL}/terms-of-service.shtml`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(link).then((response: browserRes) => {
          if (response.type === "success" && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else {
        Linking.openURL(link);
      }
    } catch (error) {
      showErrorMessage(error?.message);
    }
  };

  return (
    <View
      testID="SignUpScreen"
      style={[FullContainer, { paddingTop: notchSpace() }]}
    >
      <StatusBar backgroundColor={color.secondary} barStyle="light-content" />
      <RNKeyboardView
        keyboardVerticalOffset={
          styleConfig?.isIphone ? fontSize(10) : fontSize(46)
        }
      >
        <View style={TopImageContainer1}>
          <ShowImage
            imageStyle={{ ...LogoIcon, ...LogoIcon1 }}
            resizeMode="contain"
            source={splashScreenAssets.splashBottomImage}
          />
        </View>

        <View style={TitleContainer}>
          <Text tx="signIn.signUpToApp" style={TitleText} />
        </View>

        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values: any) => {
            Keyboard.dismiss();
            if (
              values.firstName &&
              values.lastName &&
              values.email &&
              values.password &&
              values.confirmPassword &&
              values.country &&
              values.mobileno &&
              values.postalCode
            ) {
              const userData = {
                ...values,
                country: country.name ? country.name : values.country,
                city: cityVisible ? values.city : "",
                state: stateVisible ? values.state : "",
              };
              onPressSubmit(userData);
            }
          }}
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
            <View style={styles.spaceBoth}>
              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.firstName}
                leftIcon={assets.user}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                validation={() => {
                  setFieldTouched("firstName");
                }}
                error={touched.firstName && errors.firstName}
                ref={firstName}
                onSubmitEditing={() => {
                  lastName.current.focus();
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder={translate("signUp.firstName")}
                label={translate("signUp.firstNameLbl")}
              />

              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.lastName}
                leftIcon={assets.user}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                validation={() => {
                  setFieldTouched("lastName");
                }}
                error={touched.lastName && errors.lastName}
                ref={lastName}
                onSubmitEditing={() => {
                  email.current.focus();
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder={translate("signUp.lastName")}
                label={translate("signUp.lastNameLbl")}
              />

              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.email}
                leftIcon={assets.userName}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                validation={() => {
                  setFieldTouched("email");
                }}
                error={touched.email && errors.email}
                ref={email}
                onSubmitEditing={() => {
                  confirmEmail.current.focus();
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder={translate("signUp.email")}
                label={translate("signUp.emailLbl")}
              />
              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.confirmEmail}
                leftIcon={assets.userName}
                onChangeText={handleChange("confirmEmail")}
                onBlur={handleBlur("confirmEmail")}
                validation={() => {
                  setFieldTouched("confirmEmail");
                }}
                error={touched.confirmEmail && errors.confirmEmail}
                ref={confirmEmail}
                onSubmitEditing={() => {
                  password.current.focus();
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder={translate("signUp.confirmemail")}
                label={translate("signUp.emailConfrimLbl")}
              />

              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.password}
                leftIcon={assets.lock}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                validation={() => {
                  setFieldTouched("password");
                }}
                error={touched.password && errors.password}
                ref={password}
                onSubmitEditing={() => {
                  confirmPassword.current.focus();
                }}
                secureTextEntry={passwordVisible}
                passwordVisible={passwordVisible}
                onPressPassword={() => setPasswordVisible(!passwordVisible)}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder={translate("signUp.enterPassword")}
                label={translate("signUp.passwordLbl")}
              />

              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.confirmPassword}
                leftIcon={assets.lock}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                validation={() => {
                  setFieldTouched("confirmPassword");
                }}
                error={touched.confirmPassword && errors.confirmPassword}
                ref={confirmPassword}
                onSubmitEditing={() => {
                  organization.current.focus();
                }}
                secureTextEntry={passwordVisibleConf}
                passwordVisible={passwordVisibleConf}
                onPressPassword={() =>
                  setPasswordVisibleConf(!passwordVisibleConf)
                }
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder={translate("signUp.confirmPassword")}
                label={translate("signUp.confirmPasswordLbl")}
              />

              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.organization}
                leftIcon={assets.organization}
                onChangeText={handleChange("organization")}
                onBlur={handleBlur("organization")}
                validation={() => {
                  setFieldTouched("organization");
                }}
                error={touched.organization && errors.organization}
                ref={organization}
                onSubmitEditing={() => {
                  if (cityVisible) {
                    city.current.focus();
                  } else {
                    mobileNo.current.focus();
                  }
                }}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder={translate(
                  "signUpFormsValidation.organizationName"
                )}
                label={translate("signUp.organizationLbl")}
              />

              <View style={styles.spaceETop}>
                <Text style={{ ...LableText, ...styles.forthBottom }}>
                  {translate("signUp.countryLbl")}
                </Text>
                <View style={CountryBody}>
                  <ShowImage
                    source={assets.country}
                    imageStyle={[
                      CountryIcon,
                      { tintColor: color.palette.darkGray },
                    ]}
                  />
                  <TouchableOpacity
                    style={CountryText}
                    onPress={() => setisCountryVisible(true)}
                  >
                    <SafeCountryPicker
                      onSelect={(country: Country) => {
                        handleChange("country");
                        onSelect(country);
                      }}
                      {...{
                        countryCode,
                        withFilter,
                        withCountryNameButton,
                        withAlphaFilter,
                        onSelect,
                        withEmoji,
                        withFlag,
                      }}
                      withFlagButton={false}
                      visible={isCountryVisible}
                      onClose={() => {
                        setisCountryVisible(false);
                      }}
                    />
                    {selectedCountry && <Text>{selectedCountry}</Text>}
                  </TouchableOpacity>
                </View>
              </View>

              {cityVisible && (
                <Input
                  mandatory={false}
                  style={InputWrapper}
                  styleLable={LableText}
                  value={values.city}
                  leftIcon={assets.organization}
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  validation={() => {
                    setFieldTouched("city");
                  }}
                  error={touched.city && errors.city}
                  ref={city}
                  onSubmitEditing={() => {
                    state.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("signUp.enterCity")}
                  label={translate("signUp.cityLbl")}
                />
              )}

              {stateVisible && (
                <Input
                  mandatory={false}
                  style={InputWrapper}
                  styleLable={LableText}
                  value={values.state}
                  leftIcon={assets.organization}
                  onChangeText={handleChange("state")}
                  onBlur={handleBlur("state")}
                  validation={() => {
                    setFieldTouched("state");
                  }}
                  error={touched.state && errors.state}
                  ref={state}
                  onSubmitEditing={() => {
                    mobileNo.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("signUp.enterState")}
                  label={translate("signUp.stateLbl")}
                />
              )}

              <Input
                maxLength={14}
                style={InputWrapper}
                label={translate("signUp.mobileNoLbl")}
                value={values.mobileno.replace(
                  re,
                  (_, a, b, c) => `(${a}) ${b}-${c}`
                )}
                onChangeText={handleChange(
                  "mobileno".replace(re, (_, a, b, c) => `(${a}) ${b}-${c}`)
                )}
                onBlur={handleBlur("mobileno")}
                validation={() => {
                  setFieldTouched("mobileno");
                }}
                error={touched.mobileno && errors.mobileno}
                ref={mobileNo}
                onSubmitEditing={() => {
                  zipCode.current.focus();
                }}
                blurOnSubmit={false}
                returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                keyboardType="numeric"
                placeholder={translate("signUp.mobileno")}
              />

              <Input
                mandatory={false}
                style={InputWrapper}
                styleLable={LableText}
                value={values.postalCode}
                leftIcon={assets.code}
                onChangeText={handleChange("postalCode")}
                onBlur={handleBlur("postalCode")}
                validation={() => {
                  setFieldTouched("postalCode");
                }}
                error={touched.postalCode && errors.postalCode}
                ref={zipCode}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                blurOnSubmit={false}
                returnKeyType="done"
                placeholder={translate("signUp.zipCode")}
                label={translate("signUp.zipcodeLbl")}
              />

              <View style={CheckboxContainer}>
                <View style={styles.spaceRight}>
                  <ElementIcon
                    color={color.secondary}
                    name={isAgree ? "check-box" : "check-box-outline-blank"}
                    type="materialicons "
                    size={fontSize(22)}
                    onPress={() => {
                      setIsAgree(!isAgree);
                    }}
                  />
                </View>
                <Text
                  text={translate("signUp.agreeTerm")}
                  style={BottomTextLeft}
                />
                <Text
                  text={translate("signUp.termUse")}
                  onPress={() => {
                    openTermsInappBrowser();
                  }}
                  style={BottomTextRight}
                />
              </View>
              <Button
                tx={"signUp.signUp"}
                style={ButtonContainer}
                textStyle={BottonTitle}
                isLoader={loading}
                disabled={loading}
                onPress={() =>
                  isAgree
                    ? handleSubmit()
                    : Snackbar.show({
                        text: translate(
                          "signUpFormsValidation.pleaseAgreeTerms"
                        ),
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: color.red,
                        textColor: color.white,
                        numberOfLines: 5,
                      })
                }
              />
            </View>
          )}
        </Formik>
      </RNKeyboardView>
    </View>
  );
};
