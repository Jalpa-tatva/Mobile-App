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
  width: '96%',
  padding: 10,
  borderRadius: 6,
  marginHorizontal: 20,
  marginTop: 10,
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
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  flex: 1,
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
  backgroundColor: color.white,
  flex: 1,
  justifyContent: 'center',
  marginHorizontal: 10,
  marginVertical: 10,
  //paddingTop: fontSize(8),
};

export const ImageContainer: ViewStyle = {
  width: fontSize(60),
  height: fontSize(60),
  borderRadius: fontSize(60) / 2,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.white1,
};

export const ImageWrapper: ImageStyle = {
  width: fontSize(40),
  height: fontSize(40),
  borderRadius: fontSize(40) / 2,
  //resizeMode: 'cover',
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
