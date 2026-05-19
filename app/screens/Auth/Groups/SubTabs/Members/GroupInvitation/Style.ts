import {ViewStyle, TextStyle, Platform, StyleSheet} from 'react-native';
import {color, font, spacing, fontSize} from '@theme/index';

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
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};

export const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
};

export const WrapperInvite: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
  // borderWidth:0.5,
  // borderColor:color.border,
  // borderRadius:10,
  // marginVertical:50,
  // paddingVertical:16,
  // shadowColor:color.white,
  // shadowOpacity:0.2,
  // shadowOffset:{
  //   width:0,
  //   height:10,
  // }
};

export const MainOverLayContainer: ViewStyle = {
  // paddingHorizontal: 10,
  flexGrow: 1,
  flex: 1,
};
export const OverLayInputContainer: ViewStyle = {
  width: '100%',
  flex: 1,
};
export const InviteUser: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
export const InviteUserWrapper: ViewStyle = {
  backgroundColor: color.secondary,
  height: fontSize(46),
  width: fontSize(80),
  borderRadius: fontSize(6),
  justifyContent: 'center',
  alignItems: 'center',
};
export const InviteLable: TextStyle = {
  color: color.white,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(13),
};
export const TotalMemberLbl: TextStyle = {
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(13),
};

export const TotalMember: ViewStyle = {
  width: '100%',
  marginTop: fontSize(15),
  marginBottom: fontSize(15),
  marginLeft: fontSize(2),
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: fontSize(5),
  justifyContent: 'space-between',
};
export const FormContainer: ViewStyle = {
  width: '100%',
  backgroundColor: color.white,
  borderRadius: 4,
  flex:1
};

export const OverLayButtonContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
};

export const loginButtonContainer: ViewStyle = {
  borderRadius: fontSize(24),
  height: fontSize(45),
  width: '80%',
  marginTop: fontSize(20),
  backgroundColor: color.secondary,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const OverLayLabelText3: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.palette.black,
  justifyContent: 'center',
  flex: 1,
  paddingHorizontal: 8,
};
export const OverLayLabelText: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.palette.black,
  paddingLeft: 5,
  paddingVertical: 10,
};
export const OverLayLabelText1: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.palette.red,
};
export const OverLayLabelTextNoUser: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.palette.black,
  marginLeft: 5,
};

export const TextInputStyle: TextStyle = {
  color: color.palette.black,
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(13),
  height: fontSize(46),
  flex: 1,
  // marginHorizontal: 10,
  marginRight: 10,
  textAlign: 'left',
  paddingLeft: fontSize(12),
  borderWidth: 1,
  borderRadius: 6,
  borderColor: color.border,
};
export const OverLayButtonContainerCencel: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  // paddingVertical: 10,
};

export const OverLayButtonText: TextStyle = {
  fontFamily: font.Poppins_Medium,
  color: color.red,
  fontSize: fontSize(15),
};

export const style = StyleSheet.create({
  useImage: {
    height: fontSize(40),
    width: fontSize(40),
    borderRadius: fontSize(40) / 2,
    backgroundColor: color.searchBg,
  },
  userLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: fontSize(5),
  },
  userDetail: {
    marginLeft: fontSize(6),
    flex: 1,
  },
  userLocationLbl: {
    fontFamily: font.Poppins_Regular,
    color: color.searchIcon,
    fontSize: fontSize(11),
    paddingLeft: fontSize(2),
  },
  memberWrapper: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: fontSize(20),
    marginLeft: fontSize(6),
  },
});
