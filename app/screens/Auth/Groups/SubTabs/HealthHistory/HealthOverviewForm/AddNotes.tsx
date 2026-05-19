import { View, Keyboard, TouchableOpacity, BackHandler } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";

// import external libraries
import { RouteProp, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";

// import custom function & component
import { Button, Header, Text, Input } from "@app/components";
import I18n from "@app/i18n/i18n";
import { addProgressNote } from "@app/services/api/groups";
import { color, fontSize } from "@app/theme";
import moment from "moment";
import { RNCalendarPicker } from "@app/components/CalendarPicker/RNCalendarPicker";
import TimePickerClock from "@app/components/TimePickerClock/TimePickerClock";
import useAppNavigation from "@app/navigation/navigation";

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
  style,
} from "../../Events/AddEvent/Style";
import { stylesBack } from "./BackgroundStyle";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";

const validationSchema = yup.object().shape({
  eventName: yup.string(),
});

/**
 *  AddEvent Props
 */
export interface AddEventValues {
  eventName: string;
  description: string;
  description1?: string;
  eventStartDate: string;
  eventInitTime: string;
  eventEndDate: string;
  eventInitDate?: string;
  eventStartTime: string;
  eventEndTime: string;
}

type RouteParam = {
  AddNotes: {
    uniqueId: string;
    canEditInfo: string;
    item: any;
  };
};

/**
 *  AddNotes Props
 */
const AddNotes: React.FC = () => {
  const route = useRoute<RouteProp<RouteParam, "AddNotes">>();
  const navigation = useAppNavigation();
  const uniqueId = route.params?.uniqueId;

  const canEditInfo = route.params?.canEditInfo;
  const item = route.params?.item;

  const [, setisCountryVisible] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isTimePickerVisible1, setTimePickerVisibility1] = useState(false);

  let currentOffset = new Date().toString().match(/GMT([-\+]\d{4})/)[1];

  const inputeEventName = useRef(null);
  const inputDescription = useRef(null);
  const inputStartDate = useRef(null);
  const inputStartTime = useRef(null);
  const inputEndDate = useRef(null);
  const inputEndTime = useRef(null);
  const [sDate1, setSDate1] = useState("");
  const [sTime1, setSTime1] = useState("");
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [sTime, setSTime] = useState("");
  const [eTime, setETime] = useState("");
  const [eFullDate, setEFullDate] = useState("");
  const [, setSFullDateStamp] = useState(new Date());
  const [, setEFullDateStamp] = useState(new Date());
  const [, setLimitation] = useState(new Date());

  const initialValues: AddEventValues = {
    eventName: canEditInfo ? item?.physicianClinician : "",
    description: canEditInfo ? item?.assessment : "",
    description1: canEditInfo ? item?.plan : "",
    eventStartDate: "",
    eventEndDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventInitDate: "",
    eventInitTime: "",
  };

  const addEventApiCall = async (values: any) => {
    const formData = new FormData();
    formData.append("profile", uniqueId);
    formData.append("physicianClinician", values.eventName);
    formData.append("assessment", values.description);
    formData.append("plan", values.description1);
    formData.append(
      "nextAppointmentStartDate",
      Number.isNaN(values.sFullDateStamp) ? "-1" : values.sFullDateStamp * 1000
    );
    formData.append(
      "nextAppointmentEndDate",
      Number.isNaN(values.eFullDateStamp) ? "-1" : values.eFullDateStamp * 1000
    );
    formData.append("date", values.initDateTimeStamp * 1000);

    setIsloader(true);

    addProgressNote(formData)
      .then((res) => {
        setIsloader(false);
        console.log("addNewNote", JSON.stringify(res.data[0].status.errorText));
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: "Progress Note Added Successfully",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            navigation.goBack();
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

  const updateEventApiCall = async (values: any) => {
    console.log("addEventApiCall", sDate1);

    const formData = new FormData();
    formData.append("profile", uniqueId);
    formData.append("physicianClinician", values.eventName);
    formData.append("assessment", values.description);
    formData.append("plan", values.description1);
    formData.append(
      "nextAppointmentStartDate",
      Number.isNaN(values.sFullDateStamp) ? "-1" : values.sFullDateStamp * 1000
    );
    formData.append(
      "nextAppointmentEndDate",
      Number.isNaN(values.eFullDateStamp) ? "-1" : values.eFullDateStamp * 1000
    );
    formData.append("date", values.initDateTimeStamp * 1000);
    formData.append("profile", uniqueId);
    formData.append("id", values.id);
    formData.append("eventId", item?.eventId == "" ? "-1" : item?.eventId);
    console.log("audio", item?.eventId == "" ? "-1" : item?.eventId);

    setIsloader(true);

    addProgressNote(formData)
      .then((res) => {
        setIsloader(false);
        console.log("addNewNote", JSON.stringify(res.data[0].status.errorText));
        //   console.log('addNewGroup', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: "Progress Note Edited Successfully",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            navigation.goBack();
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
    setDatePickerVisibility1(false);
    setTimePickerVisibility1(false);
  };

  const handleConfirm = (date) => {
    let Dates = moment(date).format("DD-MM-YYYY");
    setLimitation(new Date(date));
    setSDate(Dates);
    // setEDate(Dates);
    console.log("Date", Dates);

    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleConfirm1 = (date) => {
    var Dates = moment(date).format("DD-MM-YYYY");
    setLimitation(new Date(date));
    setSDate1(Dates);

    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleTimeConfirm1 = (time) => {
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
    const utcDate = localDate.toISOString();
    let Time = moment(utcDate).format("HH:mm:ss");
    setLimitation(new Date(time));
    setSTime1(Time);
    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleEndConfirm = (date) => {
    console.warn("A date", date);
    let dateVal = moment(date).format("DD-MM-YYYY");
    setEDate(dateVal);

    console.log("handleEndConfirmDate", dateVal);
    Keyboard.dismiss();
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
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
    let ETtime = moment(utcDate).add(1, "hours").format("HH:mm:ss");
    console.log("Start Time", Time, ETtime);
    setLimitation(new Date(utcDate));
    setSTime(Time);
    setETime(ETtime);
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

    const utcDate = localDate.toISOString();
    let Time = moment(utcDate).format("HH:mm:ss");
    setETime(Time);
    Keyboard.dismiss();
    hideDatePicker();
  };

  const showDatePicker = (date) => {
    console.log("showDatePickerdate", date);

    let dateVal = moment(date).format("YYYY-MM-DD");
    console.log("Date", dateVal);
    setDatePickerVisibility(true);
  };
  const showTimePicker = (date) => {
    setTimePickerVisibility(true);
  };

  const showDatePicker1 = (date) => {
    setDatePickerVisibility1(true);
  };
  const showTimePicker1 = (date) => {
    setTimePickerVisibility1(true);
  };

  const showEndTimePicker = (date) => {
    console.log("date", date);
    setEndTimePickerVisibility(true);
  };

  const showEndDatePicker = (date) => {
    console.log("date", date);
    var Date = moment(date).format("YYYY-MM-DD");
    console.log("Date", Date);
    setEndDatePickerVisibility(true);
  };

  // useEffect(() => {
  //   const focus = navigation.addListener('focus', () => {
  //     console.log('focus');
  //     //inputStartDate.current.focus();

  //     // const now = new Date()
  //     // const utcTimeOffset = now.getTimezoneOffset() / 60;

  //     let TodayDateMoment = moment();

  //     let localTodayDate = moment.utc(TodayDateMoment).local().format();
  //     console.log('localTime', localTodayDate);
  //     let date = moment(localTodayDate).format('YYYY-MM-DD');
  //     let time = moment(localTodayDate).format('HH:mm:ss');
  //     let etime = moment(localTodayDate).add(1, 'hours').format('HH:mm:ss');

  //     let fullDate = `${date}T${time}${currentOffset}`;
  //     let efullDate = `${date}T${etime}${currentOffset}`;
  //     let fullDateStamp = moment(fullDate).unix();
  //     let efullDateStamp = moment(efullDate).unix();

  //     console.log('useEffectdate', date);

  //     sDate = date;
  //     sTime = time;
  //     eDate = date;
  //     eTime = etime;
  //     sFullDate = JSON.parse(JSON.stringify(fullDate));
  //     eFullDate = JSON.parse(JSON.stringify(efullDate));
  //     sFullDateStamp = JSON.parse(JSON.stringify(fullDateStamp));
  //     eFullDateStamp = JSON.parse(JSON.stringify(efullDateStamp));
  //   });

  //   return focus;
  // }, []);

  useEffect(() => {
    let TodayDateMoment = moment();

    let localTodayDate = moment.utc(TodayDateMoment).local().format();
    console.log("localTime", localTodayDate);
    let date = moment(localTodayDate).format("YYYY-MM-DD");
    let time = moment(localTodayDate).format("HH:mm:ss");
    let etime = moment(localTodayDate).add(1, "hours").format("HH:mm:ss");

    let fullDate = `${date}T${time}${currentOffset}`;
    let efullDate = `${date}T${etime}${currentOffset}`;
    let fullDateStamp = moment(fullDate).unix();
    let efullDateStamp = moment(efullDate).unix();

    console.log("useEffectdate", date);
    let sDate = "";
    let eDate = "";
    let sTime = "";
    let eTime = "";

    if (canEditInfo && item?.nextAppointmentStartDate) {
      sDate = moment
        .unix(item.nextAppointmentStartDate / 1000)
        .format("DD-MM-YYYY");
      sTime = moment
        .unix(item.nextAppointmentStartDate / 1000)
        .set("seconds", 0)
        .format("HH:mm:ss");
    }

    if (canEditInfo && item?.nextAppointmentEndDate) {
      eDate = moment
        .unix(item.nextAppointmentEndDate / 1000)
        .format("DD-MM-YYYY");
      eTime = moment
        .unix(item.nextAppointmentEndDate / 1000)
        .set("seconds", 0)
        .format("HH:mm:ss");
    }

    // Set the state
    setSDate(sDate);
    setEDate(eDate);
    setSTime(sTime);
    setETime(eTime);
    setSTime1(
      canEditInfo
        ? moment
            .unix(item?.date / 1000)
            .set("seconds", 0)
            .format("HH:mm:ss")
        : ""
    );
    setSDate1(
      canEditInfo ? moment.unix(item?.date / 1000).format("DD-MM-YYYY") : ""
    );

    setEFullDate(JSON.parse(JSON.stringify(efullDate)));
    setSFullDateStamp(JSON.parse(JSON.stringify(fullDateStamp)));
    setEFullDateStamp(JSON.parse(JSON.stringify(efullDateStamp)));

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

  const onPressLeft = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View testID="AddEventScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={canEditInfo ? "Edit Progress Note" : "Add Progress Note"}
          icon="chevron-left"
          onPressLeft={onPressLeft}
        />
      </View>

      <RNCalendarPicker
        isVisible={isDatePickerVisible}
        onClose={hideDatePicker}
        onDateSelect={handleConfirm}
        selectedDate={
          sDate === "" ? moment(new Date()).format("DD-MM-YYYY") : sDate
        }
        mode={"future"}
      />

      <RNCalendarPicker
        isVisible={isDatePickerVisible1}
        onClose={hideDatePicker}
        onDateSelect={handleConfirm1}
        selectedDate={
          sDate1 === "" ? moment(new Date()).format("DD-MM-YYYY") : sDate1
        }
        mode={"future"}
      />
      <RNCalendarPicker
        isVisible={isEndDatePickerVisible}
        onClose={hideDatePicker}
        onDateSelect={handleEndConfirm}
        selectedDate={
          eDate === "" ? moment(new Date()).format("DD-MM-YYYY") : eDate
        }
        mode={"future"}
      />

      <TimePickerClock
        isVisible={isTimePickerVisible}
        onConfirm={handleTimeConfirm}
        onClose={hideDatePicker}
      />
      <TimePickerClock
        isVisible={isTimePickerVisible1}
        onConfirm={handleTimeConfirm1}
        onClose={hideDatePicker}
      />
      <TimePickerClock
        isVisible={isEndTimePickerVisible}
        onConfirm={handleEndTimeConfirm}
        onClose={hideDatePicker}
      />

      <View style={BODY}>
        <RNKeyboardView
          onPress={() => {
            Keyboard.dismiss();
            setisCountryVisible(false);
          }}
          containerStyle={style.spaceBoth}
          keyboardVerticalOffset={fontSize(100)}
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values: any) => {
              const updateSDate1 = moment(sDate1, "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              );
              const updateSDate = moment(sDate, "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              );
              const updateEDate = moment(eDate, "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              );
              let initDate = `${updateSDate1}T${sTime1}${currentOffset}`;

              let fullsDate = `${updateSDate}T${sTime}${currentOffset}`;
              let fullsDateStamp = moment(fullsDate).unix();
              let fulleDate = `${updateEDate}T${eTime}${currentOffset}`;
              let fulleDateStamp = moment(fulleDate).unix();

              setEFullDate(eFullDate);
              setSFullDateStamp(
                JSON.parse(JSON.stringify(moment(fullsDate).unix()))
              );
              setEFullDateStamp(
                JSON.parse(JSON.stringify(moment(fulleDate).unix()))
              );

              const backgroundData = {
                ...values,
                id: item?.id,
                initDateTimeStamp: moment(initDate).unix(),
                sFullDateStamp: fullsDateStamp,
                eFullDateStamp: fulleDateStamp,
              };

              if (sDate1 != "" && sTime1 != "") {
                if (moment(fulleDateStamp).isSameOrAfter(fullsDateStamp)) {
                  console.log("Okay");
                  Keyboard.dismiss();
                  canEditInfo
                    ? updateEventApiCall(backgroundData)
                    : addEventApiCall(backgroundData);
                } else if (sDate == "" && sTime == "") {
                  Keyboard.dismiss();
                  canEditInfo
                    ? updateEventApiCall(backgroundData)
                    : addEventApiCall(backgroundData);
                } else {
                  console.log("Not Okay");
                  Snackbar.show({
                    text: "End Time should be greater than Start Time",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.palette.red,
                    textColor: color.palette.white,
                    numberOfLines: 5,
                  });
                }
              } else {
                Snackbar.show({
                  text: "Please select date time field",
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: color.palette.red,
                  textColor: color.palette.white,
                  numberOfLines: 5,
                });
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
                    label={"Assessment / Note"}
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    validation={() => {
                      setFieldTouched("description");
                    }}
                    textarea
                    multiline
                    numberOfLines={10}
                    textAlignVertical={"top"}
                    ref={inputDescription}
                    blurOnSubmit={false}
                    placeholder={"Enter Details"}
                  />

                  <Input
                    label={"Plan"}
                    value={values.description1}
                    onChangeText={handleChange("description1")}
                    onBlur={handleBlur("description")}
                    validation={() => {
                      setFieldTouched("description");
                    }}
                    textarea
                    multiline
                    numberOfLines={10}
                    textAlignVertical={"top"}
                    ref={inputDescription}
                    blurOnSubmit={false}
                    placeholder={"Enter Details"}
                  />

                  <View style={stylesBack.alignRow}>
                    <TouchableOpacity
                      onPress={showDatePicker1}
                      style={stylesBack.startDateAlign}
                    >
                      <Input
                        label={"Date"}
                        value={sDate1}
                        onChangeText={handleChange("startDate")}
                        onBlur={handleBlur("startDate")}
                        validation={() => {
                          setFieldTouched("startDate");
                        }}
                        onSubmitEditing={() => {
                          inputStartTime.current.focus();
                        }}
                        onFocus={showDatePicker1}
                        error={touched.startDate && errors.startDate}
                        returnKeyType="next"
                        ref={inputStartDate}
                        editable={false}
                        blurOnSubmit={false}
                        placeholder={"Select date"}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={showTimePicker1}
                      style={stylesBack.startDateAlignLeft}
                    >
                      <Input
                        label={"Time"}
                        value={sTime1}
                        onChangeText={handleChange("startTime")}
                        onBlur={handleBlur("startTime")}
                        validation={() => {
                          setFieldTouched("startTime");
                        }}
                        onFocus={showTimePicker1}
                        error={touched.startTime && errors.startTime}
                        returnKeyType="next"
                        ref={inputStartTime}
                        blurOnSubmit={false}
                        editable={false}
                        placeholder={"Select Time"}
                      />
                    </TouchableOpacity>
                  </View>

                  <Input
                    label={"Physician / Clinician"}
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
                      Keyboard.dismiss();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="done"
                    placeholder={"Enter Physician / Clinician"}
                  />

                  <View style={stylesBack.alignRow}>
                    <TouchableOpacity
                      onPress={showDatePicker}
                      style={stylesBack.startDateAlign}
                    >
                      <Input
                        label={"Next Appointment Start Date"}
                        value={sDate}
                        onChangeText={handleChange("startDate")}
                        onBlur={handleBlur("startDate")}
                        validation={() => {
                          setFieldTouched("startDate");
                        }}
                        onSubmitEditing={() => {
                          inputStartTime.current.focus();
                        }}
                        onFocus={showDatePicker}
                        error={touched.startDate && errors.startDate}
                        returnKeyType="next"
                        ref={inputStartDate}
                        editable={false}
                        blurOnSubmit={false}
                        placeholder={"Select date"}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={showTimePicker}
                      style={stylesBack.startDateAlignLeft}
                    >
                      <Input
                        label={"Next Appointment Start Time"}
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
                        editable={false}
                        placeholder={"Select time"}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={stylesBack.alignRow}>
                    <TouchableOpacity
                      onPress={showEndDatePicker}
                      style={stylesBack.startDateAlign}
                    >
                      <Input
                        label={"Next Appointment End Date"}
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
                        placeholder={"Select date"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={showEndTimePicker}
                      style={stylesBack.startDateAlignLeft}
                    >
                      <Input
                        label={"Next Appointment End Time"}
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
                        editable={false}
                        placeholder={"Select time"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Button
                  text={canEditInfo ? "Update" : "Submit"}
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

export default AddNotes;
