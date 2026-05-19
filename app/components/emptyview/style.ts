import {color, font, fontSize} from '@app/theme';
import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  labelStyle: {
    fontFamily: font.Poppins_Bold,
    color: color.palette.blackSecondary,
    fontSize: fontSize(18),
    textAlign: 'center',
  },
  spaceBottom: {marginBottom: 10},
  mainBottomSpace: {bottom: 30},
  baseview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
