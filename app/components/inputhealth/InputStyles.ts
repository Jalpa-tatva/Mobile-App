import {StyleSheet} from 'react-native';
import {color} from '../../theme/color';
import { fontSize, moderateScale, verticalScale } from '@app/theme';
import styleConfig from '@app/theme/styleConfig';

export const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    
    marginTop: verticalScale(2),
  },
  LableText: {
    fontSize: fontSize(14),
    color: color.palette.black,
    paddingBottom: styleConfig.isAndroid ? 1 : 2,
  },
  inputContainer: {
    paddingVertical: 10,
    marginHorizontal: fontSize(15)
  },
  wrapperDP: {
    borderWidth: 1,
    borderRadius: 4,

    marginTop: verticalScale(3),
  },

  textInput: {
    flex: 1,
    width: '100%',
    color: color.palette.black,
    paddingHorizontal: fontSize(5),
    fontSize: fontSize(14),
    paddingVertical: verticalScale(0.5),
  },

  error: {
    color: color.red,
    paddingTop: 4,
    fontSize: 12,
  },
});