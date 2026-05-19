import { ViewStyle, TextStyle, Platform, StyleSheet } from "react-native";
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
  backgroundColor: color.searchBoxGrey,
  borderWidth: 1,
  // borderColor: '#bdbdbd',
  borderColor: color.searchBg,
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
  marginTop: fontSize(10),
};
export const LabelStyle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.black,
  paddingVertical: fontSize(1),
  paddingLeft: fontSize(10),
  backgroundColor: color.searchBoxGrey,
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  borderRadius: fontSize(5),
};
export const styleWrapper: ViewStyle = {
  borderColor: "#f8fafb",
  borderWidth: 0,
};
export const TitleLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
  paddingVertical: fontSize(1),
};
export const DetailsWrapper: ViewStyle = {
  width: "100%",
  backgroundColor: color.palette.white,
  // borderWidth: 0.8,
  borderColor: color.border,
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
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
export const CountryPickerView = { marginTop: 8 };
export const CountryLabel = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
};
export const Style = StyleSheet.create({
  dropDownStyle1: {
    zIndex: 10,
    backgroundColor: color.searchBoxGrey,
    borderWidth: fontSize(0.5),
    borderColor: color.searchBg,
    borderRadius: fontSize(5),
  },
  dropDownStyle2: {
    zIndex: 5,
  },
  countryLbl: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(11),
    color: color.palette.black,
  },
  addPhoto: {
    height: 42,
    paddingHorizontal: 5,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 6,
    backgroundColor: color.searchBoxGrey,
    borderWidth: fontSize(0.5),
    borderColor: color.searchBg,
    borderRadius: fontSize(5),
    paddingLeft: fontSize(10),
  },
  listLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(11),
    color: color.palette.black,
  },
  fullWidth: { width: "100%" },
  spaceTop: {
    marginTop: fontSize(10),
  },
  spaceBoth: {
    marginHorizontal: fontSize(8),
    marginTop: 20,
  },
});
