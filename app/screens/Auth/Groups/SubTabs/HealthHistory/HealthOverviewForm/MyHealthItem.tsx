import React from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {RawContainerMain, Title, TextContainer} from './myHealthStyles';
import {fontSize, color} from '@app/theme';
import {ElementIcon} from '@app/utils/icons/VectorIcons';
import {HoStyles} from './healthStyle';

export interface MyHealthProps {
  id: number;
  selected: string;
  title: string;
  onPress: Function;
}

export function MyHealthItem(props: MyHealthProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[RawContainerMain]}>
        {props.selected == 'true' ? (
          <View style={HoStyles.iconAreaFirst}>
            <ElementIcon
              color={color.secondary}
              name="check-box"
              type="materialicons "
              size={fontSize(24)}
              onPress={props.onPress}
            />
          </View>
        ) : (
          <View style={HoStyles.iconAreaFirst}>
            <ElementIcon
              color={color.placeholder}
              name="check-box-outline-blank"
              type="materialicons "
              size={fontSize(24)}
              onPress={props.onPress}
            />
          </View>
        )}

        <View style={TextContainer}>
          <View style={HoStyles.fullFlex}>
            <Text numberOfLines={4} style={Title}>
              {props.title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
