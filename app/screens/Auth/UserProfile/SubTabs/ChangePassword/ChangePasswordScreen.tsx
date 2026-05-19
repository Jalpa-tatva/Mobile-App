import React, { useState, useRef } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

// import external libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import Snackbar from "react-native-snackbar";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import custom function & components
import { translate } from "@app/i18n";
import { MODULES } from "@app/constants";
import { Button, Header, Text, Input } from "@app/components";
import I18n from "@app/i18n/i18n";

// import custom styling, theme, service & utils
import {
  FULL,
  HEADERTOP,
  BODY,
  ButtonWrapper1,
  ExtraTItle,
  DetailsWrapper,
  BottonTitle,
  signUpButtonContainer,
} from "./Style";
import { color } from "@app/theme";
import { changePassword } from "@app/services/api/profile";
import commonStyle from "@app/theme/commonStyle";
import useAppNavigation from "@app/navigation/navigation";

/**
 * validationSchema
 */
const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .label(I18n.t("profile.lbloldPassword"))
    .required(I18n.t("profile.oldPassword")),

  newPassword: yup
    .string()
    .label(I18n.t("profile.lblnewPassword"))
    .required(I18n.t("profile.newPassword")),

  confirmPassword: yup
    .string()
    .label(I18n.t("profile.lblnewConfirmPassword"))
    .required(I18n.t("profile.confirmnewPassword")),
});

export interface ChangePasswordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const [isLoader, setIsLoader] = useState(false);
  const oldpasswordInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const initialValues: ChangePasswordValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const changePasswordApiCall = async (values: any) => {
    setIsLoader(true);

    changePassword(
      values.oldPassword,
      values.newPassword,
      values.confirmPassword
    )
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            console.log("addNewGroup", JSON.stringify(res));

            if (res.data[0].objectList[0].status == "ok") {
              Snackbar.show({
                text: I18n.t("Userprofile.PasswordChangeSuccessfully"),
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.palette.lightGreen,
                textColor: color.palette.white,
                numberOfLines: 5,
              });

              AsyncStorage.clear();
              navigation.replace(MODULES.Splash);
            } else {
              Snackbar.show({
                text: res.data[0].objectList[0].status,
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.red,
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

  return (
    <View testID="ChangePasswordScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t("profile.changePassword")}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={BODY}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAwareScrollView
            style={commonStyle.KeyboardAwareScrollViewStyle}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values: any) => {
                if (
                  values.oldPassword &&
                  values.newPassword &&
                  values.confirmPassword
                ) {
                  Keyboard.dismiss();
                  changePasswordApiCall(values);
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
                    <Text style={ExtraTItle}>{"Password Info."}</Text>
                  </View>

                  <View style={DetailsWrapper}>
                    <Input
                      label={translate("profile.lbloldPassword")}
                      mandatory={false}
                      value={values.groupName}
                      onChangeText={handleChange("oldPassword")}
                      onBlur={handleBlur("oldPassword")}
                      validation={() => {
                        setFieldTouched("oldPassword");
                      }}
                      error={touched.oldPassword && errors.oldPassword}
                      ref={oldpasswordInput}
                      onSubmitEditing={() => {
                        passwordInput.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder={translate("profile.oldPassword")}
                    />

                    <Input
                      label={translate("profile.lblnewPassword")}
                      mandatory={false}
                      value={values.groupName}
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      validation={() => {
                        setFieldTouched("newPassword");
                      }}
                      error={touched.newPassword && errors.newPassword}
                      ref={passwordInput}
                      onSubmitEditing={() => {
                        confirmPasswordInput.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder={translate("profile.newPassword")}
                    />

                    <Input
                      label={translate("profile.lblnewConfirmPassword")}
                      mandatory={false}
                      value={values.groupName}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      validation={() => {
                        setFieldTouched("confirmPassword");
                      }}
                      error={touched.confirmPassword && errors.confirmPassword}
                      ref={confirmPasswordInput}
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder={translate("profile.confirmnewPassword")}
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
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
