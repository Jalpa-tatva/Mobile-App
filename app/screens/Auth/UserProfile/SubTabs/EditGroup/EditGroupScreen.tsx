import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";

// import external libraries
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Country } from "react-native-country-picker-modal";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import md5 from "md5";
import { Config } from "react-native-config";
import uuid from "react-native-uuid";
import RNFetchBlob from "rn-fetch-blob";

// import custom function & component
import { editGroup } from "@app/services/api/groups";
import { translate } from "@app/i18n";
import { Button, Header, Text, Input } from "@app/components";
import { getUserDetail, SafeCountryPicker, SafeRBSheet } from "@app/constants";
import I18n from "@app/i18n/i18n";

// import custom styling & utils
import { color } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import {
  FULL,
  HEADERTOP,
  BODY,
  ButtonWrapper1,
  ExtraTItle,
  DetailsWrapper,
  BottonTitle,
  signUpButtonContainer,
  COUNTRY_BODY,
  COUNTRY_BODY_TEXT,
  IsEditTextInputView,
  ProfileWrapper,
  Image1Wrapper,
  ButtonImage,
  profileImage,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  ButtonImageSend,
  ProfileNameWrapperRaw,
  spaceTop,
  Style,
} from "./Style";
import ShowImage from "@app/components/FastImage/ShowImage";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";

/**
 * validationSchema
 */
const validationSchema = yup.object().shape({
  groupName: yup
    .string()
    .trim()
    .label(I18n.t("addGroup.groupName"))
    .required(I18n.t("addGroup.enterCareNamePlease")),
  description: yup
    .string()
    .trim()
    .label(I18n.t("addGroup.description"))
    .required(I18n.t("addGroup.enterDescriptionPlease")),
  zipCode: yup
    .string()
    .trim()
    .label(I18n.t("addOrganization.zipCode"))
    .required(I18n.t("addOrganization.enterZipCodePlease")),
});

/**
 * EditGroupsValues Props
 */
export interface EditGroupsValues {
  groupName: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  privacy: string;
}

interface ImageFileProps {
  path?: string;
  uri?: string;
}
const { groups } = content;
/**
 *  EditGroupScreen Component
 */
export const EditGroupScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const item = route.params.item;
  const { login_detail } = useRedux([groups.loginDetail]);

  let type = item.category == "careteams" ? "Care Team" : "Organization";
  const refRBSheet = useRef<RBSheet>(null);
  const [editMode, setEditMode] = useState(false);
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const [isRemove, setIsRemove] = useState(false);
  const [defaultImage, setDefaultImage] = useState(item.imageUrl);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState<ImageFileProps>({});
  const [isCountryVisible, setisCountryVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    item?.country ? item?.country.trim() : "South Africa"
  );
  const [isLoader, setIsLoader] = useState(false);
  const [isLoaderPhoto, setIsLoaderPhoto] = useState(false);
  const [catType, setCatType] = useState("");
  const [countryCode, setCountryCode] = useState("ZA");
  const [withCountryNameButton] = useState(false);
  const [withFlag] = useState(true);
  const [withEmoji] = useState(false);
  const [withFilter] = useState(true);
  const [withAlphaFilter] = useState(true);
  const inputGroupName = useRef(null);
  const inputDescription = useRef(null);
  const inputLocation = useRef(null);
  const inputCity = useRef(null);
  const inputState = useRef(null);
  const inputZipcode = useRef(null);

  useEffect(() => {
    getData();
    const focus = navigation.addListener("focus", () => {
      if (item.category == "careteams") {
        setCatType("Care Team");
      } else {
        setCatType("Org. ");
      }
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    });

    return focus;
  }, []);

  const getData = async () => {
    // const loginData: any = await getUserDetail();
    setLoginDetail({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };

  const backAction = () => {
    navigation.goBack(null);
    return true;
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setSelectedCountry(JSON.parse(JSON.stringify(country.name)));
  };

  const initialValues: EditGroupsValues = {
    groupName: item?.title ? item?.title.trim() : "",
    description: item?.description ? item?.description.trim() : "",
    address: item?.address ? item?.address.trim() : "",
    city: item?.city ? item?.city.trim() : "",
    state: item?.state ? item?.state.trim() : "",
    zipCode: item?.zipCode ? item?.zipCode.trim() : "",
    country: item?.country ? item?.country.trim() : "South Africa",
    privacy: "Groups",
  };

  const saveCategory = (val) => {
    if (val == "groups") {
      return "Groups";
    } else {
      return "careteams";
    }
  };

  const editGroupApiCall = async (values: any) => {
    const formData = new FormData();
    formData.append("id", item.id);
    formData.append("title", values.groupName);
    formData.append("uniqueId", item.uniqueId);
    formData.append("requestType", "update");
    formData.append("category", saveCategory(item.category));
    formData.append("subcategory", "Care");
    formData.append("summary", values.description);
    formData.append("addressLine1", values.address);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("postalCode", values.zipCode);
    formData.append("country", selectedCountry);

    formData.append(
      "privacy",
      item.category == "Groups" || "Careteams" ? "private" : "public"
    );


    setIsLoader(true);

    editGroup(formData)
      .then((res) => {
        console.log("editGroup", JSON.stringify(res));

        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: `${type} Edited Successfully`,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            route?.params?.setReload(true)
            navigation.goBack(null);
          } else {
            console.log("err=2=", JSON.stringify(res));
          }
        } else {
          console.log("err=1=");
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        console.log("err==", err);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
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

  const openCamera = () => {
    ImagePicker.openCamera({
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

  const openSelection = () => {
    refRBSheet.current.open();
  };

  const onRemove = () => {
    setImage([]);
    setIsRemove(false);
  };

  const checkIconType = () => {
    if (item.canEditInfo == "true") {
      return editMode ? "circle-with-cross" : "edit";
    } else {
      return null;
    }
  };

  const uploadPhoto = () => {
    setIsLoaderPhoto(true);

    const uri = imageFile.path.replace("file:///", "/");

    const path = imageFile.path ? imageFile.path : imageFile.uri;
    const extension = path.split(".").pop();
    const keyss = `${uuid.v4()}.${extension}`;

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = date + "/" + month + "/" + year;

    const ha1 = md5(
      `${loginDetail?.email}:${Config.REALM}:${loginDetail?.password}`
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
        Authorization: `Digest username="${loginDetail?.email}", REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/profileImage?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      [
        { name: "profile", data: item.uniqueId },
        {
          name: "media",
          filename: keyss,
          type: image.mime,
          data: RNFetchBlob.wrap(uri),
        },
      ]
    )
      .then((res) => {
        setIsLoaderPhoto(false);

        let tempObj = res?.data?.length > 0 ? JSON.parse(res?.data) : [];
        if (tempObj[0]?.status?.code === 0) {
          Snackbar.show({
            text: `${type} profile picture updated successfully`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setEditMode(false);
          setIsRemove(false);
          setDefaultImage(imageFile.path);
        } else {
          Snackbar.show({
            text: `Something went wrong`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setIsRemove(false);
          setEditMode(false);
        }
      })
      .catch((err) => {
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        setIsRemove(false);
        setEditMode(false);
        setIsLoaderPhoto(false);
      });
  };

  const navigateToBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const onPressRight = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const submitButton = (handleSubmit) => {
    return editMode ? (
      <Button
        tx={"Userprofile.submit"}
        style={signUpButtonContainer}
        isLoader={isLoader}
        disabled={isLoader}
        textStyle={BottonTitle}
        onPress={() => handleSubmit()}
      />
    ) : null;
  };

  return (
    <View testID="EditGroupScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={editMode ? `Edit ${catType}` : `${catType} Details`}
          icon="chevron-left"
          iconRight={checkIconType()}
          onPressRight={onPressRight}
          onPressLeft={navigateToBack}
        />
      </View>

      <SafeRBSheet
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={Style.spaceTopCommon}>
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
                style={Style.padLeftCommon}
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
                style={Style.padLeftCommon}
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

      <View style={BODY}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setisCountryVisible(false);
          }}
        >
          <KeyboardAwareScrollView
            style={commonStyle.KeyboardAwareScrollViewStyle}
            extraScrollHeight={50}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values: any) => {
                if (values.groupName && values.description) {
                  Keyboard.dismiss();
                  editGroupApiCall(values);
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
                  <View style={ProfileWrapper}>
                    <TopWrapperContent
                      isRemove={isRemove}
                      imageFile={imageFile}
                      defaultImage={defaultImage}
                      uploadPhoto={uploadPhoto}
                      editMode={editMode}
                      onRemove={onRemove}
                      openSelection={openSelection}
                    />

                    <Button
                      text={`Total Participants : ${item.memberCount}`}
                      style={ProfileNameWrapperRaw}
                      isLoader={isLoaderPhoto}
                      disabled={isLoaderPhoto}
                      textStyle={BottonTitle}
                    />
                  </View>

                  <View style={ButtonWrapper1}>
                    <Text style={ExtraTItle}>
                      {I18n.t("Userprofile.BasicInfo")}
                    </Text>
                  </View>

                  <View style={DetailsWrapper}>
                    <Input
                      label={
                        item.category == "careteams"
                          ? translate("addGroup.careNameLbl")
                          : translate("addGroup.groupNameLbl")
                      }
                      //label={translate('addGroup.groupNameLbl')}
                      mandatory={false}
                      value={values.groupName}
                      onChangeText={handleChange("groupName")}
                      onBlur={handleBlur("groupName")}
                      validation={() => {
                        setFieldTouched("groupName");
                      }}
                      style={
                        editMode
                          ? {
                              ...IsEditTextInputView,
                              ...commonStyle.textSubLabel,
                            }
                          : commonStyle.textSubLabel
                      }
                      styleLable={commonStyle.textLabel}
                      error={touched.groupName && errors.groupName}
                      ref={inputGroupName}
                      onSubmitEditing={() => {
                        inputDescription.current.focus();
                      }}
                      placeholderTextColor={
                        editMode
                          ? color.palette.blackSecondary
                          : color.palette.lightGrey
                      }
                      editable={editMode}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder={
                        item.category == "careteams"
                          ? translate("addGroup.careName")
                          : translate("addGroup.groupName")
                      }
                    />

                    <Input
                      label={translate("addGroup.descriptionLbl")}
                      value={values.description}
                      style={
                        editMode
                          ? {
                              ...IsEditTextInputView,
                              ...commonStyle.textSubLabel,
                            }
                          : commonStyle.textSubLabel
                      }
                      styleLable={commonStyle.textLabel}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      validation={() => {
                        setFieldTouched("description");
                      }}
                      onSubmitEditing={() => {
                        inputLocation.current.focus();
                      }}
                      error={touched.description && errors.description}
                      returnKeyType="next"
                      textarea
                      multiline
                      numberOfLines={10}
                      editable={editMode}
                      textAlignVertical={"top"}
                      ref={inputDescription}
                      blurOnSubmit={false}
                      placeholder={translate("addEvent.description")}
                      placeholderTextColor={
                        editMode
                          ? color.palette.blackSecondary
                          : color.palette.lightGrey
                      }
                    />
                  </View>

                  <View style={ButtonWrapper1}>
                    <Text style={ExtraTItle}>
                      {I18n.t("Userprofile.LocationInfo")}
                    </Text>
                  </View>

                  <View style={DetailsWrapper}>
                    <Input
                      label={translate("addEvent.addressLbl")}
                      mandatory={false}
                      style={
                        editMode
                          ? {
                              ...IsEditTextInputView,
                              ...commonStyle.textSubLabel,
                            }
                          : commonStyle.textSubLabel
                      }
                      styleLable={commonStyle.textLabel}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      validation={() => {
                        setFieldTouched("address");
                      }}
                      error={touched.address && errors.address}
                      ref={inputLocation}
                      editable={editMode}
                      onSubmitEditing={() => {
                        inputCity.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholderTextColor={
                        editMode
                          ? color.palette.blackSecondary
                          : color.palette.lightGrey
                      }
                      placeholder={translate("addEvent.address")}
                    />

                    <Input
                      label={translate("addEvent.cityLbl")}
                      value={values.city}
                      style={
                        editMode
                          ? {
                              ...IsEditTextInputView,
                              ...commonStyle.textSubLabel,
                            }
                          : commonStyle.textSubLabel
                      }
                      styleLable={commonStyle.textLabel}
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
                      editable={editMode}
                      blurOnSubmit={false}
                      placeholder={translate("addEvent.city")}
                      placeholderTextColor={
                        editMode
                          ? color.palette.blackSecondary
                          : color.palette.lightGrey
                      }
                    />

                    <Input
                      label={translate("addEvent.stateLbl")}
                      value={values.state}
                      style={
                        editMode
                          ? {
                              ...IsEditTextInputView,
                              ...commonStyle.textSubLabel,
                            }
                          : commonStyle.textSubLabel
                      }
                      styleLable={commonStyle.textLabel}
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
                      editable={editMode}
                      blurOnSubmit={false}
                      placeholder={translate("addEvent.state")}
                      placeholderTextColor={
                        editMode
                          ? color.palette.blackSecondary
                          : color.palette.lightGrey
                      }
                    />

                    <Input
                      label={translate("addEvent.zipCodeLbl")}
                      value={values.zipCode}
                      style={
                        editMode
                          ? {
                              ...IsEditTextInputView,
                              ...commonStyle.textSubLabel,
                            }
                          : commonStyle.textSubLabel
                      }
                      styleLable={commonStyle.textLabel}
                      onChangeText={handleChange("zipCode")}
                      onBlur={handleBlur("zipCode")}
                      validation={() => {
                        setFieldTouched("zipCode");
                      }}
                      error={touched.zipCode && errors.zipCode}
                      returnKeyType="next"
                      ref={inputZipcode}
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                      editable={editMode}
                      placeholder={translate("addEvent.zipCode")}
                      placeholderTextColor={
                        editMode
                          ? color.palette.blackSecondary
                          : color.palette.lightGrey
                      }
                    />

                    <View style={spaceTop}>
                      <Text style={commonStyle.textLabel}>
                        {translate("signUp.countryLbl")}
                      </Text>
                      <View
                        style={[
                          COUNTRY_BODY,
                          {
                            backgroundColor: editMode
                              ? color.palette.lightGrey
                              : null,
                          },
                        ]}
                      >
                        <TouchableOpacity
                          style={COUNTRY_BODY_TEXT}
                          disabled={!editMode}
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
                          {selectedCountry && (
                            <Text style={commonStyle.textSubLabel}>
                              {selectedCountry}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {submitButton(handleSubmit)}
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

type TopWrapperContentProps = {
  isRemove: boolean;
  imageFile: any;
  defaultImage: string;
  uploadPhoto: () => void;
  editMode: boolean;
  onRemove: () => void;
  openSelection: () => void;
};

export const TopWrapperContent = ({
  isRemove,
  imageFile,
  defaultImage,
  uploadPhoto,
  editMode,
  onRemove,
  openSelection,
}: TopWrapperContentProps) => {
  const selectionWrapper = () => {
    return editMode ? (
      <TouchableOpacity style={ButtonImage} onPress={openSelection}>
        <Entypo name="edit" size={32} color={color.palette.black} />
      </TouchableOpacity>
    ) : null;
  };

  return (
    <View style={Image1Wrapper}>
      {isRemove ? (
        <ShowImage
          url={imageFile?.path}
          imageList={[{ uri: imageFile?.path }]}
          imageStyle={profileImage}
          index={1}
        />
      ) : (
        <ShowImage
          url={defaultImage}
          imageList={[{ uri: defaultImage }]}
          imageStyle={profileImage}
          index={1}
        />
      )}

      {!isRemove ? (
        selectionWrapper()
      ) : (
        <>
          <TouchableOpacity style={ButtonImage} onPress={uploadPhoto}>
            <AntDesign
              name="checkcircle"
              size={32}
              color={color.palette.black}
            />
          </TouchableOpacity>

          <TouchableOpacity style={ButtonImageSend} onPress={onRemove}>
            <Entypo
              name="circle-with-cross"
              size={32}
              color={color.palette.black}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
