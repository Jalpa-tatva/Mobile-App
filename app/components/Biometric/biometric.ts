import { Platform } from "react-native";

// Import the external libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";
import { BiometricAvailability, KEYCHAIN_SERVICES, UserDetails } from "./types";
import * as Keychain from "react-native-keychain";
import { translate } from "@app/i18n";

export const BIOMETRIC_PROMPT_KEY = "@biometric_prompt_shown";

const biometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
const BIOMETRIC_SERVICE_PREFIX = "com.concursive.epionecares";
const IOS_BIOMETRY_LOCKED_OUT_CODE = -8;

const isBiometryLockedOutError = (error: unknown): boolean => {
  if (error == null) return false;
  const err = error as { code?: number; message?: string };
  if (err.code === IOS_BIOMETRY_LOCKED_OUT_CODE) return true;
  if (
    typeof err.message === "string" &&
    /biometry is locked out/i.test(err.message)
  )
    return true;
  return false;
};

export const checkBiometricAvailability = async (): Promise<BiometricAvailability> => {
  try {
    const { available, biometryType } = await biometrics.isSensorAvailable();

    return {
      available: Boolean(available),
      biometryType: biometryType ?? null,
    };
  } catch (error) {
    if (Platform.OS === "ios" && isBiometryLockedOutError(error)) {
      return {
        available: true,
        biometryType: null,
      };
    }
    return { available: false, biometryType: null };
  }
};

export const saveUserIdentifier = async (identifier: UserDetails) => {
  try {
    await Keychain.setGenericPassword(
      KEYCHAIN_SERVICES?.LAST_USER_LOGIN,
      JSON.stringify(identifier),
      {
        service: KEYCHAIN_SERVICES.USER_IDENTIFIER,
      }
    );
  } catch (error) {
    console.log("Keychain save error", error);
  }
};

export const createPublicKey = async () => {
  const publicKey = await biometrics.createKeys();
  return publicKey;
};

export const getAllBiometricUsers = async (email?: string) => {
  if (!email) return null;
  try {
    const creds = await Keychain.getGenericPassword({
      service: getBiometricService(email),
    });

    if (!creds) return null;

    return JSON.parse(creds.password);
  } catch (error) {
    console.log("getAllBiometricUsers error", error);
    return null;
  }
};

export const biometricPermission = async (
  available: boolean,
  email: string,
  password: string,
  user_name: string,
  user_id: string,
  device_id: string,
  platform: string,
  title?: string,
  asked?: boolean
): Promise<boolean | "lock" | "cancel"> => {
  if (!available) return false;

  // Already asked → just store credentials
  if (asked) {
    await saveCredentials(
      email,
      password,
      user_name,
      user_id,
      device_id,
      platform
    );
    return true;
  }

  try {
    const permissionAsk = await biometrics.simplePrompt({
      promptMessage:
        title ?? "Would you like to use biometric authentication for login?",
    });

    if (permissionAsk?.success) {
      await saveCredentials(
        email,
        password,
        user_name,
        user_id,
        device_id,
        platform
      );
      return true;
    }
    if (!permissionAsk?.success) {
      const existingStore = await getAllBiometricUsers(email);
      saveotherUserDetail(existingStore, email);
      return "cancel";
    }

    //  User cancelled / denied (NOT locked)
  } catch (error: any) {
    console.log("error", error);
    return "lock";
  }
};

export const saveotherUserDetail = async (
  existingStore: any,
  email: string,
  status?: boolean
) => {
  if (!email) return false;

  let updatedStore: any;

  // 🆕 Case 1: User does NOT exist → create user
  if (!existingStore?.users?.[email]) {
    updatedStore = {
      ...existingStore,
      users: {
        ...existingStore?.users,
        [email]: {
          biometric: {
            asked: true,
            enabled: status,
          },
        },
      },
    };
  }
  // ✏️ Case 2: User already exists → update user
  else {
    try {
      updatedStore = {
        ...existingStore,
        users: {
          ...existingStore.users,
          [email]: {
            ...existingStore.users[email],
            biometric: {
              ...existingStore.users[email].biometric,
              asked: true,
              enabled: status,
            },
          },
        },
      };
    } catch (error) {
      console.log("error are point", error);
    }
  }

  await Keychain.setGenericPassword(
    KEYCHAIN_SERVICES.BIOMETRIC_USERS,
    JSON.stringify(updatedStore),
    {
      service: getBiometricService(email),
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    }
  );

  return true;
};

export const verifyBiometric = async (
  public_key: string,
  user_id: string,
  email: string
) => {
  const { user } = await getUserCredentials(email);

  if (user?.public_key == public_key) {
    // as of now static flow, we compare the stored public_key from keychain with database key
    if (!user?.email) return null;

    const status = await biometricPermission(
      user?.biometric?.enabled,
      user?.email,
      user?.password,
      user?.user_name,
      user?.user_id,
      user?.device_id,
      user?.platform,
      translate("BIOMETRIC.AUTH_PROMPT"),
      false
    );

    return status;
  } else return null;
};

export const createPublicKeyIfNeeded = async () => {
  const { keysExist } = await biometrics.biometricKeysExist();

  if (keysExist) {
    return null;
  }

  const result = await biometrics.createKeys();
  return result.publicKey;
};

const getBiometricService = (identity: string): string =>
  `${BIOMETRIC_SERVICE_PREFIX}_${identity}`;

export const saveCredentials = async (
  email: string,
  password: string,
  user_name: string,
  user_id: string,
  device_id: string,
  platform: string
) => {
  try {
    let store = { users: {} as Record<string, any> };
    let publicKey: any;

    // Always read using SAME service
    const existingCreds: any = await Keychain.getGenericPassword({
      service: getBiometricService(email),
    });

    if (existingCreds?.password) {
      store = JSON.parse(existingCreds.password);

      //  reuse public key if same user exists
      publicKey = store.users?.[email]?.public_key;
    }

    // create public key only once per user
    if (!publicKey) {
      publicKey = await createPublicKeyIfNeeded();
    }

    // merge new user without removing others
    store.users[email] = {
      email,
      password,
      user_name,
      user_id,
      device_id,
      platform,
      public_key: publicKey,
      biometric: {
        asked: true,
        enabled: true,
      },
    };

    //  save back
    await Keychain.setGenericPassword(
      KEYCHAIN_SERVICES.BIOMETRIC_USERS,
      JSON.stringify(store),
      {
        service: getBiometricService(email),
        accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      }
    );
  } catch (error) {
    console.log("error while store user credential", error);
  }
};
export const removeBiometric = async (email: string) => {
  if (!email) return null;
  await biometrics.deleteKeys();
  const existingStore = await getAllBiometricUsers(email);

  if (!existingStore?.users?.[email]) {
    return null;
  }

  const updatedStore = {
    ...existingStore,
    users: {
      ...existingStore.users,
      [email]: {
        // keep ONLY biometric object
        biometric: {
          asked: true,
          enabled: false,
        },
      },
    },
  };

  // save updated store
  await Keychain.setGenericPassword(
    KEYCHAIN_SERVICES.BIOMETRIC_USERS,
    JSON.stringify(updatedStore),
    {
      service: getBiometricService(email),
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    }
  );

  return true;
};

export const hasShownBiometricPrompt = async (
  email: string
): Promise<boolean> => {
  const value = await AsyncStorage.getItem(`${BIOMETRIC_PROMPT_KEY}_${email}`);
  return value === "true";
};

export const setBiometricPromptShown = async (email: string) => {
  if (!email) return;
  await AsyncStorage.setItem(`${BIOMETRIC_PROMPT_KEY}_${email}`, "true");
};

export const getUserCredentials = async (user_id?: string) => {
  const creds = await Keychain.getGenericPassword({
    service: user_id ? getBiometricService(user_id) : undefined,
  });

  // default return response
  const defaultResponse = {
    user: null,
    userList: {} as Record<string, any>,
  };

  if (!creds) {
    return defaultResponse;
  }

  const store = JSON.parse(creds.password);
  console.log("Stored user details", user_id, store, store.users?.[user_id]);

  return {
    user: user_id ? store.users?.[user_id] ?? null : null,
  };
};

export const resetUserCredential = async () => {
  try {
    const lastLoginUser = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICES.USER_IDENTIFIER,
    });

    if (!lastLoginUser) {
      return false;
    }
    const user = JSON.parse(lastLoginUser.password);

    const askedPrompt = await hasShownBiometricPrompt(user?.email);

    let biometricReset = false;
    let lastUserReset = false;

    if (!askedPrompt) {
      if (user?.email) {
        biometricReset = await Keychain.resetGenericPassword({
          service: getBiometricService(user.email),
        });
      }

      lastUserReset = await Keychain.resetGenericPassword({
        service: KEYCHAIN_SERVICES.USER_IDENTIFIER,
      });
    }

    return biometricReset || lastUserReset;
  } catch (error) {
    console.error("Failed to reset user credentials", error);
    return false;
  }
};
