import {StyleSheet, ViewStyle} from 'react-native';
import {fontSize, color} from '@theme/index';

export const ActionButtonWrapper: ViewStyle = {
  position: 'absolute',
  // bottom: fontSize(140),
  bottom: fontSize(110),
  right: 20,
  alignItems: 'center',
  justifyContent: 'center',
};

export const AddButton: ViewStyle = {
  borderWidth: 1,
  width: fontSize(44),
  height: fontSize(44),
  borderColor: 'rgba(0,0,0,0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  borderRadius: fontSize(44),
};

export const Style = StyleSheet.create({
  listing: {
    paddingTop: fontSize(10),
  },
});
