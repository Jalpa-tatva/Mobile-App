import * as React from 'react';
import {ActivityIndicator, Pressable, TouchableOpacity} from 'react-native';
import {Text} from '../text/text';
import {viewPresets, textPresets} from './button.presets';
import {ButtonProps} from './button.props';
import {flatten} from 'ramda';
import {color} from '@app/theme';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disabled,
    isLoader,
    onPress,
    ...rest
  } = props;

  const viewStyle = viewPresets[preset] || viewPresets.primary;
  const viewStyles = flatten([viewStyle, styleOverride]);
  const textStyle = textPresets[preset] || textPresets.primary;
  const textStyles = flatten([textStyle, textStyleOverride]);

  const content = children || <Text tx={tx} text={text} style={textStyles} />;

  return (
    //   <Pressable style={viewStyles} {...rest} onPress={onPress}  disabled={isLoader}>
    //   {({ pressed }) => (
    //   //  <Text>{content}</Text>
    //   isLoader?<Text>Preesedd</Text>:<Text>Preess</Text>

    //   )}
    // </Pressable>
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      disabled={isLoader}
      style={viewStyles}
      {...rest}>
      {isLoader ? (
        <ActivityIndicator
          color={color.palette.white}
          animating={true}
          size={'large'}
        />
      ) : (
        <Text>{content}</Text>
      )}
    </TouchableOpacity>
  );
}
