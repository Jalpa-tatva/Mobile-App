import React, { useState, useRef, useEffect } from "react";
import {
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";

// import external libraries
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";
import moment from "moment";
import * as yup from "yup";
import { Formik } from "formik";

// import custom function
import { Button, Input } from "@components/index";
import { translate } from "@lang/index";
import {
  getProfileBackground,
  postProfileBackground,
} from "@app/services/api/groups";

// import custom styling & utils
import { styles } from "./styles";
import { color, fontSize } from "@theme/index";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";
import { CheckBox } from "../../../../../../../assets/svg/CheckBoxChecked";
import { CheckBoxUnCheck } from "../../../../../../../assets/svg/CheckBoxUnChecked";
/**
 *  BackgroundValues Props
 */
export interface BackgroundValues {
  basicName: string;
  basicEmail: string;
  basicPhone: string;
  basicAlt: string;
  live_zipcode: string;
  primaryName: string;
  primaryContact: string;
  primaryAlt: string;
  secondaryName: string;
  secondaryContact: string;
  secondaryAlt: string;
  emgName: string;
  emgRel: string;
  emgPhone: string;
  primaryCName: string;
  primaryCContact: string;
  primaryCAlt: string;
  secondaryCName: string;
  secondaryCContact: string;
  secondaryCAlt: string;
  policyIn: string;
  policy: string;
  policyPhone: string;
}
const re = /(\d{3})(\d{3})(\d{4})/;
const validationSchema = yup.object().shape({
  primaryContact: yup.string().min(10, "Phone number is not valid"),
  primaryAlt: yup
    .string()

    .min(10, "Phone number is not valid"),
  secondaryContact: yup.string().min(10, "Phone number is not valid"),
  secondaryAlt: yup
    .string()

    .min(10, "Phone number is not valid"),
  emgPhone: yup
    .string()

    .min(10, "Phone number is not valid"),
  primaryCContact: yup
    .string()

    .min(10, "Phone number is not valid"),
  primaryCAlt: yup
    .string()

    .min(10, "Phone number is not valid"),
  secondaryCContact: yup
    .string()

    .min(10, "Phone number is not valid"),
  secondaryCAlt: yup.string().min(10, "Phone number is not valid"),
  policyPhone: yup
    .string()

    .min(10, "Phone number is not valid"),
});

/**
 * BackgroundFormScreen component
 */
export const BackgroundFormScreen: React.FC<{
  uniqueIds?: any;
  titles?: any;
  imageUrls?: any;
  activeTab?: any;
  setActiveTab: any;
}> = ({ uniqueIds, titles, imageUrls, activeTab, setActiveTab }) => {
  const [editMode, setEditMode] = useState(false);
  const [donor, setDonor] = useState(false);
  const [resus, setResus] = useState(false);
  const [transfusion, setTransfusion] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoaderForm, setIsLoaderFrom] = useState(false);
  const [bgData, setBgData] = useState([]);
  const [bgTime, setBgTime] = useState("");
  const [bgUpdateBy, setBgUpdateBy] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const basicName = useRef(null);
  const basicPhone = useRef(null);
  const basicEmail = useRef(null);
  const basicAlt = useRef(null);
  const live_zipcode = useRef(null);
  const primaryName = useRef(null);
  const primayPhone = useRef(null);
  const primaryAlt = useRef(null);
  const secondaryName = useRef(null);
  const secondaryPhone = useRef(null);
  const secondaryAlt = useRef(null);
  const emgName = useRef(null);
  const emgRel = useRef(null);
  const emgPhone = useRef(null);
  const primaryCName = useRef(null);
  const primaryCPhone = useRef(null);
  const primaryCAlt = useRef(null);
  const secondaryCName = useRef(null);
  const secondaryCPhone = useRef(null);
  const secondaryCAlt = useRef(null);
  const insurance = useRef(null);
  const policy = useRef(null);
  const policyPhone = useRef(null);

  let initialValue: BackgroundValues = {
    basicName: bgData[0]?.basicName ? bgData[0]?.basicName.trim() : "",
    basicEmail: bgData[0]?.basicEmail ? bgData[0]?.basicEmail.trim() : "",
    basicPhone: bgData[0]?.basicPhone ? bgData[0]?.basicPhone.trim() : "",
    basicAlt: bgData[0]?.basicAlt ? bgData[0]?.basicAlt.trim() : "",
    live_zipcode: bgData[0]?.live_zipcode ? bgData[0]?.live_zipcode.trim() : "",
    primaryName: bgData[0]?.primary_physician
      ? bgData[0]?.primary_physician.trim()
      : "",
    primaryContact: bgData[0]?.primary_physician_phone
      ? bgData[0]?.primary_physician_phone.trim()
      : "",
    primaryAlt: bgData[0]?.primary_physician_phone_alt
      ? bgData[0]?.primary_physician_phone_alt.trim()
      : "",
    secondaryName: bgData[0]?.second_physician
      ? bgData[0]?.second_physician.trim()
      : "",
    secondaryContact: bgData[0]?.second_physician_phone
      ? bgData[0]?.second_physician_phone.trim()
      : "",
    secondaryAlt: bgData[0]?.second_physician_phone_alt
      ? bgData[0]?.second_physician_phone_alt.trim()
      : "",
    emgName: bgData[0]?.emergency_contact
      ? bgData[0]?.emergency_contact.trim()
      : "",
    emgRel: bgData[0]?.emergency_contact_relationship
      ? bgData[0]?.emergency_contact_relationship.trim()
      : "",
    emgPhone: bgData[0]?.emergency_contact_phone
      ? bgData[0]?.emergency_contact_phone.trim()
      : "",
    primaryCName: bgData[0]?.primary_caregiver
      ? bgData[0]?.primary_caregiver.trim()
      : "",
    primaryCContact: bgData[0]?.primary_caregiver_phone
      ? bgData[0]?.primary_caregiver_phone.trim()
      : "",
    primaryCAlt: bgData[0]?.primary_caregiver_phone_alt
      ? bgData[0]?.primary_caregiver_phone_alt.trim()
      : "",
    secondaryCName: bgData[0]?.second_caregiver
      ? bgData[0]?.second_caregiver.trim()
      : "",
    secondaryCContact: bgData[0]?.second_caregiver_phone
      ? bgData[0]?.second_caregiver_phone.trim()
      : "",
    secondaryCAlt: bgData[0]?.second_caregiver_phone_alt
      ? bgData[0]?.second_caregiver_phone_alt.trim()
      : "",
    policyIn: bgData[0]?.primary_insurance
      ? bgData[0]?.primary_insurance.trim()
      : "",
    policy: bgData[0]?.primary_insurance_policy
      ? bgData[0]?.primary_insurance_policy.trim()
      : "",
    policyPhone: bgData[0]?.primary_insurance_phone
      ? bgData[0]?.primary_insurance_phone.trim()
      : "",
  };
  useEffect(() => {
    profileBackgroundApiCall();
  }, []);

  const profileBackgroundApiCall = () => {
    setIsLoader(true);

    getProfileBackground(uniqueIds)
      .then((res) => {
        const eventArray = [];

        setIsLoader(false);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            res.data[0].objectList.forEach((val) => {
              (val.emergency_contact =
                val.emergency_contact == "null" ? "" : val.emergency_contact),
                (val.emergency_contact_phone =
                  val.emergency_contact_phone == "null"
                    ? ""
                    : val.emergency_contact_phone),
                (val.emergency_contact_relationship =
                  val.emergency_contact_relationship == "null"
                    ? ""
                    : val.emergency_contact_relationship),
                (val.live_zipcode =
                  val.live_zipcode == "null" ? "" : val.live_zipcode),
                (val.primary_caregiver =
                  val.primary_caregiver == "null" ? "" : val.primary_caregiver),
                (val.primary_caregiver_phone =
                  val.primary_caregiver_phone == "null"
                    ? ""
                    : val.primary_caregiver_phone),
                (val.primary_caregiver_phone_alt =
                  val.primary_caregiver_phone_alt == "null"
                    ? ""
                    : val.primary_caregiver_phone_alt),
                (val.primary_insurance =
                  val.primary_insurance == "null" ? "" : val.primary_insurance),
                (val.primary_insurance_phone =
                  val.primary_insurance_phone == "null"
                    ? ""
                    : val.primary_insurance_phone),
                (val.primary_insurance_policy =
                  val.primary_insurance_policy == "null"
                    ? ""
                    : val.primary_insurance_policy),
                (val.primary_physician =
                  val.primary_physician == "null" ? "" : val.primary_physician),
                (val.primary_physician_phone =
                  val.primary_physician_phone == "null"
                    ? ""
                    : val.primary_physician_phone),
                (val.primary_physician_phone_alt =
                  val.primary_physician_phone_alt == "null"
                    ? ""
                    : val.primary_physician_phone_alt),
                (val.second_caregiver =
                  val.second_caregiver == "null" ? "" : val.second_caregiver),
                (val.second_caregiver_phone =
                  val.second_caregiver_phone == "null"
                    ? ""
                    : val.second_caregiver_phone),
                (val.second_caregiver_phone_alt =
                  val.second_caregiver_phone_alt == "null"
                    ? ""
                    : val.second_caregiver_phone_alt),
                (val.second_physician =
                  val.second_physician == "null" ? "" : val.second_physician),
                (val.second_physician_phone =
                  val.second_physician_phone == "null"
                    ? ""
                    : val.second_physician_phone),
                (val.second_physician_phone_alt =
                  val.second_physician_phone_alt == "null"
                    ? ""
                    : val.second_physician_phone_alt),
                eventArray.push(val);
            });

            setBgData(eventArray);

            setBgUpdateBy(res.data[0].objectList[0].userName);

            if (res.data[0].objectList[0].organ_donor == "true") {
              setDonor(true);
            } else {
              setDonor(false);
            }

            if (res.data[0].objectList[0].do_not_resuscitate == "true") {
              setResus(true);
            } else {
              setResus(false);
            }
            if (res.data[0].objectList[0].no_blood_transfusion == "true") {
              setTransfusion(true);
            } else {
              setTransfusion(false);
            }
            console.log(
              "res.data[0].objectList[0].lastUpdatedTime",
              res.data[0].objectList[0].lastUpdatedTime
            );

            setBgTime(
              moment(res.data[0].objectList[0].lastUpdatedTime).format(
                "MMM DD, YYYY, hh:mm A"
              )
            );
          } else {
            setBgData([]);
            setIsLoader(false);
          }
        } else {
          setBgData([]);
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setBgData([]);

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
    let ProfileData = {
      basicName: data.basicName,
      basicEmail: data.basicEmail,
      basicPhone: data.basicPhone,
      basicAlt: data.basicAlt,
      primary_physician: data.primaryName,
      primary_physician_phone: data.primaryContact,
      primary_physician_phone_alt: data.primaryAlt,
      second_physician: data.secondaryName,
      second_physician_phone: data.secondaryContact,
      second_physician_phone_alt: data.secondaryAlt,
      emergency_contact: data.emgName,
      emergency_contact_phone: data.emgPhone,
      emergency_contact_relationship: data.emgRel,
      primary_caregiver: data.primaryCName,
      primary_caregiver_phone: data.primaryCContact,
      primary_caregiver_phone_alt: data.primaryCAlt,
      second_caregiver: data.secondaryCName,
      second_caregiver_phone: data.secondaryCContact,
      second_caregiver_phone_alt: data.secondaryCAlt,
      primary_insurance: data.policyIn,
      primary_insurance_phone: data.policyPhone,
      primary_insurance_policy: data.policy,
      live_zipcode: data.live_zipcode,
      do_not_resuscitate: data.doNotResuscite,
      organ_donor: data.organDonor,
      no_blood_transfusion: data.noBloodTransfusion,
    };

    const formData = new FormData();
    formData.append("ProfileData", JSON.stringify(ProfileData));
    formData.append("profile", uniqueIds);

    setIsLoaderFrom(true);

    postProfileBackground(formData)
      .then((res) => {
        setIsLoaderFrom(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t("background.backgroundSuccessfully"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            profileBackgroundApiCall();
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
    setEditMode(false);
  };

  const clearState = () => {
    setRefreshing(false);
    setIsLoader(true);
    setBgData([]);
    setEditMode(false);
    setBgUpdateBy("");
    setBgTime("");

    setRefreshing(true);
    setTimeout(async () => {
      setRefreshing(false);
      profileBackgroundApiCall();
    }, 1000);
  };

  const keyboardAction = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.root}>
      <RNKeyboardView
        keyboardVerticalOffset={fontSize(170)}
        scrollProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={clearState} />
          ),
        }}
      >
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={initialValue}
          onSubmit={(values: any) => {
            keyboardAction();
            const backgroundData = {
              ...values,
              doNotResuscite: resus,
              organDonor: donor,
              noBloodTransfusion: transfusion,
            };
            callApi(backgroundData);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            setFieldTouched,
            resetForm,
          }) => (
            <>
              {!isLoader ? (
                <View style={styles.statusContainer}>
                  <View>
                    {editMode ? (
                      <Button
                        text="Save"
                        style={styles.button}
                        onPress={() => {
                          keyboardAction();
                          handleSubmit();
                        }}
                        textStyle={styles.buttonTitle}
                        isLoader={isLoaderForm}
                        disabled={isLoaderForm}
                      />
                    ) : (
                      <Button
                        text="Edit"
                        style={styles.buttonEdit}
                        onPress={() => {
                          setEditMode(true);
                        }}
                        textStyle={styles.buttonEditTitle}
                        isLoader={isLoaderForm}
                        disabled={isLoaderForm}
                      />
                    )}
                  </View>
                  {bgTime ? (
                    <View style={[styles.status, { flex: 1, marginLeft: 4 }]}>
                      <Text style={styles.statusText}>
                        Last Updated: {bgTime}
                      </Text>
                      <Text style={styles.statusText}>(by {bgUpdateBy})</Text>
                    </View>
                  ) : null}
                </View>
              ) : null}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {translate("background.basicSection")}
                </Text>

                <Input
                  label={translate("backgroundLabel.basicName")}
                  style={editMode == true ? styles.darkInput : null}
                  value={values.basicName}
                  onChangeText={handleChange("basicName")}
                  onBlur={handleBlur("basicName")}
                  validation={() => {
                    setFieldTouched("basicName");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.basicName && errors.basicName}
                  ref={basicName}
                  onSubmitEditing={() => {
                    basicEmail.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.basicName")}
                  editable={editMode}
                />

                <Input
                  label={translate("backgroundLabel.basicEmail")}
                  style={editMode == true ? styles.darkInput : null}
                  value={values.basicEmail}
                  placeholderTextColor={color.palette.darkGray}
                  onChangeText={handleChange("basicEmail")}
                  onBlur={handleBlur("basicEmail")}
                  validation={() => {
                    setFieldTouched("basicEmail");
                  }}
                  error={touched.basicEmail && errors.basicEmail}
                  ref={basicEmail}
                  onSubmitEditing={() => {
                    basicPhone.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.basicEmail")}
                  editable={editMode}
                />

                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.basicPhone")}
                  value={values.basicPhone.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange(
                    "basicPhone".replace(re, (_, a, b, c) => `(${a}) ${b}-${c}`)
                  )}
                  onBlur={handleBlur("basicPhone")}
                  validation={() => {
                    setFieldTouched("basicPhone");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.basicPhone && errors.basicPhone}
                  ref={basicPhone}
                  onSubmitEditing={() => {
                    basicAlt.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.basicPhone")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.basicAlt")}
                  value={values.basicAlt.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  placeholderTextColor={color.palette.darkGray}
                  onChangeText={handleChange(
                    "basicAlt".replace(re, (_, a, b, c) => `(${a}) ${b}-${c}`)
                  )}
                  onBlur={handleBlur("basicAlt")}
                  validation={() => {
                    setFieldTouched("basicAlt");
                  }}
                  error={touched.basicAlt && errors.basicAlt}
                  ref={basicAlt}
                  onSubmitEditing={() => {
                    live_zipcode.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.basicAlt")}
                  editable={editMode}
                />

                <Input
                  label={translate("backgroundLabel.zip")}
                  style={editMode == true ? styles.darkInput : null}
                  value={values.live_zipcode}
                  onChangeText={handleChange("live_zipcode")}
                  onBlur={handleBlur("live_zipcode")}
                  validation={() => {
                    setFieldTouched("live_zipcode");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.live_zipcode && errors.live_zipcode}
                  ref={live_zipcode}
                  onSubmitEditing={() => {
                    primaryName.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.zip")}
                  editable={editMode}
                />

                <Text style={styles.sectionTitle}>
                  {" "}
                  {translate("background.primary1")}
                </Text>
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1")}
                  value={values.primaryName}
                  onChangeText={handleChange("primaryName")}
                  onBlur={handleBlur("primaryName")}
                  validation={() => {
                    setFieldTouched("primaryName");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.primaryName && errors.primaryName}
                  ref={primaryName}
                  onSubmitEditing={() => {
                    primayPhone.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.ph1")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Phone")}
                  value={values.primaryContact.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange(
                    "primaryContact".replace(
                      re,
                      (_, a, b, c) => `(${a}) ${b}-${c}`
                    )
                  )}
                  onBlur={handleBlur("primaryContact")}
                  validation={() => {
                    setFieldTouched("primaryContact");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.primaryContact && errors.primaryContact}
                  ref={primayPhone}
                  onSubmitEditing={() => {
                    primaryAlt.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Phone")}
                  editable={editMode}
                />

                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Alt")}
                  value={values.primaryAlt.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange("primaryAlt")}
                  onBlur={handleBlur("primaryAlt")}
                  validation={() => {
                    setFieldTouched("primaryAlt");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.primaryAlt && errors.primaryAlt}
                  ref={primaryAlt}
                  onSubmitEditing={() => {
                    secondaryName.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  placeholder={translate("backgroundPlaceholder.ph1Alt")}
                  keyboardType="numeric"
                  editable={editMode}
                />

                <Text style={styles.sectionTitle}>
                  {" "}
                  {translate("background.secondary1")}
                </Text>
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1")}
                  value={values.secondaryName}
                  onChangeText={handleChange("secondaryName")}
                  onBlur={handleBlur("secondaryName")}
                  validation={() => {
                    setFieldTouched("secondaryName");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.secondaryName && errors.secondaryName}
                  ref={secondaryName}
                  onSubmitEditing={() => {
                    secondaryPhone.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.ph2")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Phone")}
                  value={values.secondaryContact.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange("secondaryContact")}
                  onBlur={handleBlur("secondaryContact")}
                  validation={() => {
                    setFieldTouched("secondaryContact");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.secondaryContact && errors.secondaryContact}
                  ref={secondaryPhone}
                  onSubmitEditing={() => {
                    secondaryAlt.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Phone")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Alt")}
                  value={values.secondaryAlt.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange("secondaryAlt")}
                  onBlur={handleBlur("secondaryAlt")}
                  validation={() => {
                    setFieldTouched("secondaryAlt");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.secondaryAlt && errors.secondaryAlt}
                  ref={secondaryAlt}
                  onSubmitEditing={() => {
                    emgName.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Alt")}
                  editable={editMode}
                />
                {/* </View> */}

                <Text style={styles.sectionTitle}>
                  {" "}
                  {translate("background.emeregency")}
                </Text>
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.emContact")}
                  value={values.emgName}
                  onChangeText={handleChange("emgName")}
                  onBlur={handleBlur("emgName")}
                  validation={() => {
                    setFieldTouched("emgName");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.emgName && errors.emgName}
                  ref={emgName}
                  onSubmitEditing={() => {
                    emgRel.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.emContact")}
                  editable={editMode}
                />
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.rel")}
                  value={values.emgRel}
                  onChangeText={handleChange("emgRel")}
                  onBlur={handleBlur("emgRel")}
                  validation={() => {
                    setFieldTouched("emgRel");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.emgRel && errors.emgRel}
                  ref={emgRel}
                  onSubmitEditing={() => {
                    emgPhone.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.rel")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Phone")}
                  value={values.emgPhone.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  placeholderTextColor={color.palette.darkGray}
                  onChangeText={handleChange("emgPhone")}
                  onBlur={handleBlur("emgPhone")}
                  validation={() => {
                    setFieldTouched("emgPhone");
                  }}
                  error={touched.emgPhone && errors.emgPhone}
                  ref={emgPhone}
                  onSubmitEditing={() => {
                    primaryCName.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Phone")}
                  editable={editMode}
                />

                <Text style={styles.sectionTitle}>
                  {translate("background.primary2")}
                </Text>
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1")}
                  value={values.primaryCName}
                  onChangeText={handleChange("primaryCName")}
                  onBlur={handleBlur("primaryCName")}
                  validation={() => {
                    setFieldTouched("primaryCName");
                  }}
                  error={touched.primaryCName && errors.primaryCName}
                  ref={primaryCName}
                  onSubmitEditing={() => {
                    primaryCPhone.current.focus();
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.caregiver")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Phone")}
                  value={values.primaryCContact.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange("primaryCContact")}
                  onBlur={handleBlur("primaryCContact")}
                  validation={() => {
                    setFieldTouched("primaryCContact");
                  }}
                  error={touched.primaryCContact && errors.primaryCContact}
                  ref={primaryCPhone}
                  onSubmitEditing={() => {
                    primaryCAlt.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Phone")}
                  editable={editMode}
                  placeholderTextColor={color.palette.darkGray}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Alt")}
                  value={values.primaryCAlt.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange("primaryCAlt")}
                  onBlur={handleBlur("primaryCAlt")}
                  validation={() => {
                    setFieldTouched("primaryCAlt");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.primaryCAlt && errors.primaryCAlt}
                  ref={primaryCAlt}
                  onSubmitEditing={() => {
                    secondaryCName.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Alt")}
                  editable={editMode}
                />

                <Text style={styles.sectionTitle}>
                  {translate("background.secondary2")}
                </Text>
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1")}
                  value={values.secondaryCName}
                  onChangeText={handleChange("secondaryCName")}
                  onBlur={handleBlur("secondaryCName")}
                  validation={() => {
                    setFieldTouched("secondaryCName");
                  }}
                  error={touched.secondaryCName && errors.secondaryCName}
                  ref={secondaryCName}
                  onSubmitEditing={() => {
                    secondaryCPhone.current.focus();
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.caregiver2")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Phone")}
                  value={values.secondaryCContact.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  placeholderTextColor={color.palette.darkGray}
                  onChangeText={handleChange("secondaryCContact")}
                  onBlur={handleBlur("secondaryCContact")}
                  validation={() => {
                    setFieldTouched("secondaryCContact");
                  }}
                  error={touched.secondaryCContact && errors.secondaryCContact}
                  ref={secondaryCPhone}
                  onSubmitEditing={() => {
                    secondaryCAlt.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Phone")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Alt")}
                  value={values.secondaryCAlt.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  placeholderTextColor={color.palette.darkGray}
                  onChangeText={handleChange("secondaryCAlt")}
                  onBlur={handleBlur("secondaryCAlt")}
                  validation={() => {
                    setFieldTouched("secondaryCAlt");
                  }}
                  error={touched.secondaryCAlt && errors.secondaryCAlt}
                  ref={secondaryCAlt}
                  onSubmitEditing={() => {
                    insurance.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Alt")}
                  editable={editMode}
                />

                <Text style={styles.sectionTitle}>
                  {translate("background.insurance")}
                </Text>
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.policyPrimary")}
                  value={values.policyIn}
                  onChangeText={handleChange("policyIn")}
                  onBlur={handleBlur("policyIn")}
                  validation={() => {
                    setFieldTouched("policyIn");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.policyIn && errors.policyIn}
                  ref={insurance}
                  onSubmitEditing={() => {
                    policy.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.policyIn")}
                  editable={editMode}
                />
                <Input
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.policy")}
                  value={values.policy}
                  onChangeText={handleChange("policy")}
                  onBlur={handleBlur("policy")}
                  validation={() => {
                    setFieldTouched("policy");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.policy && errors.policy}
                  ref={policy}
                  onSubmitEditing={() => {
                    policyPhone.current.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder={translate("backgroundPlaceholder.policy")}
                  editable={editMode}
                />
                <Input
                  maxLength={14}
                  style={editMode == true ? styles.darkInput : null}
                  label={translate("backgroundLabel.ph1Phone")}
                  value={values.policyPhone.replace(
                    re,
                    (_, a, b, c) => `(${a}) ${b}-${c}`
                  )}
                  onChangeText={handleChange("policyPhone")}
                  onBlur={handleBlur("policyPhone")}
                  validation={() => {
                    setFieldTouched("policyPhone");
                  }}
                  placeholderTextColor={color.palette.darkGray}
                  error={touched.policyPhone && errors.policyPhone}
                  ref={policyPhone}
                  onSubmitEditing={() => {
                    policy.current.focus();
                    Keyboard.dismiss();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="done"
                  keyboardType="numeric"
                  placeholder={translate("backgroundPlaceholder.ph1Phone")}
                  editable={editMode}
                />
                {/* </View> */}

                <Text style={styles.sectionTitle}>
                  {" "}
                  {translate("background.advance")}
                </Text>
                <View style={styles.checkBoxSection}>
                  <TouchableOpacity
                    style={styles.checkBoxContainer}
                    onPress={() => setResus(!resus)}
                    activeOpacity={0.8}
                    disabled={!editMode}
                  >
                    {resus ? (
                      <CheckBox width={29} height={29} fill={color.secondary} />
                    ) : (
                      <CheckBoxUnCheck width={29} height={29} />
                    )}
                    <Text style={styles.checkBoxLabel}>
                      {translate("backgroundLabel.resus")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.checkBoxContainer}
                    onPress={() => setDonor(!donor)}
                    activeOpacity={0.8}
                    disabled={!editMode}
                  >
                    {donor == true ? (
                      <CheckBox width={29} height={29} fill={color.secondary} />
                    ) : (
                      <CheckBoxUnCheck width={29} height={29} />
                    )}
                    <Text style={styles.checkBoxLabel}>
                      {translate("backgroundLabel.donor")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.checkBoxContainer}
                    onPress={() => setTransfusion(!transfusion)}
                    activeOpacity={0.8}
                    disabled={!editMode}
                  >
                    {transfusion == true ? (
                      <CheckBox width={29} height={29} fill={color.secondary} />
                    ) : (
                      <CheckBoxUnCheck width={29} height={29} />
                    )}
                    <Text style={styles.checkBoxLabel}>
                      {translate("backgroundLabel.transfusion")}
                    </Text>
                  </TouchableOpacity>
                </View>
                {editMode == true ? (
                  <View style={styles.buttonContainer}>
                    <Button
                      text="Cancel"
                      style={styles.cancel}
                      onPress={() => {
                        setEditMode(false);
                        resetForm();
                      }}
                      textStyle={styles.buttonTitle}
                      isLoader={isLoaderForm}
                      disabled={isLoaderForm}
                    />
                  </View>
                ) : null}
              </View>
            </>
          )}
        </Formik>
      </RNKeyboardView>
    </View>
  );
};
