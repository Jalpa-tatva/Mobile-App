import {ViewStyle, Platform} from 'react-native';
import {color} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.accent2Bg};

export const HEADERTOP: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.red,
};

export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingHorizontal: 14,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};
