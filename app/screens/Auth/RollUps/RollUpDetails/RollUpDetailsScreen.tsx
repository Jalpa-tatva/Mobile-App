import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Alert,
  BackHandler,
  Text,
  Linking,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";

// import external libraries
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import md5 from "md5";
import uuid from "react-native-uuid";
import Snackbar from "react-native-snackbar";
import InAppBrowser from "react-native-inappbrowser-reborn";
import I18n from "i18n-js";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Config } from "react-native-config";

// import custom function
import {
  getEventDetails,
  deleteEvent,
  eventAttachments,
  deleteEventAttachment,
} from "@app/services/api/rollup";
import { showErrorMessage } from "@utils/commonFunction";
import {
  getUserDetail,
  MODULES,
  PROFILE,
  SafeOverlay,
  SafeRBSheet,
  TABS,
  useRBSheetRef,
} from "@app/constants";

// import custom styling & utils
import {
  OverLayButtonText,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  styles,
  MessageStyle,
  AlertTitle,
} from "./Style";
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import ShowImage from "@app/components/FastImage/ShowImage";
import moment from "moment";
import { assets } from "../../../../../assets/images";
import { getMyMemberList } from "@app/services/api/groups";
import { AlertBox, Button, EmptyView, Loader } from "@app/components";
import EventMembers from "./EventMembers";
import { translate } from "@app/i18n";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@app/utils/icons/VectorIcons";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
/**
 * RollUpDetails Props
 */
export interface RollUpDetailsProps {
  id: number;
  title: string;
  value: string;
  time: string;
  onPress: Function;
}

export interface MemberListing {
  imageUrl?: string;
  name?: string;
}

type RollUpDetailsRouteParams = {
  RollUpDetails: {
    eventId?: string;
    item?: {
      uniqueId?: string;
      [key: string]: any;
    };
    From?: string;
  };
};

type RouteType = RouteProp<RollUpDetailsRouteParams, "RollUpDetails">;
const { groups } = content;
/**
 * RollUpDetails Component
 */
export const RollUpDetailsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteType>();
  const { login_detail } = useRedux([groups.loginDetail]);
  const eventId = route?.params?.eventId;
  const item = route?.params?.item;
  const From = route?.params?.From;
  const uniqueId = route?.params?.item?.uniqueId;

  const [isLoader, setIsLoader] = useState(false);
  const [memberLoader, setMemberLoader] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [isImageLoader, setIsImageLoader] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [delIndex, setDelIndex] = useState(null);
  const [eventDetails, setEventDetails] = useState<any>([]);
  const [memberList, setMemberList] = useState([]);
  const [eventTime, setEventTime] = useState({ start: "", end: "" });
  const [leftTimes, setLeftTimes] = useState<any>(0);
  const [schema, setSchema] = useState(null);
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState<any>({});
  const [image, setImage] = useState(null);
  const [showOverlayPostPhoto, setShowOverlayPostPhoto] = useState(false);
  const [reload, setReload] = useState(true);

  const refRBSheet = useRBSheetRef();
  const refRBSheetImage = useRBSheetRef();
  const refRBSheetCrudImage = useRBSheetRef();

  useEffect(() => {
    getData();
    const focus = navigation.addListener("focus", () => {
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, [navigation]);

  const getData = async () => {
    // const loginData: any = await getUserDetail();
    setLoginDetail({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };

  const backAction = () => {
    navigation.goBack();
    // if (From === "calender") {
    // } else if (typeof From === "string") {
    //   navigation.navigate(TABS.Rollup, {
    //     screen: From,
    //   });
    // }
    return true;
  };

  const deleteServiceApicall = () => {
    setIsLoader(true);
    deleteEvent(item.uniqueId, item.id)
      .then((res) => {
        setIsLoader(false);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t("TabTitle.EventDeleted"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            navigation.goBack(null);
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
            text: res.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);

        console.log("err", err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      refresh();

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        backHandler.remove();
      };
    }, [navigation])
  );

  useEffect(() => {
    refresh();
  }, [reload]);

  const refresh = async () => {
    await detailsApiCall();
    await memberListService();
    await eventImages();
  };

  const memberListService = async () => {
    const commonArray = [];
    setMemberLoader(true);
    try {
      const memberData = await getMyMemberList(uniqueId);
      const objectList = memberData?.data?.[0]?.objectList || [];
      if (objectList.length > 0) {
        objectList.forEach((val) => {
          if (val.isPending === "false" || !val.isPending) {
            commonArray.push(val);
          }
        });
        console.log("commonArray of ios checked", objectList);

        setMemberList(commonArray);
        setMemberLoader(false);
      } else {
        setMemberList([]);
        setMemberLoader(false);
      }
    } catch {
      setMemberLoader(false);
      setMemberList([]);
      Snackbar.show({
        text: I18n.t("EmptyView.somethingWentWrong"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.lightGreen,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    } finally {
      setMemberLoader(false);
    }
  };

  const detailsApiCall = async () => {
    try {
      setIsLoader(true);
      const res = await getEventDetails(eventId);

      if (res.data && res.data.length > 0) {
        const eventData = res.data[0].objectList?.[0];

        if (eventData) {
          const leftTime = calculateTimeLeft(
            Number(eventData?.startDate),
            Number(eventData?.endDate)
          );
          console.log("date are provided", eventData);

          setLeftTimes(leftTime);

          const startDates = moment(Number(eventData?.startDate)).format(
            "ddd DD MMMM, YYYY [at] h:mm a"
          );
          const endDates = moment(Number(eventData?.endDate)).format(
            "ddd DD MMMM, YYYY [at] h:mm a"
          );

          const scheme = Platform.select({
            ios: `maps://?q=${eventData?.address}&ll=${eventData?.latitude},${eventData?.longitude}`,
            android: `geo:$${eventData?.latitude},$${eventData?.longitude}?q=${eventData?.latitude},${eventData?.longitude}(${eventData?.address})`,
          });
          setSchema(scheme);
          setEventTime({ start: startDates, end: endDates });
          setEventDetails(eventData);

          setIsLoader(false);
        } else {
          setIsLoader(false);
        }
      }
    } catch {
      setIsLoader(false);
      Snackbar.show({
        text: I18n.t("EmptyView.somethingWentWrong"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const eventImages = async () => {
    setImageLoader(true);
    const rowImages = [];
    try {
      const res: any = await eventAttachments(eventId);
      if (res?.data && res?.data[0]?.objectList?.length > 0) {
        console.log("response i checking", res?.data[0]?.objectList);

        res?.data[0]?.objectList?.map((imageRecord) => {
          rowImages?.push(imageRecord);
        });
        setImages(rowImages);
        setImageLoader(false);
      } else {
        setImages([]);
        setImageLoader(false);
      }
    } catch {
      setImages([]);
      setImageLoader(false);
    }
  };

  const openLink = async (resetLink: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(resetLink).then((response: any) => {
          if (response.type === "success" && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else {
        Linking.openURL(resetLink);
      }
    } catch (error) {
      showErrorMessage(error?.message);
    }
  };

  const pickSingle = () => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        setImageFile(image);
        refRBSheetImage.current.close();
        let fileObject = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        setImage(fileObject);
        onCheckPostImage();
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };
  const onCheckPostImage = () => {
    setTimeout(() => {
      setShowOverlayPostPhoto(!showOverlayPostPhoto);
    }, 1000);
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        setImageFile(image);
        refRBSheetImage.current.close();
        let fileObject = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        setImage(fileObject);
        onCheckPostImage();
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const calculateTimeLeft = (startDate: any, endDate: any) => {
    const now = moment(); // Current moment
    const startDateMoment = moment(parseInt(startDate, 10)); // Parse start date
    const endDateMoment = moment(parseInt(endDate, 10)); // Parse end date
    const currentTime = moment(); // Current moment for comparison

    if (currentTime.isBefore(startDateMoment)) {
      // Event not started: Calculate countdown timer
      const timeLeft = {
        years: startDateMoment.diff(now, "years"),
        months: startDateMoment.diff(now, "months") % 12,
        days: startDateMoment.diff(now, "days") % 30,
        hours: startDateMoment.diff(now, "hours") % 24,
        minutes: startDateMoment.diff(now, "minutes") % 60,
        seconds: startDateMoment.diff(now, "seconds") % 60,
      };

      return { status: "countdown", timeLeft }; // Return countdown info
    } else if (
      currentTime.isSameOrAfter(startDateMoment) &&
      currentTime.isSameOrBefore(endDateMoment)
    ) {
      // Event is ongoing
      return { status: "onGoing" };
    } else if (currentTime.isAfter(endDateMoment)) {
      // Event ended
      return { status: "Completed" };
    } else {
      return { status: "Completed" };
    }
  };

  useEffect(() => {
    eventUpdate();
  }, [eventDetails?.startDate]);

  const eventUpdate = () => {
    const now = moment();
    const eventDate = eventDetails?.startDate
      ? moment(Number(eventDetails.startDate))
      : 0;
    if (eventDate != 0) {
      if (now.isAfter(eventDate)) {
        setLeftTimes({ status: "Completed" });
        return true;
      } else {
        const timer = setInterval(() => {
          setLeftTimes(
            calculateTimeLeft(
              Number(eventDetails?.startDate),
              Number(eventDetails?.endDate)
            )
          );
        }, 1000);
        return () => clearInterval(timer);
      }
    } else {
      return null;
    }
  };

  const uploadPhoto = () => {
    setIsImageLoader(true);

    const uri = imageFile?.path.replace("file:///", "/");

    const path = imageFile?.path ? imageFile?.path : imageFile?.uri;
    const extension = path.split(".").pop();
    const keyUid = `${uuid.v4()}.${extension}`;
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = date + "/" + month + "/" + year;

    const ha1 = md5(
      `${loginDetail?.email}:${Config.REALM}:${loginDetail?.password}`
    );
    const ha2 = md5(`POST:` + "/api/eventImage?format=json");
    const responseAuth = md5(ha1 + ":" + currentDate + ":" + ha2);
    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/eventImage?format=json`,
      {
        Accept: "application/json",
        "X-Concursive-Key": Config.AUTH_KEY,
        "X-Concursive-Platform": "android",
        "Content-Type": "multipart/form-data",
        Authorization: `Digest username="${loginDetail?.email}", Config.REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/eventImage?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      [
        {
          name: "file",
          filename: keyUid,
          type: image.mime,
          data: RNFetchBlob.wrap(uri),
        },
        { name: "eventId", data: eventId },
        { name: "deleteFiles", data: "false" },
      ]
    )
      .then((res) => {
        setIsImageLoader(false);
        eventImages();
        let tempObj = JSON.parse(res?.data);
        console.log("reponse are", res?.data);

        if (tempObj[0]?.status?.code === 0) {
          Snackbar.show({
            text: I18n.t("TabTitle.EventImageUpdated"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });

          setShowOverlayPostPhoto(!showOverlayPostPhoto);
          setImageFile({});
          setImage(null);
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
      .catch((err) => {
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        setIsImageLoader(false);
      });
  };

  const removeImage = (index) => {
    setImageLoader(true);
    deleteEventAttachment(index, eventId)
      .then((res) => {
        setIsDelete(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t("TabTitle.ImageDeleted"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            setImageFile({});
            const updatePrevImage = images.filter((item) => item?.id !== index);
            setImages(updatePrevImage);
            setImageLoader(false);
          } else {
            Snackbar.show({
              text: res?.data[0]?.status?.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            setImageLoader(false);
          }
        } else {
          Snackbar.show({
            text: res?.data[0]?.status?.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setImageLoader(false);
        }
      })
      .catch((err) => {
        setImageLoader(false);
        setIsDelete(false);
        console.log("err", err);
      });
  };

  const postImageCall = () => {
    refRBSheet.current?.close();
    setTimeout(() => {
      refRBSheetImage.current?.open();
    }, 1000);
  };

  const editEvent = (status) => {
    refRBSheet.current.close();
    if (status == "true") {
      navigation.navigate(MODULES.EditEventScreen, {
        item: eventDetails,
        From: From,
      });
    } else {
      setIsEdit(true);
    }
  };

  const onGoingEvent = () => {
    if (leftTimes?.status === "onGoing") {
      return (
        <View style={styles.eventCompletePos}>
          <Text style={{ ...styles.timeLabel, ...styles.upcomingLabel }}>
            {translate("groupDetails.OnGoing")}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View testID="RollUpDetailsScreen" style={styles.container}>
      {isLoader && (
        <View
          style={{
            position: "absolute",
            top: "45%",
            zIndex: 9999,
            left: "45%",
          }}
        >
          <Loader />
        </View>
      )}
      <SafeRBSheet
        ref={refRBSheetCrudImage}
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
                const Arr = [...images];
                Arr.splice(-1);
                setImageFile({});
                setImage(null);
                setImages(Arr);
                refRBSheetCrudImage.current.close();
              }}
              color={color.palette.blackSecondary}
            />
          </View>

          <View style={SheetWrapper}>
            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                uploadPhoto();
              }}
            >
              <AntDesign
                name="upload"
                size={25}
                color={color.palette.white}
                style={styles.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("Userprofile.UploadImage")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const Arr = [...images];
                Arr.splice(-1);
                setImageFile({});
                setImage(null);
                setImages(Arr);
                refRBSheetCrudImage.current.close();
              }}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("Userprofile.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>
      <SafeRBSheet
        ref={refRBSheetImage}
        openDuration={350}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={styles.padTopCommon}>
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
                style={styles.padLeftCommon}
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
                style={styles.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("Userprofile.Gallery")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => refRBSheetImage.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("Userprofile.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>
      <SafeRBSheet
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={styles.padTopCommon}>
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
                navigation.navigate(MODULES.EditEventScreen, {
                  item: eventDetails,
                  From: From,
                  setReload: setReload,
                });

                refRBSheet.current.close();
              }}
            >
              <FontAwesome5
                name="edit"
                size={25}
                color={color.palette.white}
                style={styles.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("TabTitle.EditEvent")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                refRBSheet.current.close();
                deleteServiceApicall();
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={25}
                color={color.palette.white}
                style={styles.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("TabTitle.DeleteEvent")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={WrapperContainer} onPress={postImageCall}>
              <MaterialIcons
                name="add-photo-alternate"
                size={25}
                color={color.palette.white}
                style={styles.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("TabTitle.PostImage")}
              </Text>
            </TouchableOpacity>
            {/* )} */}

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
      <SafeOverlay
        overlayStyle={styles.overlay}
        backdropStyle={styles.backdropStyle}
        isVisible={showOverlayPostPhoto}
        onBackdropPress={() => {
          setShowOverlayPostPhoto(false);
        }}
      >
        <View style={styles.MainOverLayContainer}>
          <View style={styles.topBox}>
            <ShowImage
              imageStyle={styles.OverLayImage}
              url={eventDetails?.profileImageUrl?.replace("45x45", "0x0")}
              resizeMode="cover"
            />
            <View style={styles.topTitle}>
              <Text numberOfLines={2} style={styles.eventTitle}>
                {eventDetails?.title}
              </Text>
            </View>
          </View>
          {/* <View style={styles.OverLayRowContainer}> */}
          {/* <View style={styles.OverLayImageContainer}>
              <ShowImage
                imageStyle={styles.OverLayImage}
                url={eventDetails?.profileImageUrl}
                resizeMode="contain"
              />
            </View> */}
          <View style={{ ...styles.OverLayTitleContainer, ...styles.spaceTop }}>
            <Text numberOfLines={1} style={styles.createdBy}>
              {translate("groupDetails.OrganizedBy")}
            </Text>
            <Text numberOfLines={2} style={styles.OverTitle}>
              {eventDetails?.createdBy}
            </Text>
          </View>
          <View style={styles.OverLayTitleContainer}>
            {/* <Text style={styles.createdBy}>{'Organized by'}</Text> */}
            <Text
              numberOfLines={3}
              style={{ ...styles.createdBy, ...styles.smallFont }}
            >
              {eventDetails?.description}
            </Text>
          </View>
          {/* </View> */}

          {imageFile.path ? (
            <View style={{ paddingVertical: 20 }}>
              <ShowImage
                imageList={[{ uri: imageFile.path }]}
                url={imageFile.path}
                imageStyle={styles.EventImageStyle}
                index={0}
              />
            </View>
          ) : null}

          <Button
            tx={"groupDetails.Attach"}
            isLoader={isImageLoader}
            disabled={isImageLoader}
            style={styles.loginButtonContainer}
            textStyle={styles.BottonTitle}
            onPress={() => {
              if (imageFile?.path) {
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
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setImageFile({});
              setImage(null);
              setShowOverlayPostPhoto(!showOverlayPostPhoto);
            }}
            style={styles.OverLayButtonContainer1}
          >
            <Text style={OverLayButtonText}>
              {I18n.t("groupDetails.Cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeOverlay>
      <View style={styles.header}>
        <View style={styles.topWrapper}>
          <TouchableOpacity
            style={{ ...styles.backIconBox }}
            onPress={() => {
              navigation.goBack(null);
            }}
          >
            <MaterialIcons
              name="keyboard-backspace"
              color={color.white}
              size={fontSize(28)}
            />
          </TouchableOpacity>
          <View style={{ ...styles.titleWrapper }}>
            <Text style={styles.titleLbl}>
              {I18n.t("TabTitle.EventDetails")}
            </Text>
          </View>
          <TouchableOpacity
            style={{ ...styles.backIconBox, ...styles.more }}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <MaterialIcons
              name="more-vert"
              color={color.white}
              size={fontSize(28)}
            />
          </TouchableOpacity>
        </View>
        {!isLoader && eventDetails && leftTimes?.status === "Completed" && (
          <View style={styles.eventCompletePos}>
            <Text style={styles.upcomingLabel}>
              {translate("groupDetails.EventDone")}
            </Text>
          </View>
        )}
        {!isLoader &&
          eventDetails &&
          (leftTimes?.status === "countdown" && leftTimes?.timeLeft ? (
            <>
              <View style={styles.eventTiming}>
                <Text
                  style={{ ...styles.upcomingLabel, ...styles.addShadowTxt }}
                >
                  {translate("groupDetails.ComingSoon")}
                </Text>
              </View>
              <View style={styles.timeCal}>
                {leftTimes?.timeLeft?.years !== 0 && (
                  <>
                    <View style={styles.subTimeCal}>
                      <Text style={styles.timeLabel}>
                        {leftTimes?.timeLeft?.years}
                      </Text>
                      <Text style={styles.timeLabelRegular}>
                        {translate("groupDetails.year")}
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...styles.timeLabel,
                        ...styles.spaceBoth,
                      }}
                    >{`:`}</Text>
                  </>
                )}
                {leftTimes?.timeLeft?.months !== 0 && (
                  <>
                    <View style={styles.subTimeCal}>
                      <Text style={styles.timeLabel}>
                        {leftTimes?.timeLeft?.months}
                      </Text>
                      <Text style={styles.timeLabelRegular}>
                        {translate("groupDetails.month")}
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...styles.timeLabel,
                        ...styles.spaceBoth,
                      }}
                    >{`:`}</Text>
                  </>
                )}
                {leftTimes?.timeLeft?.days !== 0 && (
                  <>
                    <View style={styles.subTimeCal}>
                      <Text style={styles.timeLabel}>
                        {leftTimes?.timeLeft?.days}
                      </Text>
                      <Text style={styles.timeLabelRegular}>
                        {translate("groupDetails.day")}
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...styles.timeLabel,
                        ...styles.spaceBoth,
                      }}
                    >{`:`}</Text>
                  </>
                )}
                {leftTimes?.timeLeft?.hours !== 0 && (
                  <>
                    <View style={styles.subTimeCal}>
                      <Text style={styles.timeLabel}>
                        {leftTimes?.timeLeft?.hours}
                      </Text>
                      <Text style={styles.timeLabelRegular}>
                        {translate("groupDetails.hour")}
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...styles.timeLabel,
                        ...styles.spaceBoth,
                      }}
                    >{`:`}</Text>
                  </>
                )}
                <>
                  <View style={styles.subTimeCal}>
                    <Text style={styles.timeLabel}>
                      {leftTimes?.timeLeft?.minutes}
                    </Text>
                    <Text style={styles.timeLabelRegular}>
                      {translate("groupDetails.minute")}
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.timeLabel,
                      ...styles.spaceBoth,
                    }}
                  >{`:`}</Text>
                </>
                <View style={styles.subTimeCal}>
                  <Text style={styles.timeLabel}>
                    {leftTimes?.timeLeft?.seconds}
                  </Text>
                  <Text style={styles.timeLabelRegular}>
                    {translate("groupDetails.second")}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            onGoingEvent()
          ))}

        <View style={styles.eventImg}>
          <ShowImage source={assets?.Meeting} imageStyle={styles.eventImg} />
        </View>
      </View>
      <View style={styles.MainView}>
        {CommonScrollWrapper({
          isLoader: imageLoader,
          memberLoader: memberLoader,
          imageLoader: imageLoader,
          eventDetails: eventDetails,
          refresh: refresh,
          eventTime: eventTime,
          memberList: memberList,
          item: item,
          navigation: navigation,
          images: images,
          setDelIndex: setDelIndex,
          setIsDelete: setIsDelete,
          schema: schema,
          openLink: openLink,
        })}
      </View>
      {isDelete ? (
        <AlertBox
          visible={isDelete}
          title={I18n.t("addEvent.deleteImage")}
          message={I18n.t("addEvent.removeImage")}
          titleStyle={AlertTitle}
          messageStyle={MessageStyle}
          onTouchOutside={() => setIsDelete(false)}
          onYes={async () => {
            setIsLoader(true);
            removeImage(delIndex);
          }}
          onCancel={() => setIsDelete(false)}
          onYesText={"Yes"}
          onCancelText={"No"}
          onClear={undefined}
        />
      ) : null}
      {isEdit ? (
        <AlertBox
          visible={isEdit}
          title={I18n.t("addEvent.requiredAccess")}
          message={I18n.t("addEvent.EditEventAccess")}
          titleStyle={AlertTitle}
          messageStyle={MessageStyle}
          onTouchOutside={() => setIsEdit(false)}
          onYes={() => {
            refRBSheet.current.close();
            setIsEdit(false);
          }}
          onCancel={() => setIsEdit(false)}
          onYesText={"Ok"}
          onClear={undefined}
          noCancel={true}
        />
      ) : null}
    </View>
  );
};

const CommonScrollWrapper = (props) => {
  const {
    isLoader,
    memberLoader,
    imageLoader,
    eventDetails,
    refresh,
    eventTime,
    memberList,
    item,
    navigation,
    images,
    setDelIndex,
    setIsDelete,
    schema,
    openLink,
  } = props;
  if (isLoader && memberLoader && imageLoader) {
    return <Loader />;
  } else if (!isLoader && !memberLoader && !imageLoader && !eventDetails) {
    return (
      <EmptyView
        title={I18n.t("EmptyView.noData")}
        onPressRefresh={() => refresh()}
      />
    );
  } else {
    return (
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={styles.fullFlex}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.calOne}>
            <View style={styles.subCalOne}>
              <View style={{ width: "80%" }}>
                <Text numberOfLines={1} style={styles.eventTitle}>
                  {eventDetails?.title}
                </Text>
              </View>

              {/* //icon 1 */}
              {eventDetails?.startDate && (
                <View style={styles.dateWrapper}>
                  <Text style={styles.monthCal}>
                    {moment(Number(eventDetails?.startDate)).format("MMM")}
                  </Text>
                  <Text style={styles.dateCal}>
                    {moment(Number(eventDetails?.startDate)).format("DD")}
                  </Text>
                </View>
              )}
            </View>
            {eventDetails?.createdBy && (
              <View style={styles.subCalSecond}>
                <ShowImage
                  url={eventDetails?.profileImageUrl?.replace("45x45", "0x0")}
                  imageStyle={styles.profileImage}
                  resizeMode="cover"
                />
                <Text style={styles.organizeBy}>
                  {translate("groupDetails.OrganizedBy")}
                  <Text
                    numberOfLines={2}
                    style={styles.organizeByBold}
                  >{` ${eventDetails?.createdBy}`}</Text>
                </Text>
              </View>
            )}
            {eventTime?.start != "" && (
              <View style={styles.eventTimeWrapper}>
                <View style={{ ...styles.dateWrapperIcn, ...styles.addSpace }}>
                  <MaterialIcons
                    name="date-range"
                    size={fontSize(23)}
                    color={color.palette.lightGrey}
                  />
                  <Text
                    numberOfLines={2}
                    style={styles.eventTimeCal}
                  >{`${eventTime?.start} `}</Text>
                </View>
                <View style={styles.dateWrapperIcn}>
                  <FontAwesome
                    name="calendar-check-o"
                    size={fontSize(19)}
                    color={color.palette.lightGrey}
                  />
                  <Text
                    numberOfLines={2}
                    style={styles.eventTimeCal}
                  >{`${eventTime?.end} `}</Text>
                </View>
              </View>
            )}
            {eventDetails.location && (
              <View style={styles.locationWrapper}>
                <MaterialIcons
                  name="location-on"
                  size={fontSize(25)}
                  color={color.palette.lightGrey}
                />
                <View style={styles.entireLocation}>
                  <Text numberOfLines={2}>
                    {eventDetails.location && (
                      <Text
                        style={{
                          ...styles.eventTimeCal1,
                        }}
                      >{` ${eventDetails.location}`}</Text>
                    )}
                    {eventDetails.address && (
                      <Text
                        style={{
                          ...styles.eventTimeCal1,
                        }}
                      >{` ${eventDetails.address}`}</Text>
                    )}
                    {eventDetails.city && (
                      <Text
                        style={{
                          ...styles.eventTimeCal1,
                        }}
                      >{` , ${eventDetails.city}`}</Text>
                    )}
                    {eventDetails.state && (
                      <Text
                        style={{
                          ...styles.eventTimeCal1,
                        }}
                      >{` , ${eventDetails.state}`}</Text>
                    )}
                    {eventDetails.postalCode && (
                      <Text
                        style={{
                          ...styles.eventTimeCal1,
                        }}
                      >{` , ${eventDetails.postalCode}`}</Text>
                    )}
                    {eventDetails.country && (
                      <Text
                        style={{
                          ...styles.eventTimeCal1,
                        }}
                      >{` , ${eventDetails.country}`}</Text>
                    )}
                  </Text>
                </View>
              </View>
            )}
            {memberList?.length != 0 && (
              <View style={styles.members}>
                <View>
                  <Text style={styles.membersLbl}>
                    {translate("groupDetails.MembersLbl")}
                  </Text>
                </View>
                <View style={styles.listing}>
                  <FlatList
                    horizontal
                    data={memberList}
                    scrollEnabled={false}
                    style={{ zIndex: -9 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={(item) => item?.id}
                  />
                  {memberList?.length > 7 && (
                    <TouchableOpacity style={styles.listingPlus}>
                      <AntDesign
                        name="plus"
                        size={fontSize(17)}
                        color={color.palette.white}
                      />
                    </TouchableOpacity>
                  )}

                  <View style={{ ...styles.peoples, ...styles.peoplesOther }}>
                    <Text style={styles.totalMemberBold}>
                      <Text
                        style={{
                          ...styles.totalMemberBold,
                          ...styles.totalMember,
                        }}
                      >{`${memberList?.length}`}</Text>
                      {` ${translate("groupDetails.PeopleAreJoining")}`}
                    </Text>

                    {memberList?.length > 7 && (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(PROFILE?.MemberListing, {
                            data: memberList,
                          })
                        }
                      >
                        <Text style={styles.totalMemberBold}>
                          {translate("groupDetails.SeeAll")}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            )}
            {images?.length != 0 && (
              <View style={styles.members}>
                <View style={styles.members}>
                  <Text style={styles.membersLbl}>
                    {translate("groupDetails.Attachments")}
                  </Text>
                </View>

                <View style={{ ...styles.imagesCal, ...styles.spaceBot }}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    keyExtractor={(item) => item.id}
                    // numColumns={4}
                    initialNumToRender={4}
                    style={{ flex: 1 }}
                    horizontal
                    renderItem={({ item, index }) => {
                      return (
                        <View>
                          <View style={styles.uploadImageWrap}>
                            <ShowImage
                              url={item?.imageUrl}
                              imageStyle={styles.uploadImage}
                              resizeMode="cover"
                              imageList={[{ uri: item?.imageUrl }]}
                            />
                          </View>
                          <View style={styles.rollupDeleteIcon}>
                            <MaterialIcons
                              onPress={() => {
                                setDelIndex(item?.id);
                                setIsDelete(true);
                              }}
                              name="delete"
                              size={fontSize(17)}
                              color={color.red}
                            />
                          </View>
                        </View>
                      );
                    }}
                    // contentContainerStyle={styles.list}
                  />
                  {images?.length > 4 && (
                    <View style={styles.backIcnImg}>
                      <MaterialIcons
                        name={"chevron-right"}
                        size={fontSize(30)}
                        color={color.dullOrange}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
            {eventDetails?.description && (
              <View style={styles.members}>
                <View>
                  <Text style={styles.membersLbl}>
                    {translate("groupDetails.DetailsLbl")}
                  </Text>
                </View>
                <Text>{eventDetails?.description}</Text>
              </View>
            )}
          </View>

          <View>
            <View style={styles.locationSubView}>
              <Text style={styles.membersLbl}>
                {translate("groupDetails.AboutTheVenue")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (schema) {
                    Linking.openURL(schema).catch((err) =>
                      console.error("Error opening map: ", err)
                    );
                  }
                }}
              >
                <View style={styles.directionWrap}>
                  <Text
                    style={{
                      ...styles.membersLbl,
                      ...styles.membersLblDull,
                    }}
                  >
                    {translate("groupDetails.GetDestination")}
                  </Text>
                  <View style={styles.rightWrap}>
                    <MaterialIcons
                      name={"chevron-right"}
                      size={fontSize(23)}
                      color={color.dullOrange}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.locationView}>
              <ShowImage
                imageStyle={styles.mapImage}
                source={assets?.GoogleMap}
              />
            </View>
          </View>
          {(item?.detailsUrl || item?.registrationUrl || item.ticketsUrl) && (
            <View style={styles.buttons}>
              {item.detailsUrl ? (
                <TouchableOpacity
                  style={styles.buttonOne}
                  onPress={() => openLink(item.detailsUrl)}
                >
                  <Text style={styles.buttonOneLbl}>
                    {translate("addEvent.detailsLbl")}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {item.registrationUrl ? (
                <TouchableOpacity
                  onPress={() => openLink(item.registrationUrl)}
                  style={{ ...styles.buttonOne, ...styles.buttonSecond }}
                >
                  <Text
                    style={{
                      ...styles.buttonOneLbl,
                      ...styles.buttonSecondLbl,
                    }}
                  >
                    {translate("addEvent.registrationLbl")}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {item.ticketsUrl ? (
                <TouchableOpacity
                  style={styles.buttonOne}
                  onPress={() => openLink(item.ticketsUrl)}
                >
                  <Text style={styles.buttonOneLbl}>
                    {translate("addEvent.ticketLbl")}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
};

const renderItem = (item: MemberListing, index) => {
  return (
    <EventMembers
      profileUrl={item?.imageUrl}
      userName={item?.name}
      index={index}
    />
  );
};
