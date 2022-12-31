import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const Foreground = () => {
  useEffect(() => {
    const message = messaging().onMessage(remoteMessage => {
      console.log('i m in forground');
    });

    return message;
  }, []);

  //   return null;
};

export default Foreground;
