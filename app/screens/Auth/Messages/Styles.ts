import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import { color, font, fontSize } from "@theme/index";

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
  width: "100%",
  flex: 1,
  paddingHorizontal: 15,
  // backgroundColor:'pink',
  // zIndex:999,
  paddingTop: fontSize(20),
};

export const MainView: ViewStyle = {
  flex: 1,
  width: "100%",
  paddingTop: 35,
};
export const IconsView: ViewStyle = {
  backgroundColor: "rgba(118, 118, 118, 0.5)",
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  paddingLeft: 2,
};
export const updateIconView: ViewStyle = {
  backgroundColor: "rgba(118, 118, 118, 0.5)",
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  paddingLeft: 2,
};
export const Title: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
  flex: 1,
};
export const DocText: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
  textTransform: "uppercase",
};
export const EmojiTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(13),
  color: color.palette.white,
  textAlign: "center",
};
export const LoginEmojiCal: ViewStyle = {
  // marginRight: 20,
  left: fontSize(20),
};

export const unKnownEmojiCal: ViewStyle = {
  right: fontSize(20),
};

export const TitleLocation: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.lightGrey,
  flex: 1,
};

export const RawContainer: ViewStyle = {
  // marginVertical: 2,
  paddingVertical: 2,
  flexDirection: "row",
  paddingHorizontal: 6,
  // marginRight: 30,
  borderTopRightRadius: 8,

  borderTopLeftRadius: 8,
  borderRadius: 8,
};

export const DateStyle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(11),
  color: color.palette.black,
  marginLeft: 5,
};
export const TextContainer: ViewStyle = {
  justifyContent: "center",
  marginHorizontal: 10,
  //marginVertical: 10,
  paddingVertical: fontSize(3),
  paddingTop: fontSize(10),
  minWidth: fontSize(20),
  // alignItems: 'center',
};
TextContainerDocs: {
}
export const TextContainerDocs: ViewStyle = {
  paddingRight: fontSize(10),
  paddingVertical: fontSize(3),
  // paddingTop: fontSize(5),
  flexDirection: "row",
  // maxWidth: '85%',
  // flex:1,
  // justifyContent: 'space-between',
  //  marginHorizontal: 10,
};
export const TextArea: ViewStyle = {
  paddingLeft: fontSize(10),
  // flex:1,
};
export const UpdateTextArea: ViewStyle = {
  paddingTop: fontSize(5),
};
export const ProgressUpdate: ViewStyle = {
  alignItems: "flex-end",
  bottom: 15,
  // marginBottom: fontSize(-8),
};
export const DocIcon: ViewStyle = {};
export const VideoPreview: ViewStyle = {
  // width:'60%'
  paddingVertical: fontSize(3),
};

export const FileImageWrapper: ImageStyle = {
  width: 40,
  height: 40,
  marginHorizontal: 5,
  marginTop: 10,
  resizeMode: "contain",
};

export const emojiModal: ViewStyle = {
  position: "absolute",
  // right: fontSize(-40),
  // top: fontSize(-25),

  backgroundColor: color.secondary,
  paddingHorizontal: 5,
  // width:fontSize(30),
  maxWidth: fontSize(200),
  height: fontSize(30),

  borderRadius: fontSize(30 / 2),
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};

export const ModalStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  // // backgroundColor: '#e0e0e0',
  backgroundColor: color.secondary,
  alignSelf: "flex-end",
  // // width: fontSize(100),
  maxWidth: fontSize(180),
  // height: fontSize(35),
  position: "absolute",
  // top: fontSize(-28),
  // flex: 1,
  // // right: props.from == props.loginUser ? '-10%' : '20%',
  // top: fontSize(-20),
  borderRadius: fontSize(15),
  paddingHorizontal: fontSize(10),
  zIndex: 999,
  // padding:fontSize(10),}
};

export const ImageContainer: ViewStyle = {
  width: fontSize(30),
  height: fontSize(30),
  borderRadius: fontSize(60) / 2,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.imagebg,
  // paddingTop:10,
  alignSelf: "center",
  marginTop: 10,
};

export const ImageWrapper: ImageStyle = {
  paddingTop: 5,
  // alignItems:"center",
  // justifyContent: 'center',

  width: fontSize(30),
  height: fontSize(30),
  borderRadius: fontSize(60) / 2,
  resizeMode: "cover",
};

export const TitleApproval: TextStyle = {
  flex: 1,
  fontSize: fontSize(12),
  color: color.white,
  fontFamily: font.Poppins_Medium,
  textAlign: "right",
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

export const style = StyleSheet.create({
  tabBlurFocus: {
    backgroundColor: color.white,
  },
});

export const styles = StyleSheet.create({
  spaceTop: { flex: 1, marginTop: fontSize(10), marginBottom: 100 },
  userImage: {
    width: fontSize(122),
    height: fontSize(122),
    borderRadius: fontSize(122 / 2),
    borderWidth: 2,
    borderColor: color.palette.lightGrey,
    backgroundColor: color.searchBg,
  },
  fullFlex: {
    flex: 1,
  },
  containerWrapper: {
    flex: 1,
    backgroundColor: color.white,
    paddingBottom: fontSize(15),
  },
  closeIcn: {
    position: "absolute",
    right: fontSize(10),
    top: fontSize(10),
    zIndex: 99,
    width: fontSize(20),
    height: fontSize(20),
    backgroundColor: color.white,
    borderRadius: fontSize(10),
    justifyContent: "center",
    alignItems: "center",
  },
  locationIcn: {
    bottom: fontSize(0.8),
  },
  spaceStart: {
    paddingStart: fontSize(2),
  },
  detailWrap: {
    backgroundColor: color.white1,
    alignSelf: "flex-start",
    paddingLeft: fontSize(10),
    marginTop: fontSize(15),
    width: "100%",
    paddingVertical: fontSize(10),
    paddingRight: fontSize(15),
  },
  closeLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(14),
    color: color.palette.white,
  },
  groups: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(11),
    color: color.palette.darkGray,
  },
  groupsWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupBold: {
    fontFamily: font.Poppins_SemiBold,
  },
  imageWrapper: {
    width: fontSize(122),
    height: fontSize(122),
    borderRadius: fontSize(122 / 2),
    backgroundColor: color.searchBg,
    position: "absolute",
    bottom: fontSize(6),
  },
  progressLabel: {
    color: "black",
    fontSize: fontSize(10),
    fontFamily: font.Poppins_Bold,
  },
  profileBackImg: {
    // width: '100%',
    height: 200,
    width: Dimensions.get("window").width + fontSize(5),
  },
  header: {
    alignItems: "center",
    backgroundColor: color.secondary,
    width: "100%",
    height: Dimensions.get("window").height / 4,
    position: "relative",
  },
  sheetHeader: {
    backgroundColor: color.secondary,
    width: "100%",
    position: "relative",
    paddingLeft: 15,
    paddingBottom:10,
    borderBottomWidth: 0.6,
    borderBottomColor:color.whiteOld
  },
  profileWrapper: {
    flex: 1,
    position: "absolute",
    bottom: fontSize(-20),
  },
  designation: {
    fontSize: fontSize(11),
    fontFamily: font.Poppins_Medium,
    color: color.palette.darkGray,
    textTransform: "capitalize",
    // marginTop: 4,
  },
  createDate: {
    fontSize: fontSize(10.5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.darkGray,
    paddingTop: fontSize(2),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 4,
  },
  spaceMapStart: {
    marginLeft: fontSize(-12),
  },
  name: {
    fontSize: fontSize(16),
    fontFamily: font.Poppins_Bold,
    color: color.palette.black,
    // marginTop: 60,
  },
  dateTimeBox: {
    width: fontSize(70),
    marginLeft: fontSize(10),
  },
  subWrapper: {
    padding: fontSize(10),
    flexDirection: "row",
  },
  dateTime: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(10.5),
    color: color.palette.darkGray,
    alignSelf: "flex-end",
  },
  detailBox: {
    flex: 1,
  },
  userNamebox: {
    // width: '70%',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userDetailWrap: {
    marginRight: fontSize(10),
  },
  userName: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12.5),
    color: color.palette.black,
    flex: 1,
  },
  userDetail: {
    justifyContent: "center",
    alignItems: "center",
  },
  LoaderWrapper: {
    flexDirection: "row",
  },
  loaderCal: {
    paddingHorizontal: fontSize(3),
  },
  closeContainer: {
    position: "absolute",
    right: fontSize(10),
  },
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: color.secondary,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  nonFocus: {
    marginLeft: fontSize(10),
    flex: 1,
  },
  focusCal: {
    marginLeft: fontSize(15),
  },
  focusLabel: {
    color: color.palette.white,
    fontSize: fontSize(16),
    fontFamily: font.Poppins_Medium,
  },
  CommonLine: {
    backgroundColor: color.palette.white,
    width: "100%",
    height: 1,
  },
  nonFocusLabel: {
    color: color.palette.white,
    fontSize: fontSize(16),
    fontFamily: font.Poppins_Medium,
  },
  mainNavigator: {
    // backgroundColor: 'pink',
    height: fontSize(40),
    flexDirection: "row",
    marginHorizontal: fontSize(10),
  },
  menuTab: {
    // borderBottomWidth: 2,
    // backgroundColor: 'red',
    flex: 1,
  },
  contentContainer: {
    // height: 90,
    // position: 'absolute',
    // bottom: 0,
    // backgroundColor: 'pink',
    flex: 1,
    // alignItems: 'center',
  },

  spaceBoth: {
    paddingHorizontal: fontSize(2),
    flexDirection: "row",
    alignItems: "center",
  },
  modelWrapper: {
    left: "10%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  videoDetail: {
    paddingHorizontal: 3,
    paddingTop: fontSize(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainContainerStyle: {
    backgroundColor: color.white,
    marginBottom: fontSize(10),
    shadowColor: color.searchBg,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingVertical: 10,
    shadowOpacity: 0.25,
    shadowRadius: fontSize(10),
    borderColor: color.searchBoxGrey,
    elevation: 5,
    borderWidth: 1,

    borderRadius: fontSize(10),
    // width: '100%',
    // // padding: 10,
    // // marginHorizontal: 2,
    // // marginTop: 10
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: fontSize(10),
    // flexDirection: 'row',
  },
  iconWrapper: {
    backgroundColor: "rgba(118, 118, 118, 0.5)",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingLeft: 2,
  },
  detailWrapper: { flexDirection: "row", justifyContent: "space-between" },
  countContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sub1ContainerStyle: {
    width: "100%",
    paddingHorizontal: 5,
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },

  imageStyle: {
    flex: 0.7,
    justifyContent: "center",
  },

  ImageBg: {
    alignItems: "center",
    width: fontSize(40),
    height: fontSize(40),
    borderRadius: fontSize(60) / 2,
    justifyContent: "center",
    backgroundColor: color.imagebg,
    marginRight: fontSize(10),
  },

  titleStyle: {
    // paddingTop: fontSize(5),
    flex: 3.3,
    justifyContent: "center",
  },
  topWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxStyle: {
    flex: 0.2,
    justifyContent: "center",
  },

  profileStyle: {
    width: fontSize(42),
    height: fontSize(42),
    borderRadius: fontSize(42 / 2),
    resizeMode: "cover",
  },

  checkStyle: {
    alignSelf: "center",
    width: 24,
    height: 24,
  },

  textStyle: {
    fontSize: fontSize(13),
    color: color.palette.black,
    // marginLeft: fontSize(5),
    fontFamily: font.Poppins_Medium,
    width: "75%",
    textTransform: "capitalize",
    marginRight: fontSize(10),
  },
  addTopSpace: {
    // paddingTop: fontSize(2),
  },
  text1Style: {
    marginLeft: fontSize(0.5),
    fontSize: fontSize(11),
    color: color.palette.black,
    fontFamily: font.Poppins_Regular,
    width: "80%",
    marginRight: fontSize(10),
  },
  countTxtStyle: {
    fontSize: fontSize(10),
    color: color.palette.blackSecondary,
    fontFamily: font.Poppins_Regular,
    textAlign: "right",
    paddingRight: 0,
    marginLeft: 0,
  },
  spaceBothPad: { paddingHorizontal: fontSize(5) },
  emojiFont: { fontSize: fontSize(17), paddingVertical: 5 },
  timeStyle: {
    fontSize: fontSize(10),
    color: color.palette.blackSecondary,
    fontFamily: font.Poppins_Medium,
  },
  countView: {
    justifyContent: "center",
    backgroundColor: color.msgCountGreen,
    alignItems: "center",
    width: fontSize(16),
    height: fontSize(16),
    borderRadius: fontSize(16 / 2),
  },
  videoWrapper: {
    width: fontSize(180),
    height: fontSize(180),
    borderRadius: 10,
  },
  playWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiSubCal: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 10,
    paddingHorizontal: 5,
  },
});
