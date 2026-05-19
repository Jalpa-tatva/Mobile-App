import {
  ViewStyle,
  TextStyle,
  Platform,
  ImageStyle,
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
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
};
export const ActionText: TextStyle = {
  marginTop: 5,
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
};
export const FOOTER: ViewStyle = { marginBottom: 0 };

export const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};

export const ActionButtonWrapper: ViewStyle = {
  position: "absolute",
  bottom: 20,
  right: 20,
  alignItems: "center",
  justifyContent: "center",
};
export const FormContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: color.primary,
  flex: 1,
};
export const RawContainerButton: ViewStyle = {
  alignItems: "center",
  backgroundColor: color.white,
  flex: 1,
  paddingVertical: 10,
};

export const COUNTRY_BODY: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  // paddingVertical: fontSize(1),
  paddingLeft: fontSize(10),
  backgroundColor: "#f8fafb",
  height: fontSize(36),
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  borderRadius: fontSize(5),

  // marginBottom: 3,
  // marginVertical: 4,
  // paddingVertical:fontSize(10),
  // paddingLeft: 10,
};

export const COUNTRY_BODY_TEXT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

export const full: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};

export const leftIconStyle: ImageStyle = {
  marginRight: 10,
};

export const ExtraTItle: TextStyle = {
  fontFamily: font.Poppins_SemiBold,
  fontSize: fontSize(14),
  color: color.palette.darkGray,
};

export const ButtonWrapper1: ViewStyle = {
  width: "100%",
  marginTop: fontSize(12),
  justifyContent: "center",
  marginLeft: fontSize(8),
};
export const ImageWrapper: ViewStyle = {
  marginTop: fontSize(8),
  marginBottom: fontSize(2),
};
export const ImageSubWrapper: ViewStyle = {
  backgroundColor: color.searchBoxGrey,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: fontSize(5),
  height: fontSize(130),
  borderStyle: "dashed",
  borderWidth: fontSize(0.8),
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
export const DetailsWrapper: ViewStyle = {
  width: "100%",
  backgroundColor: color.white,
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
};
export const plusLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.secondary,
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
export const Label1Style: TextStyle = {
  paddingTop: fontSize(5),
};
export const CountryLbl: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.black,
};
export const CountryLblTitle: TextStyle = {
  marginBottom: fontSize(6),
  color: color.palette.black,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
};
export const eventImgError: TextStyle = {
  color: color.palette.red,
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(10),
  marginTop: fontSize(3),
};
export const TitleLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
  paddingVertical: fontSize(1),
};
export const SheetWrapper: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
};
export const OverLayButtonContainerCencel: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 10,
};
export const OverLayButtonText: TextStyle = {
  color: color.palette.red,
  fontSize: fontSize(16),
  fontFamily: font.Poppins_Regular,
};
export const OverLayTopButtonContainerCencel: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 2,
};
export const ButtonSheetTitle: TextStyle = {
  color: color.palette.white,
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(16),
  width: "100%",
  marginLeft: 10,
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
export const screen: ViewStyle = {
  paddingHorizontal: 20,
};
export const headerImageContainer: ViewStyle = {
  alignItems: "center",
  marginBottom: 24,
};

export const titleContainer: ViewStyle = {
  marginBottom: 24,
};
export const titleText: TextStyle = {
  fontSize: fontSize(30),
  fontFamily: "Poppins-Bold",
  color: "black",
};
export const checkboxContainer: ViewStyle = {
  marginVertical: 25,
  flexDirection: "row",
  alignItems: "center",
};
export const bottomText1: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.placeholder,
};

export const bottomText2: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.secondary,
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

export const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fefefe",
    marginBottom: fontSize(5),
  },
  spaceBoth: {
    marginHorizontal: fontSize(10),
    marginTop: 10,
  },
  userWrapper: {
    borderWidth: fontSize(0.5),
    alignSelf: "flex-start",
    borderColor: color.amColor,
    paddingVertical: fontSize(1),
    paddingHorizontal: fontSize(5),
    borderRadius: fontSize(5),
    marginTop: fontSize(5),
  },
  padRight: {
    marginRight: fontSize(3),
  },
  midView: {
    marginBottom: fontSize(1),
  },
  hightLight: {
    width: fontSize(8),
    borderRadius: fontSize(15),
    backgroundColor: "#52cce6",
    marginRight: fontSize(10),
  },
  content: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: color.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    paddingHorizontal: fontSize(10),
    borderTopLeftRadius: fontSize(10),
    borderBottomLeftRadius: fontSize(10),
    paddingVertical: fontSize(10),
  },
  eventTime: {
    justifyContent: "center",
    width: fontSize(65),
    alignItems: "center",
  },
  locatioView: {
    flexDirection: "row",
    alignItems: "flex-start",
    left: fontSize(-4),
    marginRight: fontSize(20),
  },
  eventTimeLbl: {
    fontSize: fontSize(12.5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
  },
  timeLbl: {
    fontSize: fontSize(10.5),
    fontFamily: font.Poppins_Regular,
    color: color.palette.darkGray,
  },
  startTime: {
    color: color.palette.black,
    paddingVertical: fontSize(0.5),
  },
  locatioLbl: {
    fontSize: fontSize(9),
    fontFamily: font.Poppins_Medium,
    color: color.palette.darkGray,
    // top: fontSize(0.7),
  },
  root: {
    marginHorizontal: fontSize(10),
    marginTop: fontSize(20),
  },
  user: {
    fontSize: fontSize(9),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
  },
  userName: {
    fontSize: fontSize(9.5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
  },
  usernameWrapper: {
    flex: 1,
    marginRight: fontSize(5),
  },
  padLeft: {
    paddingLeft: fontSize(1),
  },
});
