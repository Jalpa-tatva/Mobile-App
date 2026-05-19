import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  Keyboard,
  Platform,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// import external libraries
import * as yup from "yup";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";
import moment from "moment";

// import custom function
import { Button, InputHealth } from "@app/components";
import { translate } from "@lang/index";
import { getManualDataEntry, postManualData } from "@app/services/api/groups";

// import custom styling & utils
import { styles } from "./styles";
import { color, fontSize } from "@theme/index";
import { SafeFormik } from "@app/constants";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";

/**
 *  ManualMonitoring Props
 */
export interface ManualMonitoringProps {
  bpm: string;
  bloodOx: string;
  glucose: string;
  tempF: string;
  tempC: string;
  bpSystolic: string;
  bpDiastolic: string;
}

/**
 * Declare validation schema
 */
const validationSchema = yup.object().shape({
  weightLb: yup.string().required(translate("addManualHealthData.weightLb")),
  weightKg: yup.string().required(translate("addManualHealthData.weightKg")),
  heightCm: yup.string().required(translate("addManualHealthData.heightCm")),
  heightFt: yup.string().required(translate("addManualHealthData.heightFt")),
  age: yup
    .number()
    .required(translate("addManualHealthData.age"))
    .min(16, "Age must be greater than or equal to 16"),
  bpm: yup.string().required(translate("addManualHealthData.bpm")),
  bloodOx: yup.string().required(translate("addManualHealthData.bloodOx")),
  glucose: yup.string().required(translate("addManualHealthData.glucose")),
  tempF: yup.string().required(translate("addManualHealthData.tempF")),
  tempC: yup.string().required(translate("addManualHealthData.tempC")),
  bpSystolic: yup
    .string()
    .required(translate("addManualHealthData.bpSystolic")),
  bpDiastolic: yup
    .string()
    .required(translate("addManualHealthData.bpDiastolic")),
});

/**
 * ManualMonitoringScreen component
 */
export const ManualMonitoringScreen: React.FC<{
  uniqueIds?: any;
  titles?: any;
  imageUrls?: any;
  activeTab?: any;
  setActiveTab: any;
}> = ({ uniqueIds }) => {
  const [isLoaderForm, setIsLoaderFrom] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [lb, setLb] = useState(""); //weightLbs
  const [kg, setKg] = useState(""); //weightKg
  const [f, setF] = useState(""); //fahrenheit
  const [c, setC] = useState(""); //celsius
  const [Bpm, setBpm] = useState(""); //weightLbs
  const [spo, setSpo] = useState(""); //weightLbs
  const [sysBp, setSysBp] = useState(""); //weightLbs
  const [diaBp, setDiaBp] = useState(""); //weightLbs
  const [glucose, setGlucose] = useState(""); //weightLbs

  const [bgTime, setBgTime] = useState("");
  const [bgUpdateBy, setBgUpdateBy] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const weightLb = useRef(null);
  const bpm = useRef(null);
  const bloodOx = useRef(null);
  const glucoseRef = useRef(null);
  const tempF = useRef(null);
  const tempC = useRef(null);
  const bpSystolic = useRef(null);
  const bpDiastolic = useRef(null);
  const formikRef = useRef(null);

  const lbsToKgConvert = (value1) => {
    if (value1 != "" || null) {
      setLb(value1);
      setKg((value1 / 2.2046).toFixed(2).toString());
    } else {
      setLb("");
      setKg("");
    }
  };

  const fToCTempConvert = (value1) => {
    if (value1 != "" || null) {
      setF(value1);
      setC((((value1 - 32) * 5) / 9).toFixed(2).toString());
    } else {
      setF("");
      setC("");
    }
  };

  const cToFTempConvert = (value2) => {
    if (value2 != "" || null) {
      setC(value2);
      setF(((value2 * 9) / 5 + 32).toFixed(2).toString());
    } else {
      setF("");
      setC("");
    }
  };

  const bpmConvert = (value1) => {
    setBpm(value1);
  };

  const spoConvert = (value1) => {
    setSpo(value1);
  };

  const sysBpConvert = (value1) => {
    if (value1 != "" || null) {
      setSysBp(value1);
      if (diaBp == "") {
        setDiaBp("");
      }
    } else {
      setSysBp("");
    }
  };
  const diaBpConvert = (value1) => {
    if (value1 != "" || null) {
      setDiaBp(value1);
      if (sysBp == "") {
        setSysBp("");
      }
    } else {
      setDiaBp("");
    }
  };
  const glucoseConvert = (value1) => {
    setGlucose(value1);
  };
  useEffect(() => {
    manualMonitoringApiCall();
  }, []);

  const manualMonitoringApiCall = () => {
    setIsLoader(true);
    getManualDataEntry(uniqueIds)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setBgUpdateBy(res.data[0].objectList[0].userName);

            setBgTime(
              moment(res.data[0].objectList[0]?.lastUpdatedTime).format(
                "MMM DD, YYYY,HH:mm a"
              )
            );
          } else {
            setIsLoader(false);
          }
        } else {
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const callApi = async (data: any) => {
    const formData = new FormData();
    formData.append("manualData", JSON.stringify(data));
    formData.append("profile", uniqueIds);

    setIsLoaderFrom(true);
    postManualData(formData)
      .then((res) => {
        setIsLoaderFrom(false);
        // console.log('postProfileBackground111 create manual entry', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: "Manual data entry added successfully.",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            onRefresh();
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
        setIsLoaderFrom(false);
        console.log("err==", err);
      });
  };

  const clearState = () => {
    setEditMode(false);
    setBgUpdateBy("");
    setBgTime("");
    setLb("");
    setKg("");
    setF("");
    setC("");
    setBpm("");
    setSpo("");
    setSysBp("");
    setDiaBp("");
    setGlucose("");
  };
  const onRefresh = () => {
    clearState();
    setRefreshing(false);
    setIsLoader(false);
    setIsLoaderFrom(false);
    setRefreshing(true);
    setTimeout(async () => {
      setRefreshing(false);
      manualMonitoringApiCall();
    }, 1000);
  };

  const checkValidation = () => {
    Keyboard.dismiss();

    let manualData = [];
    let isError = false;

    if (lb !== "") {
      let lbData = {
        deviceName: "WeightScale",
        weightInKg: kg,
        weightLbs: lb,
      };

      manualData.push(lbData);
    }
    if (Bpm !== "" || spo !== "") {
      let lbData = {
        deviceName: "Spo2",
        bloodOxygen: spo ? spo : "0",
        heartRate: Bpm ? Bpm : "0",
      };

      manualData.push(lbData);
    }
    if (f !== "" || c !== "") {
      let lbData = {
        deviceName: "EarTemperature",
        temperatureInCelsius: c ? c : "0",
        temperatureInFahrenheit: f ? f : "0",
      };

      manualData.push(lbData);
    }

    if (sysBp !== "" || diaBp !== "") {
      if (parseInt(sysBp) < parseInt(diaBp)) {
        isError = true;
        Snackbar.show({
          text:
            "Systolic blood pressure should be greater than diastolic blood pressure.",
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      } else {
        let lbData = {
          deviceName: "Bp",
          systolic: sysBp ? sysBp : "0",
          diastolic: diaBp ? diaBp : "0",
        };

        manualData.push(lbData);
      }
    }
    if (glucose !== "") {
      let lbData = {
        deviceName: "BloodSugar",
        glucose: glucose,
      };

      manualData.push(lbData);
    }

    if (!isError && manualData.length > 0) {
      callApi(manualData);
    }

    if (manualData.length <= 0) {
      Snackbar.show({
        text: "Please enter any value...",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  return (
    <View style={styles.root}>
      <RNKeyboardView
        keyboardVerticalOffset={fontSize(180)}
        scrollProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ),
        }}
      >
        <SafeFormik
          validationSchema={validationSchema}
          enableReinitialize
          innerRef={formikRef}
          initialValues={{}}
        >
          {({ handleBlur, setFieldTouched }) => (
            <Fragment>
              {!isLoader ? (
                <View style={styles.statusContainer}>
                  {editMode == true ? (
                    <View
                      style={{
                        ...styles.statusContainer,
                        ...styles.saveWrapper,
                      }}
                    >
                      <Button
                        text="Save"
                        style={styles.button}
                        onPress={checkValidation}
                        textStyle={styles.buttonTitle}
                        isLoader={isLoaderForm}
                        disabled={isLoaderForm}
                      />

                      <Button
                        text="Cancel"
                        style={styles.buttonEditCencel}
                        onPress={() => {
                          clearState();
                        }}
                        textStyle={styles.buttonTitle}
                      />
                    </View>
                  ) : (
                    <Button
                      text="Edit"
                      style={styles.buttonEdit}
                      onPress={() => {
                        console.log("SaveClcik");
                        setEditMode(true);
                      }}
                      textStyle={styles.buttonEditTitle}
                      disabled={false}
                    />
                  )}

                  {bgTime && bgUpdateBy ? (
                    <View style={{ ...styles.status, ...styles.fullFlex }}>
                      <Text style={styles.statusText}>
                        {`${translate("groupDetails.LastUpdated")} ${bgTime}`}
                      </Text>
                      <Text style={styles.statusText}>
                        {`${translate("groupDetails.By")} ${bgUpdateBy}`}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {translate("groupDetails.WeightScale")}
                  </Text>

                  <InputHealth
                    editable={editMode}
                    label={translate("addManualHealthDataLabel.weightLb")}
                    style={editMode == true ? styles.darkInput : null}
                    value={lb}
                    onChangeText={(e) => lbsToKgConvert(e)}
                    onBlur={handleBlur("weightLb")}
                    validation={() => {
                      setFieldTouched("weightLb");
                    }}
                    ref={weightLb}
                    onSubmitEditing={() => {
                      bpm.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                    keyboardType="numeric"
                    placeholder={translate("addManualdataPlaceholder.weightLb")}
                  />

                  <Text style={styles.sectionTitle}>
                    {translate("groupDetails.SpO2")}
                  </Text>
                  <InputHealth
                    editable={editMode}
                    label={translate("addManualHealthDataLabel.bpm")}
                    value={Bpm}
                    onChangeText={(e) => bpmConvert(e)}
                    //  error={bpmError != '' && bpmError}
                    onBlur={handleBlur("bpm")}
                    validation={() => {
                      setFieldTouched("bpm");
                    }}
                    ref={bpm}
                    onSubmitEditing={() => {
                      bloodOx.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                    keyboardType="numeric"
                    placeholder={translate("addManualdataPlaceholder.bpm")}
                    style={editMode == true ? styles.darkInput : null}
                  />
                  <InputHealth
                    editable={editMode}
                    label={translate("addManualHealthDataLabel.bloodOx")}
                    onBlur={handleBlur("bloodOx")}
                    validation={() => {
                      setFieldTouched("bloodOx");
                    }}
                    value={spo}
                    onChangeText={(e) => spoConvert(e)}
                    //  error={spoError != '' && spoError}
                    ref={bloodOx}
                    onSubmitEditing={() => {
                      tempF.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                    keyboardType="numeric"
                    placeholder={translate("addManualdataPlaceholder.bloodOx")}
                    style={editMode == true ? styles.darkInput : null}
                  />

                  <Text style={styles.sectionTitle}>
                    {translate("groupDetails.Temperature")}
                  </Text>
                  {/* <View style={styles.section}> */}
                  <View style={styles.horizontalContainer}>
                    <InputHealth
                      editable={editMode}
                      label={translate("addManualHealthDataLabel.tempF")}
                      style={
                        editMode == true
                          ? styles.darkInputHorizontal
                          : styles.input
                      }
                      value={f}
                      onChangeText={(e) => fToCTempConvert(e)}
                      onBlur={handleBlur("tempF")}
                      validation={() => {
                        setFieldTouched("tempF");
                      }}
                      //  error={fError != '' && fError}
                      ref={tempF}
                      onSubmitEditing={() => {
                        tempC.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                      keyboardType="numeric"
                      placeholder={translate("addManualdataPlaceholder.tempF")}
                    />
                    <InputHealth
                      editable={editMode}
                      label={translate("addManualHealthDataLabel.tempC")}
                      style={
                        editMode ? styles.darkInputHorizontal : styles.input
                      }
                      value={c}
                      onChangeText={(e) => cToFTempConvert(e)}
                      onBlur={handleBlur("tempC")}
                      validation={() => {
                        setFieldTouched("tempC");
                      }}
                      // error={cError != '' && cError}
                      ref={tempC}
                      onSubmitEditing={() => {
                        bpSystolic.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                      keyboardType="numeric"
                      placeholder={translate("addManualdataPlaceholder.tempC")}
                    />
                  </View>
                  {/* </View> */}

                  <Text style={styles.sectionTitle}>
                    {translate("groupDetails.BloodPressure")}
                  </Text>
                  {/* <View style={styles.section}> */}
                  <View style={styles.horizontalContainer}>
                    <InputHealth
                      editable={editMode}
                      label={translate("addManualHealthDataLabel.bpSystolic")}
                      style={
                        editMode == true
                          ? styles.darkInputHorizontal
                          : styles.input
                      }
                      value={sysBp}
                      onChangeText={(e) => sysBpConvert(e)}
                      // error={sysError != '' && sysError}
                      onBlur={handleBlur("bpSystolic")}
                      validation={() => {
                        setFieldTouched("bpSystolic");
                      }}
                      onFocus={() => {
                        console.log("onFocus_sysBp", sysBp);
                      }}
                      ref={bpSystolic}
                      onSubmitEditing={() => {
                        bpDiastolic.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                      keyboardType="numeric"
                      placeholder={translate(
                        "addManualdataPlaceholder.bpSystolic"
                      )}
                    />
                    <InputHealth
                      editable={editMode}
                      label={translate("addManualHealthDataLabel.bpDiastolic")}
                      style={
                        editMode == true
                          ? styles.darkInputHorizontal
                          : styles.input
                      }
                      value={diaBp}
                      onChangeText={(e) => diaBpConvert(e)}
                      // error={diaError != '' && diaError}
                      onBlur={handleBlur("bpDiastolic")}
                      validation={() => {
                        setFieldTouched("bpDiastolic");
                      }}
                      ref={bpDiastolic}
                      onSubmitEditing={() => {
                        glucoseRef.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      keyboardType="numeric"
                      placeholder={translate(
                        "addManualdataPlaceholder.bpDiastolic"
                      )}
                    />
                  </View>

                  <Text style={styles.sectionTitle}>
                    {translate("groupDetails.BloodSugar")}
                  </Text>
                  <InputHealth
                    editable={editMode}
                    label={translate("addManualHealthDataLabel.glucose")}
                    value={glucose}
                    onChangeText={(e) => glucoseConvert(e)}
                    onBlur={handleBlur("glucose")}
                    validation={() => {
                      setFieldTouched("glucose");
                    }}
                    ref={glucoseRef}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    blurOnSubmit={false}
                    returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                    keyboardType="numeric"
                    placeholder={translate("addManualdataPlaceholder.glucose")}
                    style={editMode == true ? styles.darkInput : null}
                  />
                </View>
              </TouchableWithoutFeedback>
            </Fragment>
          )}
        </SafeFormik>
      </RNKeyboardView>
    </View>
  );
};
