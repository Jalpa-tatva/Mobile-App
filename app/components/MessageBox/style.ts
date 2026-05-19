import {color, font, fontSize} from '@app/theme';
import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  mainView: {
    backgroundColor: color.secondary,
    position: 'absolute',
    right: fontSize(10),
    top: fontSize(60),
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
    borderRadius:fontSize(10)
  },
  iconView: {
    width: fontSize(27),
    justifyContent: 'center',
    alignItems:'center',
  },
  title: {
    fontSize: fontSize(12),
    fontFamily: font.Poppins_Medium,
    paddingLeft: fontSize(10),
    color: color.white,
  },
  subCal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: fontSize(5),
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
