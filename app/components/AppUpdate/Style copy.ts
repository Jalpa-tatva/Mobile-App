import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../theme";

export const styles = StyleSheet.create({
  centeredView: {
    // backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor: "red",
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.6)",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  updateNow: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: fontSize(16),
    marginBottom: 5,
  },
  updateNowBtn: {
    backgroundColor: color.palette.white,
    justifyContent: "center",
    alignItems: "center",
    padding: fontSize(8),
    borderRadius: fontSize(12),
    width: "85%",
  },
  skipNowTxt: {
    fontSize: fontSize(16),
    fontFamily: font.Poppins_Bold,
    color: color.palette.white,
    letterSpacing: 0.3,
  },
  UpdateNowTxt: {
    fontSize: fontSize(16),
    fontFamily: font.Poppins_Bold,
    color: color.secondary,
  },
  paragraphContent: {
    paddingTop: 5,
    width: "80%",
    marginBottom: 5,
  },
  modalView: {
    borderWidth: 0.5,
    borderColor: color.secondary,
    // width: "90%",
    backgroundColor: color.secondary,
    // borderTopLeftRadius: 22,
    // borderTopRightRadius: 22,
    paddingBottom: fontSize(25),
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: fontSize(22),
    // paddingHorizontal: fontSize(22),
    paddingHorizontal: fontSize(10),
    marginHorizontal: 10,
    borderRadius: 10,
  },
  skipForNow: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: fontSize(12),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: fontSize(5),
  },
  modalTitle: {
    fontSize: fontSize(21.5),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.white,
  },
  modalSubTitle: {
    fontSize: fontSize(14.5),
    fontFamily: font.Poppins_Regular,
    color: color.palette.white,
  },
  modalImageContainer: {
    alignItems: "center",
    width: fontSize(50),
    height: fontSize(50),
    justifyContent: "center",
    backgroundColor: color.imagebg,
    borderWidth: fontSize(0.7),
    borderColor: color.palette.lightGrey,
  },
  imgStyle: {
    width: fontSize(50),
    height: fontSize(50),
    justifyContent: "center",
    alignItems: "center",
  },
});
