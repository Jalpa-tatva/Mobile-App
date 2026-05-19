import {showMessage} from 'react-native-flash-message';
import {Alert} from 'react-native';
import {color, fontSize} from '../theme';
import I18n from 'i18n-js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styleConfig from '@app/theme/styleConfig';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';

export interface MessageProps {
  message?: string;
}

export const notchSpace = () => {
  const insets = useSafeAreaInsets();
  const iphoneTopSpace = insets?.top >= 50 ? fontSize(38) : fontSize(30);
  return styleConfig?.isAndroid ? 0 : iphoneTopSpace;
};

export const showInfoMessage = (message): void => {
  showMessage({
    message,
    type: 'info',
    duration: 3000,
  });
};
export const getDeviceTimeZone = () => {
  const deviceTimeZone = RNLocalize.getTimeZone();
  const momentDate = moment.tz(deviceTimeZone);
  const abbreviation = momentDate.tz(deviceTimeZone).format('z');

  switch (true) {
    case abbreviation.includes('+0430'):
      return 'AFT';

    case abbreviation.includes('+0330'):
      return 'IRST';

    case abbreviation.includes('+0545'):
      return 'NPT';

    case abbreviation.includes('+0630'):
      return 'MMT';

    default:
      return abbreviation;
  }
};
export const showErrorMessage = (message): void => {
  showMessage({
    message,
    backgroundColor: color.error,
    color: color.text,
    duration: 1000 * 2,
  });
};

export const showSuccessDocuments = (message): void => {
  showMessage({
    message,
    backgroundColor: color.palette.darkGreen,
    color: color.text,
    duration: 2000,
  });
};

export const showSuccessMessage = (message): void => {
  showMessage({
    message,
    type: 'default',
    backgroundColor: color.palette.darkGreen,
    color: color.text,
    duration: 1000 * 2,
  });
};

export const showErrorAlert = () => {
  Alert.alert(
    I18n.t('AppDrawer.appName'),
    I18n.t('EmptyView.somethingWentWrong'),
    [
      {
        text: 'OK',
        onPress: () => {},
      },
    ],
  );
};
