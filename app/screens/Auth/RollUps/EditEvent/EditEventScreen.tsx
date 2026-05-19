import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  Image,
} from "react-native";

// import external libraries
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";
import md5 from "md5";
import RNFetchBlob from "rn-fetch-blob";
import ImagePicker from "react-native-image-crop-picker";
import { Country } from "react-native-country-picker-modal";
import { RouteProp, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
// import custom function
import { Button, Header, Text, Input, Loader } from "@app/components";
import I18n from "@app/i18n/i18n";
import { translate } from "@app/i18n";
import uuid from "react-native-uuid";
import { Config } from "react-native-config";

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
  COUNTRY_BODY,
  COUNTRY_BODY_TEXT,
  TitleLabel,
  LabelStyle,
  styleWrapper,
  Label1Style,
  CountryLblTitle,
  CountryLbl,
  ImageWrapper,
  ImageSubWrapper,
  ActiveImageWrapper,
  cloeIconWrapper,
  ImageSelect,
  BrowseFile,
  plusLabel,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  Style,
} from "./Style";
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import { RNCalendarPicker } from "@app/components/CalendarPicker/RNCalendarPicker";
import TimePickerClock from "@app/components/TimePickerClock/TimePickerClock";
import ShowImage from "@app/components/FastImage/ShowImage";
import { SafeCountryPicker, SafeRBSheet, useRBSheetRef } from "@app/constants";
import useAppNavigation from "@app/navigation/navigation";
import { AntDesign, Entypo, Feather } from "@app/utils/icons/VectorIcons";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";

// Declare Variables
let sFullDate = "";
let eFullDate = "";
let sFullDateStamp = 0;
let eFullDateStamp = 0;

// Declare validation schema
const validationSchema = yup.object().shape({
  eventName: yup
    .string()
    .label(I18n.t("addEvent.eventName"))
    .required(I18n.t("addEvent.enterEventNamePlease")),
  description: yup
    .string()
    .label(I18n.t("addEvent.description"))
    .required(I18n.t("addEvent.enterDescriptionPlease")),
});

/**
 *  EditEvent Props
 */
export interface EditEventValues {
  eventName: string;
  description: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  address: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  detailUrl: string;
  registationUrl: string;
  ticketUrl: string;
  imageFile: {};
}

type EditEventParams = {
  EditEvent: {
    item?: {
      uniqueId?: string;
      [key: string]: any;
    };
    From?: string;
    setReload: any;
  };
};

type RouteType = RouteProp<EditEventParams, "EditEvent">;

/**
 *  EditEvent Component
 */
const { groups } = content;
export const EditEventScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteType>();
  const item = route?.params?.item;
  const from = route.params?.From;
  const timezoneReg = /GMT([-+]\d{4})/;
  const execResult = timezoneReg.exec(new Date().toString());
  const { login_detail } = useRedux([groups.loginDetail]);
  const currentOffset = execResult ? execResult[1] : "";
  const [sTime, setSTime] = useState(
    moment(item.startDate.slice(0, -3) * 1000)
      .seconds(0)
      .format("HH:mm:ss")
  );
  const [sDate, setSDate] = useState(
    moment(item.startDate.slice(0, -3) * 1000).format("DD-MM-YYYY")
  );
  const [eDate, setEDate] = useState(
    moment(item.endDate.slice(0, -3) * 1000).format("DD-MM-YYYY")
  );
  const [eTime, setETime] = useState(
    moment(item.endDate.slice(0, -3) * 1000)
      .seconds(0)
      .format("HH:mm:ss")
  );

  let fullDate = `${sDate}T${sTime}${currentOffset}`;
  let efullDate = `${eDate}T${eTime}${currentOffset}`;
  let fullDateStamp = moment(fullDate).unix();
  let efullDateStamp = moment(efullDate).unix();

  sFullDate = JSON.parse(JSON.stringify(fullDate));
  eFullDate = JSON.parse(JSON.stringify(efullDate));
  sFullDateStamp = JSON.parse(JSON.stringify(fullDateStamp));
  eFullDateStamp = JSON.parse(JSON.stringify(efullDateStamp));
  const [imageFile, setImageFile] = useState<any>({});
  const [isCountryVisible, setisCountryVisible] = useState(false);
  const [country, setCountry] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState(
    item?.country ? item?.country.trim() : "United States"
  );

  const [isLoader, setIsLoader] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [withCountryNameButton] = useState(false);
  const [withFlag] = useState(true);
  const [withEmoji] = useState(false);
  const [withFilter] = useState(true);
  const [withAlphaFilter] = useState(true);
  const refRBSheetImage = useRBSheetRef();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });

  const inputeEventName = useRef(null);
  const inputDescription = useRef(null);
  const inputStartDate = useRef(null);
  const inputStartTime = useRef(null);
  const inputEndDate = useRef(null);
  const inputEndTime = useRef(null);
  const inputLocation = useRef(null);
  const inputStreet = useRef(null);
  const inputCity = useRef(null);
  const inputState = useRef(null);
  const inputZipcode = useRef(null);
  const inputDetailsUrl = useRef(null);
  const inputRegistationUrl = useRef(null);
  const inputTicketUrl = useRef(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setSelectedCountry(JSON.parse(JSON.stringify(country.name)));
    setCountry(country);
  };

  const initialValues: EditEventValues = {
    eventName: item?.title ? item.title : "",
    description: item?.description ? item.description : "",
    eventStartDate: "",
    eventEndDate: "",
    eventStartTime: "",
    eventEndTime: "",
    address: item?.location ? item.location : "",
    street: item?.addressLine1 ? item.addressLine1 : "",
    city: item?.city ? item.city : "",
    state: item?.state ? item.state : "",
    country: item?.country ? item.country : "United States",
    postalCode: item?.postalCode ? item.postalCode : "",
    detailUrl: item?.detailsUrl ? item.detailsUrl : "",
    registationUrl: item?.registrationUrl ? item.registrationUrl : "",
    ticketUrl: item?.ticketsUrl ? item.ticketsUrl : "",
    imageFile: item?.eventImageUrl ? item?.eventImageUrl.path : {},
  };

  const addGroupApiCall = async (values) => {
    console.log("========>", "hey cook");

    const ha1 = md5(
      `${loginDetail?.email}:${Config.REALM}:${loginDetail?.password}`
    );
    const ha2 = md5(`POST:/api/event?format=json`);
    const currentDate = new Date().toISOString().slice(0, 10); // Format: yyyy-mm-dd
    const responseAuth = md5(`${ha1}:${currentDate}:${ha2}`);

    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      "X-Concursive-Key": Config.AUTH_KEY,
      "X-Concursive-Platform": "android",
      Authorization: `Digest username="${loginDetail?.email}", Config.REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/event?format=json", algorithm="MD5", response="${responseAuth}"`,
    };

    const formData = [
      { name: "profile", data: item?.uniqueId },
      { name: "eventId", data: item?.id },
      { name: "title", data: values.eventName },
      { name: "description", data: values.description },
      { name: "category", data: "Events" },
      { name: "startDate", data: `${sFullDateStamp * 1000}` },
      { name: "endDate", data: `${eFullDateStamp * 1000}` },
      { name: "location", data: values.address },
      { name: "addressLine1", data: values.street },
      { name: "city", data: values.city },
      { name: "state", data: values.state },
      { name: "postalCode", data: values.postalCode },
      { name: "detailsUrl", data: values.detailUrl },
      { name: "registrationUrl", data: values.registationUrl },
      { name: "ticketsUrl", data: values.ticketUrl },
      { name: "token", data: await AsyncStorage.getItem("fcmtoken") },
      { name: "country", data: country.name || "United States" },
    ];

    if (imageFile?.path) {
      const uri = imageFile?.path.replace("file:///", "/");
      const path = imageFile?.path ? imageFile?.path : imageFile?.uri;
      const extension = path?.split(".").pop();
      const keyUid = `${uuid.v4()}.${extension}`;
      const mime = imageFile?.mime || "image/jpeg";
      formData.push({
        name: "file",
        filename: keyUid,
        type: mime,
        data: RNFetchBlob.wrap(uri),
      } as any);
    }

    setIsLoader(true);

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/event?format=json`,
      headers,
      formData
    )
      .then((res) => {
        setIsLoader(false);
        const response = JSON.parse(res.data);
        route?.params?.setReload(true);
        if (response && response.length > 0) {
          if (response[0]?.objectList?.length > 0) {
            Snackbar.show({
              text: I18n.t("TabTitle.EventUpdated"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            global.refreshList = true;
            from === "calender" ? navigation.goBack() : navigation.pop(2);
          } else {
            Snackbar.show({
              text: "Access is required",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
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
        setIsLoader(false);
        console.log("Error in catch:", err);
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
        setImageFile(image);
        refRBSheetImage.current.close();

        setIsLoader(false);
      })
      .catch((e) => {
        console.log(e);

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
    ImagePicker.openCamera({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        setImageFile(image);
        refRBSheetImage.current.close();

        setIsLoader(false);
      })
      .catch((e) => {
        console.log(e);

        Snackbar.show({
          text: e.message ? e.message : e,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };
  useEffect(() => {
    getData();
    handleStatusbar();
    const focus = navigation.addListener("focus", () => {
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, [navigation]);

  const handleStatusbar = () => {};

  const backAction = () => {
    handleStatusbar();
    navigation.goBack();

    return true;
  };

  const getData = async () => {
    // const loginData: any = await getUserDetail();
    setLoginDetail({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
    setIsEndDatePickerVisible(false);
    setIsTimePickerVisible(false);
    setIsEndTimePickerVisible(false);
  };

  const handleConfirm = (date) => {
    let Dates = moment(date).format("DD-MM-YYYY");
    setSDate(Dates);
    setEDate(Dates);
    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleEndConfirm = (date) => {
    let dateVal = moment(date).format("DD-MM-YYYY");
    setEDate(dateVal);
    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    // Parse the current date from sDate or use the current system date
    const currentDate = sDate
      ? moment(sDate, "DD-MM-YYYY")
          .set({
            hour: time.selectedHour,
            minute: time.selectedMinute,
            second: 0,
          })
          .toDate()
      : new Date();

    let hour = time.selectedHour;

    // Adjust hour based on AM/PM
    if (time.selectedPeriod === "PM" && hour !== 12) {
      hour += 12;
    } else if (time.selectedPeriod === "AM" && hour === 12) {
      hour = 0;
    }

    // Create a Date object for the selected time
    let localDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hour,
      time.selectedMinute,
      0 // Seconds are 0
    );

    // Check if the selected time is in the past
    const now = new Date();
    if (localDate < now && moment(localDate).isSame(moment(now), "day")) {
      localDate.setDate(localDate.getDate() + 1); // Move start time to the next day
    }

    // Add 1 hour for the end time
    let endDate = new Date(localDate);
    endDate.setHours(localDate.getHours() + 1);

    // Format times and dates
    const startTime = moment(localDate).format("HH:mm:ss");
    const endTime = moment(endDate).format("HH:mm:ss");
    const endDateFormatted = moment(endDate).format("DD-MM-YYYY");

    // Update state variables
    setSTime(startTime); // Start time
    setETime(endTime); // End time
    setEDate(endDateFormatted); // End date

    // Dismiss the keyboard and close the date picker
    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleEndTimeConfirm = (time) => {
    const currentDate = new Date();
    let hour = time.selectedHour;
    if (time.selectedPeriod === "PM" && hour !== 12) {
      hour += 12;
    } else if (time.selectedPeriod === "AM" && hour === 12) {
      hour = 0;
    }

    const localDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hour,
      time.selectedMinute,
      0
    );

    // Convert to ISO string in UTC
    const utcDate = localDate.toISOString();
    let Time = moment(utcDate).format("HH:mm:ss");
    setETime(Time);
    Keyboard.dismiss();
    hideDatePicker();
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const showEndTimePicker = () => {
    setIsEndTimePickerVisible(true);
  };

  const showEndDatePicker = () => {
    setIsEndDatePickerVisible(true);
  };
  return (
    <View testID="EditEventScreen" style={FULL}>
      <SafeRBSheet
        ref={refRBSheetImage}
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
                style={Style.padLeftCommon}
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
                style={Style.padLeftCommon}
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
          title={translate("TabTitle.EditEvent")}
          icon="chevron-left"
          onPressLeft={() => {
            handleStatusbar();
            navigation.goBack();
          }}
        />
      </View>
      <RNCalendarPicker
        isVisible={isDatePickerVisible}
        onClose={hideDatePicker}
        onDateSelect={handleConfirm}
        selectedDate={sDate}
        mode={"future"}
      />
      <RNCalendarPicker
        isVisible={isEndDatePickerVisible}
        onClose={hideDatePicker}
        onDateSelect={handleEndConfirm}
        selectedDate={eDate}
        mode={"future"}
      />

      <TimePickerClock
        isVisible={isTimePickerVisible}
        // mode="time"
        onConfirm={handleTimeConfirm}
        onClose={hideDatePicker}
        currentTimeStamp={item.startDate}
      />
      <TimePickerClock
        isVisible={isEndTimePickerVisible}
        onConfirm={handleEndTimeConfirm}
        onClose={hideDatePicker}
        currentTimeStamp={item.endDate}
      />
      <View style={BODY}>
        <RNKeyboardView
          keyboardVerticalOffset={fontSize(80)}
          containerStyle={Style.root}
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values: any) => {
              let updateSDate = moment(sDate, "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              );
              let updateEDate = moment(eDate, "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              );
              let fullsDate = `${updateSDate}T${sTime}${currentOffset}`;
              let fullsDateStamp = moment(fullsDate).unix();
              let fulleDate = `${updateEDate}T${eTime}${currentOffset}`;
              let fulleDateStamp = moment(fulleDate).unix();

              sFullDate = fullsDate;
              eFullDate = fulleDate;
              sFullDateStamp = fullsDateStamp;
              eFullDateStamp = fulleDateStamp;

              if (values.eventName && values.description) {
                if (moment(eFullDate).isSameOrAfter(sFullDate)) {
                  Keyboard.dismiss();
                  addGroupApiCall(values);
                } else {
                  Snackbar.show({
                    text: I18n.t("TabTitle.StartEnddateValidation"),
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.palette.red,
                    textColor: color.palette.white,
                    numberOfLines: 5,
                  });
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
                    label={translate("addEvent.eventNameLbl")}
                    mandatory={false}
                    value={values.eventName}
                    onChangeText={handleChange("eventName")}
                    onBlur={handleBlur("eventName")}
                    validation={() => {
                      setFieldTouched("eventName");
                    }}
                    error={touched.eventName && errors.eventName}
                    ref={inputeEventName}
                    onSubmitEditing={() => {
                      inputDescription.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("addEvent.eventName")}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={{ ...LabelStyle, ...Label1Style }}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.descriptionLbl")}
                    value={values.description}
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
                    textAlignVertical={"top"}
                    ref={inputDescription}
                    blurOnSubmit={false}
                    placeholder={translate("addEvent.description")}
                  />

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => showDatePicker()}
                      style={{ flex: 1, marginRight: 5 }}
                    >
                      <Input
                        styleLable={TitleLabel}
                        style={LabelStyle}
                        styleWrapper={styleWrapper}
                        label={translate("addEvent.startDate")}
                        value={sDate}
                        onChangeText={handleChange("startDate")}
                        onBlur={handleBlur("startDate")}
                        validation={() => {
                          setFieldTouched("startDate");
                        }}
                        onSubmitEditing={() => {
                          inputStartTime.current.focus();
                        }}
                        onFocus={() => {
                          showDatePicker();
                        }}
                        error={touched.startDate && errors.startDate}
                        returnKeyType="next"
                        ref={inputStartDate}
                        editable={false}
                        blurOnSubmit={false}
                        placeholder={translate("addEvent.startDate")}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => showTimePicker()}
                      style={{ flex: 1, marginLeft: 5 }}
                    >
                      <Input
                        styleLable={TitleLabel}
                        style={LabelStyle}
                        styleWrapper={styleWrapper}
                        label={translate("addEvent.startTime")}
                        value={sTime}
                        onChangeText={handleChange("startTime")}
                        onBlur={handleBlur("startTime")}
                        validation={() => {
                          setFieldTouched("startTime");
                        }}
                        error={touched.startTime && errors.startTime}
                        returnKeyType="next"
                        ref={inputStartTime}
                        blurOnSubmit={false}
                        onFocus={false}
                        editable={false}
                        placeholder={translate("addEvent.startTime")}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => showEndDatePicker()}
                      style={{ flex: 1, marginRight: 5 }}
                    >
                      <Input
                        styleLable={TitleLabel}
                        style={LabelStyle}
                        styleWrapper={styleWrapper}
                        label={translate("addEvent.endDate")}
                        value={eDate}
                        onChangeText={handleChange("endDate")}
                        onBlur={handleBlur("endDate")}
                        validation={() => {
                          setFieldTouched("endDate");
                        }}
                        error={touched.startDate && errors.startDate}
                        returnKeyType="next"
                        ref={inputEndDate}
                        editable={false}
                        blurOnSubmit={false}
                        placeholder={translate("addEvent.endDate")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => showEndTimePicker()}
                      style={{ flex: 1, marginLeft: 5 }}
                    >
                      <Input
                        styleLable={TitleLabel}
                        style={LabelStyle}
                        styleWrapper={styleWrapper}
                        label={translate("addEvent.endTime")}
                        value={eTime}
                        onChangeText={handleChange("endTime")}
                        onBlur={handleBlur("endTime")}
                        validation={() => {
                          setFieldTouched("endTime");
                        }}
                        error={touched.endTime && errors.endTime}
                        returnKeyType="next"
                        ref={inputEndTime}
                        blurOnSubmit={false}
                        onFocus={false}
                        editable={false}
                        placeholder={translate("addEvent.endTime")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={ImageWrapper}>
                    <Text style={CountryLblTitle}>
                      {translate("addEvent.uploadEventImage")}
                    </Text>
                    <View style={ImageSubWrapper}>
                      {imageFile?.path != "" ? (
                        <View style={ActiveImageWrapper}>
                          <TouchableOpacity
                            style={cloeIconWrapper}
                            onPress={() => {
                              setImageFile({ path: "" });
                            }}
                          >
                            <AntDesign
                              size={fontSize(14)}
                              color={color.white}
                              name={"close"}
                            />
                          </TouchableOpacity>

                          {!imageFile?.path ? (
                            <ShowImage
                              url={item?.profileImageUrl}
                              imageStyle={ImageSelect}
                              resizeMode="cover"
                            />
                          ) : (
                            <Image
                              source={{
                                uri: imageFile?.path,
                              }}
                              style={ImageSelect}
                              resizeMode="stretch"
                            />
                          )}
                        </View>
                      ) : (
                        <>
                          <Feather
                            size={fontSize(25)}
                            color={color.secondary}
                            name={"upload"}
                          />
                          <TouchableOpacity
                            style={BrowseFile}
                            onPress={() => refRBSheetImage.current.open()}
                          >
                            <Text style={plusLabel}>{"Browse image"}</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                </View>

                <View style={ButtonWrapper1}>
                  <Text style={ExtraTItle}>
                    {I18n.t("Userprofile.LocationInfo")}
                  </Text>
                </View>

                <View style={DetailsWrapper}>
                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.addressLbl")}
                    mandatory={false}
                    value={values.address}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    validation={() => {
                      setFieldTouched("address");
                    }}
                    error={touched.address && errors.address}
                    ref={inputLocation}
                    onSubmitEditing={() => {
                      inputStreet.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("addEvent.address")}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.streetLbl")}
                    mandatory={false}
                    value={values.street}
                    onChangeText={handleChange("street")}
                    onBlur={handleBlur("street")}
                    validation={() => {
                      setFieldTouched("street");
                    }}
                    error={touched.street && errors.street}
                    ref={inputStreet}
                    onSubmitEditing={() => {
                      inputCity.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("addEvent.address")}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.cityLbl")}
                    value={values.city}
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
                    placeholder={translate("addEvent.city")}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.stateLbl")}
                    value={values.state}
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
                    placeholder={translate("addEvent.state")}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.zipCodeLbl")}
                    value={values.postalCode}
                    onChangeText={handleChange("postalCode")}
                    onBlur={handleBlur("postalCode")}
                    validation={() => {
                      setFieldTouched("postalCode");
                    }}
                    error={touched.postalCode && errors.postalCode}
                    returnKeyType="next"
                    ref={inputZipcode}
                    blurOnSubmit={false}
                    placeholder={translate("addEvent.zipCode")}
                  />

                  <View style={{ marginTop: 8 }}>
                    <Text style={CountryLblTitle}>
                      {translate("signUp.countryLbl")}
                    </Text>
                    <View style={COUNTRY_BODY}>
                      <TouchableOpacity
                        style={COUNTRY_BODY_TEXT}
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
                          <Text style={CountryLbl}>{selectedCountry}</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={ButtonWrapper1}>
                  <Text style={ExtraTItle}>
                    {I18n.t("Userprofile.UrlInfo")}
                  </Text>
                </View>

                <View style={DetailsWrapper}>
                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.detailsUrlLbl")}
                    mandatory={false}
                    value={values.detailUrl}
                    onChangeText={handleChange("detailUrl")}
                    onBlur={handleBlur("detailUrl")}
                    validation={() => {
                      setFieldTouched("detailUrl");
                    }}
                    error={touched.detailUrl && errors.detailUrl}
                    ref={inputDetailsUrl}
                    onSubmitEditing={() => {
                      inputRegistationUrl.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("addEvent.detailsUrl")}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.registrationUrlLbl")}
                    value={values.registationUrl}
                    onChangeText={handleChange("registationUrl")}
                    onBlur={handleBlur("registationUrl")}
                    validation={() => {
                      setFieldTouched("registationUrl");
                    }}
                    onSubmitEditing={() => {
                      inputTicketUrl.current.focus();
                    }}
                    error={touched.registationUrl && errors.registationUrl}
                    returnKeyType="next"
                    ref={inputRegistationUrl}
                    blurOnSubmit={false}
                    placeholder={translate("addEvent.registrationUrl")}
                  />

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate("addEvent.ticketUrlLbl")}
                    value={values.ticketUrl}
                    onChangeText={handleChange("ticketUrl")}
                    onBlur={handleBlur("ticketUrl")}
                    validation={() => {
                      setFieldTouched("ticketUrl");
                    }}
                    error={touched.ticketUrl && errors.ticketUrl}
                    returnKeyType="done"
                    ref={inputTicketUrl}
                    blurOnSubmit={false}
                    placeholder={translate("addEvent.ticketUrl")}
                  />
                </View>

                <Button
                  tx={"Userprofile.Update"}
                  style={signUpButtonContainer}
                  isLoader={isLoader}
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
