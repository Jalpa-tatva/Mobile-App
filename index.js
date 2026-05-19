/**
 * Entry file for React Native
 */

import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";

import App from "./app/app.tsx";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import store, { persistor } from "./app/redux/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";

async function createNotificationChannel() {
  await notifee.createChannel({
    id: "epione",
    name: "epione",
    importance: AndroidImportance.HIGH,
  });
}

/* -------------------------------------------------------------------------- */
/*                    FIREBASE BACKGROUND MESSAGE HANDLER                     */
/* -------------------------------------------------------------------------- */
/**
 * ⚠️ Must be outside of any component
 * ⚠️ No top-level await
 */

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Background message received:", remoteMessage);

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId: "epione",
      pressAction: { id: "default" },
    },
    data: remoteMessage.data,
  });
});

/* -------------------------------------------------------------------------- */

const MainApp = () => {
  // Create channel once app loads
  createNotificationChannel();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

/* -------------------------------------------------------------------------- */

AppRegistry.registerComponent(appName, () => MainApp);

export default App;