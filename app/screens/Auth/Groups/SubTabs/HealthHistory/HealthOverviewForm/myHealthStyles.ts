import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.white};

export const BODY: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};

export const RawContainerMain: ViewStyle = {
  backgroundColor: color.white,
  width: '100%',
  borderRadius: 4,
  marginVertical: 2,
  paddingHorizontal: 10,
  alignSelf: 'center',
  borderWidth: 0.5,
  borderColor: color.palette.lighterGrey,
  flexDirection: 'row',
  justifyContent: 'center',

};
export const RawContainerSendReport: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
  paddingVertical: 4,
  marginHorizontal: 15,
  borderColor: color.palette.lighterGrey,
  flexDirection: 'row',
  height: 46,
  borderWidth: 1,
  borderRadius: 4,
  justifyContent: 'center',
};

export const Title: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(15),
  color: color.palette.blackSecondary,
  flex: 1,
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
export const SearchWrapper: ViewStyle = {
  width: '90%',
  height: fontSize(50),
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  paddingVertical: 10,
  borderRadius: 10,
  backgroundColor: color.secondary,
  marginTop: 30,
};

export const TextInputStyle: TextStyle = {
  color: color.white,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  height: fontSize(50),
  flex: 1,
  marginHorizontal: 10,
  textAlign: 'left',
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
  backgroundColor: color.white,
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
  height: fontSize(34),
  width: '96%',
  //marginTop: fontSize(20),
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

export const loginButtonContainer1: ViewStyle = {
  borderRadius: fontSize(24),
  height: fontSize(45),
  marginTop: fontSize(11),
  padding: 10,
  backgroundColor: color.secondary,
};

export const BottonTitle1: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};
