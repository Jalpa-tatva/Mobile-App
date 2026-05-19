import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';

type CustomKeyboardAvoidingViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CustomKeyboardAvoidingView: React.FC<CustomKeyboardAvoidingViewProps> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={StyleSheet.compose(style, {marginBottom: insets.bottom})}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={headerHeight + insets.bottom}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingView;

