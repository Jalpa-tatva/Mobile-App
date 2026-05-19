import {ViewStyle, TextStyle, Platform} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const MainContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  paddingBottom: Platform.OS === 'android' ? 0 : 12,
  paddingTop: Platform.OS === 'android' ? 0 : 24,
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
  width: '18%',
  padding: fontSize(8),
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
};
export const CenterContainer: ViewStyle = {
  // width: '60%',
  flex: 1,
  justifyContent: 'center',
};

export const CenterText: TextStyle = {
  fontSize: fontSize(21),
  color: color.white,
  textAlign: 'left',
  fontFamily: font.Poppins_Medium,
};
