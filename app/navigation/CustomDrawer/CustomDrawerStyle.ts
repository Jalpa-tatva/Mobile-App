import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from "react-native";
import { color, font, fontSize } from "@theme/index";

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.secondary,
  paddingTop: 18,
  // borderWidth:fontSize(0.8),
  // borderColor:color.white
  // borderRightWidth:5,
  // borderRightColor:color.otherHome
};

export const ProfileDrawerImage: ImageStyle = {
  width: fontSize(40),
  height: fontSize(40),
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(40 / 2),
};

export const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.secondary,
};
export const TOP_CONTAINER: ViewStyle = {
  flexDirection: "row",
  backgroundColor: color.secondary,
  alignContent: "center",
  justifyContent: "center",
  // paddingTop: fontSize(1),
  paddingHorizontal: 8,
  paddingBottom: fontSize(15),
};

export const ICON_CONTAINER: ViewStyle = {
  height: fontSize(50),
  alignItems: "center",
  paddingTop: fontSize(2),
};

export const DETAILS_CONTAINER: ViewStyle = {
  flex: 1,
  marginHorizontal: 10,
};

export const LIST_CONTAINER: ViewStyle = {
  marginTop: fontSize(8),
  // paddingHorizontal: 6,
  flex: 1,
};
export const LIST_WRAPPER: ViewStyle = {
  flex: 1,
  padding: 10,
};
export const BOTTOM_WRAPPER: ViewStyle = {
  position: "absolute",
  bottom: 50,
  backgroundColor: color.palette.white,
  paddingVertical: 20,
  width: "100%",
  alignItems: "center",
};
export const BOTTOM_LOADER: ViewStyle = {
  width: "100%",
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: color.white,
};
export const VERSION_WRAPPER: ViewStyle = {
  paddingVertical: 14,
  width: "50%",
  alignItems: "center",
};

export const NAME_TEXT: TextStyle = {
  fontSize: fontSize(14),
  color: color.white,
  fontFamily: font.Poppins_Medium,
};
export const VERSION_TEXT: TextStyle = {
  fontSize: fontSize(15),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};

export const EMAIL_TEXT: TextStyle = {
  fontSize: fontSize(13),
  color: color.white,
  fontFamily: font.Poppins_Regular,
};

export const style = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
  },  contentAlign: { justifyContent: "center" },
  tabWrapper: {
    backgroundColor: "#40bfbf",
    paddingHorizontal: fontSize(3),
    borderRadius: fontSize(5),
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: fontSize(45 / 2),
    padding: 8,
    height: fontSize(45),
    width: fontSize(45),
  },
  closeDrawer: {
    alignSelf: "flex-start",
    marginTop: fontSize(8),
    marginRight: fontSize(8),
  },
  TabTextStyle: {
    textAlign: "center",
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(10),
  },

  nestedWrapper: {
    height: fontSize(45),
    borderRadius: fontSize(45 / 2),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainWrapper: {
    flexDirection: "row",
    height: fontSize(75),
    backgroundColor: color.secondary,
    borderTopColor: "#ccc",
    borderTopWidth: 0.5,
    position: "absolute",
    bottom: fontSize(15),
    alignSelf: "center",
    width: "90%",
    alignItems:'center',
    borderRadius: fontSize(50),
  },
  animatedStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logoutWrapper: {
    flexDirection: "row",
    backgroundColor: color.secondary,
    paddingVertical: fontSize(20),
    paddingLeft: fontSize(20),
    paddingRight: fontSize(20),
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: fontSize(3),
  },
  logoutSubWrapper: {
    flexDirection: "row",
  },
  increaseFont: {
    fontSize: fontSize(16),
  },
});
