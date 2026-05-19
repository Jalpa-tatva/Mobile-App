import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { memo, useEffect } from 'react';

const Foregroundhandler = memo(() => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { notification, data } = remoteMessage;

      // Ensure channel exists (safe even if already created)
      await notifee.createChannel({
        id: 'epione',
        name: 'epione',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: notification?.title,
        body: notification?.body,
        android: {
          channelId: 'epione',
          pressAction: {
            id: 'default',
          },
          smallIcon: 'ic_launcher', // must exist in mipmap
        },
        data: data,
      });
    });

    return unsubscribe;
  }, []);

  return null;
});

export default Foregroundhandler;