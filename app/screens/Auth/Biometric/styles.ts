import { color, font, fontSize } from "@app/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  HeaderTop: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.secondary,
  },
  generalLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(16),
    color: color.palette.blackSecondary,
    padding:10
  },
  body: {
    width: "100%",
    height: "88%",
    flex: 1,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: Platform.OS === "android" ? "-1%" : "-3%",
  },
  contentWrapper: {
    padding: fontSize(10),
  },
  fingerprintWrapper: {
    backgroundColor: color.white,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  iconWrapper: {
    width: 35,
    height: 35,
    borderColor: color.thumbColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  switchWrapper: {},
  contents: {
    borderRadius:10,
    paddingVertical:20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 6,
    paddingHorizontal:5,
    backgroundColor: color.white,
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
