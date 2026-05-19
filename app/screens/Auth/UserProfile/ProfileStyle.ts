import { StyleSheet } from "react-native";

// import custom styling & utils
import { color, font, fontSize } from "@app/theme";

export const profileStyle = StyleSheet.create({
  spaceLeft: {
    paddingLeft: 30,
  },
  locationIcon: {
    top: fontSize(0.5),
  },
  bottomWrap: {
    flexDirection: "row",
    marginTop: fontSize(10),
  },
  dateWrap: {
    // flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-end",
    marginLeft: fontSize(10),
    width: fontSize(100),
  },

  dateLbl: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(10.5),
    color: color.palette.blackSecondary,
    paddingTop: fontSize(1),
    paddingLeft: fontSize(3),
  },
  followingWrap: {
    alignItems: "center",
    borderRadius: 6,
    marginHorizontal: fontSize(10),
    backgroundColor: color.white,
    paddingHorizontal: fontSize(10),
    paddingVertical: fontSize(7),
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
  },
  personCal: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
    color: color.palette.darkGray,

    // position: 'absolute',
    // width:fontSize(100),
    // height:fontSize(100)
  },
  userLocation: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  countryLblTop: { marginTop: fontSize(4), marginBottom: fontSize(10) },
  countryLblTxt: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
    paddingLeft: fontSize(1),
  },
  entireSpace: {},
  dialogCal: { width: "100%", fontFamily: font.Poppins_Bold },
  messageTxt: {
    fontFamily: font.Poppins_Italic,
    fontSize: fontSize(12),
    color: color.palette.blackSecondary,
  },
  subSheetSpaceTop: { marginTop: -24 },
  iconSpaceLeft: { paddingLeft: 30 },
  connectionSpaceRight: { marginRight: 10 },
  connectionSpaceLeft: { marginLeft: 15 },
  detailTitleCal: { flexDirection: "row", paddingRight: 5 },
});
