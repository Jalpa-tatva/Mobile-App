import {
  Dimensions,
  PixelRatio,
  Platform,
  PlatformIOSStatic,
} from 'react-native';

/**
 * SCALING - SAME VIEW FOR TABLET AND IPHONE ADDED THIS SCALE IN HEIGHT, WIDTH, MARGIN, PADDING
 */
const {width, height} = Dimensions.get('window');
const baseWidth = 360;
const baseHeight = 700;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const fontSize = size => Math.ceil(size * scale);

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export const isTab = height > width ? true : false;
const platformIOS = Platform.OS === 'ios' && (Platform as PlatformIOSStatic);
export const iPad = platformIOS?.isPad || false;
