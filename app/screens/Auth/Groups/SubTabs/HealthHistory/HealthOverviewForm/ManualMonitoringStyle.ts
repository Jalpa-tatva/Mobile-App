import { StyleSheet } from "react-native";
import { color, font, fontSize } from "@app/theme";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: fontSize(2) },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: color.white,
    borderRadius: 10,
  },
  messageStyle: {
    fontFamily: font.Poppins_Italic,
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
  },
  InputHealth: {
    width: "100%",
  },
  heightFeet: {
    fontSize: fontSize(14),
    color: color.palette.black,
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
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: fontSize(4),
  },

  buttonEdit: {
    paddingHorizontal: fontSize(10),
    backgroundColor: color.palette.lightGrey,
    marginTop: fontSize(5),
    padding: fontSize(5),
    height: fontSize(55),
  },
  button: {
    paddingHorizontal: fontSize(10),
    backgroundColor: color.secondary,
    marginTop: fontSize(5),
    padding: fontSize(5),
    height: fontSize(55),
  },
  buttonSRsave: {
    paddingHorizontal: fontSize(10),
    backgroundColor: color.palette.lightGreen,
    marginTop: fontSize(5),
    padding: fontSize(5),
    height: fontSize(36),
  },
  buttonSRpreview: {
    paddingHorizontal: fontSize(10),
    backgroundColor: color.red,
    marginTop: fontSize(5),
    padding: fontSize(5),
    height: fontSize(36),
  },
  buttonSRpreviewWidth: {
    width: fontSize(100),
  },
  buttonEditTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.black,
    fontSize: fontSize(14),
  },

  container: {
    paddingBottom: 20,
  },
  sectionTitle: {
    marginTop: fontSize(15),
    fontWeight: "bold",
    marginHorizontal: fontSize(15),
    fontSize: fontSize(16),
  },
  section: {
    marginTop: fontSize(8),
    marginHorizontal: fontSize(8),
    borderWidth: 2,
    borderRadius: fontSize(10),
    borderColor: color.palette.lightGrey,
    backgroundColor: color.white,
    paddingVertical: fontSize(5),
    // flexGrow: 1,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: fontSize(5),
  },
  input: {
    width: fontSize(80),
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

  buttonSave: {
    width: "90%",
    paddingVertical: fontSize(7),
    backgroundColor: color.secondary,
    height: fontSize(45),
    // marginBottom: fontSize(10),
  },
  buttonTitle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.white,
    fontSize: fontSize(14),
  },

  status: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: fontSize(5),
    padding: fontSize(5),
    backgroundColor: color.otherSplash,
    marginHorizontal: fontSize(8),
    borderRadius: 8,
    height: fontSize(55),
  },
  vaccLastUpdate: { flex: 1, marginLeft: 4 },
  statusText: {
    color: color.white,
    textAlign: "center",
  },
});
