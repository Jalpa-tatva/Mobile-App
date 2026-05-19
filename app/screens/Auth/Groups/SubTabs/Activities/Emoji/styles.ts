import {color, fontSize} from '@app/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  spaceBothPad: {paddingRight: fontSize(8)},
  modelStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,

    borderWidth: 1,
    // backgroundColor: color.secondary,
    borderColor: color.secondary,
    borderRadius: fontSize(3),
    paddingHorizontal: fontSize(10),
  },
  modelWrapper : {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  modelRightWid: {
    right: '10%',
  },
  closeEmojis: {
    position: 'absolute',
    zIndex: 99,
    right: -10,
    top: -5,
  },
  modelLeftWid: {
    left: '10%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  emojiFont: {fontSize: fontSize(17), paddingVertical: 5},
});
