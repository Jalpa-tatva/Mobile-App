import { color, font, fontSize } from "@app/theme";
import { Platform, StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  main: { flex: 1, backgroundColor: color.secondary },
  headerTop: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.secondary,
  },
  addSpace: {
    paddingHorizontal: 10,
    height: fontSize(40),
  },
  fullGrow: {
    flexGrow: 1,
  },
  scrollWrapper: { height: 100, marginHorizontal: fontSize(12) },
  healthSubTouch: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

    height: fontSize(40),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white2,
    borderColor: color.border,
  },
  healthUnactiveSubTouch: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

    height: fontSize(40),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white2,
    borderColor: color.border,
  },
  body: {
    width: "100%",
    height: "88%",
    flex: 1,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: Platform.OS === "android" ? "-1%" : "-3%",
    // padding: 20,
  },
  listingStyle: {
    backgroundColor: color.white,
    flexGrow: 1,
    paddingHorizontal: 15,
    borderWidth: 0.8,
    paddingTop: 30,
    borderColor: color.palette.lighterGrey,
  },
  healthViewGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 4,
    marginHorizontal: 4,
  },
  padWrapper: {
    marginBottom: 30,
  },
  tabTitle: {
    fontSize: fontSize(15),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.blackSecondary,
  },
  contents: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: color.palette.white,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
  },
  fingerprintWrapper: {
    backgroundColor: color.white,
    flexDirection: "row",
    alignItems: "center",
  },
  tabsLabel: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.darkGray,
  },
  listAlignment: {
    flexDirection: "row",
    alignItems: "center",
  },
});
