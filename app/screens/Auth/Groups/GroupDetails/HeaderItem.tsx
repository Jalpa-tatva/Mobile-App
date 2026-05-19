import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {color, fontSize} from '@theme/index';
import TextTicker from 'react-native-text-ticker';

import {
  subContainer,
  view1Style,
  view2Style,
  titleText,
  HeadMainStyle,
  viewRightStyle,
} from './styles';
import {notchSpace} from '@app/utils/commonFunction';
import {Entypo, MaterialIcons} from '@app/utils/icons/VectorIcons';

export interface HeaderProps {
  title: string;
  rightTitle: string;
  rightIcon: string;
  onPressLeft: () => void;
  onPressRightTitle: () => void;
  onPressRightIcon: () => void;
  operation?: 'menu' | 'back';
}

export function HeaderItem(props: HeaderProps) {
  return (
    <View style={[HeadMainStyle, {paddingTop: notchSpace()}]}>
      <View style={subContainer}>
        {props?.operation === 'menu' ? (
          <TouchableOpacity style={view1Style} onPress={props.onPressLeft}>
            <Entypo name="menu" color={color.white} size={fontSize(28)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={view1Style} onPress={props.onPressLeft}>
            <Entypo
              name="chevron-left"
              color={color.white}
              size={fontSize(28)}
            />
          </TouchableOpacity>
        )}

        <View style={view2Style}>
          <TextTicker
            style={titleText}
            duration={7000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}>
            {props.title}
          </TextTicker>
        </View>

        {props.rightTitle ? (
          <TouchableOpacity
            onPress={props.onPressRightTitle}
            style={viewRightStyle}>
            <Text style={titleText}>{props.rightTitle}</Text>
          </TouchableOpacity>
        ) : null}

        {props.rightIcon ? (
          <TouchableOpacity
            style={viewRightStyle}
            onPress={props.onPressRightIcon}>
            <MaterialIcons
              name={props.rightIcon}
              color={color.white}
              size={fontSize(28)}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
