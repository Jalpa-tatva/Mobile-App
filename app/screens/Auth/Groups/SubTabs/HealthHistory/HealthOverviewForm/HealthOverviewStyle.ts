import {StyleSheet} from 'react-native';
import {color, fontSize} from '@app/theme';

export const stylesHealthOverview = StyleSheet.create({
  root: {
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: fontSize(2)},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: color.white,
    borderRadius: 10,
  },
  container: {
    paddingBottom: 20,
  },
  sectionTitle: {
    marginTop: fontSize(15),
    fontWeight: 'bold',
    marginHorizontal: fontSize(15),
    fontSize: fontSize(16),
  },
  section: {
    marginTop: fontSize(8),
    marginHorizontal: fontSize(8),
    borderWidth: 2,
    borderRadius: fontSize(10),
    borderColor: color.palette.lightGrey,
    backgroundColor: color.white,
    paddingVertical: fontSize(5),
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: fontSize(5),
  },
  input: {
    width: fontSize(80),
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
    marginVertical: fontSize(15),
    // width: "50%",
    alignItems: 'center',
  },
  button: {
    borderRadius: fontSize(4),
    height: fontSize(45),
    width: '90%',
    marginTop: fontSize(20),
    backgroundColor: color.secondary,
  },
  status: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: fontSize(5),
    backgroundColor: color.palette.green,
    marginHorizontal: fontSize(10),
    borderRadius: 8,
    padding: fontSize(5),
  },
  statusText: {
    color: color.white,
  },
  dateTimePickerInputStyle: {
    flex: 1,
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
});
