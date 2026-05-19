import { StyleSheet } from "react-native";
import { color, font, fontSize } from "@theme/index";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
  sectionTitle: {
    marginTop: fontSize(4),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
    fontSize: fontSize(14),
  },
  keyboardWrapper: {
    flexGrow: 1,
  },
  saveWrapper: {
    width: "100%",
    zIndex: 1,
    marginRight: fontSize(5),
  },
  section: {
    marginTop: fontSize(12),
    marginHorizontal: fontSize(10),
    paddingHorizontal: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: color.white,
    paddingVertical: fontSize(10),
    flexGrow: 1,
    borderRadius: 10,
    marginBottom: fontSize(60),
    elevation: 2,
  },

  horizontalContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: fontSize(5),
  },
  input: {
    width: fontSize(120),
  },

  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: fontSize(16),
    marginRight: fontSize(5),
  },
  radioButtonSection: {
    marginHorizontal: fontSize(15),
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    // width: "100%",
  },
  subHeading: {
    marginTop: fontSize(5),
    marginHorizontal: fontSize(15),
  },
  buttonContainer: {
    marginVertical: fontSize(15),
    // width: "50%",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: fontSize(10),
    backgroundColor: color.secondary,
    marginTop: fontSize(5),
    padding: fontSize(5),
    height: fontSize(40),
  },
  cancel: {
    width: "90%",
    padding: fontSize(10),
    paddingHorizontal: fontSize(10),
    backgroundColor: color.red,
    height: fontSize(45),
    marginTop: fontSize(5),
    // marginBottom: fontSize(10),
  },
  buttonTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.white,
    fontSize: fontSize(14),
  },
  buttonEdit: {
    backgroundColor: color.palette.lightGrey,
    paddingHorizontal: fontSize(8),
    marginTop: fontSize(5),
    padding: fontSize(5),
    height: fontSize(40),
    marginRight: fontSize(10),
  },
  buttonEditCencel: {
    paddingHorizontal: fontSize(8),
    backgroundColor: color.red,
    marginTop: fontSize(5),
    padding: fontSize(5),
    height: fontSize(40),
  },
  buttonEditTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.black,
    fontSize: fontSize(14),
  },
  BottonTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.white,
    fontSize: fontSize(16),
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: fontSize(5),
    flex: 1,
  },
  saveRemove: {
    paddingHorizontal: fontSize(5),
  },
  status: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: fontSize(5),

    backgroundColor: color.palette.green,
    // marginHorizontal: fontSize(12),
    borderRadius: 8,
    padding: fontSize(5),
    // width: "90%",
    // alignSelf: "center",
  },
  statusText: {
    color: color.white,
  },
  contentContainerStyle: {
    paddingBottom: fontSize(10),
  },
  darkInput: {
    flex: 1,
    backgroundColor: color.palette.lightGrey,
  },
  darkInputHorizontal: {
    flex: 1,
    backgroundColor: color.palette.lightGrey,
    width: fontSize(120),
  },
  fullFlex: {
    flex: 1,
  },
});
