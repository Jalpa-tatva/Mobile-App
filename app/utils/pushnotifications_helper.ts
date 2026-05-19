import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { GROUP_DETAILS, MESSAGE, MODULES, ROLLUP, TABS } from "@app/constants";
import moment from "moment";

/* -------------------------------------------------------------------------- */
/*                             PERMISSION + TOKEN                             */
/* -------------------------------------------------------------------------- */

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization Status", authStatus);
    await getFCMToken();
  } else {
    console.log("error to register");
  }
};

const getFCMToken = async () => {
  let retry;
  let fcmtoken = await AsyncStorage.getItem("fcmtoken");
  console.log("Old Token", fcmtoken);
  if (!fcmtoken) {
    try {
      // await messaging().deleteToken();
      let fcmtoken = await messaging().getToken();
      console.log("New Token", fcmtoken);
      // Alert.alert(fcmtoken);
      if (fcmtoken) {
        AsyncStorage.setItem("fcmtoken", fcmtoken);
        console.log("New Token from iff", fcmtoken);
      }
    } catch (error) {
      console.log("error token", error);
      retry = true;
    }
    if (retry) {
      try {
        await messaging().requestPermission(); // IMPORTANT!
        await messaging().registerDeviceForRemoteMessages(); // IMPORTANT!
        // await messaging().deleteToken();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let fcmtoken = await messaging().getToken();
        console.log("New Token", fcmtoken);

        if (fcmtoken) {
          AsyncStorage.setItem("fcmtoken", fcmtoken);
        } else {
          console.log("error for generating token in ios");
        }
      } catch (error) {
        console.log("error in token again", error);
      }
    }
  }
};
/* -------------------------------------------------------------------------- */
/*                            FOREGROUND HANDLER                              */
/* -------------------------------------------------------------------------- */

export const onMessageListener = () => {
  return messaging().onMessage(async (remoteMessage) => {
    const { notification, data } = remoteMessage;
    console.log("remoteMessage123", remoteMessage);

    await notifee.createChannel({
      id: "epione",
      name: "epione",
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: notification?.title,
      body: notification?.body,
      android: {
        channelId: "epione",
        pressAction: { id: "default" },
        smallIcon: "ic_launcher",
      },
      ios: {
        sound: "default",
      },
      data: data,
    });
  });
};

/* -------------------------------------------------------------------------- */
/*                        NOTIFICATION PRESS HANDLER                          */
/* -------------------------------------------------------------------------- */

export const NotificationListener = (
  navigation: any,
  onNotify?: any,
  groupsData?: any
) => {
  /* ---------------- FOREGROUND PRESS ---------------- */

  notifee.onForegroundEvent(async ({ type, detail }) => {
    console.log("onForegroundEvent", detail.notification);
    if (type === EventType.PRESS) {
      handleNavigation(detail.notification, navigation, groupsData);
    }
  });

  /* ---------------- BACKGROUND PRESS ---------------- */

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      handleNavigation(detail.notification, navigation, groupsData);
    }
  });

  /* ---------------- APP OPENED FROM BACKGROUND ---------------- */

  messaging().onNotificationOpenedApp((remoteMessage) => {
    handleNavigation(remoteMessage, navigation, groupsData);
  });

  /* ---------------- APP OPENED FROM QUIT STATE ---------------- */

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        setTimeout(() => {
          handleNavigation(remoteMessage, navigation, groupsData);
        }, 1000);
      }
    });
};

/* -------------------------------------------------------------------------- */
/*                         CENTRAL NAVIGATION LOGIC                           */
/* -------------------------------------------------------------------------- */

const handleNavigation = (
  notification: any,
  navigation: any,
  groupsData?: any
) => {
  console.log("handleNavigation", notification);
  
  const data = notification?.data || notification?.notification?.data;

  if (!data) return;

  let from =
    data.fromss === "Activities"
      ? "Activities"
      : data.fromss === "issue"
      ? "Issues"
      : data.fromss === "Event"
      ? "Events"
      : data.fromss;

  let issue = data?.issue ? JSON.parse(data.issue) : "";
  let event = data?.event ? JSON.parse(data.event) : "";

  /* ---------------- EVENT NAVIGATION ---------------- */

  if (event && notification?.title?.includes("edited an event")) {
    event.startDateHead = moment(
      event.startDate.toString().slice(0, -3) * 1000
    ).format("MMM/DD/YYYY/dddd/HH:mm a");

    navigation.navigate(TABS.Rollup, {
      screen: ROLLUP.Upcoming,
      params: { screen: MODULES.RollUpDetailsScreen },
    });

    setTimeout(() => {
      navigation.navigate(MODULES.RollUpDetailsScreen, {
        eventId: event.id,
        item: event,
        From: ROLLUP.Upcoming,
      });
    }, 1500);

    return;
  }

  /* ---------------- MESSAGE NAVIGATION ---------------- */

  if (data.fromss === "Messages" || data.fromss === "MessagesReaction") {
    navigation.navigate(MESSAGE.messageDetail, {
      imageUrl: data.imageUrl,
      conversationid: data.uniqueId,
      title: data.title,
      message_id: data.messageId,
      emoji_id: data.emojiId,
      isGroup: data.isGroupMessage,
    });
    return;
  }

  /* ---------------- ISSUE NAVIGATION ---------------- */

  if (issue && notification?.title?.includes("edited an issue")) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: MODULES.GroupDetailsScreen,
            params: {
              uniqueId: data.uniqueId,
              fromss: from,
              issueTabs:
                data.issueTabs === "GROUP_DETAILS.OpenIssue"
                  ? GROUP_DETAILS.OpenIssue
                  : GROUP_DETAILS.ClosedIssue,
            },
          },
        ],
      })
    );

    setTimeout(() => {
      navigation.navigate(MODULES.IssueDetailScreen, {
        item: issue,
        uniqueId: data.uniqueId,
      });
    }, 1500);

    return;
  }

  /* ---------------- DEFAULT GROUP NAVIGATION ---------------- */

  groupsData?.({
    uniqueId: data.uniqueId,
    fromss: from,
  });

  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: MODULES.GroupDetailsScreen,
          params: {
            uniqueId: data.uniqueId,
            fromss: from,
          },
        },
      ],
    })
  );
};
