import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";

// import external libraries
import Icons from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// import custom styling & utils

import {
  MainContainer,
  SubContainer,
  LeftContainer,
  CenterContainer,
  CenterText,
  SearchContainer,
  SearchTextInput,
} from "./style";
import { Text } from "../text/text";
import { color, fontSize } from "@app/theme";
import styleConfig from "@app/theme/styleConfig";
import { Option } from "../../../assets/svg/Option";

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
  onPressRight?: () => void;
  onPressRightOther?: () => void;
  onChangeText?: () => void;
  onPressCross?: () => void;
  isOpen?: boolean;
  other?: boolean;
}

/**
 * Header component
 */
export function Header(props: HeaderProps) {
  const insets = useSafeAreaInsets();
  const iphoneTopSpace = insets?.top >= 50 ? fontSize(34) : fontSize(28);
  const spaceTop = styleConfig?.isAndroid ? 0 : iphoneTopSpace;

  return (
    <View style={[MainContainer, { paddingTop: spaceTop }]}>
      {props.isOpen ? (
        <View style={SearchContainer}>
          <TextInput
            placeholder={props.searchTextplaceholder}
            placeholderTextColor={color.white}
            returnKeyType="default"
            style={SearchTextInput}
            onChangeText={props.onChangeText}
            selectionColor={color.palette.white}
            value={props.searchText}
            autoCorrect={false}
            autoCapitalize="none"
          />

          {props.searchText != "" ? (
            <Icons
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
            <Text numberOfLines={2} style={CenterText}>
              {props.title}
            </Text>
          </View>
          {props.iconRight ? (
            <TouchableOpacity
              style={LeftContainer}
              onPress={props.onPressRight}
            >
              {props?.iconRight === "options" ? (
                <Option />
              ) : (
                <Icons
                  name={props.iconRight}
                  color={color.white}
                  size={fontSize(22)}
                />
              )}
            </TouchableOpacity>
          ) : null}

          {props.other ? (
            <TouchableOpacity
              style={LeftContainer}
              onPress={props.onPressRightOther}
            >
              <FontAwesome
                name={props.iconRightother}
                color={color.white}
                size={fontSize(22)}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
}
