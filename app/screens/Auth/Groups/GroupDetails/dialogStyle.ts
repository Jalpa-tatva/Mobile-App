import {ViewStyle, TextStyle, ImageStyle, StyleSheet} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const SheetWrapper: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
};
export const WrapperContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  width: '80%',
  flexDirection: 'row',
  backgroundColor: color.palette.black,
  borderRadius: 10,
  paddingLeft: 24,
  marginBottom: 10,
};

export const ButtonSheetTitle: TextStyle = {
  color: color.palette.white,
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(16),
  width: '100%',
  marginLeft: 10,
};

export const AlbumWrapper: TextStyle = {
  width: fontSize(20),
  height: fontSize(20),
  borderRadius: fontSize(20),
};

export const EventImageStyle: ImageStyle = {
  alignSelf: 'center',
  width: '100%',
  height: fontSize(200),
  borderRadius: 10,
  resizeMode: 'stretch',
};
export const styles = StyleSheet.create({
  spaceTopAdd: {marginTop: -24},
  spaceLeftAdd: {paddingLeft: 30},
  padBothAdd: {paddingVertical: 20},
  drawerIos: {position: 'relative', zIndex: 99, alignItems: 'center'},
  drawerAndroid: {position: 'relative', alignItems: 'center'},
  fullWidth: {width: '100%'},
  drawerLabelFont: {fontSize: fontSize(14)},
  startFlex: {justifyContent: 'flex-start'},
  enterUpdateHeight: {height: 200},
  spaceBottomSix: {paddingBottom: 6},
  medicalFolderWidth: {width: fontSize(38)},
  supportUrlTxt: {textDecorationLine: 'underline'},
  messageTitle: {fontSize: fontSize(17)},
  viewTopSpace: {marginTop: -24},
  availNotifyContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  availText: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Regular,
    marginLeft: 3,
  },
});
