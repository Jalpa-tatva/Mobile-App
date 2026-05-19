import { font, fontSize } from "@app/theme";
import { StyleSheet } from "react-native";
import { color } from "../../theme/color";

export const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    borderWidth: fontSize(0.8),
    borderRadius: 4,
    flex: 1,
    backgroundColor: color.white,

    marginTop: 5,
  },
  alignContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputContainer: {
    paddingVertical: 10,
  },

  textInput: {
    flex: 1,
    //width: '100%',
    alignSelf: "stretch",
    color: color.palette.black,
    paddingHorizontal: 5,
    fontSize: fontSize(13),
    fontFamily: font.Poppins_Regular,
    paddingVertical: fontSize(2),
  },

  titleLabel: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
  },

  error: {
    color: color.red,
    paddingTop: 4,
    fontSize: 12,
  },
  leftIconStyle: {
    height: fontSize(18),
    width: fontSize(18),
    marginHorizontal: 6,
    resizeMode: "contain",
  },
});
