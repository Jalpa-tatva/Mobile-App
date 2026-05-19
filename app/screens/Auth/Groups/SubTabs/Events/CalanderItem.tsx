import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color, font, fontSize} from '@theme/index';
import moment from 'moment';
import {translate} from '@app/i18n';
import {MaterialIcons} from '@app/utils/icons/VectorIcons';

export interface CalandersProps {
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  userName?: string;
  startDateText?: string;
  index?: string;
  onPress?: Function;
}

export function CalanderItem(props: CalandersProps) {
  const startTime = moment(props?.startDate, 'MMM DD, YYYY, hh:mm a').format(
    'hh:mm A',
  );
  const endTime = moment(props?.endDate, 'MMM DD, YYYY, hh:mm a').format(
    'hh:mm A',
  );
  const endUpdate = moment(props?.endDate, 'MMM DD, YYYY, hh:mm a').format(
    'ddd DD, MMMM YYYY, hh:mm a',
  );
  const extention = moment(props?.endDate, 'MMM DD, YYYY, hh:mm a').format('A');

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => props.onPress()}>
      <View style={styles.eventTime}>
        <Text
          numberOfLines={1}
          style={{...styles.timeLbl, ...styles.startTime}}>
          {startTime}
        </Text>

        <Text numberOfLines={1} style={styles.timeLbl}>
          {endTime}
        </Text>
      </View>

      <View style={styles.subContainer}>
        <View
          style={[
            styles.hightLight,
            {
              backgroundColor:
                extention == 'PM' ? color.pmColor : color.amColor,
            },
          ]}
        />

        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.eventTimeLbl}>
            {props?.title}
          </Text>
          {props?.endDate && (
            <View style={styles.midView}>
              <Text
                numberOfLines={1}
                style={styles.userName}>{`End : ${endUpdate}`}</Text>
            </View>
          )}
          {props?.location != '' && (
            <View style={styles.locatioView}>
              <MaterialIcons
                name="location-on"
                size={fontSize(15)}
                color={color.palette.lightGrey}
              />
              <Text numberOfLines={2} style={styles.locatioLbl}>
                {props.location}
              </Text>
            </View>
          )}
          {props.userName && (
            <View
              style={[
                styles.userWrapper,
                {
                  borderColor:
                    extention == 'PM' ? color.pmColor : color.amColor,
                },
              ]}>
              <Text numberOfLines={1} style={styles.user}>
                {`${translate('TabTitle.By')}${props.userName}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    marginBottom: fontSize(5),
  },
  timeLbl: {
    fontSize: fontSize(10.5),
    fontFamily: font.Poppins_Regular,
    color: color.palette.darkGray,
  },
  eventTime: {
    justifyContent: 'center',
    width: fontSize(65),
    alignItems: 'center',
  },

  startTime: {
    color: color.palette.black,
    paddingVertical: fontSize(0.5),
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    paddingHorizontal: fontSize(10),
    borderTopLeftRadius: fontSize(10),
    borderBottomLeftRadius: fontSize(10),
    paddingVertical: fontSize(10),
  },
  hightLight: {
    width: fontSize(8),
    borderRadius: fontSize(15),
    backgroundColor: '#52cce6',
    marginRight: fontSize(10),
  },
  content: {
    flex: 1,
  },
  eventTimeLbl: {
    fontSize: fontSize(12.5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.black,
  },
  midView: {
    marginBottom: fontSize(1),
  },
  userName: {
    fontSize: fontSize(9.5),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
  },
  locatioView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    left: fontSize(-4),
    marginRight: fontSize(20),
  },
  locatioLbl: {
    fontSize: fontSize(9),
    fontFamily: font.Poppins_Medium,
    color: color.palette.darkGray,
  },
  userWrapper: {
    borderWidth: fontSize(0.5),
    alignSelf: 'flex-start',
    borderColor: color.amColor,
    paddingVertical: fontSize(1),
    paddingHorizontal: fontSize(5),
    borderRadius: fontSize(5),
    marginTop: fontSize(5),
  },
  user: {
    fontSize: fontSize(9),
    fontFamily: font.Poppins_Medium,
    color: color.palette.blackSecondary,
  },
});
