import { Platform, Dimensions, StyleSheet} from 'react-native';
import {color, fontSize} from '@theme/index';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  padLeft: {paddingLeft: fontSize(12)},
  full: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  body: {
    width: '100%',
    height: '88%',
    flex: 1,
    backgroundColor: color.white,
    marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
  },
  rawItemContainer: {
    backgroundColor: color.palette.white,
    width: width / 3 - fontSize(20),
    height: fontSize(120),
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 6,
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
