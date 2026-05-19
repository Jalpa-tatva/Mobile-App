import { StyleSheet } from "react-native";
import { color, font, fontSize } from "@theme/index";
import styleConfig from "./styleConfig";

export default StyleSheet.create({
  // friend details Image
  friendImage: {
    width: fontSize(60),
    height: fontSize(80),

    backgroundColor: color.palette.lightGrey,
  },
  textLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(13),
    color: color.palette.black,
  },
  textSubLabel: {
    fontFamily: font.Poppins_Regular,
    fontSize: fontSize(12),
    color: color.palette.black,
  },
  keybordView: {
    height: 50,
    width: "100%",
    backgroundColor: color.white,
    position: "absolute",
    bottom: fontSize(20),
    zIndex: 90,
  },
  //invite
  inviteDialog: {
    backgroundColor: color.palette.white,
    borderRadius: 12,
  },

  //chart style
  DialogChartStyle: {
    margin: 0,
    padding: 0,
    paddingBottom: 10,
    paddingRight: 10,
  },
  contentStyleChart: {
    backgroundColor: color.palette.white,
    borderRadius: 12,
  },

  ///
  flatSearchDrugStyle: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
  },

  addPhoto: {
    height: 42,
    paddingHorizontal: 5,
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    alignSelf: "center",
    borderColor: color.border,
    marginTop: 6,
  },

  //
  UserProfileView: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  profileactiveDetailslabelStyle: {
    textAlign: "center",
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
  },

  profileunactiveDetailslabelStyle: {
    textAlign: "center",
    color: color.secondary,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
  },

  //DropDownPickerStyle
  DropDownPickerStyle: {
    marginVertical: 8,
    borderColor: color.border,
    borderWidth: fontSize(0.8),
    
    backgroundColor: color.white,
  },
  DropDownitemStyle: {
    justifyContent: "flex-start",
  },

  //KeyboardAwareScrollView
  KeyboardAwareScrollViewStyle: {
    width: undefined,
    height: undefined,
    paddingBottom: 50,
    marginTop: 20,
    marginHorizontal: 14,
  },

  OverlayKeyboardStyle: {
    width: undefined,
    height: undefined,
  },

  // albumStyle
  albumStyle: {
    marginVertical: 8,
    borderColor: color.border,
    borderWidth: 1,
  },

  // sheet
  mainSheetContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: color.white1,
    height: undefined,
    paddingVertical: 14,
  },
  subSheetContainer: {
    width: "96%",
    alignItems: "flex-end",
    paddingBottom: 16,
  },

  // health history
  healthView: {
    paddingHorizontal: fontSize(3),
    flexDirection: "row",
    paddingVertical: fontSize(10),
    justifyContent: "center",
    alignItems: "center",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  healthlabeUnablelStyle: {
    textAlign: "center",
    color: color.palette.black,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
    paddingHorizontal: 4,
  },

  healthlabelStyle: {
    textAlign: "center",
    color: color.white,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
    paddingHorizontal: 4,
  },

  healthViewGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 4,
  },

  healthUnactiveSubTouch: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

    height: fontSize(35),
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white2,
    borderColor: color.border,
  },
  healthSubTouch: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

    height: fontSize(35),
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white2,
    borderColor: color.border,
  },
  healthTabActive: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: fontSize(35),
    //width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.secondary,
    borderColor: color.border,
  },
  healthTabUnactive: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

    height: fontSize(35),
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white2,
    borderColor: color.border,
  },

  // group details tabstyle
  monitorIconStyle: {
    padding: 6,
    marginBottom: 6,
    tintColor: color.secondary,
    paddingBottom: 10,
  },
  groupDetailMainStyle: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  UserProfileSubTouch: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  tabIconunActiveStyle: {
    height: styleConfig?.isAndroid ? fontSize(30) : fontSize(35),
    width: styleConfig?.isAndroid ? fontSize(30) : fontSize(35),
    padding: 6,
    marginBottom: 6,
    tintColor: color.palette.darkGray,
  },
  tabIconActiveStyle: {
    height: styleConfig?.isAndroid ? fontSize(30) : fontSize(35),
    width: styleConfig?.isAndroid ? fontSize(30) : fontSize(35),
    padding: 6,
    marginBottom: 6,
    tintColor: color.secondary,
  },

  profileUnactiveLine: {
    position: "absolute",
    width: "100%",
    height: fontSize(4),
    backgroundColor: color.palette.lightGrey,
    bottom: 0,
  },
  ActiveUserProfileSubTouch: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  profileActiveLine: {
    position: "absolute",
    width: "100%",
    height: fontSize(4),
    backgroundColor: color.secondary,
    bottom: 0,
  },

  // normal tab
  bottomMainStyle: {
    backgroundColor: color.white,
    flex: 1,
  },
  orgsTabStyle: {
    position: "absolute",
    bottom: 0,
  },
  orgsTabStyleHide: {
    position: "absolute",
    bottom: -200,
  },
  testTabMainStyle: {
    alignSelf: "center",
    width: styleConfig?.isAndroid ? "98%" : "96%",
    marginBottom: styleConfig?.isAndroid ? fontSize(15) : fontSize(18),
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: color.secondary,
    borderRadius: 14,
    height: fontSize(80),
    paddingVertical: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: color.white,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 4,
  },

  CustomeTabBarButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  NavTabViewMainCardStyle: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    paddingBottom: 5,
  },

  customeTabStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: fontSize(5),
  },

  navTabActiveViewCardStyle: {
    margin: 0,
    width: fontSize(110),
  },

  navTabInactiveViewCardStyle: {
    margin: 0,
    padding: 0,
  },

  iconCardStyle: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  activeTextStyle: {
    flexGrow: 1,
    textAlign: "center",
    paddingTop: 2,
    color: color.white,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(12),
  },

  unactiveTextStyle: {
    flexGrow: 1,
    textAlign: "center",
    paddingTop: 2,
    color: color.palette.lightGrey,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(12),
  },

  TabTextStyle: {
    textAlign: "center",
    fontFamily: font.Poppins_SemiBold,
    fontSize: fontSize(10.5),
    marginLeft: fontSize(7),
    // top:fontSize(2)
    paddingTop: 4,
    // paddingBottom:4
  },

  // rollup tab
  rollUpMain: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rollUpSub: {
    flexDirection: "row",
    height: fontSize(60),
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },

  UserProfileSubView: {
    flexDirection: "row",
    height: fontSize(60),
    width: fontSize(70),
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
  rollUpTabWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  rollUpTabUnactiveLable: {
    textAlign: "center",
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
  },

  rollUpTabUnactiveLine: {
    position: "absolute",
    width: "100%",
    height: fontSize(4),
    backgroundColor: color.palette.lightGrey,
    bottom: 0,
  },

  rollUpTabActiveLable: {
    textAlign: "center",
    color: color.secondary,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
  },

  rollUpTabActiveLine: {
    position: "absolute",
    width: "100%",
    height: fontSize(4),
    backgroundColor: color.secondary,
    bottom: 0,
  },

  //rollup detail icon
  rollupDetailIcon: {
    marginHorizontal: 10,
    backgroundColor: color.palette.black,
    borderRadius: 10,
  },

  // load more
  loadmoreStyle: {
    justifyContent: "center",
    alignSelf: "center",
  },

  //full size
  flexStyle: {
    flex: 1,
  },
  flatRadiousStyle: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  flatBottomListingSpace: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 110,
  },
  flatBottomSpace: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  flatGroupSpace: {
    // marginBottom: 140,
    // paddingBottom: 10,
    paddingTop: 10,
  },

  // custom bottom tab
  customTabMainStyle: {
    marginBottom: 20,
    marginHorizontal: 14,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: color.secondary,
    borderRadius: 14,
    height: fontSize(80),
    paddingVertical: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: color.white,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 4,
  },

  customeTabBarWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  customeTab: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: fontSize(10),
  },

  tabIcon: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  tabLable: {
    textAlign: "center",
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(10),
    paddingTop: 2,
  },
  customeTabCenterButton: {
    top: fontSize(-40),
    left: 0,
    borderWidth: 2,
    width: fontSize(60),
    height: fontSize(60),
    borderRadius: fontSize(30),
  },
  customeTabCenterIcon: {
    paddingHorizontal: fontSize(13),
    paddingVertical: fontSize(13),
  },

  // tab custom
  navTabViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    height: "12%",
    backgroundColor: color.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },

  UserProfileViewGroup: {
    flexDirection: "row",
    height: fontSize(60),
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
  issueTabUnActive: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: color.white2,
    borderColor: color.border,
  },
  issueTabActive: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: color.secondary,
    borderColor: color.border,
  },
  issuelabelStyle: {
    textAlign: "center",
    color: color.white,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
  },
  issuelabeUnablelStyle: {
    textAlign: "center",
    color: color.palette.black,
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(11),
  },
});
