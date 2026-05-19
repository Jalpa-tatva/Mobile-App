import { ViewStyle, TextStyle, Platform, StyleSheet } from "react-native";
import { color, font, fontSize } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };
export const HEADERTOP: ViewStyle = {
  height: "12%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
};
export const BODY: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const ActionButtonWrapper: ViewStyle = {
  position: "absolute",
  bottom: 20,
  right: 20,
  alignItems: "center",
  justifyContent: "center",
};

export const SheetContainer: ViewStyle = {
  width: "96%",
  alignItems: "flex-end",
};
export const SheetWrapper: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

export const WrapperContainer: ViewStyle = {
  flexDirection: "row",
  width: "80%",
  height: 50,
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "center",
  backgroundColor: color.palette.black,
  marginBottom: 10,
  borderRadius: 10,
  paddingLeft: 14,
};
export const DialogContainer: ViewStyle = {
  width: "100%",
  alignItems: "center",
};
export const DialogWrapper: ViewStyle = {
  width: "100%",
  alignItems: "flex-end",
};
export const ButtonContainer: ViewStyle = {
  width: "100%",
  height: 50,
  alignItems: "center",
  flexDirection: "row",
  marginTop: 20,
};
export const ButtonPositive: ViewStyle = {
  flex: 1,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 20,
  borderRadius: 6,
  backgroundColor: color.palette.lightGreen,
};
export const ButtonNegative: ViewStyle = {
  flex: 1,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 20,
  borderRadius: 6,
  backgroundColor: color.palette.red,
};

export const ButtonSheetTitle: TextStyle = {
  width: "100%",
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(16),
  marginLeft: 10,
};
export const DialogTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.blackSecondary,
  fontSize: fontSize(14),
  marginTop: 20,
  textAlign: "center",
};
export const ButtonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(14),
};

export const OverLayButtonContainerCencel: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 10,
};

export const OverLayButtonText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: color.red,
  fontSize: fontSize(17),
};

export const Style = StyleSheet.create({
  padLeftCommon: {
    paddingLeft: 30,
  },
  padTopCommon: {
    marginTop: -24,
  },
  dialogStyle: {
    backgroundColor: color.white1,
    borderRadius: 12,
  },
});
