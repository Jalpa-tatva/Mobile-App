import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from 'react-native';
import {color, font, spacing, fontSize} from '@theme/index';
import styleConfig from '@app/theme/styleConfig';

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
  alignItems: 'center',
};

export const ActionText: TextStyle = {
  marginTop: 5,
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
};

export const ActionButtonWrapper: ViewStyle = {
  position: 'absolute',
  bottom: 20,
  right: 20,
  alignItems: 'center',
  justifyContent: 'center',
};

export const RawContainerMainItem: ViewStyle = {
  backgroundColor: color.white,
  width: '90%',
  marginTop: 10,
  paddingVertical: 8,
  borderRadius: 10,
  alignItems: 'center',
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
  alignItems: 'center',
  marginVertical: 2,
  paddingVertical: 2,
  flexDirection: 'row',
};
export const ImageWrapper: ImageStyle = {
  marginHorizontal: fontSize(10),
  width: fontSize(60),
  height: fontSize(60),
};

export const TextContainer: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
};

export const Title: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};
export const UnpairTitle: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.white,
  fontFamily: font.Poppins_Medium,
};

export const TitleLocation: TextStyle = {
  fontSize: fontSize(11.5),
  color: color.palette.darkGray,
  fontFamily: font.Poppins_Medium,
};
export const TitleLocationBlack: TextStyle = {
  paddingTop: fontSize(1),
};

export const spaceLeft: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.darkGray,
  fontFamily: font.Poppins_Medium,
  paddingLeft: fontSize(3),
  flex: 1,
};

export const TitleUpdate: TextStyle = {
  fontSize: fontSize(18),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};

export const HeadContainer: ViewStyle = {
  marginTop: 30,
  marginLeft: 30,
  flexDirection: 'row',
};
export const DetailsContainer: ViewStyle = {
  marginTop: fontSize(15),
  backgroundColor: color.white,
  // width: '%',
  width: '95%',
  marginHorizontal: styleConfig?.isAndroid ? fontSize(4) : fontSize(10),
  paddingVertical: 8,
  borderRadius: 12,
  // paddingHorizontal: 10,
  flex: 1,
  alignSelf: 'center',
};
export const UnpairContainer: ViewStyle = {
  backgroundColor: color.palette.blackSecondary,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  marginHorizontal: 10,
  paddingVertical: 4,
  paddingHorizontal: 10,
};

export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(24),
  height: fontSize(45),
  width: '100%',
  marginTop: 25,
  padding: 10,
  backgroundColor: color.secondary,
};
export const scanContainer: ViewStyle = {
  zIndex: 1,
  position: 'absolute',
  width: '100%',
  alignItems: 'center',
  bottom: 20,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(11),
};
export const BottonCloseTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};
export const ImageSheetWrapper: ViewStyle = {
  height: '80%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingHorizontal: 20,
  backgroundColor: color.imagebg,
};

export const SheetWrapper: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const WrapperContainer: ViewStyle = {
  flexDirection: 'row',
  width: '80%',
  height: 50,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: color.palette.black,
  marginBottom: 10,
  borderRadius: 10,
  paddingLeft: 14,
};

export const ButtonSheetTitle: TextStyle = {
  width: '100%',
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize: fontSize(16),
  marginLeft: 10,
};

export const OverLayButtonText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: color.red,
  fontSize: fontSize(17),
};

export const OverLayButtonContainerCencel: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
};

export const BottomlWrapperMain: ViewStyle = {
  paddingVertical: 5,
  // width: '98%',
};
export const DetailActionsSpace: ViewStyle = {
  marginRight: fontSize(25),
  marginTop: fontSize(6),
  marginBottom: fontSize(6),
  // width: '98%',
};

export const StyleWrapper: ViewStyle = {
  paddingVertical: fontSize(5),
  paddingLeft: fontSize(10),
  backgroundColor: color.searchBoxGrey,
  // borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  // borderRadius: fontSize(5),
  height: fontSize(100),
  marginTop: fontSize(5),
};
export const DetailActions: ViewStyle = {
  flexDirection: 'row',
};
export const MainWrapper: ViewStyle = {
  // flex: 1,
  padding: fontSize(13),
  borderColor: color.palette.lightGrey,
  borderWidth: fontSize(0.5),
  borderRadius: fontSize(10),
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,

  elevation: 7,
  backgroundColor: color.white,
  paddingVertical: fontSize(10),
  paddingBottom: fontSize(20),
  // shadowColor: '#000000',
  // shadowOffset: {width: 0, height: 0.5},
  // shadowOpacity: 0.5,
  // shadowRadius: 3,
  // elevation: 3,
  // backgroundColor: 'pink',
};
export const DateWrapper: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: fontSize(12),
  marginLeft: fontSize(2),
  // alignSelf: 'center',
};
export const SpaceLeftMain: ViewStyle = {
  paddingRight: fontSize(5),
  alignContent: 'center',
};
export const profileStyle: ImageStyle = {
  // alignSelf: 'center',
  width: fontSize(65),
  height: fontSize(65),
  borderRadius: fontSize(65) / 2,
};

export const ImageBg: ViewStyle = {
  // alignItems: 'center',
  // width: fontSize(30),
  // height: fontSize(30),
  // // borderRadius: fontSize(30) / 2,
  // justifyContent: 'center',
  // backgroundColor: color.imagebg,
  // marginRight: fontSize(10),
  // marginTop: fontSize(15),
  // marginLeft: fontSize(10),
};
export const EventImageWrapper: ViewStyle = {
  width: '100%',
  height: fontSize(200),
  borderRadius: fontSize(10),
  justifyContent: 'center',
  backgroundColor: color.imagebg,
};

export const EventImageStyle: ImageStyle = {
  alignSelf: 'center',
  width: '100%',
  height: fontSize(200),
  borderRadius: 10,
  resizeMode: 'stretch',
};
export const sub1ContainerStyle: ViewStyle = {
  // width: '100%',
  // paddingHorizontal: '2%',
  flexDirection: 'row',
  // // borderBottomWidth: 1,
  // alignSelf: 'center',
  // alignContent: 'center',
  // alignItems: 'center',
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  // borderRadius: fontSize(5),
  // marginTop: fontSize(20),
  padding: fontSize(6),
  // borderBottomColor: color.linecolor,
};
export const Srollsub1ContainerStyle: ViewStyle = {
  width: '100%',
  paddingHorizontal: '2%',
  flexDirection: 'row',
  borderBottomWidth: 1,
};
export const URLStyle: ViewStyle = {
  width: '100%',
  paddingHorizontal: '2%',
  flexDirection: 'row',
  alignSelf: 'center',
  alignContent: 'center',
  alignItems: 'center',
  paddingVertical: '5%',
};

export const ButtonImage: ViewStyle = {
  height: 50,
  alignSelf: 'center',
  position: 'absolute',
  bottom: 24,
  right: 6,
  flexDirection: 'row',
  padding: 8,
};
export const titleStyle: ViewStyle = {
  // flex: 3.3,
  justifyContent: 'center',
};
export const userDetail: ViewStyle = {
  justifyContent: 'center',
  // marginTop: fontSize(10),
  paddingLeft: fontSize(5),
  flex: 1,
};
export const locationWrapper: ViewStyle = {
  marginLeft: fontSize(8),
  flexDirection: 'row',
  // alignItems: 'center',
  paddingTop: fontSize(3),
  marginRight: fontSize(5),
  alignItems:'center'
};
export const textStyle: TextStyle = {
  fontSize: fontSize(17),
  color: color.palette.blackSecondary,
  // marginLeft: 14,
  // flex: 1,
  fontFamily: font.Poppins_Medium,
};
export const titleWrapper: ViewStyle = {
  flexDirection: 'row',
  paddingRight: 5,
  marginTop: fontSize(30),
};
export const titleMainWrapper: ViewStyle = {
  // flexDirection: 'row',
  paddingRight: 5,
  marginTop: fontSize(10),
};
export const text1Style: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.blackSecondary,
  marginLeft: 14,
  paddingRight: 10,
  fontFamily: font.Poppins_SemiBold,
};

export const ButtonContainer: ViewStyle = {
  borderRadius: fontSize(10),
  height: fontSize(45),
  flex: 1,
  marginTop: 25,
  marginHorizontal: 4,
  backgroundColor: color.secondary,
};

export const signUpButtonContainer: ViewStyle = {
  marginVertical: fontSize(20),
  borderRadius: fontSize(10),
  height: fontSize(40),
  backgroundColor: color.border,
  borderWidth: 1,
  borderColor: color.secondary,
};
export const CLoseBottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.secondary,
  fontSize: fontSize(16),
};

export const overlay: ViewStyle = {
  width: '90%',
  borderRadius: 25,
  padding: 10,
  paddingVertical: 20,
  backgroundColor: color.white,
};
export const backdropStyle: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};
export const MainOverLayContainer: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 10,
  backgroundColor: color.white,
};
export const OverLayRowContainer: ViewStyle = {
  marginVertical: 10,
  flexDirection: 'row',
};
export const OverLayTitleContainer: ViewStyle = {
  justifyContent: 'center',
  flexGrow: 1,
  alignSelf: 'center',
};
export const OverTitle: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(20),
  fontFamily: font.Poppins_Bold,
  paddingBottom: 3,
  width: '90%',
};

export const OverLayRowContainer1: ViewStyle = {
  flexDirection: 'row',
  marginVertical: 15,
  backgroundColor: color.palette.darkGray,
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
};

export const OverLayText: TextStyle = {
  color: color.palette.white,
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  paddingLeft: 5,
  width: '90%',
};

export const OverLayInputContainer: ViewStyle = {
  width: '100%',
  marginTop: -10,
  marginHorizontal: -20,
  backgroundColor: color.palette.lightGrey,
  alignItems: 'center',
  alignSelf: 'center',
  borderRadius: 10,
};

export const TagContainer: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.white,
};

export const TextInputs: TextStyle = {
  color: color.palette.blackSecondary,
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Medium,
  borderWidth: 1,
  width: '100%',
  height: fontSize(140),
  marginBottom: 3,
  borderColor: color.trans,
  borderRadius: 8,
  marginVertical: 4,
  paddingVertical: 8,
  paddingHorizontal: 10,
  flexGrow: 1,
};

export const OverLayButtonContainer1: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
};

export const styles = StyleSheet.create({
  msgTitleStyle: {
    width: '100%',
    fontFamily: font.Poppins_Bold,
    fontSize: fontSize(16),
  },
  messageLabel: {
    fontFamily: font.Poppins_Italic,
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
  },
});
