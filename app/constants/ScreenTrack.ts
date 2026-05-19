import analytics from "@react-native-firebase/analytics";
import moment from "moment";

let openingTime: any = "";

export const trackOpeningTime = async () => {
  const currentTime = moment().format("HH:mm:ss");
  // await analytics().logEvent('screen_opening_time', {
  //   Status: `ScreenName : ${screeName} & Opening time : ${currentTime}`,
  // });
  openingTime = currentTime;
};

export const trackLeavingTime = async (details, screeName) => {
  const currentTime = moment().format("HH:mm:ss");
  let mins = moment(currentTime, "HH:mm:ss").diff(
    moment(openingTime, "HH:mm:ss")
  );

  let tempTime = moment.utc(mins).format("HH:mm:ss");

  analytics().setAnalyticsCollectionEnabled(true);
  if (
    openingTime !== null &&
    screeName == "Login" &&
    details?.email !== null &&
    currentTime !== null &&
    tempTime !== null
  ) {
    await analytics().logEvent(`screen_record_info`, {
      ScreenDetails: `${screeName}, Id:${
        details?.email ?? ""
      }, Open:${openingTime},Leave:${currentTime},Stay:${tempTime}`,
    });
  }

  if (
    openingTime !== null &&
    screeName !== null &&
    details?.login?.data?.email !== null &&
    currentTime !== null &&
    tempTime !== null
  ) {
    await analytics().logEvent(`screen_record_info`, {
      ScreenDetails: `${screeName}, Id:${
        details?.login?.data?.email ?? ""
      }, Open:${openingTime},Leave:${currentTime},Stay:${tempTime}`,
    });
  }
};

export const saveDeviceDetail = async () => {
  return;
};
