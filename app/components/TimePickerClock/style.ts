import {color, font, fontSize} from '@app/theme';
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
const CLOCK_SIZE = width * 0.7;
const CLOCK_RADIUS = CLOCK_SIZE / 2;
const POINTER_LENGTH = CLOCK_RADIUS * 1.42;

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF', justifyContent: 'center'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: fontSize(20),
    backgroundColor: color.secondary,
    borderTopRightRadius: fontSize(10),
    borderTopLeftRadius: fontSize(10),
  },
  selectTimeWrap: {
    paddingLeft: fontSize(20),
    marginTop: fontSize(13),
    padding:fontSize(2)
  },
  selectTimeTxt: {
    fontFamily: font.Poppins_Medium,
    color: color.secondary,
    fontSize:fontSize(13)
  },
  selectedActionTxt: {
    color: color.white,
  },
  selectedWrap: {
    color: color.secondary,
    fontSize: fontSize(15),
    top: 1,
  },
  timeSelection: {
    backgroundColor: color.white,
    color: color.secondary,
    borderRadius: fontSize(5),
    width: fontSize(30),
    height: fontSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: color.secondary,
  },
  minuteWrap: {
    marginLeft: fontSize(10),
  },
  hrWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModal: {
    width: '90%',
    backgroundColor: color.white,
    borderRadius: fontSize(10),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: fontSize(16),
    fontFamily: font.Poppins_SemiBold,
    color: color.white,
  },
  amPm: {
    fontSize: fontSize(15),
    fontFamily: font.Poppins_SemiBold,
    marginHorizontal: fontSize(5),
    color: color.white,
  },
  activeAmPm: {
    color: color.secondary,
    backgroundColor: color.white,
    padding: 5,
    borderRadius: fontSize(5),
  },
  clockFace: {
    width: CLOCK_SIZE,
    height: CLOCK_SIZE,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: CLOCK_RADIUS,
    backgroundColor: '#F0F0F0',
    position: 'relative',
    marginTop: fontSize(30),
    marginBottom: fontSize(20),
    // margin: fontSize(20),
  },
  hourContainer: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 30/2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:999
  },
  selectedHour: {backgroundColor: color.secondary},
  hourText: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
  },
  pointer: {
    position: 'absolute',
    width: 4,
    height: POINTER_LENGTH,
    backgroundColor: '#F0F0F0',
    left: CLOCK_RADIUS - 2,
    top: (CLOCK_RADIUS + 20) - POINTER_LENGTH,
  },
  pointerChild: {
    // position: 'absolute',
    // width: 4,
    alignItems: 'center',
    height: POINTER_LENGTH / 2.05,
    backgroundColor: '#F0F0F0',
    // backgroundColor: 'red',
    borderWidth: 0,
    borderColor: '#F0F0F0',
    bottom: 3,
    // left: CLOCK_RADIUS - 5,
    // top: (CLOCK_RADIUS*5),
  },
  circleTime: {
    width: 10,
    height: 10,
    borderRadius: fontSize(10 / 2),
    backgroundColor: color.secondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: fontSize(20),
  },
  footerText: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_SemiBold,
    color: color.secondary,
  },
});
