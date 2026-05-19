import { ViewStyle, Platform, StyleSheet, Dimensions } from "react-native";
import { color, font, fontSize } from "@theme/index";

export const Full: ViewStyle = { flex: 1, backgroundColor: color.secondary };

export const Body: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const styles = StyleSheet.create({
  RawContainerMain1: {
    // alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: fontSize(10),
    // paddingHorizontal: fontSize(10),
    paddingTop: fontSize(7),
    paddingBottom: fontSize(4),
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
    backgroundColor: color.white,
  },
  location: {
    // paddingTop: fontSize(0.2),
    alignSelf: "flex-start",
    marginRight: fontSize(5),
  },
  dateMonthCal: {
    backgroundColor: color.searchBg,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: fontSize(1),
  },
  addGreyLbl: {
    color: color.palette.blackSecondary,
    // paddingTop: fontSize(),
    fontSize: fontSize(10),
    bottom: 1,
  },
  abbreviation: {
    fontSize: fontSize(10),
    fontFamily: font.Poppins_Bold,
    color: color.palette.blackSecondary,
    flex: 1,
  },
  alignRightContent: {
    textAlign: "right",
  },
  authorLbl: {
    fontSize: fontSize(10),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
    width: "90%",
    marginTop: fontSize(3),
  },
  eventTitle: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.blackSecondary,
    // flex: 1,
    // flexShrink: 1,
    // flexWrap: 'wrap',
  },
  dateVal: {
    fontSize: fontSize(9),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
    // flex: 1,
    // flexShrink: 1,
  },
  dateSubWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("screen").width / 2.35,
    // flex: 1,
    // flexWrap:'wrap',
    // flexShrink: 1,
  },
  startAlignLeft: {
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginRight: fontSize(5),
    // alignSelf: 'flex-start',
  },
  startAlignRight: {
    //  alignItems:'flex-end'
    alignItems: "center",
    // left:fontSize(5),
    // flex: 1,
  },
  dateWrapper: {
    paddingTop: fontSize(10),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: fontSize(5),
    // alignItems: 'center',
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: fontSize(3),
    width: "90%",
    left: fontSize(-1),
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: fontSize(10),
  },
  midView: {
    paddingLeft: fontSize(10),
    paddingTop: fontSize(3),
    flex: 1,
  },
  mainView: {
    // backgroundColor: color.eventDateColor,
    width: fontSize(60),
    margin: fontSize(3),
    // borderRadius: fontSize(5),
  },
  RawContainerMain: {
    backgroundColor: color.white,
    width: "96%",
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 20,
    marginTop: 10,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: color.palette.lighterGrey,
    flexDirection: "row",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  Title: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(16),
    color: color.palette.blackSecondary,
    flex: 1,
  },
  severityTitle: {
    fontFamily: font.Poppins_Regular,
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
    textAlign: "center",
  },
  TitleLocation: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
    color: color.palette.lightGrey,
    flex: 1,
  },
  RawContainer: {
    backgroundColor: color.white,
    width: "100%",
    alignItems: "center",
    marginVertical: 2,
    paddingVertical: 2,
    flexDirection: "row",
    marginTop: 14,
  },
  TextContainer: {
    backgroundColor: color.white,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10,
    paddingTop: fontSize(8),
    marginVertical: 10,
  },

  ImageContainer: {
    width: fontSize(60),
    height: fontSize(60),
    borderRadius: fontSize(60),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 36,
  },
  ImageWrapper: {
    width: fontSize(60),
    height: fontSize(60),
    borderRadius: fontSize(60),
  },

  TitleApproval: {
    flex: 1,
    fontSize: fontSize(12),
    color: color.white,
    fontFamily: font.Poppins_Medium,
  },
  ApprovalWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 5,
    right: 10,
    justifyContent: "flex-end",
    backgroundColor: color.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  severityWrapper: {
    backgroundColor: color.palette.lightGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    width: 120,
  },

  BottomlWrapper: {
    flexDirection: "row",
  },
  BottomlWrapperMain: {
    paddingVertical: 10,
  },
  BottomlWrapperMain2: {
    paddingVertical: 10,
    marginLeft: 30,
  },
  toolTitleLocation: {
    fontSize: fontSize(12),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
  },

  CalContainer: {
    width: fontSize(70),
    height: undefined,
    marginHorizontal: 10,
    alignSelf: "flex-start",
    marginVertical: 10,
    backgroundColor: color.palette.lighterGrey,
    borderRadius: 8,
  },
  DateContainer: {
    width: fontSize(70),
    height: fontSize(30),
    alignSelf: "flex-start",
    justifyContent: "center",
    backgroundColor: color.secondary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  MonthTitle: {
    fontSize: fontSize(13),
    // color: color.palette.darkGray,
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Bold,
    textAlign: "center",
  },
  DateTitle: {
    fontSize: fontSize(12),
    // color: color.palette.darkGray,
    color: color.grayOne,
    fontFamily: font.Poppins_Bold,
    textAlign: "center",
    // marginTop: 8,
  },
  WeekdayTitle: {
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
    fontFamily: font.Poppins_Bold,
    textAlign: "center",
  },
  WeekDayContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.eventDateColor,
    paddingVertical: fontSize(1),

    // width: fontSize(70),
    // height: fontSize(30),
    // justifyContent: 'center',
    // backgroundColor: color.secondary,
    // borderBottomLeftRadius: 8,
    // borderBottomRightRadius: 8,
  },
  wrapperTopBorder: {
    borderTopRightRadius: fontSize(5),
    borderTopLeftRadius: fontSize(5),
  },
  wrapperBottomBorder: {
    borderBottomRightRadius: fontSize(5),
    borderBottomLeftRadius: fontSize(5),
  },
});
