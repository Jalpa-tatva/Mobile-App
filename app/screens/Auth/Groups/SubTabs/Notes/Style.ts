import {ViewStyle,Platform} from 'react-native';
import {color} from '@theme/index';


export const FULL: ViewStyle = {flex: 1, backgroundColor: color.secondary};


export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};
