import {
  TextStyle,
  ImageStyle,
  Platform,
  ViewStyle,
  Dimensions,
  StyleSheet,
} from "react-native";
import { color, font, fontSize, spacing } from "@theme/index";

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
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  alignItems: "center",
};

export const Title: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.lightGrey,
  fontFamily: font.Poppins_Medium,
};
export const AlertTitle: TextStyle = {
  width: "100%",
  fontFamily: font.Poppins_Bold,
};
export const TitleLocation: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.black,
  fontFamily: font.Poppins_Medium,
};

export const MessageStyle: TextStyle = {
  fontFamily: font.Poppins_Italic,
  fontSize: fontSize(14),
  color: color.palette.blackSecondary,
};

export const DetailsContainer: ViewStyle = {
  marginTop: 30,
  backgroundColor: color.white,
  width: "88%",
  paddingVertical: 8,
  borderRadius: 12,
  paddingHorizontal: 10,
  alignSelf: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 0.5 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(11),
};

export const SheetWrapper: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

export const WrapperContainer: ViewStyle = {
  flexDirection: "row",
  width: "80%",
  height: 50,
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "center",
  backgroundColor: color.palette.black,
  marginBottom: 10,
  borderRadius: 10,
  paddingLeft: 14,
};

export const ButtonSheetTitle: TextStyle = {
  width: "100%",
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(16),
  marginLeft: 10,
  top: 1,
};

export const OverLayButtonText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: color.red,
  fontSize: fontSize(17),
};

export const OverLayButtonContainerCencel: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 10,
};

export const BottomlWrapperMain: ViewStyle = {
  paddingVertical: 5,
  width: "98%",
};
export const LocationWrapperMain: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
};
export const profileStyle: ImageStyle = {
  width: fontSize(60),
  height: fontSize(60),
  borderRadius: fontSize(30),
};

export const ImageBg: ViewStyle = {
  alignItems: "center",
  width: fontSize(60),
  height: fontSize(60),
  borderRadius: fontSize(60) / 2,
  justifyContent: "center",
  backgroundColor: color.imagebg,
};

export const EventImageStyle: ImageStyle = {
  // alignSelf: 'center',
  // width: fontSize(50),
  // height: fontSize(50),
  // borderRadius: 10,
  width: "100%",
  height: "100%",
  marginRight: fontSize(10),
};

export const sub1ContainerStyle: ViewStyle = {
  width: "100%",
  paddingHorizontal: "2%",
  flexDirection: "row",
  borderBottomWidth: 1,
  alignSelf: "center",
  alignContent: "center",
  alignItems: "center",
  paddingVertical: "5%",
  borderBottomColor: color.linecolor,
};

export const URLStyle: ViewStyle = {
  width: "100%",
  paddingHorizontal: "2%",
  flexDirection: "row",
  alignSelf: "center",
  alignContent: "center",
  alignItems: "center",
  paddingVertical: "5%",
};

export const ButtonImage: ViewStyle = {
  position: "absolute",
  bottom: fontSize(-5),
  right: fontSize(-5),
};
export const titleStyle: ViewStyle = {
  flex: 3.3,
  justifyContent: "center",
};
export const EventNameStyle: ViewStyle = {
  flexDirection: "row",
  paddingRight: 5,
};

export const textStyle: TextStyle = {
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  marginLeft: 14,
  flex: 1,
  fontFamily: font.Poppins_Regular,
};

export const text1Style: TextStyle = {
  fontSize: fontSize(12),
  color: color.detailscolor,
  marginLeft: 14,
  paddingRight: 10,
  fontFamily: font.Poppins_Regular,
};

export const ButtonContainer: ViewStyle = {
  borderRadius: fontSize(10),
  height: fontSize(45),
  flex: 1,
  marginTop: 25,
  marginHorizontal: 4,
  backgroundColor: color.secondary,
};
const imageSize = Dimensions.get("window").width / 5; // Adjust for padding/margin

export const styles = StyleSheet.create({
  members: {
    marginTop: fontSize(15),
  },
  spaceBot: {
    marginBottom: fontSize(10),
  },
  topTitle: {
    flex: 1,
  },
  upcomingLabel: {
    fontFamily: font.Poppins_Bold,
    color: color.white,
    fontSize: fontSize(16),
    textTransform: "uppercase",
  },
  padLeftCommon: { paddingLeft: 30 },
  padTopCommon: { marginTop: -24 },
  eventCompletePos: {
    bottom: fontSize(50),
    position: "absolute",
    zIndex: 999,
    alignSelf: "center",
  },
  eventTiming: {
    position: "absolute",
    zIndex: 999,
    flexDirection: "row",
    // top:50,
    top: fontSize(80),
    // left:0,
    // right:0,
    // justifyContent:'center',
    // alignItems: 'center',
    alignSelf: "center",
  },
  topBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceTop: {
    marginTop: fontSize(10),
  },
  addSpace: {
    marginRight: fontSize(8),
  },
  smallFont: {
    fontSize: fontSize(11),
    color: color.palette.blackSecondary,
  },
  dateWrapperIcn: {
    flexDirection: "row",
    width: Dimensions.get("screen").width / 2.1,
  },
  imagesCal: {
    flexDirection: "row",
  },
  MainOverLayContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    backgroundColor: color.white,
  },
  backdropStyle: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },
  overlay: {
    width: "90%",
    borderRadius: 25,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: color.white,
  },
  OverLayRowContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  OverLayImageContainer: {
    marginRight: 25,
    backgroundColor: color.palette.lightGrey,
    borderRadius: fontSize(45),
    height: fontSize(45),
    width: fontSize(45),
  },
  EventImageStyle: {
    alignSelf: "center",
    width: "100%",
    height: fontSize(200),
    borderRadius: 10,
    resizeMode: "stretch",
  },
  OverLayImage: {
    height: fontSize(45),
    width: fontSize(45),
    borderRadius: fontSize(45),
    resizeMode: "contain",
    borderWidth: fontSize(0.5),
    backgroundColor: color.searchBg,
    borderColor: color.searchBg,
    marginRight: fontSize(10),
  },
  OverLayTitleContainer: {
    // justifyContent: 'center',
    // marginBottom: fontSize(2),
    width: "100%",
    flexDirection: "row",
    // alignSelf: 'center',
    // alignItems:'center'
  },
  OverTitle: {
    color: color.palette.blackSecondary,
    fontSize: fontSize(13),
    fontFamily: font.Poppins_Bold,
    paddingBottom: 3,
    flex: 1,
    // width: '90%',
  },
  createdBy: {
    color: color.palette.darkGray,
    fontSize: fontSize(13),
    fontFamily: font.Poppins_Medium,
    marginRight: fontSize(5),
  },
  loginButtonContainer: {
    borderRadius: fontSize(24),
    height: fontSize(45),
    marginTop: 25,
    padding: 10,
    backgroundColor: color.secondary,
  },
  OverLayButtonContainer1: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  BottonTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.white,
    fontSize: fontSize(16),
  },
  backIcnImg: {
    marginVertical: fontSize(5),
    // marginLeft: fontSize(5),
    justifyContent: "center",
    alignItems: "center",
    right: fontSize(-5),
  },
  uploadImageWrap: {
    marginHorizontal: fontSize(5),
    marginVertical: fontSize(3),
    width: imageSize,
    height: imageSize,
  },
  uploadImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    resizeMode: "stretch",
    borderWidth: fontSize(0.5),
    borderColor: color.searchBg,
  },
  rightWrap: {
    bottom: fontSize(1),
    paddingLeft: fontSize(1),
  },
  directionWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  rollupDeleteIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: fontSize(50), // Ensure consistent size
    height: fontSize(50),
    marginRight: fontSize(10),
    overflow: "hidden",
    // borderWidth: fontSize(0.5),

    borderColor: color.palette.lightGrey,
    // alignItems: 'center', // Center child content
    // justifyContent: 'center',
  },
  imageWrapper: {
    width: fontSize(50),
    height: fontSize(50),
    // borderRadius: fontSize(5), // Optional: Make corners rounded
    resizeMode: "contain",
  },
  rowWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  padBoth: {
    marginLeft: fontSize(30),
    marginVertical: fontSize(10),
    marginBottom: fontSize(15),
  },
  entireLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: fontSize(5),
  },
  images: {
    marginTop: fontSize(10),
    width: fontSize(50),
    height: fontSize(50),
    // borderRadius: 10,
  },
  fullFlex: {
    flexGrow: 1,
  },
  buttonOne: {
    borderWidth: fontSize(0.9),
    borderColor: color.dullOrange,
    paddingVertical: fontSize(3),
    paddingHorizontal: fontSize(10),
    borderRadius: fontSize(3),
  },

  buttonSecond: {
    flex: 1,
    backgroundColor: color.dullOrange,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: fontSize(10),
  },
  buttonOneLbl: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_SemiBold,
    color: color.dullOrange,
  },
  buttonSecondLbl: {
    color: color.white,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: fontSize(20),
    marginTop: fontSize(30),
    marginBottom: fontSize(10),
    justifyContent: "space-around",
  },
  listingPlus: {
    position: "absolute",
    right: fontSize(2),
    zIndex: 999,
    top: fontSize(2),
    width: fontSize(25),
    height: fontSize(25),
    borderRadius: fontSize(25 / 2),
    backgroundColor: color?.searchBg,
    alignItems: "center",
    justifyContent: "center",
  },
  timeCal: {
    position: "absolute",
    zIndex: 999,
    flexDirection: "row",
    // top:50,
    bottom: fontSize(20),
    // left:0,
    // right:0,
    // justifyContent:'center',
    // alignItems: 'center',
    alignSelf: "center",
  },
  spaceBoth: {
    marginHorizontal: fontSize(8),
    fontSize: fontSize(20),
  },
  timeLabel: {
    fontSize: fontSize(20),
    fontFamily: font.Poppins_Bold,
    color: color.palette.white,
    letterSpacing: fontSize(2),
  },
  timeLabelRegular: {
    fontSize: fontSize(11),
    fontFamily: font.Poppins_Medium,
    color: color.palette.white,
    shadowOpacity: 0.5,
  },
  subTimeCal: {
    flexDirection: "column",
    alignItems: "center",
  },
  locationView: {
    marginTop: fontSize(5),
  },
  locationSubView: {
    marginHorizontal: fontSize(10),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: fontSize(8),
  },
  mapImage: {
    height: fontSize(160),
  },
  peoples: {
    marginTop: fontSize(8),
  },

  // Member Listing cal
  roleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: fontSize(2),
    justifyContent: "space-between",
  },
  RawContainerMain: {
    backgroundColor: color.white,
    // width: '90%',
    marginVertical: 10,
    paddingRight: fontSize(20),
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: fontSize(10),
    borderRadius: 10,
    // alignSelf: 'center',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: fontSize(2) },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  ApprovalWrapper: {
    // alignSelf: 'flex-end',
    paddingHorizontal: fontSize(5),
    paddingVertical: fontSize(1),
    borderRadius: fontSize(3),
    // marginTop: fontSize(3),
    // justifyContent: 'center',
    // width:fontSize(110)
    // position: 'absolute',
    backgroundColor: color.palette.orange,
    // top: fontSize(5),
    // right: fontSize(5),
    // paddingVertical: fontSize(5),
    // height: fontSize(40),
  },
  greenBg: {
    backgroundColor: color.palette.green,
  },
  roleLbl: {
    fontSize: fontSize(11),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
    marginRight: fontSize(15),
  },
  listingContainer: {
    flex: 1,
  },
  memberBody: {
    backgroundColor: color.white,
    flex: 1,
    paddingHorizontal: fontSize(10),
    paddingTop: fontSize(20),
  },
  headerTop: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.secondary,
  },
  memberProfile: {
    width: fontSize(40),
    height: fontSize(40),
    backgroundColor: color.searchBg,
  },
  RawContainer: {
    backgroundColor: color.white,
    alignItems: "center",
    marginVertical: 2,
    paddingVertical: 2,
    flexDirection: "row",
    flex: 1,
  },
  ImageContainer: {
    backgroundColor: color.searchBg,
    width: fontSize(55),
    height: fontSize(55),
    // borderRadius: fontSize(60),
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    alignSelf: "flex-start",
    marginHorizontal: fontSize(12),
  },
  ImageWrapper: {
    width: fontSize(55),
    height: fontSize(55),
  },
  TextContainer: {
    justifyContent: "center",
    flex: 1,
    bottom: fontSize(2),
  },
  Title: {
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
    fontFamily: font.Poppins_Medium,
  },
  TitleLocation: {
    fontSize: fontSize(12),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
  },
  TitleApproval: {
    fontSize: fontSize(10),
    color: color.palette.white,
    fontFamily: font.Poppins_Medium,
  },
  TitleWrapper: {
    width: "90%",
  },
  // Member Listing cal

  peoplesOther: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: fontSize(10),
  },
  membersLbl: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.black,
  },
  membersLblDull: {
    color: color.dullOrange,
  },
  totalMember: {
    fontSize: fontSize(12),
    color: color.palette.black,
    fontFamily: font.Poppins_Medium,
  },
  totalMemberBold: {
    fontFamily: font.Poppins_Medium,
    color: color.palette.darkGray,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  userTitle: {
    fontSize: fontSize(8),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
    textAlign: "center",
  },
  titleCal: {
    // transform: [{ rotate: '45deg'}],
    marginTop: fontSize(5),
    // alignItems:'center',
    maxWidth: fontSize(40),
  },
  imageCal: {
    width: fontSize(30),
    height: fontSize(30),
    borderRadius: fontSize(30 / 2),
    backgroundColor: color.searchBg,
  },
  recordWrapper: {
    marginRight: fontSize(10),
    // height: fontSize(80),
    flex: 1,
    zIndex: 9,
  },
  listing: {
    marginLeft: fontSize(33),
    marginTop: fontSize(10),
  },
  MainView: {
    flex: 1,
  },
  subCalSecond: {
    flexDirection: "row",
    alignItems: "center",
    bottom: fontSize(5),
    width: "75%",
  },

  profileImage: {
    width: fontSize(30),
    height: fontSize(30),
    borderRadius: fontSize(30 / 2),
    backgroundColor: color.searchBg,
    borderWidth: fontSize(0.5),
    borderColor: color.palette.lightGrey,
  },
  subCalOne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateWrapper: {
    backgroundColor: color.dullOrange,
    paddingHorizontal: fontSize(8),
    bottom: fontSize(3),
    borderRadius: fontSize(5),
    justifyContent: "center",
    alignItems: "center",
  },
  calOne: {
    marginTop: fontSize(16),
    marginHorizontal: fontSize(10),
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: color.white,
    marginBottom: fontSize(20),
  },
  organizeByBold: {
    paddingLeft: fontSize(1),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.black,
  },
  backIconBox: {
    bottom: fontSize(1),
  },
  more: {
    // right: fontSize(20),
    alignItems: "flex-end",
    flex: 0.85,
  },
  titleLbl: {
    fontSize: fontSize(17),
    fontFamily: font.Poppins_SemiBold,
    color: color.white,
  },
  eventTimeWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: fontSize(12),
    justifyContent: "space-between",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: fontSize(12),
    marginRight: fontSize(12),
  },
  eventTimeCal: {
    fontSize: fontSize(10.5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
    paddingLeft: fontSize(5),
    // marginRight: fontSize(5),
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  eventTimeCal1: {
    fontSize: fontSize(10.5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
  },
  spaceLocationTop: {
    top: fontSize(4),
  },
  eventTitle: {
    fontSize: fontSize(17),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.black,
  },
  monthCal: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Regular,
    color: color.palette.white,
  },
  organizeBy: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_Medium,
    color: color.palette.lightGrey,
    paddingStart: fontSize(6),
  },
  dateCal: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.white,
    // bottom: fontSize(2),
  },
  titleWrapper: {
    marginLeft: fontSize(10),
  },
  header: {},
  addShadowTxt: {
    shadowOpacity: 0.7,
    shadowColor: "rgba(0,0,0,0.4)",
  },
  eventImg: {
    // width: '100%',
    // height: fontSize(200),
    // opacity: 0.66,
    // shadowOpacity: 0.6,
    // backgroundColor: 'rgba(0,0,0,1.2)',
    width: "100%",
    height: fontSize(200),
    opacity: 0.7,
    shadowOpacity: 0.6,
    backgroundColor: "rgba(0,0,0,1.2)",
  },
  topWrapper: {
    zIndex: 99,
    position: "absolute",
    top: Platform.OS === "ios" ? fontSize(40) : fontSize(20),
    marginLeft: fontSize(20),
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
