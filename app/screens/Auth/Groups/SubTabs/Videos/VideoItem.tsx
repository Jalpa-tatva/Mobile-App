import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {
  VideoContainer,
  ThumbWrapper,
  VideoTitleWrapper,
  VideoTitle,
  VideoTimeWrapper,
} from "./Style";

export interface videoProps {
  title: string;
  publishedText: string;
  thumbnail: string;
  onPress: () => void;
}
export function VideoItem(props: videoProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={VideoContainer}>
      <Image source={{ uri: props.thumbnail }} style={ThumbWrapper} />

      <View style={VideoTitleWrapper}>
        <Text style={VideoTitle}>{props.title}</Text>
      </View>

      <View style={VideoTimeWrapper}>
        <Text style={VideoTitle}>{props.publishedText}</Text>
      </View>
    </TouchableOpacity>
  );
}
