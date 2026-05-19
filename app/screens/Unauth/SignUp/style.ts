import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {fontSize, color, font} from '@app/theme';
import styleConfig from '@app/theme/styleConfig';

export const FullContainer: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};

export const ScreenContainer: ViewStyle = {
  paddingHorizontal: 20,
};

export const TopImageContainer: ViewStyle = {
  alignItems: 'center',
  marginBottom: 24,
  marginTop: -10,
  backgroundColor: color.white,
};
export const TopImageContainer1: ViewStyle = {
  alignItems: 'center',
  marginBottom: 24,
  marginTop: Platform.OS == 'ios' ? fontSize(7) : fontSize(5),
  backgroundColor: color.white,
  justifyContent: 'center',
  height: fontSize(250),
};

export const LogoIcon1: ImageStyle = {
  width: styleConfig.width - 10,
  flex: 1,
  backgroundColor: color.white,
};
export const LogoIcon: ImageStyle = {
  height: fontSize(180),
  width: styleConfig.width,
  backgroundColor: color.secondary,
};

export const TitleContainer: ViewStyle = {
  marginBottom: 24,
  paddingHorizontal: 20,
};

export const TitleText: TextStyle = {
  fontSize: fontSize(24),
  fontFamily: font.Poppins_Bold,
  color: color.secondary,
};

export const InputWrapper: TextStyle = {
  backgroundColor: color.white,
  borderRadius: fontSize(10),
};

export const LableText: TextStyle = {
  color: color.palette.black,
};

export const ButtonContainer: ViewStyle = {
  borderRadius: fontSize(6),
  height: fontSize(45),
  marginTop: 25,
  padding: 10,
  backgroundColor: color.secondary,
  marginBottom: fontSize(5),
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const CountryBody: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: color.white,
  borderWidth: fontSize(0.5),
  borderColor: color.border,
  borderRadius: 4,
  marginBottom: 3,
  marginVertical: 4,
  paddingVertical: fontSize(8),
  paddingLeft: 10,
};

export const CountryText: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
export const CountryIcon: ImageStyle = {
  height: fontSize(20),
  width: fontSize(20),
  marginRight: 10,
  resizeMode: 'contain',
};
export const CheckboxContainer: ViewStyle = {
  marginVertical: 25,
  flexDirection: 'row',
  alignItems: 'center',
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

export const styles = StyleSheet.create({
  spaceBoth: {
    paddingHorizontal: 20,
  },
  spaceETop: {
    marginTop: 8,
  },
  forthBottom: {
    marginBottom: 4,
  },
  spaceRight: {
    marginRight: fontSize(9),
    bottom:2
  },
  wrapper: {
    width: undefined,
    height: undefined,
    marginBottom: 10,
  },
});
