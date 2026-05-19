import { ViewStyle, TextStyle, StyleSheet, Platform } from "react-native";
import { color, font, fontSize } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };
export const HEADERTOP: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
};
export const ExtraTItle1: TextStyle = {
  paddingBottom: 3,
};
export const BODY: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
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
  paddingVertical: 12,
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

export const ButtonWrapper1: ViewStyle = {
  width: "100%",
  backgroundColor: color.palette.white,
  marginTop: 20,
};
export const DetailsWrapper: ViewStyle = {
  width: "100%",
  backgroundColor: color.palette.white,
  borderWidth: 0.8,
  borderColor: color.border,
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
};
export const IsEditTextInputView: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
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
export const ButtonTitle: TextStyle = {
  paddingVertical: 10,
  paddingHorizontal: 6,
  fontSize: fontSize(12),
  color: color.white,
  fontFamily: font.Poppins_Medium,
};
export const detailCal: ViewStyle = {
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  marginBottom: fontSize(5),
};
export const CountryText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(14),
  color: color.palette.black,
};
export const style = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  deleteLoaderView: {
    backgroundColor: color.textPlaceholder,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  generalWrapper: {
    marginTop: 20,
  },
  contents: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginHorizontal: 6,
    width: "100%",
    backgroundColor: color.palette.white,
    borderWidth: 0.8,
    borderColor: color.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // shadowColor: color.palette.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  fingerprintWrapper: {
    backgroundColor: color.white,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  biometricImg: {
    width: 20,
    height: 20,
  },
  iconWrapper: {
    width: 35,
    height: 35,
    borderColor: color.thumbColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  detailMainCal: {
    width: "100%",
    marginTop: fontSize(10),
  },
  updateWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: fontSize(20),
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
  subBody: {
    width: "100%",
    flex: 1,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: Platform.OS === "android" ? "-1%" : "-3%",
  },
});
