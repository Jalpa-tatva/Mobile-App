import {ViewStyle, TextStyle, ImageStyle, Platform} from 'react-native';
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
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
  // borderTopLeftRadius: 30,
  // borderTopRightRadius: 30,
};

export const VideoContainer: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
  width: '96%',
  height: fontSize(200),
  borderRadius: 10,
  marginVertical: 10,
  justifyContent: 'center',
  alignSelf: 'center',
};

export const ThumbWrapper: ImageStyle = {
  flex: 1,
  borderRadius: 10,
  width: '100%',
};

export const VideoTitleWrapper: ViewStyle = {
  position: 'absolute',
  width: '100%',
  zIndex: 1,
  bottom: 0,
  padding: 10,
  borderBottomLeftRadius: 10,
  borderTopRightRadius: 10,

};

export const VideoTitle: TextStyle = {
  zIndex: 1,
  marginRight: 20,
  fontFamily: font.Poppins_Regular,
  color: color.white,
  fontSize: fontSize(15),
};

export const VideoTimeWrapper: ViewStyle = {
  zIndex: 1,
  position: 'absolute',
  top: 10,
  right: 10,
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
  backgroundColor: color.trans,
};
