import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { color, fontSize } from "@app/theme";
import ShowImage from "@app/components/FastImage/ShowImage";

import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  ApprovalWrapper,
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  TitleLocation,
  Title,
  RawContainer,
  TextContainer,
} from "./Style";
import { profileStyle } from "../../ProfileStyle";
import { Description } from "../../style";
import PersonAdd from "../../../../../../assets/svg/PersonAdd";
import { FontAwesome } from "@app/utils/icons/VectorIcons";

type ConnectionProps = Readonly<{
  title: string;
  imageUrl: string;
  location: string | boolean;
  date: string;
  description: string;
  isActiveMember: string;
  isPendingMember: string;
  onPressAddFriend?: () => void;
  onPressRemoveFriend?: () => void;
  onPressCancelFriend?: () => void;
  onPress?: () => void;
}>;

export function ConnectionItem(props: ConnectionProps) {
  return (
    <View style={profileStyle.followingWrap}>
      {props.isActiveMember == "false" && props.isPendingMember == "false" ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={props.onPressAddFriend}
          style={ApprovalWrapper}
        >
          <Icon
            name="person-add-sharp"
            size={fontSize(20)}
            color={color.white}
          />
        </TouchableOpacity>
      ) : null}
      {props.isActiveMember == "true" && props.isPendingMember == "false" ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={props.onPressRemoveFriend}
          style={ApprovalWrapper}
        >
          {/* <Text style={TitleApproval}>
              {I18n.t('Userprofile.removeFriends')}
            </Text> */}
          <PersonAdd width={fontSize(14)} height={fontSize(14)} />
        </TouchableOpacity>
      ) : null}

      {props.isPendingMember == "true" ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={props.onPressCancelFriend}
          style={ApprovalWrapper}
        >
          <MaterialIcons
            name="pending-actions"
            size={fontSize(20)}
            color={color.white}
          />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={props.onPress} style={RawContainerMain}>
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
          {props.location && (
            <View style={profileStyle.userLocation}>
              <FontAwesome
                name="map-marker"
                size={fontSize(13)}
                color={color.palette.blackSecondary}
              />
              <Text numberOfLines={1} style={TitleLocation}>
                {props.location}
              </Text>
            </View>
          )}
          {props.date != undefined && (
            <View style={profileStyle.dateWrap}>
              <MaterialIcons
                name="calendar-today"
                size={fontSize(13)}
                color={color.palette.blackSecondary}
              />
              <Text numberOfLines={2} style={profileStyle.dateLbl}>
                {props.date}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
