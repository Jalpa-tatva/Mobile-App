import {ViewStyle, TextStyle, Platform} from 'react-native';
import {color, font, fontSize} from '@theme/index';
import styleConfig from '@app/theme/styleConfig';

export const SheetWrapper: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
};

export const WrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  width: '80%',
  flexDirection: 'row',
  backgroundColor: color.palette.blackSecondary,
  borderRadius: 10,
  paddingLeft: 14,
  marginBottom: 10,
};

export const ButtonSheetTitle: TextStyle = {
  color: color.palette.white,
  fontFamily: font.Poppins_SemiBold,
  fontSize: fontSize(16),
  width: '100%',
  marginLeft: 10,
};

export const OverLayButtonContainerCencel: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
};

export const OverLayButtonText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: color.red,
  fontSize: fontSize(17),
};

export const ButtonImage: ViewStyle = {
  width: 32,
  height: 32,
  alignSelf: 'center',
  position: 'absolute',
  bottom: -4,
  right: -4,
};

export const mainContainer: ViewStyle = {};
export const subContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
};

export const view1Style: ViewStyle = {
  width: styleConfig.width * 0.2,
  // padding: fontSize(10),
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
};

export const view2Style: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
};

export const titleText: TextStyle = {
  fontSize: fontSize(18),
  fontFamily: font.Poppins_Medium,
  color: color.white,
  textAlign: 'left',
};

export const HeadMainStyle: ViewStyle = {
  width: '100%',
  height: Platform.OS === 'android' ? 60 : 90,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  // paddingTop: Platform.OS === 'android' ? 0 : 20,
};

export const viewRightStyle: ViewStyle = {
  padding: 10,
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
};
