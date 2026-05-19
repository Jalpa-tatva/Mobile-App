import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// import external libraries
import MaterialIcons from "react-native-vector-icons/FontAwesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import ShowImage from "@app/components/FastImage/ShowImage";
// import custom function & component

// import custom styling & utils
import {
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  TitleLocation,
  Title,
  RawContainer,
  TextContainer,
  ApprovalWrapper,
} from "./styles";
import { profileStyle } from "../../ProfileStyle";
import { color, fontSize } from "@app/theme";
import { Description } from "../../style";

/**
 * FollowingProps
 */
export interface FollowingProps {
  title: string;
  imageUrl: string;
  location: string;
  date: string;
  description: string;
  onPress: () => void;
  onOpenDetail: Function;
}

/**
 * FollowingItem
 */
export const FollowingItem = memo((props: FollowingProps) => {
  return (
    <View style={profileStyle.followingWrap}>
      {/* only for epionecares will use multi profile category */}
      <TouchableOpacity
        activeOpacity={1}
        style={ApprovalWrapper}
        onPress={props.onPress}
      >
        <MaterialIcons
          name={"edit"}
          size={fontSize(18)}
          color={color.secondary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props?.onOpenDetail()}
        style={RawContainerMain}
      >
        <View style={RawContainer}>
          <View style={ImageContainer}>
            <ShowImage imageStyle={ImageWrapper} url={props.imageUrl} />
          </View>

          <View style={TextContainer}>
            <View style={profileStyle.entireSpace}>
              <Text numberOfLines={2} style={Title}>
                {props.title}
              </Text>
            </View>
            <View style={profileStyle.entireSpace}>
              <Text numberOfLines={2} style={Description}>
                {props.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={profileStyle.bottomWrap}>
          <View style={profileStyle.userLocation}>
            <FontAwesome
              name="map-marker"
              size={fontSize(12)}
              color={color.palette.blackSecondary}
              style={profileStyle.locationIcon}
            />
            <Text numberOfLines={2} style={TitleLocation}>
              {props.location}
            </Text>
          </View>
          {props.date != undefined && (
            <View style={profileStyle.dateWrap}>
              <Text numberOfLines={2} style={profileStyle.dateLbl}>
                {props.date}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
});
