import {ViewStyle, TextStyle, Platform, StyleSheet} from 'react-native';
import {fontSize, color, font} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.white};
export const MAIN_FULL: ViewStyle = {flex: 1, backgroundColor: color.secondary};
export const HEADERTOP: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.secondary,
  // paddingBottom: fontSize(10),
};
export const MainView: ViewStyle = {
  flex: 1,
  width: '100%',
  backgroundColor: color.white, 
};
export const leftContainer: ViewStyle = {
  width: '15%',
  padding: 5,
};
export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
  paddingTop: 8,
};
export const ProfileWrapper: ViewStyle = {
  // alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor: color.secondary,
  width: '100%',
  // alignSelf: 'center',
  position: 'absolute',
  zIndex: 999,
  // paddingVertical: fontSize(10),
};
export const ProfileWrapperSpace: ViewStyle = {
  paddingTop: Platform.OS == 'ios' ? fontSize(50) : 0,
  backgroundColor: color.secondary,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};
export const closeIosSpcaeTop: ViewStyle = {
  top: Platform.OS == 'ios' ? fontSize(30) : 0,
};

export const InputRaw: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  paddingHorizontal: fontSize(15),
  marginHorizontal: fontSize(15),
  marginBottom: Platform.OS == 'ios' ? fontSize(5) : fontSize(1),

  // paddingVertical: 10
  backgroundColor: color.secondary,
  minHeight: fontSize(50),
  borderRadius: fontSize(30),
  maxHeight:fontSize(200)
};
export const TextInputStyle: TextStyle = {
  width: '100%',
  // marginRight: 10,
  paddingHorizontal: 10,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(14),
  color: color.palette.white,
};
export const TitleTxt: TextStyle = {
  width: '50%',
  fontSize: fontSize(17),
  color: color.white,
  textAlign: 'left',
  fontFamily: font.Poppins_Medium,
};

export const CenterContainerOther: ViewStyle = {
  width: '50%',
};
export const SendButton: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  width: fontSize(45),
  height: fontSize(45),
  borderRadius: fontSize(45 / 2),
  borderColor: color.secondary,
  borderWidth: 3,
  paddingLeft: fontSize(5),
  marginRight: fontSize(15),
};
export const LoaderCal: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  width: fontSize(45),
  height: fontSize(45),
  borderRadius: fontSize(45 / 2),
  borderColor: color.secondary,
  paddingLeft: fontSize(5),
  marginRight: fontSize(15),
};
export const BottomMsgCal: ViewStyle = {
  paddingTop: fontSize(10),
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: fontSize(10),
  backgroundColor: color.white,
};

export const detailModalStyle: ViewStyle = {
  right: fontSize(10),
  top: fontSize(60),
  position: 'absolute',
  backgroundColor: color.secondary,
  padding: fontSize(10),
  paddingHorizontal: fontSize(15),
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  borderRadius: fontSize(10),
};

export const docModalStyle: ViewStyle = {
  backgroundColor: color.secondary,
  position: 'absolute',
  right: fontSize(70),
  bottom: fontSize(70),
  padding: fontSize(10),
  paddingHorizontal: fontSize(15),
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  borderRadius: fontSize(10),
};
export const style = StyleSheet.create({
  listing: {
    flex: 1,
    marginTop: fontSize(20),
  },
  memberListing: {
    marginTop: fontSize(12),
    alignSelf: 'flex-start',
    marginLeft: fontSize(10),
    flex: 1,
  },
  profileCal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: fontSize(10),
  },
  listingWrapper: {
    // maxHeight: fontSize(105),
    // flex: 1,
    marginTop: fontSize(1),
    paddingLeft: fontSize(20),
  },
  profileImage: {
    width: fontSize(25),
    height: fontSize(25),
    borderRadius: fontSize(25 / 2),
    backgroundColor: color.searchBg,
  },
  profileName: {
    fontSize: fontSize(10),
    fontFamily: font.Poppins_Regular,
    color: color.palette.black,
    marginLeft: fontSize(10),
  },
  members: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.black,
    marginBottom: fontSize(8),
  },
  ListingWrap: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: fontSize(80),
    height: fontSize(80),
    borderRadius: fontSize(80 / 2),
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: color.textPlaceholder,
    backgroundColor: color.placeholder,
  },
  stickyHeader: {
    position: 'absolute',
    top: fontSize(55),
    left: 0,
    right: 0,

    // backgroundColor: color.palette.lighterGrey,
    paddingHorizontal: fontSize(5),
    paddingVertical: fontSize(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize(5),
    zIndex: 1, // Ensure it stays on top
  },
  chatWrapper: {
    backgroundColor: color.palette.lighterGrey,
    paddingHorizontal: fontSize(5),
    paddingVertical: fontSize(1),
    borderRadius: fontSize(5),
  },
  chatDate: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
    color: color.palette.blackSecondary,
  },
  chatDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: fontSize(20),
  },
  datePrintCal: {},
  closeProfile: {
    position: 'absolute',
    top: 0,
    width: 50,
    right: 0,
    height: 50,
    alignItems: 'center',
  },
  profileWrapper: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
    marginBottom: fontSize(10),
  },
  userDetails: {
    fontSize: fontSize(14),
    color: color.palette.white,
    fontFamily: font.Poppins_Medium,
    textTransform: 'capitalize',
  },
  userDataWrapper: {
    width: '75%',
  },
});
