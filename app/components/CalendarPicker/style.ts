import {color, font, fontSize} from '@app/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerMain: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectDateTxt: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_Medium,
    color: color.white,
  },
  currentDateHighlight:{
    backgroundColor: '#d3d3d3', 
  },
  dateWrapper: {
    backgroundColor: color.secondary,
    paddingHorizontal: 16,
    // paddingTop: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  calendarModal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: fontSize(20),
    // marginBottom: 16,
  },
  selectedDate: {
    marginBottom: fontSize(6),
    marginTop: fontSize(2),
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: fontSize(20),
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderRadius: 8,
    padding: 8,
    // width: '48%',
    borderColor: '#fff',
  },
  padEnd : {
    flex:2,
    marginRight:fontSize(5)
  },
  padStart : {
    marginLeft:fontSize(5),
    flex:1.5,
  },
  pickerText: {
    fontSize: fontSize(16),
    marginHorizontal: fontSize(10),
    fontFamily: font.Poppins_Medium,
    color: '#fff',
    flex: 1,
  },
  dropdown: {
    maxHeight: 200,
    backgroundColor: '#fff',
    alignSelf: 'center',

    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowColor: '#E2E8F0',
    elevation: 2,
    borderColor: '#E2E8F0',
    borderBottomWidth: 1,
  },
  option: {padding: 12, paddingLeft: 16},
  selectedOption: {backgroundColor: '#ddd', paddingLeft: 16},
  optionText: {
    fontSize: fontSize(15),
    fontFamily: font.Poppins_Regular,
    color: color.palette.black,
  },
  selectedOptionText: {
    fontSize: fontSize(15),
    fontFamily: font.Poppins_Bold,
    color: color.palette.black,
  },
  calendar: {marginTop: 16, padding: 16},
  weekDays: {flexDirection: 'row', marginBottom: 8},
  weekDayContainer: {flex: 1, alignItems: 'center'},
  weekDayText: {
    fontSize: fontSize(11.5),
    marginHorizontal: fontSize(6),
    fontFamily: font.Poppins_SemiBold,
    color: '#444',
  },
  dateBox: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 25,
  },
  todayBox: {backgroundColor: '#FF7F50'},
  selectedDateBox: {backgroundColor: color.secondary},
  disabledDateBox: {backgroundColor: '#e0e0e0'},
  dateText: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_Regular,
    color: color.palette.black,
    // textAlign: 'center',
    top:fontSize(1.1)
  },
  todayText: {
    fontSize: fontSize(14),
    fontFamily: 'Inter-Regular',
    color: '#fff',
    textAlign: 'center',
  },
  selectedDateText: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_Regular,
    color: color.palette.offWhite,
    // textAlign: 'center',
  },
  disabledDateText: {
    fontSize: fontSize(13),
    fontFamily: font.Poppins_Regular,
    color: '#a0a0a0',
  },
  title: {
    fontSize: fontSize(16),
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
});
