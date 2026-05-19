import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { color, font, spacing, fontSize } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };

export const BODY: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const RawContainerMain: ViewStyle = {
  backgroundColor: color.white,
  width: "96%",
  padding: 10,
  borderRadius: 6,
  marginHorizontal: 20,
  marginTop: 10,
  alignSelf: "center",
  borderWidth: 0.5,
  borderColor: color.palette.lighterGrey,
  flexDirection: "row",
  justifyContent: "center",
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: fontSize(2),
  },
};

export const Title: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  flex: 1,
  textTransform: "capitalize",
};
export const TitleLocation: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.lightGrey,
  flex: 1,
};

export const RawContainer: ViewStyle = {
  backgroundColor: color.white,
  width: "100%",
  alignItems: "center",
  marginVertical: 2,
  paddingVertical: 2,
  flexDirection: "row",
  marginTop: 10 / 2,
};

export const TextContainer: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  justifyContent: "center",
  marginHorizontal: 10,
  // marginVertical: 10,
  paddingTop: fontSize(8),
};

export const ImageContainer: ViewStyle = {
  width: fontSize(40),
  height: fontSize(40),
  borderRadius: fontSize(40) / 2,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.imagebg,
};

export const ImageWrapper: ImageStyle = {
  width: fontSize(40),
  height: fontSize(40),
  borderRadius: fontSize(40) / 2,
  resizeMode: "stretch",
};

export const TitleApproval: TextStyle = {
  flex: 1,
  fontSize: fontSize(12),
  color: color.white,
  fontFamily: font.Poppins_Medium,
};

export const ApprovalWrapper: ViewStyle = {
  position: "absolute",
  zIndex: 1,
  top: 10,
  right: 10,
  justifyContent: "flex-end",
  backgroundColor: color.otherSplash,
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
};
export const ButtonContainer: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  height: 50,
  marginTop: 20,
  alignItems: "center",
};

export const ButtonPositive: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  borderRadius: 6,
  backgroundColor: color.palette.blackGreen,
  marginHorizontal: 20,
};

export const ButtonTitle: TextStyle = {
  paddingVertical: 10,
  fontSize: fontSize(12),
  color: color.white,
  fontFamily: font.Poppins_Medium,
};
export const DialogTitle: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
  textAlign: "center",
  marginTop: 10,
};

export const SearchWrapper: ViewStyle = {
  width: "94%",
  height: fontSize(50),
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
  flexDirection: "row",
  paddingVertical: 10,
  borderRadius: 10,
  backgroundColor: color.secondary,
  marginTop: 30,
};

export const TextInputStyle: TextStyle = {
  color: color.white,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  height: fontSize(50),
  flex: 1,
  textAlignVertical: "center",
  marginHorizontal: 10,
  textAlign: "left",
  justifyContent: "center",
};

export const overlay: ViewStyle = {
  width: "90%",
  borderRadius: 25,
  padding: 10,
  paddingVertical: 20,
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
export const OverTitle: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(20),
  fontFamily: font.Poppins_Bold,
  paddingBottom: 3,
  width: "90%",
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

export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(24),
  height: fontSize(45),
  marginTop: 25,
  padding: 10,
  backgroundColor: color.secondary,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const OverLayButtonContainer1: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
};

export const OverLayButtonText: TextStyle = {
  color: color.palette.red,
  fontSize: fontSize(16),
  fontFamily: font.Poppins_Regular,
};

export const HEADERTOP: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
};

export const Style = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
});
