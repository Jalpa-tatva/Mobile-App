import I18n from "i18n-js";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";

export const requestCameraPermissionIos = async () => {
  const res = await check(PERMISSIONS.IOS.CAMERA);

  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    const res2 = await request(PERMISSIONS.IOS.CAMERA);
    return res2 === RESULTS.GRANTED;
  }
};

export const requestCameraPermission = async () => {
  if (Platform.OS === "ios") {
    const hasPermission = await requestCameraPermissionIos();
    return hasPermission;
  }
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
        // {
        //   title: 'Camera Permission',
        //   message: 'App needs camera permission',
        // },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

const requestExternalWritePermissionIos = async () => {
  const res = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    const res2 = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return res2 === RESULTS.GRANTED;
  }
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === "ios") {
    const hasPermission = await requestExternalWritePermissionIos();
    return hasPermission;
  }
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        // {
        //   title: 'External Storage Write Permission',
        //   message: 'App needs write permission',
        // },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      // alert('Write permission err', err);
    }
    return false;
  } else return true;
};
export const requestExternalWritePermissionInit = async () => {
  // if (Platform.OS === 'ios') {
  //   const hasPermission = await requestExternalWritePermissionIosInit();

  //   return hasPermission;
  // }
  if (Platform.OS === "android") {
    try {
      if (Platform.OS === "android" && Platform.Version > 32) {
        const granted = await PermissionsAndroid.requestMultiple([
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
        ]);

        if (
          granted["android.permission.READ_MEDIA_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.READ_MEDIA_IMAGES"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.READ_MEDIA_VIDEO"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
      // console.log('granted @@', granted['android.permission.WRITE_EXTERNAL_STORAGE'],PermissionsAndroid.RESULTS.GRANTED);
      // return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      Alert.alert("Error", I18n.t("groupDetails.StoragePermissionDenied"));
    }
    return false;
  } else return true;
};

export const checkPermissionAbove33Version = async () => {
  const granted = await checkMultiple([PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]);
  if (granted[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === "granted") {
    // Once user grant the permission start downloading
    return true;
  } else {
    const result = await requestMultiple([
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ]);
    if (result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === "granted") {
      // Once user grant the permission start downloading
      return true;
    } else {
      // If permission denied then show alert
      return false;
    }
  }
};

export const checkPermissionBelow33Version = async () => {
  const granted = await checkMultiple([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]);
  if (
    granted[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted" &&
    granted[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted"
  ) {
    return true;
    // Once user grant the permission start downloading
  } else {
    const result = await requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted" &&
      result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted"
    ) {
      return true;
      // Once user grant the permission start downloading
    } else {
      return false;
    }
  }
};
