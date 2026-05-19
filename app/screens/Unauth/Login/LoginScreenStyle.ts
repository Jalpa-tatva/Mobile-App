import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { fontSize, color, font } from "@app/theme";
import styleConfig from "@app/theme/styleConfig";

export const FullContainer: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};

export const ScreenContainer: ViewStyle = {
  paddingHorizontal: 20,
};
export const margeView: ViewStyle = {
  marginHorizontal: fontSize(0),
};
export const TopImageContainer: ViewStyle = {
  alignItems: "center",
  marginBottom: 24,
  marginTop: -10,
  backgroundColor: color.white,
};
export const TopImageContainer1: ViewStyle = {
  alignItems: "center",
  marginBottom: 24,
  marginTop: Platform.OS == "ios" ? fontSize(7) : fontSize(5),
  backgroundColor: color.white,
  justifyContent: "center",
  height: fontSize(250),
};
export const LogoIcon: ImageStyle = {
  height: fontSize(180),
  width: styleConfig.width,
  backgroundColor: color.white,
};
export const LogoIcon1: ImageStyle = {
  // height: fontSize(160),
  width: styleConfig.width - 10,
  flex: 1,
  // resizeMode:'contain'
};
export const TitleContainer: ViewStyle = {
  marginBottom: 24,
};

export const TitleText: TextStyle = {
  fontSize: fontSize(24),
  fontFamily: font.Poppins_Bold,
  color: color.secondary,
};
export const TextInputStyle: TextStyle = {
  backgroundColor: color.whiteOld,
  borderRadius: fontSize(10),
};

export const styleLable: TextStyle = {
  color: color.palette.black,
};
export const InputWrapper: TextStyle = {
  backgroundColor: color.white,
  borderRadius: fontSize(10),
};

export const LableText: TextStyle = {
  color: color.palette.black,
};

export const ForgotContainer: ViewStyle = {
  justifyContent: "center",
  alignSelf: "center",
  marginTop: 18,
};

export const ButtonContainer: ViewStyle = {
  borderRadius: fontSize(6),
  height: fontSize(45),
  marginTop: 25,
  padding: 10,
  backgroundColor: color.secondary,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const ForgotText: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.secondary,
};

export const BottomContainer: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
  marginTop: 10,
  // marginBottom: 34,
};
export const BottomTextLeft: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.placeholder,
};

export const BottomTextRight: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.secondary,
};

export const COUNTRY_BODY: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: color.white,
  borderWidth: 0.5,
  borderColor: color.palette.blackSecondary,
  borderRadius: 4,
  marginBottom: 3,
  marginVertical: 4,
  paddingVertical: 12,
  paddingLeft: 10,
};

export const COUNTRY_BODY_TEXT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

export const styles = StyleSheet.create({
  biometricImg: {
    width: 20,
    height: 20,
    tintColor: color.secondary,
  },
  biometricLabel: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_SemiBold,
    color: color.secondary,
    marginLeft: 10,
  },
  loginWithBio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: color.secondary,
    borderRadius: 7,
    padding: 10,
    marginTop: 30,
  },
});
