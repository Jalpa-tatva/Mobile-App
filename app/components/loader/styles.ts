import { font, fontSize } from "@app/theme";
import { StyleSheet } from "react-native";
import { color } from "../../theme/color";

export const styles = StyleSheet.create({
  loaderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    zIndex: 1,
    flex: 1,
    height: "100%",
  },

  bottomSpace: {
    bottom: fontSize(30),
  },
  logoutLabel: {
    color: color.white,
    fontSize: fontSize(14.5),
    marginLeft: 14,
    fontFamily: font.Poppins_Medium,
  },
  browseLabel: {
    fontSize: fontSize(13.5),
    textTransform: "uppercase",
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
    paddingHorizontal: fontSize(22),
    marginTop: fontSize(15),
  },
  titleView: {
    width: "85%",
    // justifyContent: 'flex-start',
  },
  topView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleStyle: {
    width: "100%",
    fontFamily: font.Poppins_Bold,
    color: color.palette.black,
    fontSize: fontSize(16),
  },
  messageStyle: {
    fontFamily: font.Poppins_Italic,
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
  },
});
