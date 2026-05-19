import {ViewStyle, TextStyle, ImageStyle, Platform} from 'react-native';
import {color, font, spacing, typography,fontSize} from '@theme/index';

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
  alignItems:'center'
};

export const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
};
export const TEXT: TextStyle = {
  color: color.palette.orange,
  fontFamily: typography.primary,
};
export const BOLD: TextStyle = {fontWeight: 'bold'};

export const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
};

export const ActionText: TextStyle = {
  marginTop: 5,
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
};
export const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: 'center',
  letterSpacing: 1.5,
};
export const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: 'center',
};
export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: fontSize(30),
  textAlign: 'center',
  // fontFamily:font.Poppins_ExtraBold
};
export const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: 'italic',
};
export const BOWSER: ImageStyle = {
  alignSelf: 'center',
  marginVertical: spacing[5],
  maxWidth: '100%',
};
export const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: '#821549',
};
export const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
};
export const FOOTER: ViewStyle = {marginBottom: 0};

export const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
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
  alignSelf:'center',
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
  color: color.palette.lightGrey,
  fontFamily: font.Poppins_Medium,
};
export const UnpairTitle: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.white,
  fontFamily: font.Poppins_Medium,
};

export const TitleLocation: TextStyle = {
  fontSize: fontSize(12),
  color: color.palette.black,
  fontFamily: font.Poppins_Medium,
};

export const TitleUpdate: TextStyle = {
  fontSize: fontSize(18),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};

export const HeadContainer: ViewStyle = {
  
  marginTop:30,
  marginLeft:30,
  flexDirection:'row'
};
export const DetailsContainer: ViewStyle = {  
  marginTop:30,
  backgroundColor: color.white,
  width: '88%',
  paddingVertical: 8,
  borderRadius: 12,
  paddingHorizontal:10,
  alignSelf:'center',
  shadowColor: '#000000',
  shadowOffset: {width: 0, height: 0.5},
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
};
export const UnpairContainer: ViewStyle = {
  backgroundColor: color.palette.blackSecondary,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:10,
  marginHorizontal:10,
  paddingVertical:4,
  paddingHorizontal:10,
};

export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(24),
  height: fontSize(45),
  width:'90%',
  marginTop: 25,
  padding: 10,
  backgroundColor: color.secondary,
};
export const scanContainer: ViewStyle = {
  zIndex:1,position:'absolute',width:'100%',alignItems:'center',bottom:20
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.palette.white,
  fontSize:fontSize(11)
};

export const ImageSheetWrapper: ViewStyle = {
  height: '80%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection:'row',
  paddingHorizontal:20,
  backgroundColor:color.imagebg
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
  backgroundColor:color.palette.black,
  marginBottom:10,
  borderRadius:10,
  paddingLeft:14,
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
  width:'98%',
};
export const profileStyle: ImageStyle = {
  alignSelf: 'center',
  width: fontSize(60),
  height: fontSize(60),
};


export const ImageBg: ViewStyle = {
  alignItems: 'center',
  width: fontSize(60),
  height: fontSize(60),
  borderRadius: fontSize(60) / 2,
  justifyContent: 'center',
  backgroundColor: color.imagebg,
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
  resizeMode:'stretch'
};
export const sub1ContainerStyle: ViewStyle = {
  width: '100%',
  paddingHorizontal: '2%',
  flexDirection: 'row',
  borderBottomWidth: 1,
  alignSelf: 'center',
  alignContent: 'center',
  alignItems: 'center',
  paddingVertical: '5%',
  borderBottomColor: color.linecolor,
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
  position:'absolute',
  bottom:24,
  right:6,
  flexDirection:'row',
  padding:8,
};
export const titleStyle: ViewStyle = {
  flex: 3.3,
  justifyContent: 'center',
};

export const textStyle: TextStyle = {
  fontSize: fontSize(16),
  color: color.palette.blackSecondary,
  marginLeft: 14,
  flex: 1,
  fontFamily: font.Poppins_Regular,
};

export const text1Style: TextStyle = {
  fontSize: fontSize(12),
  color: color.detailscolor,
  marginLeft: 14,
  paddingRight: 10,
  fontFamily: font.Poppins_Regular,
};


export const ButtonContainer: ViewStyle = {
  borderRadius: fontSize(10),
  height: fontSize(45),
  flex:1,
  marginTop: 25,
  marginHorizontal:4,
  backgroundColor: color.secondary,
};

