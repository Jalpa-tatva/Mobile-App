import React from 'react';
import {
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

// import external libraries
import Entypo from 'react-native-vector-icons/Entypo';
import {flatten} from 'ramda';

// Screens types, props & function
import {color, spacing, typography} from '@theme/index';
import {translate} from '@lang/translate';
import {Text} from '../text/text';
import {TextFieldProps} from './text-field.props';

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[2],
  marginHorizontal: spacing[20],
  marginVertical: 3,
  width: '80%',
  backgroundColor: color.palette.white,
};

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.palette.black,
  minHeight: 44,
  fontSize: 18,
  paddingLeft: 5,
  paddingVertical: 5,
  width: '100%',
};

const INPUT_WRAPER: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  backgroundColor: color.palette.white,
  borderColor: '#bdbdbd',
  borderRadius: 5,
  borderWidth: 1,
};

const ERROR_TEXT: TextStyle = {
  fontSize: 14,
  color: color.palette.red,
  fontFamily: typography.primary,
  paddingLeft: 4,
};

const passwordWrapper: TextStyle = {
  position: 'absolute',
  right: 14,
  alignItems: 'center',
  justifyContent: 'center',
};

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: {[name: string]: ViewStyle} = {
  default: {},
};

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    onBlur,
    keyboardType,
    errorText,
    autoCorrect,
    autoCapitalize,
    onChangeText,
    maxLength,
    editable,
    isPasswordEnable,
    secureTextEntry,
    assignRef,
    handlePasswordVisible,
    visibleIcon,
    name,
    ...rest
  } = props;

  const containerStyles = flatten([CONTAINER, PRESETS[preset], styleOverride]);
  const inputStyles = flatten([INPUT, inputStyleOverride]);
  const actualPlaceholder = placeholderTx
    ? translate(placeholderTx)
    : placeholder;

  return (
    <View style={containerStyles}>
      <View style={INPUT_WRAPER}>
        <Text preset="fieldLabel" tx={labelTx} text={label} />
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          autoCorrect={false}
          underlineColorAndroid={color.transparent}
          style={inputStyles}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          ref={component => {
            assignRef && assignRef(component);
          }}
          {...rest}
        />

        {isPasswordEnable ? (
          <TouchableOpacity
            style={passwordWrapper}
            onPress={handlePasswordVisible}>
            <Entypo
              name={visibleIcon}
              size={22}
              color={color.palette.darkGray}
              style={{marginTop: 7}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {errorText ? <Text style={ERROR_TEXT}>{errorText}</Text> : null}
    </View>
  );
}
