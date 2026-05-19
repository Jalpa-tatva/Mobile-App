import { ViewStyle, TextStyle, StyleSheet, ImageStyle } from "react-native";
import { color, font, fontSize } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };
export const HEADERTOP: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
};
export const HEADER_WRAPPER: ViewStyle = {
  backgroundColor: color.secondary,
};
export const BODY: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
};
export const Image1Wrapper: ViewStyle = {
  width: fontSize(120),
  height: fontSize(120),
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(120 / 2),
  marginBottom: fontSize(10),
  marginTop: fontSize(20),
};
export const TopWrapper: ViewStyle = {
  // flex:1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
};
export const profileImage: ImageStyle = {
  width: fontSize(120),
  height: fontSize(120),
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(120 / 2),
  borderColor: color.palette.lightGrey,
};
export const SheetWrapper: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
};
export const ButtonImage: ViewStyle = {
  width: 32,
  height: 32,
  alignSelf: "center",
  position: "absolute",
  bottom: -4,
  right: 0,
};
export const WrapperContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: 50,
  width: "80%",
  flexDirection: "row",
  backgroundColor: color.palette.blackSecondary,
  borderRadius: 10,
  paddingLeft: 14,
  marginBottom: 10,
};
export const ButtonSheetTitle: TextStyle = {
  color: color.palette.white,
  fontFamily: font.Poppins_SemiBold,
  fontSize: fontSize(16),
  width: "100%",
  marginLeft: 10,
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
export const ProfileNameWrapper: ViewStyle = {
  flex: 1,
  marginHorizontal: 10,
  justifyContent: "center",
  marginBottom: 20,
};
export const COUNTRY_BODY: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: color.palette.white,
  borderWidth: 1,
  borderColor: "#bdbdbd",
  borderRadius: 4,
  marginBottom: 3,
  marginVertical: 4,
  paddingVertical: fontSize(5),
  paddingLeft: 10,
};

export const COUNTRY_BODY_TEXT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

export const ExtraTItle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(18),
  color: color.palette.black,
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
  // borderWidth: 0.8,
  borderColor: color.border,
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
};
export const IsEditTextInputView: TextStyle = {
  borderColor: color.grayOne,
  color: color.palette.blackSecondary,
  fontSize: fontSize(13),
  fontFamily: font.Poppins_Medium,
  paddingVertical: fontSize(5),
  paddingLeft: fontSize(10),
  // backgroundColor: color.palette.lightGrey,
};

export const signUpButtonContainer: ViewStyle = {
  marginVertical: fontSize(20),
  borderRadius: fontSize(10),
  height: fontSize(40),
  backgroundColor: color.secondary,
  borderWidth: 1,
  borderColor: color.secondary,
};
export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const DialogTitle: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
  marginTop: 10,
  width: "100%",
};
export const DialogHeadTitle: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Bold,
  marginTop: 10,
  flex: 1,
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

  borderRadius: 6,
  backgroundColor: color.palette.blackGreen,
  marginHorizontal: 20,
  paddingHorizontal: 6,
};
export const detailCal: ViewStyle = {
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  marginBottom: fontSize(5),
};

export const ButtonTitle: TextStyle = {
  paddingVertical: 10,
  paddingHorizontal: 6,
  fontSize: fontSize(12),
  color: color.white,
  fontFamily: font.Poppins_Medium,
};

export const style = StyleSheet.create({
  buttonEditTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.black,
    fontSize: fontSize(14),
  },
  fullWidth: {
    width: "100%",
  },
  styleWrapper:{
    backgroundColor:color.palette.lighterGrey
  },
  styleWrapperEnable:{
    backgroundColor:color.palette.white
  },
  countryWrap: { alignItems: "center", marginTop: fontSize(5) },
  inputLbl: {
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
    fontSize: fontSize(13.5),
  },
  BottonTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.white,
    fontSize: fontSize(16),
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: fontSize(5),
    flex: 1,
  },

  /////
  fullFlex: {
    flex: 1,
  },
  detailMainCal: {
    width: "100%",
    marginTop: fontSize(10),
  },
  updateWrapper: {
    // flex: 1,
    // // justifyContent:'flex-end',
    marginHorizontal: fontSize(15),
  },
  prefVal: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Medium,
  },
  privacyCal: {
    width: fontSize(40),
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 6,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  lblprivacy: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
  },
  boldLabel: {
    fontFamily: font.Poppins_Bold,
  },
  topCommonSpace: { marginTop: -24 },
  topPadLeft: { paddingLeft: 30 },
  keyboardScrollWrapper: {
    width: undefined,
    height: undefined,
    paddingBottom: 50,
    marginTop: 20,
    marginHorizontal: 14,
  },
});
