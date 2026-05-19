/**
 * Welcome to the main entry point of the app.
 * This file bootstraps the entire application.
 */

import "./i18n";
import "./utils/ignore-warnings";

import React, { useCallback, useEffect, useRef } from "react";
import { StatusBar, LogBox, Platform, StyleSheet } from "react-native";

// Navigation
import { NavigationContainerRef } from "@react-navigation/native";
import notifee, { AndroidImportance } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import {
  RootNavigator,
  useNavigationPersistence,
  setRootNavigation,
  useBackButtonHandler,
  canExit,
} from "./navigation";

// Context & Store
import Provider from "./context/store/store";

// UI & Theme
import FlashMessage from "react-native-flash-message";
import { color } from "./theme";

// Utils & Constants
import * as storage from "./utils/storage";
import { NAVIGATION_PERSISTENCE_KEY } from "./constants";
import { content } from "./utils/string";
import { useRedux } from "./redux/hooks";
import { chat } from "./redux/reducer/chatReducer";

// Enable native screen rendering
enableScreens();

// Suppress all log warnings
LogBox.ignoreAllLogs();

function App() {
  const navigationRef = useRef<NavigationContainerRef<any> | null>(null);
  const { groups } = content;
  const { dispatches } = useRedux([groups.dispatch]);

  setRootNavigation(navigationRef as any);
  useBackButtonHandler(navigationRef, canExit);

  const { initialNavigationState, onNavigationStateChange } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const onScreenNotification = (notify: any) => {
    notify?.messageId && dispatches(chat(notify));
  };

  const silentNotification = useCallback((fromss?: any) => {
    const screen = global.screenName;

    return (
      fromss === screen ||
      (["Activity", "ActivityReaction"].includes(fromss ?? "") &&
        screen === "Activity") ||
      (["Messages", "MessagesReaction"].includes(fromss ?? "") &&
        screen === "MessageDetail")
    );
  }, []);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { notification, data } = remoteMessage;
      const fromss = data?.fromss;
      console.log("Received foreground message:", remoteMessage);
      const foreground = silentNotification(fromss);

      // Only show notification if not silent
      // await notifee.createChannel({
      //   id: "epione",
      //   name: "epione",
      //   importance: AndroidImportance.HIGH,
      // });

      await notifee.displayNotification({
        title: notification?.title || "",
        body: notification?.body || "",
        android: {
          channelId: "epione",
          pressAction: {
            id: "default",
          },
          sound: "default",
          smallIcon: "ic_launcher", // must exist
        },
        data: {
          ...data,
        },
      });
      if (fromss && !foreground) {
        onScreenNotification(remoteMessage);

        // Ensure channel exists
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView
        edges={Platform.OS === "ios" ? [] : ["top"]}
        style={style.wrapper}
      >
        <StatusBar backgroundColor={color.secondary} barStyle="light-content" />
        <Provider>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
          <FlashMessage position="bottom" autoHide />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.secondary,
    // paddingTop: Platform.OS === "ios" ? 10 : 0,
  },
});
