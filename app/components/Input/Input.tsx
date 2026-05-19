import React, { useState, useCallback, memo, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

// import custom styling & utils
import { fontSize, color } from "@app/theme";
import { styles } from "./styles";
import ShowImage from "../FastImage/ShowImage";
import AntDesign from "react-native-vector-icons/Feather";
import { Image } from "react-native";
/**
 * InputProps Props
 */
interface InputProps {
  onChangeText: (text: string) => void;
  onBlur?: any;
  onFocus?: any;
  iconPosition?: string;
  icon?: any;
  style?: any;
  styleWrapper?: any;
  styleLable?: any;
  value?: string;
  label?: string;
  leftIcon?: string;
  error?: any;
  mandatory?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  validation?: Function;
  dataTestId?: any;
  textarea?: boolean;
  multiline?: boolean;
  returnKeyType?: string;
  leftIconTintColor?: string;
  ref?: any;
  pointerEvents?: "auto" | "none" | "box-none" | "box-only";
  useRef?: Function;
  blurOnSubmit?: boolean;
  onSubmitEditing?: Function;
  numberOfLines?: number;
  maxLength?: number;
  textAlignVertical?: "auto" | "top" | "bottom" | "center";
  selectionColor?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "name-phone-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
  passwordVisible?: boolean;
  onPressPassword?: Function;
  inputContainerStyle?: StyleProp<ViewStyle>;
}
/**
 * Default config
 */
// TextInput.defaultProps.selectionColor = 'black';

/**
 * Input component
 */
//  export function Header(props: HeaderProps) {

export const Input: React.FC<InputProps> = memo(
  React.forwardRef((props, ref) => {
    const {
      onChangeText,
      onBlur,
      autoFocus,
      editable,
      iconPosition,
      placeholderTextColor,
      icon,
      style,
      inputContainerStyle,
      styleLable,
      secureTextEntry,
      passwordVisible,
      onPressPassword,
      value,
      label,
      error,
      mandatory,
      validation,
      leftIcon,
      styleWrapper,
      leftIconTintColor,
      ...rest
    } = props;

    const [focused, setFocused] = useState(false);

    const borderColor = useMemo(() => {
      if (error) return color.red;
      return focused ? color.secondary : color.border;
    }, [focused, error]);

    const renderRightIcon = useCallback(() => {
      return passwordVisible == true || passwordVisible == false ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ paddingEnd: fontSize(10) }}
          onPress={() => onPressPassword()}
        >
          <AntDesign
            size={fontSize(20)}
            name={passwordVisible ? "eye-off" : "eye"}
            color={color.palette.darkGray}
          />
        </TouchableOpacity>
      ) : null;
    }, [secureTextEntry, passwordVisible]);

    return (
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {label && (
          <Text style={{ ...styles.titleLabel, ...styleLable }}>
            {label}
            {mandatory && (
              <Text style={{ ...styles.titleLabel, ...styleLable }}>
                {label}*
              </Text>
            )}
          </Text>
        )}

        <View
          style={[
            styleWrapper
              ? { ...styles.wrapper, ...styleWrapper }
              : styles.wrapper,
            styles.alignContent,
            { borderColor: borderColor },
            { height: props.textarea ? 150 : 42 },
          ]}
        >
          {leftIcon && (
            <Image
              source={leftIcon}
              style={styles.leftIconStyle}
              resizeMode="contain"
              tintColor={props?.leftIconTintColor ?? color.palette.black}
            />
          )}

          <TextInput
            style={[styles.textInput, style]}
            onChangeText={onChangeText}
            pointerEvents="box-none"
            value={value}
            onFocus={() => {
              setFocused(true);
            }}
            placeholderTextColor={
              placeholderTextColor
                ? placeholderTextColor
                : color.palette.lightGrey
            }
            secureTextEntry={secureTextEntry}
            editable={editable}
            autoFocus={autoFocus}
            onBlur={() => {
              setFocused(false);
              validation && validation();
            }}
            selectionColor={color.palette.darkGray}
            ref={ref}
            autoCapitalize={"none"}
            autoCorrect={false}
            {...rest}
          />

          {renderRightIcon()}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  })
);
