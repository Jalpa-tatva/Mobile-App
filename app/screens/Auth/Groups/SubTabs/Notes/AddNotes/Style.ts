import {ViewStyle, TextStyle, Platform} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const Full: ViewStyle = {flex: 1, backgroundColor: color.secondary};
export const HeaderTop: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
};
export const Body: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};

export const ExtraTItle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(18),
  color: color.palette.black,
};
export const SeverityTitle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  width: '100%',
  color: color.palette.black,
};

export const ButtonWrapper1: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  marginTop: 20,
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
export const taskFolderLblWrapper: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  backgroundColor: color.white,
};
export const AssignToWrapperIos: ViewStyle = {
  position: 'relative',
  zIndex: 99,
  alignItems: 'center',
  backgroundColor: color.white,

};
export const AssignToWrapperAndroid: ViewStyle = {
  position: 'relative',
  alignItems: 'center',
  backgroundColor: color.white,

};

export const taskFolderWrapper: ViewStyle = {
  width: '100%',
  paddingVertical: 10,
  flex: 1,
  borderWidth: 1,
  marginBottom: 10,
  borderColor: color.border,
  borderRadius: 4,
  paddingLeft: 8,
  paddingRight: 6,
  marginTop: 5,
  flexDirection: 'row',
  justifyContent: 'center',
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

export const SheetWrapper: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const WrapperContainer: ViewStyle = {
  flexDirection: 'row',
  width: '80%',
  height: 50,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: color.palette.black,
  marginBottom: 10,
  borderRadius: 10,
  paddingLeft: 14,
};

export const ButtonSheetTitle: TextStyle = {
  width: '100%',
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(16),
  marginLeft: 10,
};
export const lableTitle: TextStyle = {
  flex: 1,
  textTransform: 'capitalize',
  justifyContent: 'center',
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
