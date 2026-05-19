import { translate } from "@app/i18n";
import { color, font, fontSize } from "@app/theme";
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { assets } from "../../../assets/images/index";
import FastImage from "react-native-fast-image";

type Props = {
  visible: boolean;
  onYes: () => void;
  onNo: () => void;
  title?: string;
  subTitle?: string;
  yesText?: string;
  cancelText?: string;
};

export const BiometricEnableModal = ({
  visible,
  onYes,
  onNo,
  title,
  subTitle,
  yesText,
  cancelText,
}: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.biometricWrapper}>
            <FastImage
              source={assets.biometric}
              style={styles.biometricImg}
            />
          </View>
          <Text style={styles.title}>
            {title ?? translate("AppDrawer.appName")}
          </Text>

          <Text style={styles.description}>
            {subTitle ?? translate("signIn.loginWithBiometric")}
          </Text>

          <View style={styles.actions}>
            {cancelText && (
              <TouchableOpacity onPress={onNo} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>
                  {cancelText ?? translate("profile.cancel")}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={onYes} style={styles.confirmBtn}>
              <Text style={styles.confirmText}>
                {yesText ?? translate("Userprofile.Yes")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: color.textPlaceholder,
    justifyContent: "center",
    alignItems: "center",
  },
  biometricWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  biometricImg: {
    width: 40,
    height: 40,
    tintColor: color.secondary,
    color:color.secondary
  },
  container: {
    width: "85%",
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: fontSize(15),
    fontFamily: font.Poppins_SemiBold,
    marginBottom: 5,
    color: color.secondary,
    alignSelf: "center",
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    fontSize: fontSize(13),
    color: color.placeholder,
    marginBottom: 20,
    alignSelf: "center",
    fontFamily: font.Poppins_Medium,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  cancelBtn: {
    marginRight: 20,
    borderColor: color.secondary,
    borderWidth: 2,
    height: fontSize(40),
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    minWidth: 100,
    alignItems: "center",
  },
  cancelText: {
    fontSize: fontSize(14),
    color: color.secondary,
    fontFamily: font.Poppins_SemiBold,
  },
  confirmBtn: {
    minWidth: 100,
    alignItems: "center",
    backgroundColor: color.secondary,
    borderColor: color.secondary,
    borderWidth: 2,
    height: fontSize(40),
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  confirmText: {
    fontSize: fontSize(14),
    color: color.white,
    fontFamily: font.Poppins_SemiBold,
  },
});
