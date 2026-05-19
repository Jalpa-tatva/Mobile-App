import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  StyleSheet,
  Platform,
  ViewStyle,
  ScrollViewProps,
} from "react-native";
import { color, fontSize } from "@app/theme";
import { View } from "react-native";
import { MESSAGE } from "@app/constants";

interface KeyboardProps {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
  containerStyle?: ViewStyle;
  scrollProps?: ScrollViewProps;
  onPress?: () => void;
  from?: string;
}

const RNKeyboardView = ({
  children,
  keyboardVerticalOffset = fontSize(70),
  containerStyle,
  scrollProps,
  onPress,
  from,
}: KeyboardProps) => {
  const [keyboardOffset, setKeyboardOffset] = useState<
    "height" | "padding" | "position"
  >("height");
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardOffset("height");
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(undefined);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      dismissKeyboard();
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS === "ios" ? "padding" : keyboardOffset}
      style={[styles.root, containerStyle]}
    >
      {from && from === MESSAGE.messageDetail ? (
        <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
          <View style={styles.messageWrapper}>{children}</View>
        </TouchableWithoutFeedback>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          {...scrollProps}
        >
          <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default RNKeyboardView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
  messageWrapper: {
    flexGrow: 1,
  },

  content: {
    paddingBottom: 80,
  },
});
