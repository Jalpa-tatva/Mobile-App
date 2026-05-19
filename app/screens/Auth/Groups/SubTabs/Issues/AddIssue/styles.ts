import {
  ViewStyle,
  TextStyle,
  Platform,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import { color, font, spacing, fontSize } from '@theme/index';

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };
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
export const ActionText: TextStyle = {
  marginTop: 5,
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
};
export const FOOTER: ViewStyle = { marginBottom: 0 };

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
export const FormContainer: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.primary,
  flex: 1,
};
export const RawContainerButton: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.white,
  flex: 1,
  paddingVertical: 10,
};

export const COUNTRY_BODY: ViewStyle = {
  width: '90%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: color.palette.white,
  borderWidth: 1,
  borderColor: '#bdbdbd',
  borderRadius: 4,
  marginBottom: 3,
  marginVertical: 4,
  paddingVertical: 8,
  paddingLeft: 10,
};

export const COUNTRY_BODY_TEXT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const full: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};

export const leftIconStyle: ImageStyle = {
  marginRight: 10,
};

export const ExtraTItle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  fontSize: fontSize(18),
  color: color.palette.black,
};
export const SeverityTitle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
};
export const taskFolderLblWrapper: ViewStyle = {
  width: '100%',
  // alignItems: 'center',
  backgroundColor: color.white,
};
export const AssignTitle: TextStyle = {
  fontFamily: font.Poppins_Regular,
  width: '100%',
  color: color.palette.black,
  marginTop: 10,
};
export const dropDown: TextStyle = {
  marginVertical: fontSize(8),
};
export const dropdownContainer: TextStyle = {
  marginHorizontal: fontSize(15),
  width: '90%',
};
export const dropDownLabel: TextStyle = {
  fontSize: fontSize(14),
  paddingBottom: fontSize(5),
};
export const dropDownItem: TextStyle = {
  justifyContent: 'flex-start',
};

export const ButtonWrapper1: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  marginTop: fontSize(10),
};
export const DetailsWrapper: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  // borderWidth: 0.8,
  borderColor: color.border,
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
};
export const LabelStyle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.black,
  paddingVertical: fontSize(1),
  paddingLeft: fontSize(10),
  backgroundColor: color.searchBoxGrey,
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  borderRadius: fontSize(5),
};
export const styleWrapper: ViewStyle = {
  borderColor: '#f8fafb',
  borderWidth: 0,
};
export const TitleLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
  paddingVertical: fontSize(1),
};
export const screen: ViewStyle = {
  paddingHorizontal: 20,
};
export const headerImageContainer: ViewStyle = {
  alignItems: 'center',
  marginBottom: 24,
};

export const titleContainer: ViewStyle = {
  marginBottom: 24,
};
export const titleText: TextStyle = {
  fontSize: fontSize(30),
  fontFamily: 'Poppins-Bold',
  color: 'black',
};
export const checkboxContainer: ViewStyle = {
  marginVertical: 25,
  flexDirection: 'row',
  alignItems: 'center',
};
export const bottomText1: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.placeholder,
};

export const bottomText2: TextStyle = {
  fontSize: fontSize(14),
  fontFamily: font.Poppins_Regular,
  color: color.secondary,
};

export const signUpButtonContainer: ViewStyle = {
  marginVertical: fontSize(20),
  borderRadius: fontSize(10),
  height: fontSize(45),
  backgroundColor: color.secondary,
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};
export const PhotoContainer: ViewStyle = {
  marginVertical: fontSize(20),
  borderRadius: fontSize(10),
  width: '90%',
  height: fontSize(45),
  backgroundColor: '#87cefa',
};

export const ButtonImage: ViewStyle = {
  height: 50,
  alignSelf: 'center',
  position: 'absolute',
  bottom: 0,
  right: 0,
  flexDirection: 'row',
  padding: 8,
};

export const EventImageStyle: ImageStyle = {
  width: '100%',
  height: fontSize(200),
  borderRadius: 10,
  resizeMode: 'stretch',
  backgroundColor: color.palette.lightGrey,
};
export const EventImageWrapper: ImageStyle = {
  alignSelf: 'center',
  width: '100%',
  height: fontSize(200),
  borderRadius: 10,
  backgroundColor: color.palette.lightGrey,
  marginTop: 8,
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

export const OverLayButtonContainerCencel: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
};

export const OverLayButtonText: TextStyle = {
  fontFamily: font.Poppins_Regular,
  color: color.red,
  fontSize: fontSize(17),
};

export const Style = StyleSheet.create({
  dropDownStyle1: {
    zIndex: 100000,
    backgroundColor: color.searchBoxGrey,
    borderWidth: fontSize(0.5),
    borderColor: color.searchBg,
    borderRadius: fontSize(5),
  },
  severityItemStyle: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
    color: color.palette.black,
  },
  root: {
    marginHorizontal: fontSize(10),
    marginTop: 10,
  },
  dropDownStyle2: {
    // zIndex: 5,
  },
  addPhoto: {
    height: 42,
    paddingHorizontal: 5,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 6,
    backgroundColor: color.searchBoxGrey,
    borderWidth: fontSize(0.5),
    borderColor: color.searchBg,
    borderRadius: fontSize(5),
    paddingLeft: fontSize(10),
  },
  listLabel: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(11),
    color: color.palette.black,
  },
  itemWrap: { justifyContent: 'flex-start' },
  fullWidth: { width: '100%' },
  containerBorder: {
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: color.border,
  },
  spaceTop: {
    marginTop: fontSize(10),
  },
});
