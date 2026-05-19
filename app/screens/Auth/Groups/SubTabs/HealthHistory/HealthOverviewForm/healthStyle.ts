import {StyleSheet} from 'react-native';
import {color, font, fontSize, moderateScale, verticalScale} from '@app/theme';
import styleConfig from '@app/theme/styleConfig';

export const HoStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
  selectFileWrapper: {
    fontSize: fontSize(15),
    marginRight: fontSize(35),
    textAlign: 'center',
  },
  alignRow: {flexDirection: 'row'},
  padBothTen: {paddingHorizontal: 10},
  reportMainWrapper: {flex: 1, paddingHorizontal: 10, alignContent: 'center'},

  vaccCancleSpace: {marginBottom: fontSize(12)},
  docsLabel: {
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.black,
  },
  reportCurrentPage: {
    color: color.palette.black,
    marginLeft: 10,
    marginTop: 20,
  },
  reportStyleOne: {
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  reportStyleSecond: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  vaccDownSpace: {marginBottom: fontSize(3)},
  updateDiagnoses: {
    textAlign: 'left',
    marginTop: 0,
    flex: 1,
    width: '100%',
    lineHeight: verticalScale(20),
    minHeight: 40.9,
    backgroundColor: color.palette.lightGrey,
  },
  myHealthListing: {flex: 1, paddingHorizontal: 10, alignContent: 'center'},
  subMyHealth: {flexDirection: 'column', borderWidth: 0},
  dobDate: {
    fontSize: fontSize(13),
    color: color.palette.black,
    fontFamily: font.Poppins_Regular,
  },
  selectVDate: {
    fontSize: fontSize(14),
    color: color.palette.black,
  },
  updateNewInput: {
    // paddingBottom:verticalScale(5),
    textAlign: 'left',
    marginTop: 0,
    flex: 1,
    width: '100%',
    lineHeight: verticalScale(20),
    minHeight: 40,
  },
  deleteDIcon: {
    alignItems: 'center',
    height: fontSize(50),
    justifyContent: 'flex-end',
    // marginTop:10
    // marginTop:styleConfig.isAndroid ? verticalScale(10):verticalScale(5),
  },
  dateList: {
    fontSize: fontSize(14),
    color: color.palette.black,
  },
  spaceBothH: {
    marginHorizontal: 0,
  },
  inchLbl: {
    textAlign: 'left',
    paddingLeft: 6,
    textAlignVertical: 'bottom',
    flex: 1,
    justifyContent: 'center',
    fontSize: fontSize(14),
  },
  baseView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: fontSize(12),
  },

  diagnosisCal3: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginRight: fontSize(10),
  },
  significantDP: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyTxt: {
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
    fontSize: fontSize(14),
    textAlign: 'center',
    marginLeft: fontSize(10),
  },
  deleteCalD: {
    width: fontSize(20),
    top: 5,
  },
  addCal: {
    flexDirection: 'row',
    marginRight: fontSize(10),
    alignItems: 'center',
  },
  fullFlex: {
    flex: 1,
  },
  directionRow: {flexDirection: 'row', alignItems: 'center'},
  diagnosesCal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vaccSpaceBottom: {paddingBottom: fontSize(12)},
  darkInputHorizontal: {
    flex: 1,
    backgroundColor: color.palette.lightGrey,
  },
  darkInputFullHorizontal: {
    flex: 1,
    backgroundColor: color.palette.lightGrey,
  },
  messageInputFullHorizontal: {
    flex: 1,
    height: 600,
    backgroundColor: color.palette.lightGrey,
  },

  inputContainer: {
    marginHorizontal: fontSize(15),
  },
  wrapper: {
    height: moderateScale(38),
    borderWidth: moderateScale(0.7),
    borderRadius: moderateScale(3),
    paddingHorizontal: fontSize(5),
    marginTop: styleConfig.isAndroid ? 3 : 4.5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: fontSize(2)},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    marginTop: fontSize(4),
    marginHorizontal: fontSize(5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
    fontSize: fontSize(14),
  },
  section: {
    // height: "100%",
    marginHorizontal: fontSize(2),
    // backgroundColor:'#d9d9d9',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: color.white,
    paddingVertical: fontSize(4),
    flexGrow: 1,
    borderRadius: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  SeverityTitle: {
    fontFamily: font.Poppins_Regular,
    width: '90%',
    color: color.palette.black,
  },

  input: {
    //width: fontSize(120),
  },
  input2: {
    width: fontSize(100),
  },
  inputNew: {
    width: fontSize(150),
  },
  inputFull: {
    width: '100%',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: fontSize(5),
  },
  checkBoxLabel: {
    fontSize: fontSize(16),
    marginLeft: fontSize(10),
  },
  checkBoxSection: {
    marginHorizontal: fontSize(15),
    // flexDirection: "row",
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-start',
  },
  radioButtonSection: {
    marginHorizontal: fontSize(15),
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  subHeading: {
    marginTop: fontSize(5),
    marginHorizontal: fontSize(15),
  },
  buttonContainer: {
    //marginVertical: fontSize(15),
    // width: "50%",
    alignItems: 'center',
  },
  button: {
    width: '90%',
    paddingVertical: fontSize(7),
    backgroundColor: color.secondary,
    // marginBottom: fontSize(10),
  },
  status: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: fontSize(5),
    backgroundColor: color.palette.green,
    marginHorizontal: fontSize(4),
    borderRadius: 8,
    padding: fontSize(4),
  },
  statusText: {
    color: color.white,
  },
  dateTimePickerInputStyle: {
    height: 42,
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5,
    backgroundColor: 'red',
  },
  dateText: {
    color: 'black',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: fontSize(16),
    marginRight: fontSize(5),
  },
  contentContainerStyle: {
    paddingBottom: fontSize(20),
    paddingTop: fontSize(640),
  },
  KeyboardAwareScrollViewStyle: {
    width: undefined,
    height: undefined,
    paddingBottom: 50,
    marginTop: 20,
    marginHorizontal: 14,
  },
  fileUpload: {
    borderColor: color.border,
    borderRadius: fontSize(4),
    paddingVertical: fontSize(8),
    paddingHorizontal: fontSize(8),
    borderWidth: 1,
    marginTop: fontSize(8),
    marginBottom: fontSize(15),
  },
  fileView: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    marginHorizontal: fontSize(35),
  },
  mainVaccView: {
    backgroundColor: color.white,
    width: '94%',
    //padding: 10,
    borderRadius: 6,
    marginHorizontal: 2,
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: color.palette.lighterGrey,
    //   flexDirection: 'row',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: fontSize(2),
    },
  },
  vaccSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: fontSize(8),
    marginTop: fontSize(2),
    paddingHorizontal: fontSize(4),
    marginBottom: fontSize(11),
    alignItems: 'center',
  },
  vaccDateView: {
    backgroundColor: color.secondary,
    padding: fontSize(2),
    borderRadius: fontSize(4),
  },
  vaccSection: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  plusIcon: {marginTop: fontSize(4), marginRight: fontSize(9)},
  vaccSubContainer: {
    marginBottom: fontSize(8),
    marginHorizontal: fontSize(8),
  },
  vaccText: {
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.darkGray,
  },
  vaccName: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
  },
  providerText: {
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.darkGray,
  },
  providerName: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(12),
  },
  documentRowContainer: {
    marginHorizontal: fontSize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachLabel: {
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.darkGray,
    paddingRight: 4,
  },
  documentButtonText: {
    marginBottom: fontSize(8),
    marginHorizontal: fontSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    // flexGrow: 1,
    flex: 1,
    // marginHorizontal: fontSize(22),
  },
  noAttachText: {
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.darkGray,
  },
  loaderContainer: {
    marginHorizontal: fontSize(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  noDataText: {
    fontFamily: font.Poppins_SemiBold,
    color: color.palette.darkGray,
    paddingRight: 4,
  },
  viewMore: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: fontSize(8),
    backgroundColor: color.secondary,
  },
  spaceTop: {marginTop: -24},
  fullWidth: {width: '100%'},
  alignList: {alignItems: 'center'},
  iconAreaFirst: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignContentStyle1: {
    flex: 1,
    justifyContent: 'center',
  },
  rightMargeTen: {
    marginRight: 10,
  },
  spaceTopTwenty: {
    marginTop: 20,
  },
  margeBottomTen: {marginBottom: fontSize(12)},
});
