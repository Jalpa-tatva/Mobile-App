import {ViewStyle, Platform} from 'react-native';
import {color} from '@theme/index';

export const Full: ViewStyle = {flex: 1, backgroundColor: color.secondary};

export const Body: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
};

export const HEADERTOP: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  marginTop: 10,
};
