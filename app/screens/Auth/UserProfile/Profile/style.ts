import { color, font, fontSize } from "@app/theme";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
    backgroundColor: color.white,
  },
  headerVisibility: {
    zIndex: 999,
    backgroundColor: color.secondary,
    // paddingTop: fontSize(20),
  },
  customTabHeader: { zIndex: 99, backgroundColor: color.white },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: color.white,
  },
  profileWrapper: {
    flex: 1,
    position: "absolute",
    bottom: fontSize(-20),
  },
  tabWrapper: {
    width: "100%",
    flex: 1,
    backgroundColor: color.white,
    zIndex: 999,
  },
  body: {
    alignItems: "center",
  },
  spaceMapStart: {
    marginLeft: fontSize(-12),
  },
  userDetail: {
    alignItems: "center",
    marginTop: fontSize(5),
  },
  userImage: {
    width: fontSize(125),
    height: fontSize(125),
    borderRadius: fontSize(125 / 2),
    borderWidth: 2,
    borderColor: color.palette.lightGrey,
  },
  imageWrapper: {
    width: fontSize(125),
    height: fontSize(125),
    borderRadius: fontSize(125 / 2),
    backgroundColor: color.white1,
    position: "absolute",
    bottom: fontSize(2),
  },
  profileBackImg: {
    // width: '100%',
    height: 200,
    width: Dimensions.get("window").width + fontSize(5),
  },
  header: {
    alignItems: "center",
    backgroundColor: color.secondary,
    width: "100%",
    height: Dimensions.get("window").height / 3.5,
    position: "relative",
  },
  curveContainer: {
    width: 200,
    height: 100,
    position: "absolute",
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "red",
    alignItems: "center",
  },
  curve: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    position: "absolute",
    bottom: 10,
  },
  name: {
    fontSize: fontSize(18),
    fontFamily: font.Poppins_Bold,
    // marginTop: 60,
  },
  designation: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
    marginLeft: 5,
    // marginTop: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  statsContainer: {
    width: "100%",
    marginTop: fontSize(20),
    alignItems: "center",
  },
  statsSubContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(17),
    color: color.palette.black,
  },
  statLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
    color: color.palette.darkGray,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
  button: {
    backgroundColor: color.secondary,
    paddingVertical: fontSize(8),
    paddingHorizontal: fontSize(20),
    borderRadius: fontSize(10),
  },
  buttonText: {
    color: color.white,
    fontSize: fontSize(13),
    fontFamily: font.Poppins_SemiBold,
  },
  box: {
    height: 250,
    width: "100%",
  },
  boxA: {
    backgroundColor: "white",
  },
  boxB: {
    backgroundColor: "#D8D8D8",
  },
});
