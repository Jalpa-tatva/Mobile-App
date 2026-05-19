import {color, font, fontSize} from '@app/theme';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor:color.white
  },
  body:{
    flex:1,
    width:'100%',
    backgroundColor:color.white
  },
  searchCal: {
    backgroundColor: color.searchBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: fontSize(10),
    paddingVertical: fontSize(4),
    borderRadius: fontSize(20),
    marginHorizontal: 10,
  },
  listing:{
    flex:1,
    paddingBottom:fontSize(20)
  },
  subSearchCal: {
    backgroundColor: color.secondary,
    paddingBottom: fontSize(10),
    paddingTop: fontSize(10),
  },
  inputStyle: {
    flex: 1,
    marginLeft: fontSize(10),
    fontSize: fontSize(13),
    alignItems: 'center',
    fontFamily: font.Poppins_Medium,
    top:2
  },
});
