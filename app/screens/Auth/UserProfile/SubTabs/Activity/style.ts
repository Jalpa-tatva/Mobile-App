import { ViewStyle, TextStyle, ImageStyle, Platform } from "react-native";
import { color, font, fontSize } from "@theme/index";

export const Full: ViewStyle = { flex: 1, backgroundColor: color.white };

export const Body: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const ApprovalWrapper: ViewStyle = {
  // position: 'absolute',
  // bottom: fontSize(7),
  // right: fontSize(7),
  borderRadius: fontSize(3),
  borderWidth: fontSize(0.5),
  height: fontSize(22),
  justifyContent: "center",
  alignItems: "center",

  // zIndex: 9999,
  borderColor: color.searchBg,
  paddingHorizontal: fontSize(5),
};

export const BottomTimeRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: fontSize(2),
  // flex:1
  // marginRight: fontSize(20),
};
export const authorBy: ViewStyle = { flex: 1, marginRight: fontSize(5) };
export const ReadMoreText: TextStyle = {
  textAlign: "right",
  marginTop: fontSize(3),
  color: color.grayOne,
  fontSize: fontSize(11),
  fontFamily: font.Poppins_Regular,
};

export const TitleApproval: TextStyle = {
  // flex: 1,
  fontSize: fontSize(10),
  color: color.secondary,
  fontFamily: font.Poppins_SemiBold,
};

export const ImageWrapper: ImageStyle = {
  width: fontSize(60),
  height: fontSize(60),
};

export const RawContainerMain: ViewStyle = {
  flex: 1,
};

export const Description: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(10.5),
  color: color.palette.blackSecondary,
  // width: '65%',
};
export const startDateStyle: TextStyle = {
  marginTop: fontSize(6),
  textAlign: "right",
  color: color.palette.blackSecondary,
};

export const Title: TextStyle = {
  fontFamily: font.Poppins_SemiBold,
  fontSize: fontSize(14),
  color: color.palette.black,
};

export const RawContainer: ViewStyle = {
  backgroundColor: color.white,
  width: "100%",
  flexDirection: "row",
  marginTop: fontSize(6),
};

export const followingWrap: ViewStyle = {
  alignItems: "center",
  borderRadius: 6,
  marginHorizontal: fontSize(10),
  backgroundColor: color.white,
  paddingHorizontal: fontSize(10),
  paddingVertical: fontSize(7),
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

export const TextContainer: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  marginHorizontal: fontSize(10),
  marginBottom: fontSize(10),
};

export const FlexMain: TextStyle = {
  flex: 1,
};

export const ImageContainer: ViewStyle = {
  width: fontSize(60),
  height: fontSize(60),
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.white1,
};
