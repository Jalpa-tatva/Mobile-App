import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Keyboard, TouchableOpacity, BackHandler } from "react-native";

// import external libraries
import {
  CommonActions,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import md5 from "md5";
import uuid from "react-native-uuid";
import { Config } from "react-native-config";

// import custom components & functions
import { Header, Button, Text, Input } from "@app/components";
import I18n from "@app/i18n/i18n";
import { getMineMemberList } from "@app/services/api/groups";
import { translate } from "@app/i18n";
import {
  getUserDetail,
  GROUP_DETAILS,
  MODULES,
  SafeRBSheet,
} from "@app/constants";

// import custom styling & utils
import {
  FULL,
  HEADERTOP,
  BODY,
  ButtonWrapper1,
  ExtraTItle,
  DetailsWrapper,
  BottonTitle,
  signUpButtonContainer,
  SeverityTitle,
  taskFolderLblWrapper,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  ButtonImage,
  EventImageStyle,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  EventImageWrapper,
  TitleLabel,
  LabelStyle,
  styleWrapper,
  Style,
} from "./styles";
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { AntDesign, Entypo } from "@app/utils/icons/VectorIcons";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";
import CommonDropdown from "@app/components/DropDown/CommonDropDown";
import ShowImage from "@app/components/FastImage/ShowImage";

/**
 * Declare validation schema
 */
const validationSchema = yup.object().shape({
  description: yup
    .string()
    .trim()
    .label(I18n.t("addIssue.description"))
    .required(I18n.t("addIssue.enterDescriptionPlease")),
});

/**
 *  AddIssues Props
 */
export interface AddIssuesValues {
  description: string;
  comment: string;
}

/**
 * Declare variable
 */
let uri = "";
let path = "";
let extension = "";
let keyUid = "";
let date = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
let currentDate = date + "/" + month + "/" + year;

let ha1 = "";
let ha2 = "";
let responseAuth = "";

/**
 * AddIssueScreen component
 */
export const AddIssueScreen: React.FC = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssig] = useState(false);
  const route = useRoute<any>();
  const { groups } = content;
  const { group_detail, login_detail } = useRedux([
    groups.groupsDetail,
    groups.loginDetail,
  ]);
  const item = route?.params?.item;
  const { uniqueId, title, imageUrl, canEditInfo } = group_detail;
  const fromEdit = route?.params?.fromEdit;
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });

  const refRBSheetImage = useRef(null);
  const [memberList, setMemberList] = useState([]);

  const [isLoader, setIsloader] = useState(false);
  const [category, setCategory] = useState(
    item?.severity ? item?.severity : "Normal"
  );
  const [assignUser, setAssignUser] = useState("Unset");
  const [assignUserId, setAssignUserId] = useState("");
  const [imageFile, setImageFile] = useState<any>({});
  const [image, setImage] = useState(null);
  const [isPhoto, setIsPhoto] = useState(
    item?.ticketImageUrl ? "Photo Set" : "Photo Unset"
  );

  const inputComment = useRef(null);
  const inputDescription = useRef(null);
  const formTypeInput = useRef(null);
  const formTypeInput1 = useRef(null);

  useEffect(() => {
    getData();
    myMemberListApiCall();
  }, []);

  const getData = async () => {
    // const loginData: any = await getUserDetail();
    setLoginDetail({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };

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
    navigation.goBack();
    return true;
  };

  const myMemberListApiCall = () => {
    setMemberList([]);
    getMineMemberList(uniqueId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setMemberList([...memberList, ...res.data[0].objectList]);
            if (item?.assignedToUniqueId) {
              setAssignUser(item?.assignedTo);
              setAssignUserId(item.assignedToUniqueId);
            }
          } else {
            setMemberList([]);
          }
        } else {
          setMemberList([]);
        }
      })
      .catch((err) => {
        setMemberList([]);
      });
  };

  const initialValues: AddIssuesValues = {
    description: item?.problem ? item.problem : "",
    comment: item?.comment ? item.comment : "",
  };

  const pickSingle = () => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        console.log("receivedImage", image);
        setImageFile(image);
        refRBSheetImage.current.close();

        let fileObject = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };

        setImage(fileObject);
        setIsPhoto("Photo Set");
      })
      .catch((e) => {
        console.log(e);
        refRBSheetImage.current.close();

        Snackbar.show({
          text: e.message ? e.message : e,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const openCamera = () => {
    console.log("Camera");
    ImagePicker.openCamera({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        console.log("received image", image);
        setImageFile(image);
        refRBSheetImage.current.close();
        let fileObject = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };

        setImage(fileObject);
        setIsPhoto("Photo Set");
      })
      .catch((e) => {
        console.log(e);
        refRBSheetImage.current.close();

        Snackbar.show({
          text: e.message ? e.message : e,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const addIssueApiCall = (values) => {
    setIsloader(true);

    if (imageFile?.path) {
      uri = imageFile.path.replace("file:///", "/");
      path = imageFile.path ? imageFile.path : imageFile.uri;
      extension = path.split(".").pop();
      keyUid = `${uuid.v4()}.${extension}`;
    }

    ha1 = md5(`${loginDetail?.email}:${Config.REALM}:${loginDetail?.password}`);
    ha2 = md5(`POST:` + "/api/issue?format=json");
    responseAuth = md5(ha1 + ":" + currentDate + ":" + ha2);

    let WithImage = [
      { name: "problem", data: values.description },
      { name: "severity", data: category },
      { name: "assignedToUniqueId", data: assignUserId },
      { name: "profile", data: uniqueId },
      { name: "comment", data: values.comment },
    ];

    if (imageFile?.path) {
      let temp = {
        name: "media",
        filename: keyUid,
        type: image.mime,
        data: RNFetchBlob.wrap(uri),
      };

      WithImage.push(temp);
    }

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/issue?format=json`,
      {
        Accept: "application/json",
        "X-Concursive-Key": Config.AUTH_KEY,
        "X-Concursive-Platform": "android",
        "Content-Type": "multipart/form-data",
        Authorization: `Digest username="${loginDetail?.email}", Config.REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/issue?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      WithImage
    )
      .then((res) => {
        setIsloader(false);
        console.log("isLoader22", isLoader);

        console.log("ResPhotadd", JSON.stringify(res.data));
        let tempObj = JSON.parse(res.data);
        if (tempObj[0].status.code === 0) {
          Snackbar.show({
            text: I18n.t("addIssue.IssueSuccessfully"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });

          navigation.dispatch({
            ...CommonActions.reset({
              index: 2,

              routes: [
                {
                  name: MODULES.GroupDetailsScreen,
                  params: {
                    imageUrl: imageUrl,
                    title: title,
                    uniqueId: uniqueId,
                    canEditInfo: canEditInfo,
                    fromss: GROUP_DETAILS.Issues,
                    issueTabs: GROUP_DETAILS.OpenIssue,
                  },
                },
              ],
            }),
          });
        } else {
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setIsloader(false);
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
        setIsloader(false);
      });
  };
  const updateIssueApiCall = (values) => {
    setIsloader(true);
    if (imageFile?.path) {
      uri = imageFile.path.replace("file:///", "/");
      path = imageFile.path ? imageFile.path : imageFile.uri;
      extension = path.split(".").pop();
      keyUid = `${uuid.v4()}.${extension}`;
    }

    ha1 = md5(`${loginDetail?.email}:${Config.REALM}:${loginDetail?.password}`);
    ha2 = md5(`POST:` + "/api/issue?format=json");
    responseAuth = md5(ha1 + ":" + currentDate + ":" + ha2);

    let WithImage = [
      { name: "problem", data: values.description },
      { name: "issueId", data: item.id },

      { name: "severity", data: category },
      { name: "assignedToUniqueId", data: assignUserId },
      { name: "profile", data: uniqueId },
      { name: "comment", data: values.comment },
    ];

    if (imageFile?.path) {
      let temp = {
        name: "media",
        filename: keyUid,
        type: image.mime,
        data: RNFetchBlob.wrap(uri),
      };

      WithImage.push(temp);
    }

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/issue?format=json`,
      {
        Accept: "application/json",
        "X-Concursive-Key": Config.AUTH_KEY,
        "X-Concursive-Platform": "android",
        "Content-Type": "multipart/form-data",
        Authorization: `Digest username="${loginDetail?.email}", Config.REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/issue?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      WithImage
    )
      .then((res) => {
        console.log("ResPhotadd", JSON.stringify(res.data));
        let tempObj = JSON.parse(res.data);
        if (tempObj[0].status.code === 0) {
          setIsloader(false);
          Snackbar.show({
            text: I18n.t("addIssue.IssueUpdated"),
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
                    imageUrl: imageUrl,
                    title: title,
                    uniqueId: uniqueId,
                    canEditInfo: canEditInfo,
                    fromss: GROUP_DETAILS.Issues,
                    issueTabs: GROUP_DETAILS.OpenIssue,
                  },
                },
              ],
            }),
          });
        } else {
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setIsloader(false);
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
        setIsloader(false);

        //showErrorMessage(I18n.t('apiError'));
      });
  };
  const loadSetPhoto = (): React.JSX.Element | null => {
    if (!imageFile.path) {
      if (item?.ticketImageUrl) {
        return (
          <View style={EventImageWrapper}>
            <ShowImage url={item.ticketImageUrl} imageStyle={EventImageStyle} />
          </View>
        );
      }
    } else {
      return (
        <View style={EventImageWrapper}>
          <ShowImage url={imageFile.path} imageStyle={EventImageStyle} />

          <TouchableOpacity style={ButtonImage}>
            <Entypo
              onPress={() => {
                setImageFile({});
                setIsPhoto("Photo Unset");
              }}
              name="circle-with-cross"
              size={32}
              style={{
                marginHorizontal: 10,
                backgroundColor: color.palette.black,
                borderRadius: 10,
              }}
              color={color.palette.white}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const onPressLeft = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View testID="AddIssueScreen" style={FULL}>
      <SafeRBSheet
        ref={refRBSheetImage}
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
                refRBSheetImage.current.close();
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
                style={{ paddingLeft: 30 }}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("groupDetails.Camera")}
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
                style={{ paddingLeft: 30 }}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("groupDetails.Gallery")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => refRBSheetImage.current.close()}
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
          title={
            !fromEdit
              ? I18n.t("addIssue.AddIssue")
              : I18n.t("addIssue.EditIssue")
          }
          icon="chevron-left"
          onPressLeft={onPressLeft}
        />
      </View>

      <View style={BODY}>
        <RNKeyboardView
          containerStyle={Style.root}
          keyboardVerticalOffset={fontSize(50)}
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values: any) => {
              if (values.description) {
                Keyboard.dismiss();
                // formTypeInput.current.close();
                // formTypeInput1.current.close();
                console.log("enter add issue", values, fromEdit);

                if (!fromEdit) {
                  setIsloader(true);
                  addIssueApiCall(values);
                } else {
                  updateIssueApiCall(values);
                }
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
                <View style={ButtonWrapper1}>
                  <Text style={ExtraTItle}>
                    {I18n.t("Userprofile.BasicInfo")}
                  </Text>
                </View>

                <View style={DetailsWrapper}>
                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addIssue.descriptionLbl")}
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    validation={() => {
                      setFieldTouched("description");
                    }}
                    onSubmitEditing={() => {
                      inputComment.current.focus();
                    }}
                    error={touched.description && errors.description}
                    returnKeyType="next"
                    textarea
                    multiline
                    numberOfLines={10}
                    textAlignVertical={"top"}
                    ref={inputDescription}
                    blurOnSubmit={false}
                    placeholder={translate("addIssue.description")}
                  />

                  <Text style={{ ...SeverityTitle, ...Style.spaceTop }}>
                    {translate("addIssue.SeverityType")}
                  </Text>

                  <CommonDropdown
                    open={open}
                    setOpen={setOpen}
                    value={category}
                    setValue={setCategory}
                    items={[
                      { label: "Normal", value: "Normal" },
                      { label: "Important", value: "Important" },
                      { label: "Critical", value: "Critical" },
                    ]}
                    formTypeInput={formTypeInput}
                    containerStyle={Style.fullWidth}
                    onChangeItem={(item) => {
                      setCategory(item.value);
                    }}
                    labelStyle={Style.severityItemStyle}
                    dropdownStyle={{
                      ...commonStyle.DropDownPickerStyle,
                      ...Style.dropDownStyle1,
                    }}
                    dropDownContainerStyle={{
                      ...Style.fullWidth,
                      ...Style.containerBorder,
                    }}
                    zIndex={999}
                  />
                  {!item?.ticketImageUrl ? (
                    <View
                      style={{ ...taskFolderLblWrapper, ...Style.spaceTop }}
                    >
                      <Text style={SeverityTitle}>
                        {translate("addIssue.AddPhoto")}
                      </Text>

                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => refRBSheetImage.current.open()}
                        style={Style.addPhoto}
                      >
                        <Text style={Style.listLabel}>{isPhoto}</Text>
                      </TouchableOpacity>

                      {loadSetPhoto()}
                    </View>
                  ) : null}

                  <Text style={{ ...SeverityTitle, ...Style.spaceTop }}>
                    {translate("addTask.AssignTo")}
                  </Text>
                  <CommonDropdown
                    open={openAssign}
                    setOpen={setOpenAssig}
                    value={assignUser}
                    setValue={setAssignUser}
                    items={[
                      ...new Map(
                        memberList.map((item) => [item.name, item])
                      ).values(),
                    ].map((item) => ({
                      label: item.name,
                      value: item.name,
                      assignId: item.uniqueId,
                    }))}
                    placeholder={translate("addTask.SelectMemberToAssignTask")}
                    formTypeInput={formTypeInput1}
                    containerStyle={Style.fullWidth}
                    onChangeItem={(item: any) => {
                      setAssignUser(item.value);
                      setAssignUserId(item.assignId);
                    }}
                    labelStyle={Style.severityItemStyle}
                    dropdownStyle={{
                      ...commonStyle.DropDownPickerStyle,
                      ...Style.dropDownStyle2,
                    }}
                    dropDownContainerStyle={{
                      ...Style.fullWidth,
                      ...Style.containerBorder,
                    }}
                    zIndex={99}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addIssue.commentLbl")}
                    value={values.comment}
                    onChangeText={handleChange("comment")}
                    onBlur={handleBlur("comment")}
                    validation={() => {
                      setFieldTouched("comment");
                    }}
                    error={touched.comment && errors.comment}
                    returnKeyType="next"
                    textarea
                    multiline
                    numberOfLines={10}
                    textAlignVertical={"top"}
                    ref={inputComment}
                    blurOnSubmit={false}
                    placeholder={translate("addIssue.comment")}
                  />
                </View>

                <Button
                  tx={!fromEdit ? "Userprofile.submit" : "Userprofile.Update"}
                  style={signUpButtonContainer}
                  isLoader={isLoader}
                  disabled={isLoader}
                  textStyle={BottonTitle}
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
        </RNKeyboardView>
      </View>
    </View>
  );
};
