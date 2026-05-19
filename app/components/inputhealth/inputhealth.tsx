import React, { memo, useCallback, useMemo, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { color } from "../../theme/color";
import { styles } from "./InputStyles";

// TextInput.defaultProps.selectionColor = 'black';

interface InputProps {
  onChangeText?: (text: string) => void;
  onBlur?: any;
  onFocus?:any;
  iconPosition?: string;
  icon?: any;
  style?: any;
  value?: string;
  label?: string;
  error?: any;
  mandatory?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  validation?: Function;
  textarea?: boolean;
  multiline?: boolean;
  returnKeyType?: string;
  // ref?:string;
  useRef?: Function;
  isReinitialize?: boolean;
  blurOnSubmit?: boolean;
  onSubmitEditing?: Function;
  numberOfLines?: number;
  maxLength?: number;
  textAlignVertical?: "auto" | "top" | "bottom" | "center";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  isType?: string;
  ref?: any;
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
}

export const InputHealth: React.FC<InputProps> = memo(
  React.forwardRef((props, ref) => {
    const {
      onChangeText,
      onBlur,
      autoFocus,
      editable,
      iconPosition,
      placeholderTextColor,
      icon,
      isType,
      onFocus,
      style,
      value,
      label,
      error,
      mandatory,
      validation,
      isReinitialize,
      ...rest
    } = props;

    const [focused, setFocused] = useState(false);

    const onHFocus = useCallback(() => {
      onFocus?.();
      setFocused(true);
    }, [onFocus]);

    const onOtherFocus = useCallback(() => {
      setFocused(true);
    }, []);

    const borderColor = useMemo(() => {
      if (error) return color.red;
      return focused ? color.secondary : color.border;
    }, [focused, error]);

    const flexDirection = useMemo(() => {
      if (icon && iconPosition === "left") return "row";
      if (icon && iconPosition === "right") return "row-reverse";
      return "column";
    }, [icon, iconPosition]);

    return (
      <View style={styles.inputContainer}>
        {label && (
          <Text style={styles.LableText}>
            {label}
            {mandatory && <Text>*</Text>}
          </Text>
        )}

        <View
          style={
            isType === "DP"
              ? [
                  styles.wrapperDP,
                  { alignItems: icon ? "center" : "baseline" },
                  {
                    borderColor: borderColor,
                    flexDirection: flexDirection,
                  },
                ]
              : [
                  styles.wrapper,
                  { alignItems: icon ? "center" : "baseline" },
                  {
                    borderColor: borderColor,
                    flexDirection: flexDirection,
                  },
                  { height: props.textarea ? 150 : 42 },
                ]
          }
        >
          <View>{icon && icon}</View>

          <TextInput
            style={{ ...styles.textInput, ...style }}
            onChangeText={onChangeText}
            pointerEvents="box-none"
            value={value}
            onFocus={() => {
              isReinitialize ? onHFocus() : onOtherFocus();
            }}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : color.placeholder
            }
            editable={editable}
            autoFocus={autoFocus}
            onBlur={() => {
              setFocused(false);
              validation && validation();
            }}
            selectionColor={color.selectionColor}
            ref={ref}
            autoCapitalize={"none"}
            autoCorrect={false}
            {...rest}
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  })
);
