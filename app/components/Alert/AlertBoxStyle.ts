import { StyleSheet } from "react-native";
import { color, fontSize, font } from "../../theme";

export const styles = StyleSheet.create({
  dialogStyle: {
    alignSelf: "center",
    width: "auto",
    borderRadius: fontSize(10),
  },
  contentStyle: {
    width: "auto",
    height: "auto",
    paddingBottom: fontSize(10),
  },
  titleStyle: {
    fontSize: fontSize(17),
    fontWeight: "bold",
  },
  messageStyle: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Medium,
    color: color.red,
  },
  messgaeText: {
    fontFamily: font.Poppins_Medium,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: fontSize(20),
    paddingHorizontal: fontSize(10),
  },
  dialogWrapper: {
    flexDirection: "row",
    width: "98%",
    justifyContent: "space-between",
    paddingRight: fontSize(10),
  },
  cancelButton: {
    paddingHorizontal: fontSize(10),
    padding: 5,
    borderWidth: 0.5,
    borderColor: color.palette.darkGray,
    backgroundColor: color.white1,
  },
  cancelText: {
    fontSize: fontSize(14),
    color: color.red,
    fontFamily: font.Poppins_Regular,
  },
  clearButton: {
    marginLeft: fontSize(15),
    paddingHorizontal: fontSize(10),
    padding: 5,
    borderWidth: 0.5,
    borderColor: color.palette.lightGrey,
    backgroundColor: color.secondaryLight,
  },
  clearText: {
    fontSize: fontSize(14),
    color: color.white,
  },
  okayButton: {
    marginLeft: fontSize(15),
    borderWidth: 0.5,
    paddingHorizontal: fontSize(10),
    borderColor: color.palette.lightGrey,
    padding: 5,
    backgroundColor: color.secondary,
  },
  okayText: {
    fontSize: fontSize(14),
    color: color.white,
    fontFamily: font.Poppins_Regular,
  },
});
