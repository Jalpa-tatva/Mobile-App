import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { color, spacing, font, fontSize } from "@theme/index";
import styleConfig from "@app/theme/styleConfig";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };
export const HEADERTOP: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
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

export const OverLayRowContainer: ViewStyle = {
  marginVertical: 10,
  flexDirection: "row",
};
export const MainOverLayContainer: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 10,
  backgroundColor: color.white,
};
export const GroupDetailsHead: ViewStyle = {
  flexGrow: 1,
  flexDirection: "row",
  justifyContent: "center",
  marginHorizontal: 10,
  paddingBottom: fontSize(14),
};
export const GroupDetailsHeadTouch: ViewStyle = {
  backgroundColor: color.white,
  //height: fontSize(72),
  flex: 1,
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 7.5,
  marginHorizontal: 6,
  paddingVertical: 8,
};

export const OverLayImageContainer: ViewStyle = {
  marginRight: 25,
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(45),
  height: fontSize(45),
  width: fontSize(45),
};

export const OverLayTitleContainer: ViewStyle = {
  justifyContent: "center",
  flexGrow: 1,
  alignSelf: "center",
};

export const OverLayRowContainer1: ViewStyle = {
  flexDirection: "row",
  marginVertical: 15,
  backgroundColor: color.palette.darkGray,
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
};
export const OverTitle: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(20),
  fontFamily: font.Poppins_Bold,
  paddingBottom: 3,
  width: "90%",
};

export const GroupDetailsHeadText: TextStyle = {
  color: color.secondary,
  fontFamily: font.Poppins_Bold,
  fontSize: fontSize(18),
};
export const GroupDetailsHeadTextMain: TextStyle = {
  position: "absolute",
  bottom: 8,
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_ExtraBold,
  fontSize: fontSize(10),
};
export const OverLayButtonText: TextStyle = {
  color: color.palette.red,
  fontSize: fontSize(16),
  fontFamily: font.Poppins_Regular,
};
export const OverLayTopButtonText: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(16),
  fontFamily: font.Poppins_Bold,
};

export const OverLayText: TextStyle = {
  color: color.palette.white,
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  paddingLeft: 5,
  width: "90%",
};

export const OverLayImage: ImageStyle = {
  height: fontSize(45),
  width: fontSize(45),
  borderRadius: fontSize(45),
  resizeMode: "contain",
};
export const overlay: ViewStyle = {
  width: "90%",
  borderRadius: 25,
  padding: 10,
  paddingVertical: 20,
  backgroundColor: color.white,
};
export const alignData: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
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
export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(24),
  height: fontSize(45),
  marginTop: fontSize(11),
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
  alignSelf: "center",
};
export const OverLayButtonContainerCencel: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 10,
};
export const OverLayTopButtonContainerCencel: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 2,
};
export const backdropStyle: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
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
  marginBottom: 3,
  borderColor: color.trans,
  borderRadius: 8,
  marginVertical: 4,
  paddingVertical: 8,
  paddingHorizontal: 10,
};

export const SeverityTitle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  width: "100%",
  color: color.palette.black,
};

export const subContainer: ViewStyle = {
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
};

export const view1Style: ViewStyle = {
  width: styleConfig.width * 0.2,
  padding: fontSize(10),
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
};

export const view2Style: ViewStyle = {
  justifyContent: "center",
  flex: 1,
};

export const titleText: TextStyle = {
  fontSize: fontSize(22),
  fontFamily: font.Poppins_Medium,
  color: color.white,
  textAlign: "left",
};

export const HeadMainStyle: ViewStyle = {
  width: "100%",
  //height:Platform.OS === 'android' ? 60 : 80,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
  //paddingTop:Platform.OS === 'android' ? 0 : 20,
  paddingTop: Platform.OS === "android" ? 0 : 25,
};

export const viewRightStyle: ViewStyle = {
  padding: 10,
  marginRight: 10,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
};

export const Style = StyleSheet.create({
  spaceTopCommon: {
    marginTop: -24,
  },
  fullWidth: {
    width: "100%",
  },
  directionRow: {
    flexDirection: "row",
  },
  fullFlex: {
    flex: 1,
  },
  selectDataWrapper: {
    borderColor: color.border,
    height: 42,
  },
  selectFileWrapper: {
    borderColor: color.border,
    borderRadius: fontSize(4),
    paddingVertical: fontSize(8),
    paddingHorizontal: fontSize(8),
    borderWidth: 1,
    marginTop: fontSize(8),
    marginBottom: fontSize(15),
  },
  vaccineLbl: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(15),
    color: color.palette.blackSecondary,
  },
  fileWrapper: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    marginHorizontal: fontSize(35),
  },
  fileWrapperLbl: {
    fontSize: fontSize(15),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
    // marginLeft: fontSize(35),
    marginRight: fontSize(35),
    textAlign: "center",
  },
  dateLbl: {
    fontSize: fontSize(15),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
  },
});
