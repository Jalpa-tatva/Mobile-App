import {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {TxKeyPath} from '@lang';

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: {[name: string]: ViewStyle} = {
  default: {},
};

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath;

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath;

  /**
   * The label text if no labelTx is provided.
   */
  label?: string;

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS;

  forwardedRef?: any;

  onBlur?: any;

  keyboardType?: KeyboardTypeOptions;

  errorText?: any;

  autoCorrect?: boolean;

  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  onChangeText?: any;

  placeholderTextColor?: any;

  maxLength?: number;

  editable?: any;

  isPasswordEnable?: boolean;

  secureTextEntry?: boolean;

  assignRef?: any;

  handlePasswordVisible?: any;

  visibleIcon?: string;

  name?: string;
}
