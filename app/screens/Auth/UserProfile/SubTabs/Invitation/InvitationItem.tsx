import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// import custom styling & utils
import {
  ApprovalWrapper,
  TitleApproval,
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  TitleLocation,
  Title,
  RawContainer,
  TextContainer,
  Description,
} from "./Styles";
import ShowImage from "@app/components/FastImage/ShowImage";
import { profileStyle } from "../../ProfileStyle";
import { color, fontSize } from "@app/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { translate } from "@app/i18n";

/**
 * InvitationItem Props
 */
export interface InvitationProps {
  title: string;
  imageUrl: string;
  country: string;
  category: string;
  location: string;
  date: string;
  description: string;
  onPressRequestAccept: () => void;
}

/**
 * InvitationItem component
 */
export const InvitationItem = memo((props: InvitationProps) => {
  return (
    <View style={profileStyle.followingWrap}>
      {/* <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPressRequestAccept}
        style={ApprovalWrapper}>
        <FontAwesome
          name="group"
          size={fontSize(18)}
          color={color.palette.green}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPressRequestAccept}
        style={ApprovalWrapper}
      >
        <Text style={TitleApproval}>
          {translate("groupDetails.NeedApproval")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={RawContainerMain}>
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
            />
            <Text numberOfLines={1} style={TitleLocation}>
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
