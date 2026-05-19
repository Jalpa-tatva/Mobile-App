import {ViewStyle, ImageStyle, TextStyle, Platform} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.white};

export const HEADERTOP: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
};

export const ProfileWrapper: ViewStyle = {
  flexGrow: 1,
  height: '10%',
  flexDirection: 'row',
  paddingLeft: 30,
  paddingBottom: 5,
};

export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};

export const Image1Wrapper: ViewStyle = {
  width: fontSize(60),
  height: fontSize(60),
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(60),
  marginBottom: fontSize(20),
};

export const NameTitle: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Medium,
  color: color.white,
};
export const EmailTitle: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Medium,
  color: color.white,
};
export const profileImage: ImageStyle = {
  width: fontSize(60),
  height: fontSize(60),
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(60),
};
export const ProfileNameWrapper: ViewStyle = {
  flex: 1,
  marginHorizontal: 10,
  justifyContent: 'center',
  marginBottom: 20,
};
export const Description: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(10.5),
  color: color.palette.blackSecondary,
  width: '90%',
};