import {
  ViewStyle,
  TextStyle,
  Platform,
  ImageStyle,
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

export const RawContainer: ViewStyle = {
  backgroundColor: color.palette.white,
  width: '90%',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: fontSize(10),
  //padding: fontSize(20),
  borderRadius: 10,
  borderWidth: fontSize(0.8),
  borderColor: color.palette.lighterGrey,
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: fontSize(2),
  },
  shadowColor: color.searchBg,
  shadowRadius: fontSize(10),
};

export const Title: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.darkGray,
  fontSize: fontSize(13.5),
  alignContent: 'flex-start',
  marginRight: fontSize(14),
  flex: 1,
  flexWrap: 'wrap',
  flexShrink: 1,
};

export const FileImageWrapper: ImageStyle = {
  width: fontSize(45),
  height: fontSize(45),
  marginHorizontal: fontSize(10),
  resizeMode: 'contain',
};

export const HeaderWrapper: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: fontSize(8),
};
export const AuthorWrapper: ViewStyle = {
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
};

export const WrapperContainer: ViewStyle = {
  flexDirection: 'row',
  width: '90%',
  // paddingVertical:6,
  //  height: 50,
  // alignItems: 'center',
  // alignSelf: 'center',
  // justifyContent: 'center',
  // backgroundColor: color.palette.black,
  marginBottom: 10,
  borderRadius: 10,
};
export const TitleAuthor: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.blackSecondary,
  fontSize: fontSize(15),
  alignContent: 'flex-start',
  flex: 1,
  flexWrap: 'wrap',
  flexShrink: 1,
};
export const DownloadWrapper: ViewStyle = {
  width: fontSize(20),
  alignSelf: 'flex-end',
  marginRight: fontSize(5),
  bottom: fontSize(-2),
};
export const TitleAuthorFolder: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.blackSecondary,
  fontSize: fontSize(15),
};
export const folderWrapper: ViewStyle = {
  flexShrink: 1,
  marginRight: fontSize(10),
};
export const ViewTitleAuthor: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: color.palette.white,
  fontSize: fontSize(15),
  height: fontSize(22),
  marginVertical: 5,
  alignSelf: 'flex-start',
  paddingLeft: fontSize(10),
};
export const ViewWrapper: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  backgroundColor: color.trans,
  alignItems: 'center',
  alignSelf: 'flex-start',
  justifyContent: 'flex-start',
  borderRadius: 10,
  paddingHorizontal: fontSize(10),
  marginTop: fontSize(5),
};
export const FileContainer: ViewStyle = {
  flex: 1,
  marginRight: fontSize(9),
};

export const TitleStyle: TextStyle = {
  width: '100%',
  fontFamily: font.Poppins_Bold,
  textAlign: 'center',
};

export const LoaderWrapper: ViewStyle = {
  position: 'absolute',
  right: fontSize(6),
  top: fontSize(10),
};
export const indicatorContainer: ViewStyle = {
  zIndex: 1,
  flex: 1,
  height: '100%',
};
export const AlertMessageStyle: TextStyle = {
  fontFamily: font.Poppins_Italic,
  fontSize: fontSize(14),
  color: color.palette.blackSecondary,
  textAlign: 'center',
  alignSelf: 'center',
  borderWidth: 1,
};

export const AlertText1: TextStyle = {
  textAlign: 'center',
  fontFamily: font.Poppins_Regular,
};

export const AlertText2: TextStyle = {
  textAlign: 'center',
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(17),
  fontWeight: 'bold',
};
export const AlertTextt3: TextStyle = {
  textAlign: 'center',
  fontFamily: font.Poppins_Regular,
};

export const styles = StyleSheet.create({
  messageStyle: {
    fontFamily: font.Poppins_Italic,
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
  },
  titleStyle: {width: '100%', fontFamily: font.Poppins_Bold},
});
