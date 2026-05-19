import {ViewStyle, Platform, TextStyle, StyleSheet} from 'react-native';
import {fontSize, color, font} from '@theme/index';

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
  // borderTopLeftRadius: 30,
  // borderTopRightRadius: 30,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};
export const BORDER_STYLE: ViewStyle = {
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
};
export const CommonLine: ViewStyle = {
  backgroundColor: '#bdbdbd',
  width: '100%',
  height: 1,
};

export const ActionButtonWrapper: ViewStyle = {
  position: 'absolute',
  // bottom: fontSize(140),
  bottom: fontSize(115),
  right: 20,
  alignItems: 'center',
  justifyContent: 'center',
};
export const ChatTitle: TextStyle = {
  fontSize: fontSize(12),
  fontFamily: font.Poppins_Medium,
  color: color.white,
  paddingLeft: fontSize(5),
};
export const actionButtonTouchStyle: ViewStyle = {
  flexDirection: 'row',
  borderWidth: 1,
  width: fontSize(120),
  height: fontSize(46),
  borderColor: 'rgba(0,0,0,0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  borderRadius: fontSize(12),
};
export const SearchWrapper: ViewStyle = {
  width: '94%',
  height: fontSize(50),
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  flexDirection: 'row',
  paddingVertical: 10,
  borderRadius: 10,
  backgroundColor: color.secondary,
  marginTop: 30,
};

export const TextInputStyle: TextStyle = {
  color: color.white,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  height: fontSize(50),
  flex: 1,
  textAlignVertical: 'center',
  marginHorizontal: 10,
  textAlign: 'left',
  justifyContent: 'center',
};

export const groupStyle = StyleSheet.create({
  searchCal: {
    backgroundColor: color.searchBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: fontSize(10),
    paddingVertical: fontSize(4),
    borderRadius: fontSize(20),
    marginHorizontal: 10,
  },
  listing: {
    flex: 1,
    paddingBottom: fontSize(20),
  },
  subSearchCal: {
    backgroundColor: color.secondary,
    paddingBottom: fontSize(10),
    paddingTop: fontSize(10),
  },
  inputStyle: {
    flex: 1,
    marginLeft: fontSize(10),
    fontSize: fontSize(13),
    alignItems: 'center',
    fontFamily: font.Poppins_Medium,
    top: 2,
  },
});
