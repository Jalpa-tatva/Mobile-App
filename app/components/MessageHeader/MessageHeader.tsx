import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";

// import external libraries
import Icons from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

// import custom styling & utils

import {
  MainContainer,
  SubContainer,
  LeftContainer,
  CenterContainer,
  CenterText,
  SearchContainer,
  SearchTextInput,
  Style,
  RightContainer,
} from "./styles";
import { Text } from "../text/text";
import { color, fontSize } from "@app/theme";
import ShowImage from "../FastImage/ShowImage";
import { notchSpace } from "@app/utils/commonFunction";

/**
 * Header Props
 */
export interface HeaderProps {
  title?: string;
  icon?: string;
  iconRight?: string;
  iconRightother?: string;
  searchTextplaceholder?: string;
  searchText?: string;
  onPressLeft?: () => void;
  onPressRight?: Function;
  onPressRightOther?: () => void;
  onChangeText?: () => void;
  onPressCross?: () => void;
  isOpen?: boolean;
  other?: boolean;
  titleStyle?: any;
  containerStyle?: any;
  leftContainerStyle?: any;
  leftImage?: any;
}

/**
 * Header component
 */
export function MessageHeader(props: HeaderProps) {
  return (
    <View style={[MainContainer, { paddingTop: notchSpace() }]}>
      {props.isOpen ? (
        <View style={SearchContainer}>
          <TextInput
            placeholder={props.searchTextplaceholder}
            placeholderTextColor={color.white}
            returnKeyType="default"
            style={SearchTextInput}
            onChangeText={props.onChangeText}
            selectionColor={color.selectionColor}
            value={props.searchText}
            autoCorrect={false}
            autoCapitalize="none"
          />

          {props.searchText != "" ? (
            <Entypo
              name={"circle-with-cross"}
              size={fontSize(20)}
              style={{ marginRight: 10 }}
              color={color.secondary}
              onPress={props.onPressCross}
            />
          ) : null}
        </View>
      ) : (
        <View style={SubContainer}>
          <TouchableOpacity style={LeftContainer} onPress={props.onPressLeft}>
            <Icons name={props.icon} color={color.white} size={fontSize(28)} />
          </TouchableOpacity>

          <View style={CenterContainer}>
            <View style={Style.imageCalStyle}>
              <ShowImage url={props?.leftImage} imageStyle={Style.imageStyle} />
            </View>
            <Text numberOfLines={2} style={CenterText}>
              {props.title}
            </Text>
          </View>

          <View style={RightContainer}>
            {props.other ? (
              <TouchableOpacity
                style={LeftContainer}
                onPress={props.onPressRightOther}
              >
                {props?.iconRightother == "search-circle" ? (
                  <Ionicons
                    name={props.iconRightother}
                    color={color.white}
                    size={fontSize(28)}
                  />
                ) : (
                  <FontAwesome
                    name={props.iconRightother}
                    color={color.white}
                    size={fontSize(22)}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
}
