import React from 'react';
import {StyleSheet} from 'react-native';
import {color, fontSize} from '../../theme';

export const styles = StyleSheet.create({
  dialogStyle: {
    alignSelf: 'center',
    width: 'auto',
    borderRadius: fontSize(10),
  },
  contentStyle: {
    width: 'auto',
    height: 'auto',
    paddingBottom: fontSize(10),
  },
  titleStyle: {
    fontSize: fontSize(17),
    fontWeight: 'bold',
  },
  messageStyle: {
    fontSize: fontSize(13),
  },
  messgaeText: {
    fontSize: fontSize(16),
    alignSelf: 'center',
    marginBottom: fontSize(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: fontSize(20),
    // paddingHorizontal: fontSize(10),
  },
  cancelButton: {
    paddingHorizontal: fontSize(10),
    // padding: 5,
    borderWidth: 0.5,
    borderColor: color.palette.lightGrey,
    backgroundColor: color.white1,
    justifyContent: 'center',
    height: fontSize(30),
    alignItems: 'center',
  },
  cancelText: {
    fontSize: fontSize(14),
    color: color.red,
  },
  clearButton: {
    marginLeft: fontSize(15),
    paddingHorizontal: fontSize(10),
    // padding: 5,
    justifyContent: 'center',
    height: fontSize(30),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: color.palette.lightGrey,
    backgroundColor: color.secondaryLight,
  },
  clearText: {
    fontSize: fontSize(14),
    color: color.white,
  },
  okayButton: {
    marginRight: fontSize(15),
    borderWidth: 0.5,
    paddingHorizontal: fontSize(10),
    borderColor: color.palette.lightGrey,
    justifyContent: 'center',
    height: fontSize(30),
    alignItems: 'center',
    backgroundColor: color.secondary,
  },
  okayText: {
    fontSize: fontSize(14),
    color: color.white,
  },
});
