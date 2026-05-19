import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { color, font, fontSize } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.white };

export const BODY: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const RawContainerMain: ViewStyle = {
  flex: 1,
};

export const RawContainer: ViewStyle = {
  backgroundColor: color.white,
  width: "100%",
  flexDirection: "row",
  marginTop: fontSize(6),
};
export const ImageContainer: ViewStyle = {
  width: fontSize(60),
  height: fontSize(60),
  // borderRadius: fontSize(60) / 2
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.white1,
};
export const ImageWrapper: ImageStyle = {
  width: fontSize(60),
  height: fontSize(60),
  // borderRadius: fontSize(60) / 2,
  resizeMode: "stretch",
};
export const TextContainer: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  paddingTop: fontSize(8),
  marginHorizontal: fontSize(10),
};

export const Title: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  flex: 1,
};
export const TitleLocation: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.blackSecondary,
  flex: 1,
  marginLeft: fontSize(2),
};
export const Description: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(10.5),
  color: color.palette.blackSecondary,
  width: "90%",
};
export const bottomLbl: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(10.5),
  color: color.palette.blackSecondary,
};
export const bottomSpace: TextStyle = {
  width: "50%",
  backgroundColor: "red",
};
export const dateWrap: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(10.5),
  color: color.palette.blackSecondary,
  paddingTop: fontSize(1.5),
  paddingLeft: fontSize(2),
};

export const ApprovalWrapper: ViewStyle = {
  position: "absolute",
  zIndex: 1,
  top: fontSize(3),
  right: fontSize(1),
  // justifyContent: 'flex-end',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
  width: fontSize(40),
  height: fontSize(25),
  alignItems: "center",
};

export const TitleApproval: TextStyle = {
  flex: 1,
  fontSize: fontSize(12),
  color: color.white,
  fontFamily: font.Poppins_Medium,
};
export const followingWrap: ViewStyle = {
  alignItems: "flex-start",
  borderRadius: 6,
  marginHorizontal: fontSize(10),
  backgroundColor: color.white,
  paddingHorizontal: fontSize(10),
  paddingTop: fontSize(10),
  marginBottom: fontSize(5),
  marginTop: fontSize(10),
  flex: 1,
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  justifyContent: "center",
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: fontSize(2),
  },
};

export const Style = StyleSheet.create({
  loaderWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "45%",
  },
});
