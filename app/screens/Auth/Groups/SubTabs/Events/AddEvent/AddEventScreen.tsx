import React, { useState, useEffect, useRef } from "react";
import { Button, Header, Text, Input } from "@app/components";
import { CommonActions, RouteProp, useRoute } from "@react-navigation/native";

// import external libraries
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import ImagePicker from "react-native-image-crop-picker";
import * as yup from "yup";
import I18n from "@app/i18n/i18n";
import {
  View,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  Image,
} from "react-native";
import { Country } from "react-native-country-picker-modal";
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
  LabelStyle,
  TitleLabel,
  styleWrapper,
  Label1Style,
  CountryLbl,
  CountryLblTitle,
  ImageWrapper,
  ImageSubWrapper,
  BrowseFile,
  plusLabel,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  ImageSelect,
  ActiveImageWrapper,
  cloeIconWrapper,
  style,
} from "./Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addEventGroup } from "@app/services/api/groups";
import { translate } from "@app/i18n";
import { color, fontSize } from "@app/theme";
import moment from "moment";
import {
  GROUP_DETAILS,
  MODULES,
  SafeCountryPicker,
  SafeRBSheet,
  useRBSheetRef,
} from "@app/constants";
import commonStyle from "@app/theme/commonStyle";
import { RNCalendarPicker } from "@app/components/CalendarPicker/RNCalendarPicker";
import TimePickerClock from "@app/components/TimePickerClock/TimePickerClock";
import { AntDesign, Entypo, Feather } from "@app/utils/icons/VectorIcons";
import useAppNavigation from "@app/navigation/navigation";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";

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

export interface AddEventValues {
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
}

type RouteParam = {
  AddEventScreen: {
    uniqueId: string;
    imageUrl: string;
    title: string;
    canEditInfo: any;
    screen: string;
  };
};

export const AddEventScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RouteParam, "AddEventScreen">>();
  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  const { uniqueId, title, imageUrl, canEditInfo } = group_detail;

  const [isCountryVisible, setisCountryVisible] = useState(false);
  const [country, setCountry] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const [isLoader, setIsloader] = useState(false);
  const [imageFile, setImageFile] = useState<any>();
  const [countryCode, setCountryCode] = useState("US");
  const [withCountryNameButton] = useState(false);
  const [withFlag] = useState(true);
  const [withEmoji] = useState(false);
  const [withFilter] = useState(true);
  const [withAlphaFilter] = useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  let currentOffset = new Date().toString().match(/GMT([-+]\d{4})/)[1];

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
  const refRBSheetImage = useRBSheetRef();
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [sTime, setSTime] = useState("");
  const [eTime, setETime] = useState("");

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setSelectedCountry(JSON.parse(JSON.stringify(country.name)));
    setCountry(country);
  };

  const initialValues: AddEventValues = {
    eventName: "",
    description: "",
    eventStartDate: "",
    eventEndDate: "",
    eventStartTime: "",
    eventEndTime: "",
    address: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    detailUrl: "",
    registationUrl: "",
    ticketUrl: "",
  };

  const addEventApiCall = async (values: any) => {
    const fileName = imageFile?.path?.split("/").pop() || `${Date.now()}.jpg`;
    const mime = imageFile?.mime || "image/jpeg";
    const photo = {
      uri: imageFile?.path,
      type: mime,
      name: fileName,
    };
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");

    const formData = new FormData();
    formData.append("profile", uniqueId);
    formData.append("title", values.eventName);
    formData.append("description", values.description);
    formData.append("category", "Events");
    formData.append("startDate", values.sFullDateStamp * 1000);
    formData.append("endDate", values.eFullDateStamp * 1000);
    formData.append("location", values.address);
    formData.append("addressLine1", values.street);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("postalCode", values.postalCode);
    formData.append("detailsUrl", values.detailUrl);
    formData.append("registrationUrl", values.registationUrl);
    formData.append("ticketsUrl", values.ticketUrl);
    formData.append("token", fcmtoken);

    formData.append("country", country.name ?? "United States");
    if (imageFile?.path) {
      formData.append("file", photo);
    }

    setIsloader(true);

    addEventGroup(formData)
      .then((res) => {
        setIsloader(false);
        //   console.log('addNewGroup', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t("addEvent.EventAdded"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            !route?.params?.screen
              ? navigation.dispatch({
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
                          fromss: "Events",
                          reload: true,
                        },
                      },
                    ],
                  }),
                })
              : navigation.navigate(MODULES.GroupDetailsScreen, {
                  imageUrl: imageUrl,
                  title: title,
                  uniqueId: uniqueId,
                  canEditInfo: canEditInfo,
                  fromss: GROUP_DETAILS.Rx,
                  issueTabs: GROUP_DETAILS.Rx,
                  screen: route?.params?.screen,
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
            text: res.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsloader(false);
        console.log("err==", err);
      });
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setEndDatePickerVisibility(false);
    setTimePickerVisibility(false);
    setEndTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let datVal = moment(date).format("DD-MM-YYYY");

    setSDate(datVal);
    setEDate(datVal);

    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleEndConfirm = (date) => {
    let datVal = moment(date).format("DD-MM-YYYY");
    setEDate(datVal);
    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
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

    // Adjust hour for AM/PM format
    if (time.selectedPeriod === "PM" && hour !== 12) {
      hour += 12;
    } else if (time.selectedPeriod === "AM" && hour === 12) {
      hour = 0;
    }

    // Create a Date object for the selected start time
    let localDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hour,
      time.selectedMinute,
      0
    );

    // Check if the selected start time is in the past
    if (localDate < currentDate) {
      localDate.setDate(localDate.getDate() + 1); // Move to the next day
    }

    // Calculate the end time by adding 1 hour
    let endDate = new Date(localDate);
    endDate.setHours(localDate.getHours() + 1);

    // Handle midnight crossing for the end time
    if (endDate.getDate() !== localDate.getDate()) {
      endDate.setDate(localDate.getDate() + 1);
    }

    // Format start and end times for display
    const startTime = moment(localDate).format("HH:mm:ss");
    const endTime = moment(endDate).format("HH:mm:ss");
    const endDateFormatted = moment(endDate).format("DD-MM-YYYY");

    // Update states
    setSTime(startTime);
    setETime(endTime);
    setEDate(endDateFormatted);

    Keyboard.dismiss();
    hideDatePicker();
  };

  const pickSingle = () => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: "photo",
    })
      .then((image) => {
        setImageFile(image);
        refRBSheetImage.current.close();

        setIsloader(false);
      })
      .catch((e) => {
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

        setIsloader(false);
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

  const handleEndTimeConfirm = (time) => {
    console.warn("A time has been picked: ", time);
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

  const showDatePicker = (date) => {
    setDatePickerVisibility(true);
  };
  const showTimePicker = (date) => {
    setTimePickerVisibility(true);
  };

  const showEndTimePicker = (date) => {
    setEndTimePickerVisibility(true);
  };

  const showEndDatePicker = (date) => {
    setEndDatePickerVisibility(true);
  };

  useEffect(() => {
    let TodayDateMoment = moment();
    let localTodayDate = moment.utc(TodayDateMoment).local().format();
    let date = moment(localTodayDate).format("DD-MM-YYYY");
    let time = moment(localTodayDate).set("seconds", 0).format("HH:mm:ss");
    let etime = moment(localTodayDate)
      .set("seconds", 0)
      .add(1, "hours")
      .format("HH:mm:ss");

    setSDate(date);
    setEDate(date);
    setSTime(time);
    setETime(etime);

    const subscibe = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => subscibe.remove();
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  return (
    <View testID="AddEventScreen" style={FULL}>
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
          title={translate("addEvent.addEvent")}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>

      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
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
      />
      <TimePickerClock
        isVisible={isEndTimePickerVisible}
        onConfirm={handleEndTimeConfirm}
        onClose={hideDatePicker}
      />

      <View style={BODY}>
        <RNKeyboardView
          keyboardVerticalOffset={fontSize(100)}
          containerStyle={style.root}
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

              const backgroundData = {
                ...values,
                sFullDate: fullsDate,
                eFullDate: fulleDate,
                sFullDateStamp: fullsDateStamp,
                eFullDateStamp: fulleDateStamp,
              };
              if (backgroundData.eventName && backgroundData.description) {
                if (moment(fulleDate).isSameOrAfter(fullsDate)) {
                  Keyboard.dismiss();
                  addEventApiCall(backgroundData);
                } else {
                  Snackbar.show({
                    text: "End Time should be greater than Start Time",
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
                    label={translate("addEvent.descriptionLbl")}
                    value={values.description}
                    styleLable={TitleLabel}
                    style={{ ...LabelStyle, ...Label1Style }}
                    styleWrapper={styleWrapper}
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
                      onPress={showDatePicker}
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
                        //  autoFocus={true}
                        onSubmitEditing={() => {
                          inputStartTime.current.focus();
                        }}
                        onFocus={showDatePicker}
                        error={touched.startDate && errors.startDate}
                        returnKeyType="next"
                        ref={inputStartDate}
                        editable={false}
                        blurOnSubmit={false}
                        placeholder={translate("addEvent.startDate")}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={showTimePicker}
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
                        onFocus={showTimePicker}
                        error={touched.startTime && errors.startTime}
                        returnKeyType="next"
                        ref={inputStartTime}
                        blurOnSubmit={false}
                        // onFocus={false}
                        editable={false}
                        placeholder={translate("addEvent.startTime")}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={showEndDatePicker}
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
                        onFocus={showEndDatePicker}
                        error={touched.startDate && errors.startDate}
                        returnKeyType="next"
                        ref={inputEndDate}
                        editable={false}
                        blurOnSubmit={false}
                        placeholder={translate("addEvent.endDate")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={showEndTimePicker}
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
                        onFocus={showEndTimePicker}
                        error={touched.endTime && errors.endTime}
                        returnKeyType="next"
                        ref={inputEndTime}
                        blurOnSubmit={false}
                        //onFocus={false}
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
                      {imageFile?.path ? (
                        <View style={ActiveImageWrapper}>
                          <TouchableOpacity
                            style={cloeIconWrapper}
                            onPress={() => {
                              setImageFile({});
                            }}
                          >
                            <AntDesign
                              size={fontSize(14)}
                              color={color.white}
                              name={"close"}
                            />
                          </TouchableOpacity>
                          <Image
                            source={{ uri: imageFile?.path }}
                            style={ImageSelect}
                            resizeMode="stretch"
                          />
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
                    onSubmitEditing={() => {
                      inputDetailsUrl.current.focus();
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
                    onSubmitEditing={() => {
                      inputRegistationUrl.current.focus();
                    }}
                    error={touched.detailUrl && errors.detailUrl}
                    ref={inputDetailsUrl}
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
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    returnKeyType="done"
                    ref={inputTicketUrl}
                    blurOnSubmit={false}
                    placeholder={translate("addEvent.ticketUrl")}
                  />
                </View>

                <Button
                  tx={"Userprofile.submit"}
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
