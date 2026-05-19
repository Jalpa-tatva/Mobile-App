import { View, Text } from "react-native";
import React, { memo } from "react";
import ShowImage from "@app/components/FastImage/ShowImage";
import { styles } from "./Style";

interface EventMemberProps {
  profileUrl?: string;
  userName?: string;
  index: any;
}
const EventMembers = memo((props: EventMemberProps) => {
  const fullName = props?.userName.split(" ");

  return (
    props?.index < 7 && (
      <View style={styles.recordWrapper}>
        <ShowImage url={props?.profileUrl} imageStyle={styles.imageCal} />
        <View style={styles.titleCal}>
          <Text numberOfLines={1} style={styles.userTitle}>
            {fullName[0]}
          </Text>
          <Text numberOfLines={1} style={styles.userTitle}>
            {fullName[1]}
          </Text>
        </View>
      </View>
    )
  );
});

export default EventMembers;
