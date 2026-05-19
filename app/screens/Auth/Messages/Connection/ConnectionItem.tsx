import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

// import custom styling & utils
import {
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  Title,
  RawContainer,
  TextContainer,
  Style,
} from "./Style";

/**
 * ConnectionItem Props
 */
type ConnectionProps = Readonly<{
  title?: string;
  image200Url?: string;
  onPress: () => void;
}>;

/**
 * ConnectionItem component
 */
export function ConnectionItem(props: ConnectionProps) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={RawContainerMain}>
        <View style={RawContainer}>
          <View style={ImageContainer}>
            <Image style={ImageWrapper} source={{ uri: props.image200Url }} />
          </View>

          <View style={TextContainer}>
            <View style={Style.fullFlex}>
              <Text numberOfLines={4} style={Title}>
                {props.title}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
