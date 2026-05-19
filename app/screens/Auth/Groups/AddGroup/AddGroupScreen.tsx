import React, { useState, useEffect, useRef, memo } from "react";
import { View, Keyboard, TouchableOpacity, BackHandler } from "react-native";

// import external libraries
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";
import { Country } from "react-native-country-picker-modal";

// import custom function & component
import I18n from "@app/i18n/i18n";
import { Button, Header, Text, Input } from "@app/components";
import { addNewGroup } from "@app/services/api/groups";
import { translate } from "@app/i18n";

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
  CountryPickerView,
  CountryLabel,
  TitleLabel,
  LabelStyle,
  Style,
} from "./Style";
import { color, fontSize } from "@app/theme";
import { styleWrapper } from "../SubTabs/Issues/AddIssue/styles";
import useAppNavigation from "@app/navigation/navigation";
import { SafeCountryPicker } from "@app/constants";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";
import styleConfig from "@app/theme/styleConfig";

/**
 * Create a country picker component
 */

interface CountryPickerProps {
  onSelectCountry: Function;
  setCountryVisibleCall: Function;
  handleChange: Function;
  isCountryVisible?: boolean;
  selectedCountry?: string;
  setCountryParams?: {
    countryCode?: string;
    onSelect?: Function;
    withFlag?: boolean;
    withFilter?: any;
    withCountryNameButton?: any;
    withAlphaFilter?: any;
    withEmoji?: any;
  };
}
const CustomCountryPicker = memo((props: CountryPickerProps) => {
  const {
    onSelectCountry,
    selectedCountry,
    isCountryVisible,
    setCountryVisibleCall,
    handleChange,
    setCountryParams: {
      countryCode,
      onSelect,
      withFlag,
      withFilter,
      withCountryNameButton,
      withAlphaFilter,
      withEmoji,
    },
  } = props;

  const handleCountrySelect = (country: Country) => {
    onSelectCountry(country, handleChange);
  };

  return (
    <View style={CountryPickerView}>
      <Text style={CountryLabel}>{translate("signUp.countryLbl")}</Text>
      <View style={COUNTRY_BODY}>
        <TouchableOpacity
          style={COUNTRY_BODY_TEXT}
          onPress={() => setCountryVisibleCall(true)}
        >
          <SafeCountryPicker
            onSelect={handleCountrySelect}
            {...{
              countryCode,
              onSelect,
              withFlag,
              withFilter,
              withCountryNameButton,
              withAlphaFilter,
              withEmoji,
            }}
            withFlagButton={false}
            visible={isCountryVisible}
            onClose={() => setCountryVisibleCall(false)}
          />
          <Text>{selectedCountry}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

// declare validationSchema
const validationSchema = yup.object().shape({
  groupName: yup
    .string()
    .label(I18n.t("addGroup.groupNameLbl"))
    .label(I18n.t("addGroup.careNameLbl"))
    .required(I18n.t("addGroup.enterNamePlease")),

  description: yup
    .string()
    .label(I18n.t("addGroup.descriptionLbl"))
    .required(I18n.t("addGroup.enterDescriptionPlease")),
  zipCode: yup
    .string()
    .label(I18n.t("addOrganization.zipCode"))
    .required(I18n.t("addOrganization.enterZipCodePlease")),
});

/**
 * AddCareTeam Props
 */
export interface AddCareTeamValues {
  groupName: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  privacy: string;
}

/**
 * AddCareTeam Component
 */
export const AddGroupScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const [isCountryVisible, setisCountryVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const [isLoader, setIsLoader] = useState(false);

  const [countryCode, setCountryCode] = useState("US");
  const [withFlag] = useState(true);
  const inputGroupName = useRef(null);
  const inputDescription = useRef(null);
  const inputLocation = useRef(null);
  const inputCity = useRef(null);
  const inputState = useRef(null);
  const inputZipcode = useRef(null);

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

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setSelectedCountry(JSON.parse(JSON.stringify(country.name)));
  };

  const initialValues: AddCareTeamValues = {
    groupName: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    privacy: "private",
  };

  const addGroupApiCall = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.groupName);
    formData.append("category", "Careteams");
    formData.append("subcategory", "Care");
    formData.append("summary", values.description);
    formData.append("addressLine1", values.address);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("postalCode", values.zipCode);
    formData.append("country", selectedCountry);
    formData.append("privacy", "private");

    setIsLoader(true);

    addNewGroup(formData)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t("addGroup.careSuccessfully"),
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

  const onGoBack = () => {
    navigation.goBack();
  };

  const onSubmit = (values) => {
    if (values.groupName && values.description) {
      Keyboard.dismiss();
      addGroupApiCall(values);
    }
  };

  const setCountryVisibleCall = (status) => {
    setisCountryVisible(status);
  };

  const onSelectCountry = (country, handleChange) => {
    handleChange("country");
    onSelect(country);
  };
  const setCountryParams = {
    countryCode: countryCode,
    onSelect: onSelect,
    withFlag: withFlag,
    withAlphaFilter: true,
  };

  return (
    <View testID="AddCareTeamScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title="Add CareTeam"
          icon="chevron-left"
          onPressLeft={onGoBack}
        />
      </View>

      <View style={BODY}>
        <RNKeyboardView
          keyboardVerticalOffset={
            styleConfig?.isIphone ? fontSize(80) : fontSize(100)
          }
          containerStyle={Style.spaceBoth}
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values: any) => onSubmit(values)}
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
                    label={translate("addGroup.groupNameLbl")}
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    mandatory={false}
                    value={values.groupName}
                    onChangeText={handleChange("groupName")}
                    onBlur={handleBlur("groupName")}
                    validation={() => {
                      setFieldTouched("groupName");
                    }}
                    error={touched.groupName && errors.groupName}
                    ref={inputGroupName}
                    onSubmitEditing={() => {
                      inputDescription.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("addGroup.groupName")}
                  />

                  <Input
                    label={translate("addGroup.descriptionLbl")}
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
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
                </View>

                <View style={ButtonWrapper1}>
                  <Text style={{ ...ExtraTItle }}>
                    {I18n.t("Userprofile.LocationInfo")}
                  </Text>
                </View>

                <View style={DetailsWrapper}>
                  <Input
                    label={translate("addEvent.addressLbl")}
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
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
                      inputCity.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("addEvent.address")}
                  />

                  <Input
                    label={translate("addEvent.cityLbl")}
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
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
                    label={translate("addEvent.stateLbl")}
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
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
                    label={translate("addEvent.zipCodeLbl")}
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    value={values.postalCode}
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
                    placeholder={translate("addEvent.zipCode")}
                  />

                  <CustomCountryPicker
                    setCountryVisibleCall={setCountryVisibleCall}
                    onSelectCountry={onSelectCountry}
                    isCountryVisible={isCountryVisible}
                    handleChange={handleChange}
                    selectedCountry={selectedCountry}
                    setCountryParams={setCountryParams}
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
