import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';

const en = require('./en');

I18n.fallbacks = true;
I18n.translations = {en};

const fallback = {languageTag: 'en', isRTL: false};

const {languageTag} =
  RNLocalize.findBestLanguageTag(Object.keys(I18n.translations)) ||
  fallback;
I18n.locale = languageTag;
export default I18n;
