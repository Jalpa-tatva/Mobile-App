import {ViewStyle, TextStyle, ImageStyle, Platform} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.secondary};

export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};

export const RawContainerMain: ViewStyle = {
  backgroundColor: color.white,
  width: '100%',
  borderRadius: 4,
  marginVertical: 2,
  alignSelf: 'center',
  borderWidth: 0.5,
  borderColor: color.palette.lighterGrey,
  flexDirection: 'row',
  justifyContent: 'center',
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: fontSize(2),
  },
};

export const Title: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(15),
  color: color.palette.blackSecondary,
  flex: 1,
};
export const TitleSenReport: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(15),
  color: color.palette.blackSecondary,
};
export const TopTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  fontSize: fontSize(15),
  color: color.palette.blackSecondary,
  textAlign: 'center',
};

export const TitleLocation: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.lightGrey,
  flex: 1,
};

export const RawContainer: ViewStyle = {
  backgroundColor: color.white,
  width: '100%',
  alignItems: 'center',
  marginVertical: 2,
  paddingVertical: 2,
  flexDirection: 'row',
  marginTop: 10,
};

export const TextContainer: ViewStyle = {
  //backgroundColor: color.palette.lightGrey,
  flex: 1,
  justifyContent: 'center',
  marginVertical: 2,
};

export const ImageContainer: ViewStyle = {
  width: fontSize(30),
  height: fontSize(30),
  borderRadius: fontSize(30) / 2,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.white1,
};

export const ImageWrapper: ImageStyle = {
  width: fontSize(60),
  height: fontSize(60),
  borderRadius: fontSize(60) / 2,
  resizeMode: 'cover',
};

export const TitleApproval: TextStyle = {
  flex: 1,
  fontSize: fontSize(12),
  color: color.white,
  fontFamily: font.Poppins_Medium,
};

export const ApprovalWrapper: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  top: 10,
  right: 10,
  justifyContent: 'flex-end',
  backgroundColor: color.palette.lightGreen,
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
};
export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(4),
  height: fontSize(45),
  width: '96%',
  marginTop: fontSize(20),
  backgroundColor: color.secondary,
};

export const signUpButtonContainer: ViewStyle = {
  marginVertical: fontSize(20),
  borderRadius: fontSize(10),
  height: fontSize(45),
  backgroundColor: color.secondary,
};
export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const OverLayButtonContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
};

export const relationTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(15),
  color: color.palette.blackSecondary,
};

export const OverLayTopButtonContainerCencel: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 2,
};

export const OverLayTopButtonText: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(16),
  fontFamily: font.Poppins_Bold,
};
export const SheetWrapper: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
};

export const OverLayButtonContainerCencel: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
};

export const OverLayButtonText: TextStyle = {
  color: color.palette.red,
  fontSize: fontSize(16),
  fontFamily: font.Poppins_Regular,
};

export const AlbumWrapper: ImageStyle = {
  width: fontSize(20),
  height: fontSize(20),
  borderRadius: fontSize(20),
};

export const WrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  width: '80%',
  flexDirection: 'row',
  backgroundColor: color.palette.black,
  borderRadius: 10,
  paddingLeft: 24,
  marginBottom: 10,
};

export const ButtonSheetTitle: TextStyle = {
  color: color.palette.white,
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(16),
  width: '100%',
  marginLeft: 10,
};
