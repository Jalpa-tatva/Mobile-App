import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { color, font, spacing, fontSize } from "@theme/index";
import styleConfig from "@app/theme/styleConfig";

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
export const FlatListWrapper: ViewStyle = {
  flex: 1,
  width: "100%",
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

export const SearchTextStyle: TextStyle = {
  marginTop: 5,
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  height: 40,
  borderColor: color.border,
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 10,
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

export const RawContainerMain: ViewStyle = {
  backgroundColor: color.white,
  width: "92%",
  padding: 10,
  borderRadius: 6,
  marginHorizontal: 20,
  marginTop: 50,
  alignSelf: "center",
  borderWidth: 0.5,
  borderColor: color.palette.lighterGrey,
  justifyContent: "center",
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: 3,
  },
};

export const ContainerWraper: ViewStyle = {
  width: "100%",
  flex: 1,
  backgroundColor: color.white,
};

export const Wrapper: ViewStyle = {
  flex: 1,
  width: "100%",
  backgroundColor: color.white,
};

export const FlatWrapper: ViewStyle = {
  flex: 1,
  width: "100%",
  backgroundColor: color.white,
  alignItems: "center",
  justifyContent: "center",
};

export const SearchWrapper: ViewStyle = {
  width: "92%",
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
export const TextInputWrapper: ViewStyle = {
  height: fontSize(50),
  flexDirection: "row",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 10,
  backgroundColor: color.secondary,
};

export const TextInputStyle: TextStyle = {
  color: color.white,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(15),
  height: fontSize(50),
  flex: 1,
  textAlignVertical: "center",
  marginHorizontal: fontSize(10),
  textAlign: "left",
  justifyContent: "center",
};

export const RawContainerMainItem: ViewStyle = {
  backgroundColor: color.white,
  width: "90%",
  marginVertical: 10,
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
};

export const RawContainerBottom: ViewStyle = {
  flexDirection: "row",
  marginLeft: 80,
};

export const RawContainerBottom1: ViewStyle = {
  backgroundColor: color.palette.darkGray,
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 4,
  marginLeft: 10,
};
export const RawContainer: ViewStyle = {
  backgroundColor: color.white,
  width: "100%",
  alignItems: "center",
  // marginVertical: 2,
  // paddingVertical: 2,
  flexDirection: "row",
};

export const ImageWrapper: ImageStyle = {
  width: 80,
  height: 80,
  marginLeft: 10,
};

export const TextContainer: ViewStyle = {
  justifyContent: "center",
  flex: 1,
};
export const TopContainer: ViewStyle = {
  flexDirection: "row",
  // flex: 1,
};
export const TopSubContainer: ViewStyle = {
  flex: 1,
  marginRight: fontSize(5),
};

export const Title: TextStyle = {
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
  marginRight: 10,
};
export const DateLabel: TextStyle = {
  fontSize: fontSize(11.5),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Regular,
  marginLeft: fontSize(6),
  marginTop: styleConfig?.isAndroid ? fontSize(2) : fontSize(0.2),
};
export const AddDrugLabel: TextStyle = {
  fontSize: fontSize(10),
  marginLeft: fontSize(2),
  color: color.palette.white,
  fontFamily: font.Poppins_Medium,
  top: 1,
};

export const DateContainer: ViewStyle = {
  marginTop: fontSize(5),
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};
export const AddDrugContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginRight: fontSize(5),
  // borderWidth: fontSize(0.5),
  paddingHorizontal: fontSize(5),
  paddingVertical: fontSize(2),
  borderRadius: fontSize(5),
  // backgroundColor:'#0A4A9C'
  backgroundColor: "#2295ed",
};
export const StartDateContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};
export const ReviewContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: fontSize(5),
  // alignItems: 'center',
  marginRight: 10,
};

export const DrugTitle: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.blackSecondary,
  fontFamily: styleConfig?.isAndroid
    ? font.Poppins_SemiBold
    : font.Poppins_Medium,
};
export const TitleLocation: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.darkGray,
  fontFamily: font.Poppins_Medium,
  marginRight: 10,
};
export const TitleLocationOne: TextStyle = {
  fontSize: fontSize(11),
  marginLeft: fontSize(5),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Regular,
};
export const TitleNotes: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.white,
  fontFamily: font.Poppins_Medium,
};
export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(8),
  height: 35,
  width: 120,
  backgroundColor: color.palette.white,
  marginTop: 5,
  borderWidth: 0.5,
  borderColor: color.secondaryLight,
  justifyContent: "center",
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: 3,
  },
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.black,
  fontSize: fontSize(12),
};

export const WebIcon: ViewStyle = {
  // alignSelf: 'flex-start',
  // justifyContent: 'center',
  alignItems: "flex-end",
  // width: fontSize(40),
  marginRight: fontSize(5),
  top: fontSize(-10),
};
export const Style = StyleSheet.create({
  connectionSpaceLeft: { marginLeft: 15 },
  connectionSpaceRight: { marginRight: 10 },
  wrapperOne: { alignItems: "center", width: "100%" },
  wrapperSecond: { paddingBottom: 10, width: "100%" },
});
