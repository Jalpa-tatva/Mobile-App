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
export const SUB_BODY: ViewStyle = {
  paddingTop: fontSize(2),
};

export const ActionText: TextStyle = {
  marginTop: 5,
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
};

export const RawContainerMainItem: ViewStyle = {
  backgroundColor: color.white,
  width: '96%',
  borderColor: color.palette.lighterGrey,
  borderRadius: fontSize(5),
  borderWidth: fontSize(0.5),
  alignSelf: 'center',
  shadowColor: '#000000',
  shadowOffset: {width: 0, height: fontSize(2)},
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
  marginBottom: fontSize(10),
  paddingBottom: fontSize(5),
};

export const RawContainerBottom: ViewStyle = {
  flexDirection: 'row',
  marginLeft: 80,
};

export const RawContainerBottom1: ViewStyle = {
  backgroundColor: color.palette.darkGray,
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 4,
  marginLeft: 10,
};

export const RawContainer: ViewStyle = {
  flexDirection: 'row',
  marginBottom: fontSize(2),
};

export const ImageWrapper: ViewStyle = {
  width: fontSize(65),
  height: fontSize(65),
  borderRadius: fontSize(65 / 2),
  alignSelf: 'flex-start',
};

export const ImageSub: ImageStyle = {
  width: fontSize(65),
  height: fontSize(65),
  borderRadius: fontSize(65 / 2),
};
export const TextContainer: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
};

export const DetailWrapper: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  paddingTop: fontSize(7),
};
export const Title: TextStyle = {
  width: '80%',
  fontSize: fontSize(12),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};

export const TitleLocation: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.darkGray,
  fontFamily: font.Poppins_Medium,
};

export const TitleLocationOther: TextStyle = {
  fontSize: fontSize(10),
};

export const TooltipWrapper: TextStyle = {
  flexDirection: 'row',
  borderColor: color.searchBg,
  // borderWidth: fontSize(0.8),
  paddingHorizontal: fontSize(7),
  borderRadius: fontSize(5),
  alignContent: 'center',
};

export const TitleNotes: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.white,
  fontFamily: font.Poppins_Medium,
};
export const BottomWrapper: TextStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: fontSize(2),
  marginHorizontal: fontSize(10),
};
export const BottomlWrapperLeft: TextStyle = {
  width: '45%',
  marginRight: fontSize(5),
};

export const BottomTitle: TextStyle = {
  fontFamily: font.Poppins_SemiBold,
  fontSize: fontSize(12),
  color: color.palette.black,
};
export const BottomlWrapperRight: TextStyle = {
  width: '45%',
  marginLeft: fontSize(5),
};

export const InfoWrapper: ViewStyle = {
  position: 'absolute',
  right: fontSize(3),
  top: fontSize(5),
};

export const TitleLocationBold: TextStyle = {
  fontSize: fontSize(10),
  color: color.palette.darkGray,
  fontFamily: font.Poppins_SemiBold,
};

export const ActionButtonWrapper: ViewStyle = {
  position: 'absolute',
  bottom: 20,
  right: 20,
  alignItems: 'center',
  justifyContent: 'center',
};
export const actionButtonTouchStyle: ViewStyle = {
  borderWidth: 1,
  width: fontSize(44),
  height: fontSize(44),
  borderColor: 'rgba(0,0,0,0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  borderRadius: fontSize(44),
};
