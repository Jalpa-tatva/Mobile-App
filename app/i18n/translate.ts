import i18n from 'i18n-js';

/**
 * A translation key path as defined by your locale files.
 * Kept as a string alias so callers document intent while
 * still allowing any valid i18n key.
 */
export type TxKeyPath = string;

/**
 * Translates text using the configured i18n instance.
 *
 * @param key The i18n key.
 * @param options Optional interpolation / configuration options.
 */
export function translate(key: TxKeyPath, options?: Record<string, unknown>) {
  return key ? i18n.t(key, options) : null;
}
