import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// import external libraries
import Icons from "react-native-vector-icons/Entypo";

// import custom styling, theme & utils
import { color, fontSize } from "@theme/index";
import {
  subContainer,
  view1Style,
  view2Style,
  titleText,
  HeadMainStyle,
  viewRightStyle,
} from "./dialogStyle";
import { notchSpace } from "@app/utils/commonFunction";

/**
 * HeaderProps
 */
export interface HeaderProps {
  title: string;
  rightTitle?: string;
  rightIcon?: string;
  onPressLeft?: () => void;
  onPressRightTitle?: () => void;
  onPressRightIcon?: () => void;
  operation?: "menu" | "back" | "circle-with-cross" | "chevron-left";
}

/**
 * HeaderItem Component
 */
export function HeaderItem(props: HeaderProps) {
  return (
    <View style={[HeadMainStyle, { paddingTop: notchSpace() }]}>
      <View style={[subContainer]}>
        <TouchableOpacity style={view1Style} onPress={props.onPressLeft}>
          <Icons
            name={props?.operation}
            color={color.white}
            size={fontSize(28)}
          />
        </TouchableOpacity>

        <View style={view2Style}>
          <Text style={titleText}>{props.title}</Text>
        </View>

        {props.rightTitle ? (
          <TouchableOpacity
            onPress={props.onPressRightTitle}
            style={viewRightStyle}
          >
            <Text style={titleText}>{props.rightTitle}</Text>
          </TouchableOpacity>
        ) : null}

        {props.rightIcon ? (
          <TouchableOpacity
            style={viewRightStyle}
            onPress={props.onPressRightIcon}
          >
            <Icons
              name={props.rightIcon}
              color={color.white}
              size={fontSize(22)}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
