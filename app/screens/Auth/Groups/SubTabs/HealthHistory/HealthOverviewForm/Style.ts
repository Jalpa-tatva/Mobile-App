import {ViewStyle, Platform, StyleSheet} from 'react-native';
import {color, fontSize} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.white};

export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};
export const styles = StyleSheet.create({
  listinMain: {marginTop: 0, flexGrow: 1},
  subListingMain: {flex: 1, marginBottom: fontSize(30)},
});

export const HEADERTOP: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
};
