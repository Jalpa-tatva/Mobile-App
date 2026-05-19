import { color, font, fontSize } from "@app/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
    padding: fontSize(10),
  },
  userImage: {
    width: fontSize(36),
    height: fontSize(36),
    borderRadius: fontSize(36 / 2),
    backgroundColor: color.placeholder,
  },
  removeTxt: {
    fontSize: fontSize(11),
    color: color.white2,
    fontFamily: font.Poppins_Medium,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: fontSize(10),
  },
  nameCal: {
    marginLeft: fontSize(10),
  },
  userName: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(14),
    color: color.palette.white,
  },
  emojiCal: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(15),
    color: color.palette.white,
  },
  userLeftView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: fontSize(15),
  },
});
