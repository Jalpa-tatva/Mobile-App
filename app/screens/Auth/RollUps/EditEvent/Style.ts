import {
  ViewStyle,
  TextStyle,
  Platform,
  ImageStyle,
  StyleSheet,
} from "react-native";
import { color, font, fontSize } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };
export const HEADERTOP: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
};
export const BODY: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const COUNTRY_BODY: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  paddingLeft: fontSize(10),
  backgroundColor: "#f8fafb",
  height: fontSize(36),
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  borderRadius: fontSize(5),
};
export const CountryLblTitle: TextStyle = {
  marginBottom: fontSize(6),
  color: color.palette.black,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
};
export const ActiveImageWrapper: ViewStyle = {
  flex: 1,
  width: "100%",
};
export const cloeIconWrapper: ViewStyle = {
  position: "absolute",
  right: fontSize(-10),
  top: fontSize(-10),
  zIndex: 99,
  width: fontSize(20),
  height: fontSize(20),
  backgroundColor: color.red,
  borderRadius: fontSize(10),
  justifyContent: "center",
  alignItems: "center",
};
export const ImageSelect: ImageStyle = {
  width: "100%",
  flex: 1,
};
export const ImageWrapper: ViewStyle = {
  marginTop: fontSize(8),
  marginBottom: fontSize(2),
};
export const SheetWrapper: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
};

export const WrapperContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: 50,
  width: "80%",
  flexDirection: "row",
  backgroundColor: color.palette.black,
  borderRadius: 10,
  paddingLeft: 24,
  marginBottom: 10,
};
export const OverLayButtonContainerCencel: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 10,
};
export const ButtonSheetTitle: TextStyle = {
  color: color.palette.white,
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(16),
  width: "100%",
  marginLeft: 10,
};
export const OverLayButtonText: TextStyle = {
  color: color.palette.red,
  fontSize: fontSize(16),
  fontFamily: font.Poppins_Regular,
};
export const plusLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.secondary,
};
export const ImageSubWrapper: ViewStyle = {
  backgroundColor: color.searchBoxGrey,
  justifyContent: "center",
  alignItems: "center",
  // padding: fontSize(10),
  borderRadius: fontSize(5),
  height: fontSize(130),
  borderStyle: "dashed",
  borderWidth: fontSize(0.8),
  // paddingVertical:fontSize(20)
};
export const BrowseFile: ViewStyle = {
  marginTop: fontSize(10),
  borderWidth: fontSize(0.5),
  borderColor: color.secondary,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: fontSize(5),
  height: fontSize(30),
  width: fontSize(100),
};
export const eventImgError: TextStyle = {
  color: color.palette.red,
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(10),
  marginTop: fontSize(3),
};
export const CountryLbl: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.black,
};
export const COUNTRY_BODY_TEXT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

export const ExtraTItle: TextStyle = {
  fontFamily: font.Poppins_SemiBold,
  fontSize: fontSize(14),
  color: color.palette.darkGray,
};
export const Label1Style: TextStyle = {
  paddingTop: fontSize(5),
};
export const CountryText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(14),
  color: color.palette.black,
};
export const ButtonWrapper1: ViewStyle = {
  width: "100%",
  backgroundColor: color.palette.white,
  marginTop: 20,
};
export const DetailsWrapper: ViewStyle = {
  width: "100%",
  backgroundColor: color.palette.white,
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
};
export const TitleLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
  paddingVertical: fontSize(1),
};
export const styleWrapper: ViewStyle = {
  borderColor: "#f8fafb",
  borderWidth: 0,
};
export const LabelStyle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.black,
  paddingVertical: fontSize(1),
  paddingLeft: fontSize(10),
  backgroundColor: "#f8fafb",
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  borderRadius: fontSize(5),
};
export const signUpButtonContainer: ViewStyle = {
  marginVertical: fontSize(20),
  borderRadius: fontSize(10),
  height: fontSize(45),
  backgroundColor: color.secondary,
};
export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const Style = StyleSheet.create({
  spaceTopCommon: { marginTop: -24 },
  padLeftCommon: { paddingLeft: 30 },
  root: {
    marginHorizontal: fontSize(10),
    marginTop: fontSize(20),
  },
});
