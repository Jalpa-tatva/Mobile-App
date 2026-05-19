import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from 'react-native';
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
export const IsEditTextInputView: ViewStyle = {
  backgroundColor: color.searchBoxGrey,
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

export const SearchTextStyle: TextStyle = {
  marginTop: 5,
  color: color.secondary,
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(16),
  height: 40,
  borderColor: color.border,
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 10,
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
export const DrugHeader: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  marginBottom: fontSize(18),
};
export const RawContainerMain: ViewStyle = {
  backgroundColor: color.white,
  width: '92%',
  padding: 10,
  borderRadius: 6,
  marginHorizontal: 20,
  marginTop: 50,
  alignSelf: 'center',
  borderWidth: 0.5,
  borderColor: color.palette.lighterGrey,
  justifyContent: 'center',
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  paddingBottom: fontSize(30),
};
export const styleWrapper: ViewStyle = {
  borderColor: '#f8fafb',
  borderWidth: 0,
};
export const LabelStyle: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.black,
  paddingVertical: fontSize(1),
  paddingLeft: fontSize(10),
  backgroundColor: color.white,
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  borderRadius: fontSize(5),
};
export const TitleLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(12),
  color: color.palette.black,
  paddingVertical: fontSize(1),
  marginTop: fontSize(2),
  marginLeft: fontSize(1.5),
};
export const loginButtonContainer: ViewStyle = {
  borderRadius: 25,
  marginTop: 25,
  padding: 10,
  height: 48,
  backgroundColor: color.secondary,
};
export const SelectMedication: ViewStyle = {
  paddingTop: fontSize(2),
};
export const ImageWrapper2: ImageStyle = {
  width: fontSize(80),
  height: fontSize(80),
};
export const DrugTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  fontSize: fontSize(18),
  color: color.secondaryLight,
  flex: 1,
  marginLeft: fontSize(15),
};

export const ButtonWrapperMain1: ViewStyle = {
  width: '100%',
  alignItems: 'center',
};

export const BottonTitle: TextStyle = {
  fontFamily: font.Poppins_Bold,
  color: color.palette.white,
  fontSize: fontSize(16),
};

export const ButtonContainer: ViewStyle = {
  marginTop: 25,
  padding: 10,
  width: '100%',
  borderRadius: fontSize(10),
  height: fontSize(45),
  backgroundColor: color.secondary,
};

export const addPhoto: ViewStyle = {
  height: 42,
  paddingHorizontal: 5,
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 6,
  backgroundColor: color.white,
  borderWidth: fontSize(0.5),
  borderColor: color.searchBg,
  borderRadius: fontSize(5),
  paddingLeft: fontSize(10),
};

export const listLabel: TextStyle = {
  fontFamily: font.Poppins_Medium,
  fontSize: fontSize(11),
  color: color.palette.black,
};

export const Style = StyleSheet.create({
  fullwidth: {
    width: '100%',
  },
  contentSelf : {
    justifyContent: 'flex-start'
  }
});
