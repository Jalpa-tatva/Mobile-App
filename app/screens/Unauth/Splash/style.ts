import {ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {color, font, fontSize} from '@theme/index';
import styleConfig from '@app/theme/styleConfig';

export const full: ViewStyle = {
  flex: 1,
  backgroundColor: color.whiteOld,
};
export const splashIconStyle: ImageStyle = {
  height: fontSize(100),
  width: styleConfig.width * 0.8,
  backgroundColor: color.whiteOld,
};
export const splashBottomStyle: ImageStyle = {
  height: fontSize(280),
  width: styleConfig.width,
};

export const JustTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.splashTitle,
  fontSize: fontSize(24),
};
export const CarringTitle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: '#4d4d4d',
  fontSize: fontSize(12),
};

export const splashWrapper: ViewStyle = {
  height: '50%',
  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export const logoContainer: ViewStyle = {
  marginBottom: 14,
  backgroundColor: color.whiteOld,
};
export const bottomContainer: ViewStyle = {
  height: '50%',
  width: styleConfig.width,
  justifyContent: 'flex-end',
  paddingBottom: 30,
};
