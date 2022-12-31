import messaging from '@react-native-firebase/messaging';
import {Linking} from 'react-native';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken();
  }
}
const Notification = ({notification, messageId}) => {
  // PushNotification.deleteChannel('channel_1');
  PushNotification.localNotification({
    channelId: 'channel-1',
    bigText:
      'This is local notification demo in React Native app. Only shown, when <b><i>expanded.</i></b>',
    subText: 'Local Notification Demo',
    title: notification.title,
    message: notification.body,
    vibrate: true,
    playSound: true,
  });
};

const getToken = async () => {
  let fcmToken = await messaging().getToken();
  console.log('Token :' + fcmToken);
};

export const notificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage.data.type === 'paid') {
      Linking.openURL('btsignal://app/Tips');
    } else {
      Linking.openURL('btsignal://app/Notification');
    }
    console.log(
      'Notification caused app to open from background',
      remoteMessage.data.content,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log(`Received in Forground => ${remoteMessage.data.type}`);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage.data.type === 'unpaid') {
          Linking.openURL('btsignal://app/Notification');
        } else {
          Linking.openURL('btsignal://app/Tips');
        }
        console.log(
          'Notification caused app to open from quit state',
          remoteMessage.notification,
        );
      }
    });
};
