import {ViewStyle, Platform, StyleSheet} from 'react-native';
import {color, font, fontSize} from '@theme/index';

export const FULL: ViewStyle = {flex: 1, backgroundColor: color.secondary};

export const BODY: ViewStyle = {
  width: '100%',
  height: '88%',
  flex: 1,
  backgroundColor: color.white,
  marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
};
export const SUB_BODY: ViewStyle = {
  paddingTop: fontSize(2),
};
export const styles = StyleSheet.create({
  RawContainerMain: {
    backgroundColor: color.white,
    // width: '90%',
    flex: 1,
    borderRadius: fontSize(5),
    borderWidth: fontSize(0.8),
    justifyContent: 'center',
    marginTop: fontSize(5),
    // alignItems: 'center',
    marginBottom: fontSize(15),
    marginHorizontal: fontSize(15),
    borderColor: color.palette.lighterGrey,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: fontSize(2),
    },
    paddingHorizontal: fontSize(10),
    paddingVertical: fontSize(5),
  },
  createByLbl: {
    fontSize: fontSize(11),
    color: color.palette.black,
    fontFamily: font.Poppins_Medium,
  },
  assignedTo: {
    fontSize: fontSize(10),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
    paddingTop: fontSize(2),
  },
  subWrapper: {
    paddingTop: fontSize(5),
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  detailWrapper: {
    marginLeft: fontSize(10),
    flex: 1,
    // marginTop: fontSize(3),
  },
  Title: {
    fontFamily: font.Poppins_SemiBold,
    fontSize: fontSize(12),
    color: color.palette.black,
  },
  readMoreText: {
    textAlign: 'right',
    marginTop: fontSize(3),
    color: color.palette.darkGray,
    fontSize: fontSize(11),
    fontFamily: font.Poppins_Regular,
  },
  severityTitle: {
    fontFamily: font.Poppins_Regular,
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
    textAlign: 'center',
  },
  TitleLocation: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(11),
    color: color.palette.lightGrey,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  RawContainer: {
    backgroundColor: color.white,
    width: '100%',
    alignItems: 'center',
    marginVertical: 2,
    paddingVertical: 2,
    flexDirection: 'row',
    marginTop: 14,
  },
  TextContainer: {
    backgroundColor: color.white,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingTop: fontSize(8),
    marginVertical: 10,
  },

  ImageContainer: {
    width: fontSize(60),
    height: fontSize(60),
  },
  ImageWrapper: {
    width: fontSize(60),
    height: fontSize(60),
    backgroundColor: color.palette.lighterGrey,
  },
  assignedToBold: {
    color: color.palette.black,
  },
  TitleApproval: {
    fontSize: fontSize(10),
    color: color.secondary,
    fontFamily: font.Poppins_Medium,
  },
  ApprovalWrapper: {
    backgroundColor: color.white,
    paddingHorizontal: fontSize(5),
    paddingVertical: fontSize(2),
    borderRadius: fontSize(5),
    position: 'absolute',
    left: fontSize(10),
    bottom: fontSize(10),
    borderWidth: fontSize(0.6),
    borderColor: color.searchBg,
  },
  severityWrapper: {
    backgroundColor: color.palette.lightGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    width: 120,
  },

  BottomlWrapper: {
    flexDirection: 'row',
  },
  BottomlWrapperMain: {
    // paddingVertical: 10,
  },
  BottomlWrapperMain2: {
    // paddingVertical: 10,
    // marginLeft: 16,
    // flex: 1,
  },
  toolTitleLocation: {
    fontSize: fontSize(12),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: fontSize(12),
    alignSelf: 'flex-end',
    width: '50%',
  },
});
