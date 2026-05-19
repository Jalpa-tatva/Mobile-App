import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform,
} from "react-native";

// import external libraries
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AntDesign from "react-native-vector-icons/AntDesign";
import md5 from "md5";
import { Config } from "react-native-config";
import ImagePicker from "react-native-image-crop-picker";
import Entypo from "react-native-vector-icons/Entypo";
import uuid from "react-native-uuid";
import RNFetchBlob from "rn-fetch-blob";
import { useNavigation } from "@react-navigation/native";
import { Country } from "react-native-country-picker-modal";

// import custom ,service & components
import { Button, Text, Input } from "@app/components";
import { translate } from "@app/i18n";
import {
  getMyPicture,
  getMySettings,
  postMySettings,
} from "@app/services/api/profile";
import I18n from "@app/i18n/i18n";
import { useRedux } from "@app/redux/hooks";
import { profileDetail } from "@app/redux/reducer/profileReducer";
import ShowImage from "@app/components/FastImage/ShowImage";
import { HeaderItem } from "../HeaderItem";
import { getUserDetail, SafeCountryPicker, SafeRBSheet } from "@app/constants";

// import theme, utils & styles
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import {
  FULL,
  HEADERTOP,
  BODY,
  DetailsWrapper,
  BottonTitle,
  signUpButtonContainer,
  COUNTRY_BODY,
  COUNTRY_BODY_TEXT,
  IsEditTextInputView,
  style,
  Image1Wrapper,
  profileImage,
  ButtonImage,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  TopWrapper,
  HEADER_WRAPPER,
} from "./editProfileStyle";
import { loginDetail } from "@app/redux/reducer/loginReducer";

const re = /(\d{3})(\d{3})(\d{4})/;

/**
 * ValidationSchema
 */
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .label(I18n.t("profile.lblfirstName"))
    .required(I18n.t("profile.reqFirstName")),
  lastName: yup
    .string()
    .label(I18n.t("profile.lbllastName"))
    .required(I18n.t("profile.reqLastName")),
  email: yup
    .string()
    .label(I18n.t("profile.lblemail"))
    .email(I18n.t("profile.notVaildEmailAddres"))
    .required(I18n.t("profile.reqEmailAddress")),
});

/**
 * EditProfileProps
 */
export interface EditProfileProps {
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

interface ImageFile {
  path?: string;
  uri?: string;
}

/**
 * EditProfile Component
 */
export const EditProfile: React.FC = () => {
  const navigation = useNavigation<any>();
  const { groups } = content;
  const { login_detail, dispatches, profile_detail } = useRedux([
    groups.loginDetail,
    groups.dispatch,
    groups.profileDetail,
  ]);
  let userUniqueId = login_detail.userUniqueId;

  const [image, setImage] = useState(null);
  const [isCountryVisible, setisCountryVisible] = useState(false);
  const [passwordReset] = useState(false);
  const [country, setCountry] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState(
    profile_detail?.country ? profile_detail.country : "South Africa"
  );

  const [isLoader, setIsLoader] = useState(false);
  const [imageFile, setImageFile] = useState<ImageFile>({});
  const [countryCode, setCountryCode] = useState("ZA");
  const [withCountryNameButton] = useState(false);
  const [withFlag] = useState(true);
  const [withEmoji] = useState(false);
  const [withFilter] = useState(true);
  const [withAlphaFilter] = useState(true);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [privacyType, setPrivacyType] = useState("");
  const refRBSheet = useRef(null);
  const [emailDigest, setEmailDigest] = useState(profile_detail.emailDigest);
  const [emailOptIn, setEmailOptIn] = useState(profile_detail.emailOptIn);
  const [defaultImage, setDefaultImage] = useState(login_detail.userImageUrl);
  const [isRemove, setIsRemove] = useState(false);
  const [editable, setEditable] = useState(false);
  const inputeFirstName = useRef(null);
  const inputeLastName = useRef(null);
  const mobileNo = useRef(null);
  const inputeEmail = useRef(null);
  const inputeDescription = useRef(null);
  const inputCity = useRef(null);
  const inputState = useRef(null);
  const inputZipcode = useRef(null);
  const formikRef = useRef(null);

  const openSelection = () => {
    refRBSheet.current.open();
  };

  const onRemove = () => {
    setImage([]);
    setIsRemove(false);
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setSelectedCountry(JSON.parse(JSON.stringify(country.name)));
    setCountry(country);
  };

  const initialValues = {
    firstName: profile_detail?.firstName ? profile_detail.firstName : "",
    lastName: profile_detail?.lastName ? profile_detail.lastName : "",
    email: login_detail?.email ? login_detail.email : "",
    mobileno: profile_detail?.mobileno != 0 ? profile_detail.mobileno : "",
    description: profile_detail?.description ? profile_detail.description : "",
    city: profile_detail?.city ? profile_detail.city : "",
    state: profile_detail?.state ? profile_detail.state : "",
    zipCode: profile_detail?.postalCode ? profile_detail.postalCode : "",
    country: profile_detail?.country ? profile_detail.country : "South Africa",
  };

  useEffect(() => {
    const { privacy, emailOptIn, emailDigest } = profile_detail;
    if (["friends", "public"].includes(privacy)) {
      setPrivacyType("members");
    } else if (privacy === "users") {
      setPrivacyType("users");
    }

    setEmailOptIn(emailOptIn);
    setEmailDigest(emailDigest);
  }, [profile_detail]);

  useEffect(() => {
    getUserData();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const getUserData = async () => {
    // const loginData: any = await getUserDetail();
    setLoginDetails({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };
  const backAction = () => {
    navigation.goBack(null);
    return true;
  };

  const settingAPIService = () => {
    getMySettings()
      .then(async (res) => {
        let newArray = res.data;

        let data = {
          firstName: newArray[0].objectList[0].firstName,
          lastName: newArray[0].objectList[0].lastName,
          mobileno: newArray[0].objectList[0].mobileno,
          city: newArray[0].objectList[0].city,
          state: newArray[0].objectList[0].state,
          country: newArray[0].objectList[0].country,
          postalCode: newArray[0].objectList[0].postalCode,
          description: newArray[0].objectList[0].description,
          privacy: newArray[0].objectList[0].privacy,
          emailOptIn: newArray[0].objectList[0].emailOptIn,
          emailDigest: newArray[0].objectList[0].emailDigest,
        };
        dispatches(profileDetail(data));

        getSettingAPIService();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getSettingAPIService = () => {
    getMySettings()
      .then(async (res) => {
        console.log("getSettings", JSON.stringify(res.data));
        let newArray = res.data;

        let data = {
          firstName: newArray[0].objectList[0].firstName,
          lastName: newArray[0].objectList[0].lastName,
          city: newArray[0].objectList[0].city,
          state: newArray[0].objectList[0].state,
          country: newArray[0].objectList[0].country,
          postalCode: newArray[0].objectList[0].postalCode,
          description: newArray[0].objectList[0].description,
          privacy: newArray[0].objectList[0].privacy,
          emailOptIn: newArray[0].objectList[0].emailOptIn,
          emailDigest: newArray[0].objectList[0].emailDigest,
        };

        dispatches(profileDetail(data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onRegisterUserApiService = async (userData: object) => {
    setIsLoader(true);
    await postMySettings(userData)
      .then((response: any) => {
        if (response.status == 200) {
          setIsLoader(false);

          if (response.data[0] && response.data[0]?.status.code == 0) {
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
            setEditable(false);
            settingAPIService();
          } else {
            console.log("Fail");
          }
        }
      })
      .catch((error) => {
        console.log("error:", error);
        setIsLoader(false);
      });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        setImageFile(image);
        refRBSheet.current.close();
        setIsRemove(true);
        let fileObject = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };

        setImage(fileObject);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };
  const pickSingle = () => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        console.log("received image", image);
        setImageFile(image);
        refRBSheet.current.close();

        setIsRemove(true);
        let fileObject = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        setImage(fileObject);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const uploadPhoto = () => {
    setIsLoader(true);
    const uri = imageFile.path.replace("file:///", "/");
    const path = imageFile.path ? imageFile.path : imageFile.uri;
    const extension = path.split(".").pop();
    const keyss = `${uuid.v4()}.${extension}`;

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = date + "/" + month + "/" + year;
    const ha1 = md5(
      `${loginDetails?.email}:${Config.REALM}:${loginDetails?.password}`
    );
    const ha2 = md5(`POST:` + "/api/profileImage?format=json");
    const responseAuth = md5(ha1 + ":" + currentDate + ":" + ha2);

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/profileImage?format=json`,
      {
        Accept: "application/json",
        "X-Concursive-Key": Config.AUTH_KEY,
        "X-Concursive-Platform": "android",
        "Content-Type": "multipart/form-data",
        Authorization: `Digest username="${loginDetails?.email}", REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/profileImage?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      [
        { name: "profile", data: userUniqueId },
        {
          name: "media",
          filename: keyss,
          type: image.mime,
          data: RNFetchBlob.wrap(uri),
        },
      ]
    )
      .then((res) => {
        console.log(
          "=======8989",
          res,
          `Digest username="${loginDetails?.email}", REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/profileImage?format=json", algorithm="MD5", response="${responseAuth}"`
        );

        setIsLoader(false);
        let tempObj = res?.data?.length > 0 ? JSON.parse(res?.data) : [];
        if (tempObj[0]?.status?.code === 0) {
          Snackbar.show({
            text: `Profile picture updated successfully`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });

          setIsRemove(false);
          setDefaultImage(imageFile.path);
          pictureAPIService();
        } else {
          Snackbar.show({
            text: `Something went wrong`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setIsRemove(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        setIsRemove(false);
        setIsLoader(false);
      });
  };

  const pictureAPIService = () => {
    getMyPicture(userUniqueId)
      .then(async (res) => {
        let newArray = res.data;

        const updateLoginData = {
          ...login_detail,
          userImageUrl: newArray[0].objectList[0].imageUrl,
        };
        dispatches(loginDetail(updateLoginData));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const checkLoading = () => {
    if (isLoader) {
      return "Uploading";
    } else {
      return "Upload";
    }
  };

  const onPressLeft = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const onPressRightIcon = () => {
    if (editable) {
      refRBSheet.current.close();
      formikRef.current?.resetForm();
      setSelectedCountry(profile_detail?.country || "South Africa");
      setCountry({});
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  return (
    <View testID="SettingsScreen" style={FULL}>
      <SafeRBSheet
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={style.topCommonSpace}>
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
                openCamera();
              }}
            >
              <AntDesign
                name="camera"
                size={25}
                color={color.palette.white}
                style={style.topPadLeft}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("Userprofile.Camera")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                pickSingle();
              }}
            >
              <Entypo
                name="folder-images"
                size={25}
                color={color.palette.white}
                style={style.topPadLeft}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("Userprofile.Gallery")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("Userprofile.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>
      <View style={HEADER_WRAPPER}>
        <View style={HEADERTOP}>
          <HeaderItem
            title={I18n.t("AppDrawer.editProfile")}
            operation="chevron-left"
            onPressLeft={onPressLeft}
            onPressRightIcon={onPressRightIcon}
            rightIcon={!isRemove ? (editable ? "cross" : "edit") : null}
            rightTitle={isRemove ? checkLoading() : null}
            onPressRightTitle={() => (isRemove ? uploadPhoto() : null)}
          />
        </View>
      </View>
      <View style={TopWrapper}>
        <View style={Image1Wrapper}>
          {isRemove ? (
            <ShowImage
              imageList={[{ uri: imageFile.path }]}
              imageStyle={profileImage}
              url={imageFile.path}
              resizeMode="cover"
            />
          ) : (
            <ShowImage
              imageList={[{ uri: defaultImage }]}
              imageStyle={profileImage}
              url={defaultImage}
              resizeMode="cover"
            />
          )}

          {!isRemove ? (
            <TouchableOpacity
              style={ButtonImage}
              onPress={() => openSelection()}
            >
              <Entypo
                name="camera"
                size={fontSize(25)}
                color={color.palette.black}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={ButtonImage} onPress={() => onRemove()}>
              <Entypo
                name="circle-with-cross"
                size={fontSize(25)}
                color={color.palette.black}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={BODY}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setisCountryVisible(false);
          }}
        >
          <KeyboardAwareScrollView
            style={style.keyboardScrollWrapper}
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps="handled"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              innerRef={formikRef}
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values: any) => {
                Keyboard.dismiss();
                if (values.firstName && values.lastName) {
                  const userData = {
                    ...values,
                    country: country.name ? country.name : values.country,
                    privacy: privacyType,
                    emailOptIn: emailOptIn,
                    emailDigest: emailDigest,
                    passwordReset: passwordReset === true,
                    postalCode: values?.zipCode,
                  };
                  userData["mobileno"] = userData["mobileno"].replace(
                    /[^A-Z0-9]/gi,
                    ""
                  );

                  onRegisterUserApiService(userData);
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
                <>
                  <View style={DetailsWrapper}>
                    <Input
                      label={translate("profile.lblfirstName")}
                      style={IsEditTextInputView}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      editable={editable}
                      styleLable={style.inputLbl}
                      mandatory={false}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      validation={() => {
                        setFieldTouched("firstName");
                      }}
                      error={touched.firstName && errors.firstName}
                      ref={inputeFirstName}
                      onSubmitEditing={() => {
                        inputeLastName.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder={translate("profile.firstName")}
                    />

                    <Input
                      label={translate("profile.lbllastName")}
                      value={values.lastName}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      editable={editable}
                      style={IsEditTextInputView}
                      styleLable={style.inputLbl}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      validation={() => {
                        setFieldTouched("lastName");
                      }}
                      onSubmitEditing={() => {
                        mobileNo.current.focus();
                      }}
                      error={touched.lastName && errors.lastName}
                      returnKeyType="next"
                      numberOfLines={10}
                      textAlignVertical={"top"}
                      ref={inputeLastName}
                      blurOnSubmit={false}
                      placeholder={translate("profile.lastName")}
                    />

                    <Input
                      label={translate("profile.lblemail")}
                      value={values.email}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      style={IsEditTextInputView}
                      styleLable={style.inputLbl}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      validation={() => {
                        setFieldTouched("email");
                      }}
                      onSubmitEditing={() => {
                        mobileNo.current.focus();
                      }}
                      error={touched.email && errors.email}
                      returnKeyType="next"
                      editable={false}
                      numberOfLines={10}
                      textAlignVertical={"top"}
                      ref={inputeEmail}
                      blurOnSubmit={false}
                      placeholder={translate("profile.email")}
                    />

                    <Input
                      maxLength={14}
                      style={IsEditTextInputView}
                      styleLable={style.inputLbl}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      editable={editable}
                      label={translate("signUp.mobileno")}
                      value={values.mobileno.replace(
                        re,
                        (_, a, b, c) => `(${a}) ${b}-${c}`
                      )}
                      onChangeText={handleChange(
                        "mobileno".replace(
                          re,
                          (_, a, b, c) => `(${a}) ${b}-${c}`
                        )
                      )}
                      onBlur={handleBlur("mobileno")}
                      validation={() => {
                        setFieldTouched("mobileno");
                      }}
                      error={touched.mobileno && errors.mobileno}
                      ref={mobileNo}
                      onSubmitEditing={() => {
                        inputeDescription.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                      keyboardType="numeric"
                      // returnKeyType="next"
                      placeholder={translate("signUp.mobileno")}
                    />

                    <Input
                      label={translate("profile.lblDescription")}
                      styleLable={style.inputLbl}
                      value={values.description}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      editable={editable}
                      style={IsEditTextInputView}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      validation={() => {
                        setFieldTouched("description");
                      }}
                      onSubmitEditing={() => {
                        inputCity.current.focus();
                      }}
                      returnKeyType="next"
                      numberOfLines={10}
                      textAlignVertical={"top"}
                      ref={inputeDescription}
                      blurOnSubmit={false}
                      placeholder={translate("profile.Description")}
                    />

                    <Input
                      label={translate("profile.lblcity")}
                      styleLable={style.inputLbl}
                      value={values.city}
                      style={IsEditTextInputView}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      editable={editable}
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      validation={() => {
                        setFieldTouched("city");
                      }}
                      onSubmitEditing={() => {
                        inputState.current.focus();
                      }}
                      error={touched.city && errors.city}
                      returnKeyType="next"
                      ref={inputCity}
                      blurOnSubmit={false}
                      placeholder={translate("signUp.enterCity")}
                    />

                    <Input
                      label={translate("profile.lblstate")}
                      styleLable={style.inputLbl}
                      value={values.state}
                      style={IsEditTextInputView}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      editable={editable}
                      onChangeText={handleChange("state")}
                      onBlur={handleBlur("state")}
                      validation={() => {
                        setFieldTouched("state");
                      }}
                      onSubmitEditing={() => {
                        inputZipcode.current.focus();
                      }}
                      error={touched.state && errors.state}
                      returnKeyType="next"
                      ref={inputState}
                      blurOnSubmit={false}
                      placeholder={translate("signUp.enterState")}
                    />

                    <Input
                      label={translate("profile.lblpostalCode")}
                      styleLable={style.inputLbl}
                      value={values.zipCode}
                      style={IsEditTextInputView}
                      onChangeText={handleChange("zipCode")}
                      onBlur={handleBlur("zipCode")}
                      styleWrapper={
                        editable ? style.styleWrapper : style.styleWrapperEnable
                      }
                      editable={editable}
                      validation={() => {
                        setFieldTouched("zipCode");
                      }}
                      error={touched.zipCode && errors.zipCode}
                      returnKeyType="done"
                      ref={inputZipcode}
                      blurOnSubmit={false}
                      placeholder={translate("signUp.zipCode")}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />

                    <View style={style.countryWrap}>
                      <View style={style.fullWidth}>
                        <Text style={style.inputLbl}>
                          {translate("profile.lblcountry")}
                        </Text>
                      </View>
                      <View
                        style={
                          editable
                            ? { ...COUNTRY_BODY, ...style.styleWrapper }
                            : { ...COUNTRY_BODY }
                        }
                      >
                        <TouchableOpacity
                          style={COUNTRY_BODY_TEXT}
                          onPress={() => setisCountryVisible(true)}
                          disabled={!editable}
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
                          {selectedCountry && (
                            <Text style={style.inputLbl}>
                              {selectedCountry}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={style.updateWrapper}>
                    <Button
                      tx={"Userprofile.Update"}
                      style={signUpButtonContainer}
                      isLoader={isLoader}
                      disabled={isLoader}
                      textStyle={BottonTitle}
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
