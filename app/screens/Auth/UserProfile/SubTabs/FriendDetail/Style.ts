import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { color, font, spacing, fontSize } from "@theme/index";

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
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  alignItems: "center",
};

export const Title: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.lightGrey,
  fontFamily: font.Poppins_Medium,
};

export const TitleLocation: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.black,
  fontFamily: font.Poppins_Medium,
};

export const DetailsContainer: ViewStyle = {
  marginTop: 30,
  backgroundColor: color.white,
  width: "88%",
  paddingVertical: 8,
  borderRadius: 12,
  paddingHorizontal: 10,
  alignSelf: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 0.5 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
};

export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(24),
  height: fontSize(45),
  width: "100%",
  marginTop: 25,
  padding: 10,
  backgroundColor: color.secondary,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(11),
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

export const ButtonSheetTitle: TextStyle = {
  width: "100%",
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(16),
  marginLeft: 10,
};

export const OverLayButtonText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: color.red,
  fontSize: fontSize(17),
};

export const OverLayButtonContainerCencel: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 10,
};

export const BottomlWrapperMain: ViewStyle = {
  paddingVertical: 5,
  width: "98%",
};

export const ImageBg: ViewStyle = {
  alignItems: "center",
  width: fontSize(60),
  height: fontSize(80),
};

export const sub1ContainerStyle: ViewStyle = {
  width: "100%",
  paddingHorizontal: "2%",
  flexDirection: "row",
  borderBottomWidth: 1,
  alignSelf: "center",
  alignContent: "center",
  alignItems: "center",
  paddingVertical: "5%",
  borderBottomColor: color.linecolor,
};

export const titleStyle: ViewStyle = {
  flex: 3.3,
  justifyContent: "center",
};

export const textStyle: TextStyle = {
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  marginLeft: 14,
  flex: 1,
  fontFamily: font.Poppins_Regular,
};

export const text1Style: TextStyle = {
  fontSize: fontSize(12),
  color: color.detailscolor,
  marginLeft: 14,
  paddingRight: 10,
  fontFamily: font.Poppins_Regular,
};

export const overlay: ViewStyle = {
  width: "90%",
  borderRadius: 25,
  padding: 10,
  paddingVertical: 20,
  backgroundColor: color.white,
};

export const OverLayInputContainer: ViewStyle = {
  width: "100%",
  marginTop: -10,
  marginHorizontal: -20,
  backgroundColor: color.palette.lightGrey,
  alignItems: "center",
  alignSelf: "center",
  borderRadius: 10,
};

export const backdropStyle: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};

export const OverLayRowContainer: ViewStyle = {
  marginVertical: 10,
  flexDirection: "row",
};

export const MainOverLayContainer: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 10,
};

export const OverLayImageContainer: ViewStyle = {
  marginRight: 25,
  backgroundColor: color.palette.lightGrey,
  borderRadius: 45,
  height: fontSize(45),
  width: 45,
};

export const OverLayTitleContainer: ViewStyle = {
  justifyContent: "center",
  flexGrow: 1,
  alignSelf: "center",
};

export const OverLayImage: ImageStyle = {
  height: fontSize(45),
  width: fontSize(45),
  resizeMode: "contain",
};

export const OverLayRowContainer1: ViewStyle = {
  flexDirection: "row",
  marginVertical: 15,
  backgroundColor: color.palette.darkGray,
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
};

export const OverLayText: TextStyle = {
  color: color.palette.white,
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  paddingLeft: 5,
  width: "90%",
};

export const TagContainer: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.white,
};

export const TextInputs: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Medium,
  borderWidth: 1,
  width: "100%",
  height: fontSize(140),
  marginBottom: 3,
  borderColor: color.trans,
  borderRadius: 8,
  marginVertical: 4,
  paddingVertical: 8,
  paddingHorizontal: 10,
  flexGrow: 1,
};

export const OverLayButtonContainer1: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
};
export const OverTitle: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(20),
  fontFamily: font.Poppins_Bold,
  paddingBottom: 3,
  width: "90%",
};

export const Style = StyleSheet.create({
  commonPadLeft: {
    paddingLeft: 30,
  },
  commonMargeTop: { marginTop: -24 },
  titleWrapper: { flexDirection: "row", paddingRight: 5 },
  titleTransform: { textTransform: "capitalize" },
});
