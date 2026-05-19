import I18n from "i18n-js";
import React, { memo } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { bleDevices } from "../../../../../../../assets/images";

import {
  RawContainerMainItem,
  RawContainer,
  ImageWrapper,
  TextContainer,
  Title,
  TitleLocation,
  TitleUpdate,
} from "./Style";

export interface MonitoringProps {
  id: number | string;
  key: number | string;
  userName?: string;
  title?: string;
  value?: string;
}

export const MonitoringItem = memo((props: MonitoringProps) => {
  return (
    <TouchableOpacity style={RawContainerMainItem}>
      <View style={RawContainer}>
        <Image
          source={bleDevices.spoMachine}
          style={ImageWrapper}
          resizeMode="stretch"
        />

        <View style={TextContainer}>
          <Text style={Title}>{props.title}</Text>

          <Text style={TitleUpdate}>
            {I18n.t("monitoring.Addedby")} {props.userName}
          </Text>
          <Text style={TitleLocation}>{props.value}</Text>
        </View>

        <View></View>
      </View>
    </TouchableOpacity>
  );
});
