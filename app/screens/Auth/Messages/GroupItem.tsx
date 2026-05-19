import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// External libraries
import moment from "moment";
import Animated from "react-native-reanimated";

// Components & styles
import ShowImage from "@app/components/FastImage/ShowImage";
import { styles } from "./Styles";

/*
  GroupsProps
*/
type GroupProps = Readonly<{
  title: string;
  description?: string | boolean;
  status?: string | boolean;
  imageUrl: string;
  onPress?: Function;
  dateTime?: string;
}>;

/*
  GroupItem Component
*/
export function GroupItem(props: GroupProps) {
  const [lastMsgDate, setLastMsgDate] = useState(null);

  useEffect(() => {
    const timestampDate = new Date(parseInt(props.dateTime));
    const currentDate = new Date();
    const differenceInTime = Number(currentDate) - Number(timestampDate);
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    let dateUpdate = moment(Number(props.dateTime)).format("DD/MM/YY");
    let todayTime = moment(Number(props.dateTime)).format("h:mm a");

    if (differenceInDays == 1) {
      setLastMsgDate("Yesterday");
    } else if (differenceInDays == 0) {
      setLastMsgDate(todayTime);
    } else {
      setLastMsgDate(dateUpdate);
    }
  }, []);

  return (
    <Animated.View style={[styles.mainContainerStyle]}>
      {/* <Animated.View style={[styles.mainContainerStyle, r1Style]}> */}
      <TouchableOpacity
        // style={styles.mainContainerStyle}
        onPress={() => props.onPress()}
      >
        {/* <View style={styles.sub1ContainerStyle}>
        <View style={styles.imageStyle}>
          <View style={styles.ImageBg}>
            <ShowImage
              url={props.imageUrl}
              imageStyle={styles.profileStyle}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.titleStyle}>
          <View style={styles.topWrapper}>
            <Text
              numberOfLines={1}
              style={[
                styles.textStyle,
                (!props.description || !props?.status) && styles.addTopSpace,
              ]}>
              {props.title}
            </Text>
            {props.dateTime && (
              <Text numberOfLines={2} style={styles.timeStyle}>
                {props.dateTime && lastMsgDate}
              </Text>
            )}
          </View>
          {props.description || props.count || props?.status ? (
            <View style={styles.detailWrapper}>
              <Text numberOfLines={2} style={styles.text1Style}>
                {props.description ? props.description : props?.status}
              </Text>

              {props.count ? (
                <View style={styles.countContainer}>
                  <View style={styles.countView}>
                    <Text style={styles.countTxtStyle}>{'5'}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </View> */}
        <View style={styles.subWrapper}>
          <View style={styles.ImageBg}>
            <ShowImage
              url={props.imageUrl}
              imageStyle={styles.profileStyle}
              resizeMode="cover"
            />
          </View>
          <View style={styles.detailBox}>
            <View style={styles.userNamebox}>
              <Text numberOfLines={1} style={styles.userName}>
                {props.title}
              </Text>

              {props.dateTime != undefined && (
                <View style={styles.dateTimeBox}>
                  <Text style={styles.dateTime}>{lastMsgDate}</Text>
                </View>
              )}
            </View>
            {props.description && (
              <View style={styles.userDetailWrap}>
                <Text style={styles.userDetail} numberOfLines={1}>
                  {props.description}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
