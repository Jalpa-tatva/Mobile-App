import {Dimensions, Platform} from 'react-native';

const isIphone = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const {width, height} = Dimensions.get('window');

export default {
  isIphone,
  isAndroid,
  width,
  height,
};