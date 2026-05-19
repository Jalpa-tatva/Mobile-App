import {ViewStyle, TextStyle, Platform, StyleSheet} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const MainContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  paddingBottom: Platform.OS === 'android' ? 0 : fontSize(15),
  paddingTop: Platform.OS === 'android' ? 0 : 20,
};
export const leftContainer: ViewStyle = {
  width: '15%',
  padding: 5,
};
export const SearchContainer: ViewStyle = {
  width: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  borderRadius: 10,
  backgroundColor: color.white,
  marginVertical: 4,
  borderBottomWidth: 2,
  paddingVertical: 4,
  borderBottomColor: color.white,
  marginTop: 12,
};

export const SearchTextInput: TextStyle = {
  color: color.palette.black,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  height: fontSize(24),
  flex: 1,
  marginHorizontal: 10,
  textAlign: 'left',
};

export const SubContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
};
export const LeftContainer: ViewStyle = {
  width: '15%',
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
};
export const CenterContainer: ViewStyle = {
  marginLeft: fontSize(5),
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  paddingBottom:10
  // justifyContent: 'space-between',
};
export const RightContainer: ViewStyle = {
  flex: 0.25,
};
export const CenterText: TextStyle = {
  fontSize: fontSize(18),
  color: color.white,
  textAlign: 'left',
  fontFamily: font.Poppins_Medium,
  flex: 0.75,
};

export const Style = StyleSheet.create({
  imageStyle: {
    width: fontSize(30),
    height: fontSize(30),
    borderRadius: fontSize(30 / 2),
    borderWidth: 0.4,
    borderColor: color.white2,
  },
  imageCalStyle: {
    // paddingRight:fontSize(-10)
    width: fontSize(40),
    flex: 0.20,
  },
});
