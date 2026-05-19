import {ViewStyle, Platform} from 'react-native';
import {color} from '@theme/index';

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
