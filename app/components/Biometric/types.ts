export type BiometryType = "TouchID" | "FaceID" | "Biometrics" | null;

export type BiometricAvailability = {
  available: boolean;
  biometryType: BiometryType;
};

export type permissionsOption = {
  available: boolean;
};

export type BiometricUser = {
  asked: boolean;
  enabled: boolean;
  user: any;
};

export type BiometricStore = {
  biometricUsers: Record<string, BiometricUser>;
};

export const KEYCHAIN_SERVICES = {
  BIOMETRIC_USERS: "biometric_users",
  AUTH_TOKEN: "auth_token",
  USER_IDENTIFIER: "user_identifier",
  LAST_USER_LOGIN: "last_user_login",
};

export type BiometricPromptStrings = {
  title?: string;
  iosSubtitle?: string;
  androidSubtitle?: string;
  cancelLabel?: string;
};

export type UserDetails = {
  available?: boolean;
  email: string;
  password: string;
  user_name: string;
  user_id: string;
  device_id: string;
  platform: string;
};
