import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";

// import external libraries
import { RouteProp, useRoute, useIsFocused } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNFetchBlob from "rn-fetch-blob";
import md5 from "md5";
import uuid from "react-native-uuid";
import I18n from "i18n-js";
import ImagePicker from "react-native-image-crop-picker";
import Snackbar from "react-native-snackbar";
import InAppBrowser from "react-native-inappbrowser-reborn";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import custom function
import { Text, Button } from "@components/index";
import { HeaderItem } from "./HeaderItem";
import {
  getMyAlbumList,
  getMyGroupDetail,
  postUpdateStatus,
} from "@app/services/api/careTeam";
import { groupTab } from "../../../../../assets/images";
import {
  GROUP_DETAILS,
  MODULES,
  SafeOverlay,
  SafeRBSheet,
  STACK,
  TABS,
  useRBSheetRef,
} from "@app/constants";
import { Config } from "react-native-config";

// import custom styling & utils
import {
  FULL,
  HEADERTOP,
  BODY,
  overlay,
  backdropStyle,
  MainOverLayContainer,
  OverLayRowContainer,
  OverLayImageContainer,
  OverLayImage,
  OverLayTitleContainer,
  OverTitle,
  OverLayText,
  OverLayRowContainer1,
  OverLayInputContainer,
  TagContainer,
  OverLayButtonText,
  OverLayTopButtonContainerCencel,
  OverLayTopButtonText,
  OverLayButtonContainerCencel,
  OverLayButtonContainer1,
  loginButtonContainer,
  BottonTitle,
  TextInputs,
  SeverityTitle,
  GroupDetailsHead,
  GroupDetailsHeadTouch,
  GroupDetailsHeadText,
  GroupDetailsHeadTextMain,
  LOADER,
} from "./styles";
import {
  EventImageStyle,
  SheetWrapper,
  WrapperContainer,
  AlbumWrapper,
  ButtonSheetTitle,
  styles,
} from "./dialogStyle";
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";

// import render screen

import { getMyDocument } from "@app/services/api/groups";
import { showErrorMessage } from "@app/utils/commonFunction";
import ShowImage from "@app/components/FastImage/ShowImage";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@app/utils/icons/VectorIcons";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";
import { memberDetail } from "@app/redux/reducer/MemberReducer";
import useAppNavigation, {
  RootStackParamList,
} from "@app/navigation/navigation";
import { method } from "@app/services/api/Method";
import { points } from "@app/utils/appReport/ReportPoint";
import { trackApiEvent } from "@app/utils/appReport/ActivityReport";
import CommonDropdown from "@app/components/DropDown/CommonDropDown";
import {
  GROUP_DETAILS_HEADER_SCREEN_MAP,
  GROUP_DETAILS_SCREEN_MAP,
  menuConfig,
} from "@app/utils/NavigationConfigJson";

interface RBSheetAlbum {
  refRBSheetAlbum?: any;
  albumList?: Array<{}>;
  onSheetAction?: () => void;
  onCheckAccess?: Function;
  openCamera?: Function;
  pickSingle?: Function;
}

interface OverlayParams {
  imageUrl?: string;
  title?: string;
  imageFile?: Record<string, any>;
  formTypeInput?: unknown;
  assignUser?: string;
  albumList?: Array<Record<string, any>>;
  onDropDownHandleItem?: (item: any) => void;
  request?: string;
  handleText?: (text: string) => void;
  onKeyboardDismiss?: () => void;
  isLoader?: boolean;
  availNotification?: boolean;
  saveAlbumDetail?: () => void;
  onCencel?: () => void;
  actionOverlayPost?: (value: boolean | string) => void;
  onActionAvailNotify?: () => void;
  onShareDetail?: () => void;
}
interface OverlayPost {
  isVisible?: boolean;
  onBackdropPress?: Function;
  touchableHandle?: Function;
  overlayParams?: OverlayParams;
}

interface RenderProps {
  type?: string;
  onAction?: Function;
  document?: string;
  title?: string;
  source?: any;
}

const RenderRBSheet = memo((props: RBSheetAlbum) => {
  const { refRBSheetAlbum, onSheetAction, albumList, onCheckAccess } = props;

  const renderRollRaw = (item, index) => {
    const storeData = () => {
      albumName = item.title;
      albumId = item.albumId;
      refRBSheetAlbum.current.close();
      onCheckAccess();
    };

    return (
      <TouchableOpacity style={WrapperContainer} onPress={storeData}>
        <ShowImage
          url={item.imageUrl}
          imageStyle={AlbumWrapper}
          resizeMode="contain"
        />
        <Text style={[ButtonSheetTitle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeRBSheet
      ref={refRBSheetAlbum}
      openDuration={250}
      closeOnDragDown={true}
      customStyles={{
        container: commonStyle.mainSheetContainer,
      }}
    >
      <View style={styles.viewTopSpace}>
        <View style={commonStyle.subSheetContainer}>
          <Entypo
            name="circle-with-cross"
            size={25}
            onPress={onSheetAction}
            color={color.palette.black}
          />
        </View>
        <View style={OverLayTopButtonContainerCencel}>
          <Text style={OverLayTopButtonText}>
            {I18n.t("groupDetails.SelectAlbum")}
          </Text>
        </View>
        <View style={SheetWrapper}>
          <FlatList
            data={albumList}
            contentContainerStyle={{ alignItems: "center" }}
            scrollEnabled={false}
            renderItem={({ item, index }) => renderRollRaw(item, index)}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity
            onPress={onSheetAction}
            style={OverLayButtonContainerCencel}
          >
            <Text style={OverLayButtonText}>
              {I18n.t("groupDetails.Cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeRBSheet>
  );
});

const RenderRBSheetImage = memo((props: RBSheetAlbum) => {
  const { refRBSheetAlbum, onSheetAction, openCamera, pickSingle } = props;

  return (
    <SafeRBSheet
      ref={refRBSheetAlbum}
      openDuration={250}
      closeOnDragDown={true}
      customStyles={{
        container: commonStyle.mainSheetContainer,
      }}
    >
      <View style={styles.spaceTopAdd}>
        <View style={commonStyle.subSheetContainer}>
          <Entypo
            name="circle-with-cross"
            size={25}
            onPress={() => onSheetAction()}
            color={color.palette.blackSecondary}
          />
        </View>

        <View style={SheetWrapper}>
          <TouchableOpacity
            style={WrapperContainer}
            onPress={() => openCamera()}
          >
            <AntDesign
              name="camera"
              size={25}
              color={color.palette.white}
              style={styles.spaceLeftAdd}
            />

            <Text style={ButtonSheetTitle}>
              {I18n.t("groupDetails.Camera")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={WrapperContainer}
            onPress={() => pickSingle()}
          >
            <Entypo
              name="folder-images"
              size={25}
              color={color.palette.white}
              style={styles.spaceLeftAdd}
            />

            <Text style={ButtonSheetTitle}>
              {I18n.t("groupDetails.Gallery")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSheetAction()}
            style={OverLayButtonContainerCencel}
          >
            <Text style={OverLayButtonText}>
              {I18n.t("groupDetails.Cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeRBSheet>
  );
});

const RenderOverlayPost = memo((props: OverlayPost) => {
  const { isVisible, onBackdropPress, touchableHandle } = props;
  const {
    imageUrl,
    title,
    imageFile,
    formTypeInput,
    assignUser,
    albumList,
    onDropDownHandleItem,
    request,
    handleText,
    onKeyboardDismiss,
    isLoader,
    saveAlbumDetail,
    onCencel,
    open,
    setOpen,
    setAssignUser,
  }: any = props?.overlayParams;
  return (
    <SafeOverlay
      overlayStyle={overlay}
      backdropStyle={backdropStyle}
      isVisible={isVisible}
      onBackdropPress={() => onBackdropPress()}
    >
      <KeyboardAwareScrollView
        style={commonStyle.OverlayKeyboardStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <TouchableWithoutFeedback
          style={styles.spaceTopAdd}
          onPress={() => touchableHandle()}
        >
          <View style={MainOverLayContainer}>
            <View style={OverLayRowContainer}>
              <View style={OverLayImageContainer}>
                <ShowImage
                  imageStyle={OverLayImage}
                  url={imageUrl}
                  resizeMode="contain"
                />
              </View>
              <View style={OverLayTitleContainer}>
                <Text style={OverTitle}>{title}</Text>
              </View>
            </View>

            {imageFile?.path ? (
              <View style={styles.padBothAdd}>
                <ShowImage
                  imageList={[{ uri: imageFile.path }]}
                  url={imageFile.path}
                  imageStyle={EventImageStyle}
                  index={0}
                />
              </View>
            ) : null}

            <View
              style={
                Platform.OS === "ios" ? styles.drawerIos : styles.drawerAndroid
              }
            >
              <Text style={SeverityTitle}>
                {I18n.t("groupDetails.SelectAlbum")}
              </Text>

              <CommonDropdown
                open={open}
                setOpen={setOpen}
                dropdownStyle={commonStyle.albumStyle}
                containerStyle={styles.fullWidth}
                formTypeInput={formTypeInput}
                labelStyle={styles.drawerLabelFont}
                itemStyle={styles.startFlex}
                value={assignUser}
                setValue={setAssignUser}
                items={albumList.map((item) => ({
                  label: item.title,
                  value: item.title,
                  albumId: item.albumId,
                }))}
                onChangeItem={(item) => onDropDownHandleItem(item)}
              />
            </View>
            <View style={OverLayRowContainer1}>
              <Entypo
                name={"info-with-circle"}
                size={fontSize(22)}
                color={color.white}
              />
              <Text style={OverLayText}>
                {I18n.t("groupDetails.OptionalCaption")}
              </Text>
            </View>

            <View style={OverLayInputContainer}>
              <View style={TagContainer}>
                <TextInput
                  //multiline={true}
                  value={request}
                  style={TextInputs}
                  onChangeText={handleText}
                  maxLength={35}
                  numberOfLines={1}
                  placeholder={I18n.t("groupDetails.Entercaption")}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onSubmitEditing={onKeyboardDismiss}
                  returnKeyType="done"
                  placeholderTextColor={color.placeholder}
                  selectionColor={color.selectionColor}
                />
              </View>
            </View>

            <Button
              tx={"groupDetails.Save"}
              isLoader={isLoader}
              disabled={isLoader}
              style={loginButtonContainer}
              textStyle={BottonTitle}
              onPress={() => saveAlbumDetail()}
            />

            <TouchableOpacity
              onPress={() => onCencel()}
              style={OverLayButtonContainer1}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("groupDetails.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeOverlay>
  );
});

const RenderOverlayPostOther = (props: OverlayPost) => {
  const { isVisible } = props;
  const {
    imageUrl,
    title,
    request,
    handleText,
    onKeyboardDismiss,
    isLoader,
    actionOverlayPost,
    onShareDetail,
  }: any = props?.overlayParams ?? {};
  return (
    <SafeOverlay
      overlayStyle={overlay}
      backdropStyle={backdropStyle}
      isVisible={isVisible}
      onBackdropPress={() => actionOverlayPost(false)}
    >
      <KeyboardAwareScrollView
        style={commonStyle.OverlayKeyboardStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <TouchableWithoutFeedback
          style={styles.spaceTopAdd}
          onPress={() => onKeyboardDismiss()}
        >
          <View style={MainOverLayContainer}>
            <View style={OverLayRowContainer}>
              <View style={OverLayImageContainer}>
                <ShowImage imageStyle={OverLayImage} url={imageUrl} />
              </View>
              <View style={OverLayTitleContainer}>
                <Text style={OverTitle}>{title}</Text>
              </View>
            </View>

            <View style={OverLayRowContainer1}>
              {/* <View style={InfoContainer}> */}
              <Entypo
                name={"info-with-circle"}
                size={fontSize(20)}
                color={color.white}
              />
              {/* </View> */}
              <Text style={OverLayText}>
                {I18n.t("groupDetails.Whathappening")}
              </Text>
            </View>

            <View style={OverLayInputContainer}>
              <View style={TagContainer}>
                <TextInput
                  multiline={true}
                  value={request}
                  onSubmitEditing={() => onKeyboardDismiss()}
                  returnKeyType="done"
                  style={{ ...TextInputs, ...styles.enterUpdateHeight }}
                  onChangeText={(text) => handleText(text)}
                  placeholder={I18n.t("groupDetails.Enterupdate")}
                  placeholderTextColor={color.palette.lightGrey}
                  numberOfLines={5}
                  selectionColor={color.selectionColor}
                  autoCorrect={false}
                  autoCapitalize="none"
                  textAlignVertical="top"
                />
              </View>
            </View>

            <Button
              tx={"groupDetails.share"}
              isLoader={isLoader}
              disabled={isLoader}
              style={loginButtonContainer}
              textStyle={BottonTitle}
              onPress={() => onShareDetail()}
            />

            <TouchableOpacity
              onPress={() => actionOverlayPost("request")}
              style={OverLayButtonContainer1}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("groupDetails.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeOverlay>
  );
};

const RenderTab = (props: RenderProps) => {
  const { onAction, type, document, source, title } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onAction()}
      style={GroupDetailsHeadTouch}
    >
      {type === "EHR" && (
        <View style={styles.spaceBottomSix}>
          <ShowImage
            source={source}
            resizeMode="contain"
            imageStyle={{
              ...commonStyle.tabIconunActiveStyle,
              ...styles.medicalFolderWidth,
            }}
          />
        </View>
      )}
      {type === "Monitoring" && (
        <FontAwesome
          name="bar-chart"
          size={fontSize(30)}
          color={color.secondary}
          style={commonStyle.monitorIconStyle}
        />
      )}
      {type === "Meetup" && (
        <MaterialIcons
          name="video-call"
          size={fontSize(30)}
          color={color.secondary}
          style={commonStyle.monitorIconStyle}
        />
      )}
      {type === "Docs" && <Text text={document} style={GroupDetailsHeadText} />}
      <Text text={title} style={GroupDetailsHeadTextMain} />
    </TouchableOpacity>
  );
};

/**
 * Default config
 */
// TextInput.defaultProps.selectionColor = 'black';

const GroupDetailsTab = createMaterialTopTabNavigator();

let uniqueIds = "";
let froms = "";
let canEditInfos = "";
let issueTab = GROUP_DETAILS.OpenIssue;
let titles = "";

let albumName = "";
let albumId = 0;
let imageUrls = "";

type RouteProps = {
  GroupDetail: {
    fromss: string;
    uniqueId: string;
    title: string;
    imageUrls: string;
    grptitle: string;
    canEditInfo: boolean;
    issueTabs: string;
    category: string;
    screen: string;
  };
};

const { groups } = content;
type GroupDetailProps = RouteProp<RouteProps, "GroupDetail">;

export const GroupDetailsScreen: React.FC = () => {
  const { group_detail, dispatches, login_detail } = useRedux([
    groups.groupsDetail,
    groups.loginDetail,
    groups.dispatch,
  ]);
  const { dynamic_tab } = useRedux([groups.dynamicTab]);
  const group_details_header_tab =
    dynamic_tab?.group_details_header_tab?.filter((tab) => tab.enable) || [];

  const [open, setOpen] = useState(false);
  const navigation = useAppNavigation();
  const route = useRoute<GroupDetailProps>();

  const category = "Careteams";

  const { uniqueId, title, imageUrl, canEditInfo }: any = group_detail;

  uniqueIds = uniqueId;
  imageUrls = imageUrl;
  titles = title;
  froms = route?.params?.fromss;
  issueTab = route?.params?.issueTabs;
  canEditInfos = canEditInfo;

  const userEmail = login_detail.email;
  const userPassword = login_detail.password;

  const [activeTab, setActiveTab] = useState<any>(GROUP_DETAILS.Activities);
  const [reload, setReload] = useState(false);
  const [showOverlayPost, setShowOverlayPost] = useState(false);
  const [showOverlayPostPhoto, setShowOverlayPostPhoto] = useState(false);
  const [albumList, setAlbumList] = useState([]);
  const [document, setDocument] = useState("0");
  const [isLoader, setIsLoader] = useState(false);
  const [request, setRequest] = useState("");
  const [imageFile, setImageFile] = useState<{ path: string; uri?: string }>();
  const [image, setImage] = useState(null);
  const [assignUser, setAssignUser] = useState("Unset");
  const [groupDetails, setGroupDetail] = useState(null);
  const [loader, setLoader] = useState(false);
  const refRBSheetAlbum = useRBSheetRef();
  const refRBSheetImage = useRBSheetRef();
  const formTypeInput = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      checkIconType();

      getData();
      getAlbumeList();
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

  const removeMmeber = () => {
    dispatches(memberDetail({}));
  };

  const backAction = (): boolean => {
    global.getMessage = false;
    global.conversationid = "";
    global.screenName = "";

    if (route?.params?.screen === "profile") {
      navigation.goBack();
    } else {
      global.initBottomTab = TABS.CareTeams;
      navigation.replace(STACK.RootStack);
    }

    removeMmeber();
    return true;
  };

  useEffect(() => {
    checkAcess();
  }, [activeTab, isFocused]);

  const getData = () => {
    getMyDocument(uniqueIds)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setDocument(JSON.stringify(res.data[0]?.status?.total));
        } else {
          showErrorMessage("Error occured");
          setDocument("-");
        }
      })
      .catch((err) => {
        showErrorMessage("Error occured");
        setDocument("-");
      });
  };

  const getAlbumeList = () => {
    setAlbumList([]);
    getMyAlbumList(uniqueId)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${MODULES.GroupDetailsScreen}_${I18n.t(
            "groupDetails.albumList"
          )}`,
          endpoint: points.albumList,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray: any = [];
            res.data[0].objectList.forEach((val: any) => {
              cleanedArray.push(val);
            });
            setAlbumList(cleanedArray);
            setAssignUser(cleanedArray[0].title);
            albumName = cleanedArray[0].title;
            albumId = cleanedArray[0].albumId;
          } else {
            setAlbumList([]);
          }
        } else {
          setAlbumList([]);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${MODULES.GroupDetailsScreen}_${I18n.t(
            "groupDetails.albumList"
          )}`,
          endpoint: points.albumList,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err?.response?.data || err?.message,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setAlbumList([]);
      });
  };

  const checkTitleType = () => {
    console.log("<===== groups props =====>", activeTab, canEditInfo);

    if (activeTab === GROUP_DETAILS.Groups && canEditInfo == "true") {
      return "Invite";
    } else {
      return null;
    }
  };

  const checkIconType = () => {
    console.log("activeTab", activeTab);

    if (activeTab === GROUP_DETAILS.Activities) {
      return "post-add";
    } else if (activeTab === GROUP_DETAILS.Rx) {
      if (canEditInfo === "true") {
        return "add-box";
      }
    } else if (activeTab === GROUP_DETAILS.Issues) {
      return "add-box";
    } else if (activeTab === GROUP_DETAILS.Photos) {
      return "add-photo-alternate";
    } else if (
      activeTab === GROUP_DETAILS.Calanders &&
      canEditInfo === "true"
    ) {
      return "date-range";
    }
  };

  const handleRightPress = () => {
    if (activeTab === GROUP_DETAILS.Activities) {
      setRequest("");
      setShowOverlayPost(!showOverlayPost);
    }

    if (activeTab === GROUP_DETAILS.Rx) {
      navigation.navigate(MODULES.SearchDrugsScreen);
    }

    if (activeTab === GROUP_DETAILS.Issues) {
      navigation.navigate(MODULES.AddIssueScreen, {
        froms: GROUP_DETAILS.Issues,
        fromEdit: false,
        category: category,
      });
    }

    if (activeTab === GROUP_DETAILS.Photos) {
      refRBSheetImage.current.open();
    }

    if (activeTab === GROUP_DETAILS.Calanders) {
      navigation.navigate(MODULES.AddEventScreen, {
        froms: "Event",
        category: category,
      });
    }

    if (activeTab === GROUP_DETAILS.Groups && canEditInfo === "true") {
      navigation.navigate(MODULES.GroupInvitationScreen, {
        froms: "Invite",
      });
    }
  };

  const onMeetup = () => {
    if (groupDetails?.meetup === "true") {
      InAppBrowser.close();

      openLink(
        `https://meet.jit.si/${uniqueIds}#config.deeplinking.disabled=true`
      );
    }
  };

  const onMonitoring = () => {
    if (groupDetails?.electronichealthrecord === "true") {
      navigation.navigate(MODULES.MonitoringScreen, {
        uniqueId: uniqueId,
      });
    }
  };

  const onEHR = () => {
    if (groupDetails?.electronichealthrecord === "true") {
      navigation.navigate(
        GROUP_DETAILS.HealthHistory as keyof RootStackParamList
      );
    }
    /*else {
      onAlertAction(true);
    }*/
  };

  const onDocuments = () => {
    if (groupDetails.documentmanagement === "true") {
      navigation.navigate(MODULES.DocumentsScreen);
    }
    /*else {
      onAlertAction(true);
    }
    */
  };
  const tabHandlers = {
    Docs: onDocuments,
    EHR: onEHR,
    Monitoring: onMonitoring,
    Meetup: onMeetup,
  };

  const onCheckAccess = () => {
    setTimeout(() => {
      refRBSheetImage.current.open();
    }, 1000);
  };

  const onCheckPostImage = () => {
    setTimeout(() => {
      setShowOverlayPostPhoto(!showOverlayPostPhoto);
    }, 1000);
  };

  const onKeyboardDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const touchableHandle = () => {
    onKeyboardDismiss();
    formTypeInput.current.close();
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
        setIsLoader(false);
        onCheckPostImage();
      })
      .catch((e) => {
        console.log(e);
        // refRBSheetImage.current.close();

        Snackbar.show({
          text: e.message ? e.message : e,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };
  const onSheetAction = (action?: string) => {
    if (action === "open") {
      refRBSheetAlbum?.current?.open();
    }
  };

  const onSheetActionImage = (action?: string) => {
    refRBSheetImage.current?.open();
  };

  const actionOverlayPostPhoto = (request) => {
    if (request === "both") {
      setRequest("");
      setShowOverlayPostPhoto(!showOverlayPostPhoto);
    } else {
      setShowOverlayPostPhoto(request);
    }
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
        setIsLoader(false);

        onCheckPostImage();
      })
      .catch((e) => {
        console.log(e);
        // refRBSheetImage.current.close();

        Snackbar.show({
          text: e.message ? e.message : e,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const uploadPhoto = () => {
    setIsLoader(true);
    console.log("uploadphoto");

    const uri = imageFile.path.replace("file:///", "/");

    const path = imageFile.path ? imageFile.path : imageFile.uri;
    const extension = path.split(".").pop();
    const keyUid = `${uuid.v4()}.${extension}`;
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = date + "/" + month + "/" + year;

    const ha1 = md5(`${userEmail}:${Config.REALM}:${userPassword}`);
    const ha2 = md5(`POST:` + "/api/photo?format=json");
    const responseAuth = md5(ha1 + ":" + currentDate + ":" + ha2);
    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/photo?format=json`,
      {
        Accept: "application/json",
        "X-Concursive-Key": Config.AUTH_KEY,
        "X-Concursive-Platform": "android",
        "Content-Type": "multipart/form-data",
        Authorization: `Digest username="${userEmail}", realm="${Config.REALM}", nonce="${currentDate}", uri="/api/photo?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      [
        {
          name: "media",
          filename: keyUid,
          type: image.mime,
          data: RNFetchBlob.wrap(uri),
        },
        { name: "profile", data: uniqueId },
        { name: "albumId", data: albumId },
        { name: "caption", data: request },
        { name: "albumName", data: albumName },
      ]
    )
      .then(async (res) => {
        console.log("response of post activity", res);
        setIsLoader(false);

        let tempObj = res?.data?.length > 0 ? JSON.parse(res?.data) : [];

        if (tempObj[0]?.status?.code === 0) {
          Snackbar.show({
            text: `Photo added successfully`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setShowOverlayPostPhoto(!showOverlayPostPhoto);
          setReload(true);
          setRequest("");
        } else {
          Snackbar.show({
            text: `Something went wrong`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch(async (err) => {
        // await trackApiEvent({
        //   screen: `${MODULES.GroupDetailsScreen}_${I18n.t(
        //     "groupDetails.uploadPhoto"
        //   )}`,
        //   endpoint: points.uploadPhoto,
        //   method: method.GET,
        //   status: err?.response?.status || 500,
        //   response: err?.response?.data || err?.message,
        //   messageKey: I18n.t("EmptyView.somethingWentWrong"),
        // });
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        setIsLoader(false);
      });
  };

  const postUpdateStatusService = async () => {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    setIsLoader(true);
    postUpdateStatus(uniqueId, request.trim(), fcmtoken)
      .then(async (res) => {
        setIsLoader(false);
        console.log("statuc hiut res", res);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: "Post added successfully",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.white,
              numberOfLines: 5,
            });
            setRequest("");
            setShowOverlayPost(!showOverlayPost);
            setReload(true);
          } else {
            setRequest("");
            setShowOverlayPost(!showOverlayPost);
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          console.log("err=1=");
        }
      })
      .catch(async (err) => {
        setIsLoader(false);
        console.log("err==", err);
      });
  };

  const openLink = async (link) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(link, {
          dismissButtonStyle: "cancel",
          preferredBarTintColor: color.secondary,
          preferredControlTintColor: "white",
          readerMode: false,
          animated: true,
          modalPresentationStyle: "automatic",
          modalTransitionStyle: "coverVertical",
          modalEnabled: true,
          enableBarCollapsing: false,
          showTitle: true,
          toolbarColor: color.secondary,
          secondaryToolbarColor: "black",
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
        });
        InAppBrowser.close();
      } else Linking.openURL(link);
    } catch (error) {
      InAppBrowser.close();
    }
  };

  /* // const openTermsInappBrowser = async () => {
  //   const link = `${Config.BASE_URL}/support`;
  //   try {
  //     if (await InAppBrowser.isAvailable()) {
  //       InAppBrowser.open(link).then((response: browserProps) => {
  //         if (response.type === "success" && response.url) {
  //           Linking.openURL(response.url);
  //         } else if (response.type === "cancel") {
  //           checkAcess();
  //         /*  setAlert(false); */
  //         }
  //       });
  //     } else {
  //       Linking.openURL(link);
  //     }
  //   } catch (error) {
  //     showErrorMessage(error?.message);
  //   }
  // };

  const checkAcess = () => {
    console.log("response are getting111111", group_detail.category);
    getMyGroupDetail(uniqueIds)
      .then((res) => {
        console.log("response are getting@12344", res?.data);
        setLoader(false);
        if (res.data && res.data.length > 0) {
          setGroupDetail(res.data[0].objectList[0]);
        } else {
          showErrorMessage("Error occured");
          setDocument("-");
        }
      })
      .catch((err) => {
        showErrorMessage("Error occured");
        setDocument("-");
      });
  };

  const leftAction = () => {
    global.getMessage = false;
    global.conversationid = "";
    global.screenName = "";
    if (route?.params?.screen == "profile") {
      navigation.goBack();
    } else {
      global.initBottomTab = TABS.CareTeams;

      navigation.replace(STACK.RootStack);
    }
    removeMmeber();
  };

  const onDropDownHandleItem = (item) => {
    setAssignUser(item?.value);
    albumName = item.value;
    albumId = item.albumId;
  };

  const handleText = (text) => {
    setRequest(text);
  };

  const saveAlbumDetail = () => {
    if (albumId) {
      uploadPhoto();
    } else {
      Snackbar.show({
        text: `Please add any album from web`,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const onCencel = () => {
    setRequest("");
    actionOverlayPostPhoto("both");
  };

  const actionOverlayPost = (request) => {
    if (request === "request") {
      setRequest("");
      setShowOverlayPost(!showOverlayPost);
    } else {
      setShowOverlayPost(request);
    }
  };

  const onShareDetail = () => {
    if (request.trim() != "") {
      postUpdateStatusService();
    } else {
      Snackbar.show({
        text: I18n.t("groupDetails.EnterUpdatePlease"),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const overlayParams = {
    imageUrl: imageUrl,
    title: title,
    imageFile: imageFile,
    formTypeInput: formTypeInput,
    assignUser: assignUser,
    albumList: albumList,
    onDropDownHandleItem: onDropDownHandleItem,
    request: request,
    handleText: handleText,
    onKeyboardDismiss: onKeyboardDismiss,
    isLoader: isLoader,
    saveAlbumDetail: saveAlbumDetail,
    onCencel: onCencel,
    actionOverlayPost: actionOverlayPost,
    onShareDetail: onShareDetail,
    setOpen: setOpen,
    open: open,
    setAssignUser: setAssignUser,
  };

  return (
    <View testID="GroupDetailsScreen" style={FULL}>
      <RenderRBSheet
        refRBSheetAlbum={refRBSheetAlbum}
        albumList={albumList}
        onSheetAction={onSheetAction}
        onCheckAccess={onCheckAccess}
      />

      <RenderRBSheetImage
        refRBSheetAlbum={refRBSheetImage}
        onSheetAction={onSheetActionImage}
        openCamera={openCamera}
        pickSingle={pickSingle}
      />

      <RenderOverlayPost
        isVisible={showOverlayPostPhoto}
        onBackdropPress={() => actionOverlayPostPhoto(false)}
        touchableHandle={touchableHandle}
        overlayParams={overlayParams}
      />

      <RenderOverlayPostOther
        isVisible={showOverlayPost}
        overlayParams={overlayParams}
      />

      <View style={HEADERTOP}>
        <HeaderItem
          operation="back"
          title={title}
          onPressLeft={leftAction}
          rightTitle={checkTitleType()}
          onPressRightTitle={handleRightPress}
          rightIcon={checkIconType()}
          onPressRightIcon={handleRightPress}
        />
        {/* {group_details_header_tab?.map((tab) => { */}
        <View style={GroupDetailsHead}>
          {Array.isArray(group_details_header_tab) &&
            group_details_header_tab.map((tab) => {
              if (!tab?.name) return null;

              const handlePress = tabHandlers?.[tab?.key] ?? (() => {});

              return (
                <RenderTab
                  key={tab?.id || tab?.key}
                  onAction={handlePress}
                  type={tab?.key}
                  title={tab?.name}
                  document={tab?.key === "Docs" ? document : undefined}
                  source={tab?.key === "EHR" ? groupTab?.ehr : undefined}
                />
              );
            })}
        </View>
        {/* <RenderTab
            onAction={onDocuments}
            type={"Docs"}
            title={"Docs"}
            document={document}
          />
          <RenderTab
            onAction={onEHR}
            type={"EHR"}
            title={I18n.t("groupDetails.EHR")}
            source={groupTab?.ehr}
          />
          <RenderTab
            onAction={onMonitoring}
            type={"Monitoring"}
            title={I18n.t("groupDetails.Monitoring")}
          />

          <RenderTab
            onAction={onMeetup}
            type={"Meetup"}
            title={I18n.t("groupDetails.Monitoring")}
          /> */}
      </View>

      <View style={BODY}>
        <TabStack
          setRequest={setRequest}
          setActiveTab={setActiveTab}
          setReload={setReload}
          reload={reload}
          issueTab={issueTab}
          videosAccess={groupDetails?.videos}
          photosAccess={groupDetails?.photos}
          rxAccess={groupDetails?.rx}
          calendarAccess={groupDetails?.calendar}
          activitystreamAccess={groupDetails?.activitystream}
          /*  alertMessage={() => setAlert(true)}*/
          category={category}
          uniqueId={uniqueIds}
        />
      </View>
      {/* // {alert ? (
        <RenderFeaturesAlert
          visible={alert}
          openTermsInappBrowser={openTermsInappBrowser}
          onTouchOutside={() => onAlertAction(false)}
        />
      ) : null} */}
      {loader ? (
        <ActivityIndicator
          color={color.secondary}
          animating={true}
          size={"large"}
          style={LOADER}
        />
      ) : null}
    </View>
  );
};
const iconMap = {
  [GROUP_DETAILS.Activities]: groupTab?.articles,
  [GROUP_DETAILS.Notes]: groupTab?.documents,
  [GROUP_DETAILS.Issues]: groupTab?.issueIcon,
  [GROUP_DETAILS.Videos]: groupTab?.video,
  [GROUP_DETAILS.Rx]: groupTab?.rx,
  [GROUP_DETAILS.Calanders]: groupTab?.calanders,
  [GROUP_DETAILS.Photos]: groupTab?.photos,
  [GROUP_DETAILS.Groups]: groupTab?.groups,
};
const TabStack = ({
  setRequest,
  setActiveTab,
  setReload,
  reload,
  issueTab,
  videosAccess,
  photosAccess,
  rxAccess,
  calendarAccess,
  activitystreamAccess,
  category,
  uniqueId,
}) => {
  const [init] = useState({ width: Dimensions.get("window").width });
  const { groups } = content;
  const { dynamic_tab } = useRedux([groups.dynamicTab]);
  const group_detail_tab =
    dynamic_tab?.group_detail_tab?.filter((tab) => tab.enable) || [];

  const CustomeTabBar = ({ state, descriptors, navigation }) => {
    const setLabel = (options, route) => {
      if (options.tabBarLabel !== undefined) {
        return options.tabBarLabel;
      } else if (options.title !== undefined) {
        return options.title;
      } else {
        return route.name;
      }
    };

    const onPressSave = (route, isFocused, event) => {
      if (isFocused || event.defaultPrevented) return;

      const accessMap: Record<string, string> = {
        Activities: activitystreamAccess,
        Videos: videosAccess,
        Rx: rxAccess,
        Calanders: calendarAccess,
        Photos: photosAccess,
      };

      const access = accessMap[route.name];

      if (access !== undefined && access !== "true") {
        /*   //alertMessage();*/
        return;
      }
      console.log("route details", route);

      setActiveTab(route.name);
      setRequest("");
      navigation.navigate(route.name);
    };

    return (
      <View style={commonStyle.groupDetailMainStyle}>
        {state.routes.map(
          (route: { key: string | number; name: any }, index: any) => {
            const { options } = descriptors[route.key];
            const label = setLabel(options, route);
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });
              onPressSave(route, isFocused, event);
            };

            return (
              <View style={commonStyle.UserProfileSubView} key={label}>
                <TouchableOpacity
                  onPress={onPress}
                  style={
                    isFocused
                      ? commonStyle.ActiveUserProfileSubTouch
                      : commonStyle.UserProfileSubTouch
                  }
                >
                  <Image
                    source={iconMap[label]}
                    resizeMode="contain"
                    style={[
                      isFocused
                        ? commonStyle.tabIconActiveStyle
                        : commonStyle.tabIconunActiveStyle,
                      label === GROUP_DETAILS.Videos && { width: fontSize(35) }, // only for videos
                    ]}
                  />

                  <View
                    style={
                      isFocused
                        ? commonStyle.profileActiveLine
                        : commonStyle.profileUnactiveLine
                    }
                  />
                </TouchableOpacity>
              </View>
            );
          }
        )}
      </View>
    );
  };

  const checkInitialRoute = () => {
    switch (froms) {
      case "HealthHistory":
        return GROUP_DETAILS.HealthHistory;

      case "Rx":
        return GROUP_DETAILS.Rx;

      case "Notes":
        return GROUP_DETAILS.Notes;

      case "Issues":
        return GROUP_DETAILS.Issues;

      case "Events":
        return GROUP_DETAILS.Calanders;

      case "Activity":
        return GROUP_DETAILS.Activities;

      default:
        return group_detail_tab?.[0].name ?? GROUP_DETAILS.Activities;
    }
  };
  const customTab = (props) => {
    return <CustomeTabBar {...props} />;
  };

  return (
    <GroupDetailsTab.Navigator
      id={"groupdetail_tab"}
      initialLayout={init}
      initialRouteName={checkInitialRoute()}
      tabBar={customTab}
    >
      {group_detail_tab?.map((item) => {
        const ScreenComponent = GROUP_DETAILS_SCREEN_MAP[item.name];
        console.log("item of naming", item);

        if (!ScreenComponent) return null;

        return item?.name === GROUP_DETAILS.Activities ||
          item?.name === GROUP_DETAILS.Photos ? (
          <GroupDetailsTab.Screen
            key={item.key}
            name={item.name}
            children={() => (
              <ScreenComponent
                category={category}
                reload={reload}
                setReload={setReload}
              />
            )}
          />
        ) : (
          <GroupDetailsTab.Screen
            key={item.key}
            name={item.name}
            component={ScreenComponent}
            initialParams={{
              issueTab: issueTab,
              activeTab: item.name,
              setActiveTab: setActiveTab,
              profile: uniqueId,
              reload: reload,
              setReload: setReload,
              uniqueIds: uniqueId,
            }}
          />
        );
      })}
    </GroupDetailsTab.Navigator>
  );
};
