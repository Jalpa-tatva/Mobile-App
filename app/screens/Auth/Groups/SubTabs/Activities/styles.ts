import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { color, font, fontSize } from "@theme/index";
import styleConfig from "@app/theme/styleConfig";

export const Full: ViewStyle = { flex: 1, backgroundColor: color.secondary };

export const Body: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
  // marginBottom: 20,
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
  color: color.checkBox,
  fontSize: fontSize(11),
  fontFamily: font.Poppins_Regular,
};

export const TitleApproval: TextStyle = {
  // flex: 1,
  fontSize: fontSize(10.5),
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
  paddingTop: fontSize(7),
  marginBottom: fontSize(3),
  marginTop: fontSize(5),
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
  // marginHorizontal: fontSize(10),
  marginLeft: fontSize(10),
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

export const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: color.secondary,
    width: "100%",
    position: "relative",
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: color.whiteOld,
  },
  closeLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(14),
    color: color.palette.white,
  },
  replyWrapper: {
    // fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
    color: color.palette.black,
    paddingLeft: 10,
    borderColor: color.searchBg,
    borderWidth: fontSize(0.7),
    borderRadius: 5,
    shadowColor: "#000",
    paddingVertical: fontSize(5),
    marginTop: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: styleConfig?.isAndroid ? 0.5 : 0.01,
  },
  loaderWrapper: {
    width: fontSize(50),
    height: fontSize(50),
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
  },
  EmojiTitle: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(13),
    color: color.palette.blackSecondary,
    textAlign: "center",
  },
  closeLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(14),
    color: color.palette.white,
  },
  mainNavigator: {
    // backgroundColor: 'pink',
    height: fontSize(40),
    flexDirection: "row",
    marginHorizontal: fontSize(10),
  },
  closeContainer: {
    position: "absolute",
    right: fontSize(10),
  },
  menuTab: {
    // borderBottomWidth: 2,
    // backgroundColor: 'red',
    flex: 1,
  },
  nonFocus: {
    marginLeft: fontSize(10),
    flex: 1,
  },
  nonFocusLabel: {
    color: color.palette.white,
    fontSize: fontSize(16),
    fontFamily: font.Poppins_Medium,
  },
  focusCal: {
    marginLeft: fontSize(15),
  },
  margeTop: {
    marginTop: 0,
  },
  CommonLine: {
    backgroundColor: color.palette.white,
    width: "100%",
    height: 1,
  },
  focusLabel: {
    color: color.palette.white,
    fontSize: fontSize(16),
    fontFamily: font.Poppins_Medium,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: color.secondary,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  commentCount: {},
  commentClose: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reactWrapper: {
    width: fontSize(25),
    alignItems: "center",
    marginLeft: fontSize(10),
  },
  replyMainWrapper: {
    marginTop: 10,
  },
  alignRight: {
    alignSelf: "flex-end",
  },
  replyButton: {
    backgroundColor: color.secondary,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 3,
    // paddingVertical: 3,
    width: fontSize(70),
    height: 35,
    borderRadius: 2,
  },
  replyTitle: {
    color: color.white,
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Medium,
  },
  secColorTxt: {
    color: color.red,
  },
  headerTop: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  contentLowerCase: {
    textTransform: "lowercase",
  },
  curvBorder: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  emojiWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: color.secondary,
    borderColor: color.secondary,
    // maxWidth: fontSize(180),
    // position: 'absolute',
    borderRadius: fontSize(10),
    paddingHorizontal: fontSize(10),
  },
  emojiCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    paddingVertical: 1,
    paddingTop: 5,
  },
  emojiFont: {
    fontSize: fontSize(15),
    // paddingVertical: 5,
  },
  emojiCount: {
    fontFamily: font.Poppins_SemiBold,
    color: color.selectionColor,
    fontSize: fontSize(13),
    marginLeft: 5,
    marginTop: 3,
  },
  contentWithReact: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subEmojiWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedEmojis: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginHorizontal: 5,
  },
  fullFlex: {
    flex: 1,
  },
});
