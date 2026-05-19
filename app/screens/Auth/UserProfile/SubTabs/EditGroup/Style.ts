import {ViewStyle, TextStyle, Platform, ImageStyle, StyleSheet} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.secondary};
export const HEADERTOP: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
};
export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingBottom: 50,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};
export const IsEditTextInputView: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
};
export const COUNTRY_BODY: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: color.palette.lightGrey,
  borderWidth: 1,
  borderColor: '#bdbdbd',
  borderRadius: 4,
  marginBottom: fontSize(3),
  marginVertical: fontSize(3),
  paddingVertical: fontSize(11),
  paddingLeft: fontSize(9),
};

export const COUNTRY_BODY_TEXT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const ProfileWrapper: ViewStyle = {
  flexGrow: 1,
  height: '10%',
};

export const Image1Wrapper: ViewStyle = {
  width: fontSize(140),
  height: fontSize(140),
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(140),
};

export const ButtonImage: ViewStyle = {
  width: 32,
  height: 32,
  alignSelf: 'center',
  position: 'absolute',
  bottom: 10,
  right: -4,
};
export const ButtonImageSend: ViewStyle = {
  width: 32,
  height: 32,
  alignSelf: 'center',
  position: 'absolute',
  bottom: 10,
  left: -4,
};

export const ProfileNameWrapper: ViewStyle = {
  flex: 1,
  marginHorizontal: 10,
  justifyContent: 'center',
  marginBottom: 20,
};
export const ProfileNameWrapperRaw: ViewStyle = {
  marginHorizontal: 10,
  justifyContent: 'center',
  alignItems:'center',
  marginBottom: 20,
  flexDirection: 'row',
  backgroundColor: color.palette.lightGrey,
  marginTop: 10,
  // paddingVertical: 4,
  borderRadius: 4,
  height: fontSize(38),
};

export const NameTitle: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Medium,
  color: color.palette.blackSecondary,
};
export const EmailTitle: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Medium,
  color: color.palette.black,
};

export const ExtraTItle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(18),
  color: color.palette.black,
};

export const ButtonWrapper1: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  marginTop: 20,
};

export const profileImage: ImageStyle = {
  width: fontSize(130),
  height: fontSize(130),
  backgroundColor: color.palette.lightGrey,
  borderRadius: fontSize(130),
};

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
export const DetailsWrapper: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  borderWidth: 0.8,
  borderColor: color.border,
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
};

export const signUpButtonContainer: ViewStyle = {
  marginVertical: fontSize(20),
  borderRadius: fontSize(10),
  height: fontSize(45),
  backgroundColor: color.secondary,
};
export const spaceTop: ViewStyle = {marginTop: 8};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const Style = StyleSheet.create({
  spaceTopCommon : {
    marginTop: -24
  },
  padLeftCommon : {
   paddingLeft: 30
  }
})
