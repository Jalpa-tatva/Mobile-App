import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.secondary};

export const HEADERTOP: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
};

export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
};

export const loginButtonContainer: ViewStyle = {
  height: fontSize(45),
  width: '94%',
  padding: 10,
  backgroundColor: color.secondary,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const RawContainerMainItem: ViewStyle = {
  backgroundColor: color.white,
  width: '94%',
  marginVertical: fontSize(8),
  paddingVertical: fontSize(3),
  borderRadius: 10,
  // alignItems: 'center',
  alignSelf: 'center',
  shadowColor: '#000000',
  shadowOffset: {width: 0, height: 0.5},
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
};

export const RawContainer: ViewStyle = {
  backgroundColor: color.white,
  width: '100%',

  marginVertical: 2,
  paddingVertical: 2,
  flexDirection: 'row',
};

export const ImageWrapper: ImageStyle = {
  marginHorizontal: fontSize(10),
  width: fontSize(60),
  height: fontSize(60),
  marginTop: fontSize(15),
  margin: 2,
};

export const TextContainer: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
};
export const blackTxt: TextStyle = {
  color: color.palette.black,
  fontFamily: font.Poppins_SemiBold,
};
export const detailIcon: ViewStyle = {
  justifyContent: 'center',
  position: 'absolute',
  right: fontSize(5),
  top: fontSize(2),
};

export const BottomContainer: ViewStyle = {
  marginHorizontal: fontSize(10),
  marginTop: fontSize(4),
  flex: 1,
};

export const TimeLabel: TextStyle = {
  fontSize: fontSize(9),
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
};

export const TimeCount: ViewStyle = {
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  alignSelf: 'flex-end',
  borderRadius: fontSize(3),
  paddingHorizontal: fontSize(5),
  paddingVertical: fontSize(1),
  marginRight: fontSize(10),
  marginBottom: fontSize(2),
};
export const TimeFixPos: ViewStyle = {
  position: 'absolute',
  bottom: fontSize(5),
  right: fontSize(5),
  marginRight: fontSize(5),
};
export const Title: TextStyle = {
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};

export const TitleLocation: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.darkGray,
  fontFamily: font.Poppins_Medium,
};

export const TitleUpdate: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};

export const DetailContainer: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  marginTop: fontSize(5),
};
export const SubDetails: TextStyle = {
  fontSize: fontSize(11),
  color: color.palette.black,
  fontFamily: font.Poppins_Medium,
  // textTransform: 'capitalize',
};
export const bottomWrapper: ViewStyle = {
  width: Dimensions.get('window').width / 3,
  marginBottom: fontSize(5),
};
export const TitleLocationOther: TextStyle = {
  fontSize: fontSize(11),
  // paddingLeft: fontSize(3),
};
export const addWidth: ViewStyle = {
  width: Dimensions.get('window').width / 4,
  // maxWidth:fontSize(200),
};
export const addWidthBlood: ViewStyle = {
  width: Dimensions.get('window').width / 3.5,
};

export const styles = StyleSheet.create({
  mainWrapper: {marginTop: 28, width: '100%', alignItems: 'center'},
});
