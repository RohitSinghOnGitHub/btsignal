import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const authAxios = axios.create({
  baseURL: 'http://btsignals.in/api',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

const login = async ({mobile, password}) => {
  const response = await authAxios.post(
    `/login?mobile=${mobile}&password=${password}`,
  );
  if (response.status == 200) {
    console.log('i m in Response');

    AsyncStorage.setItem('user_info', JSON.stringify(response.data)).then(
      () => {
        subScribeTounpaid();
      },
    );
  }
  return response.data;
};

const forgotPassword = async ({email}) => {
  const response = await authAxios.post(`/forgotpassword`, {email: email});
  if (response.status == 200) {
    console.log('i m in Response');
  }
  return response.data;
};
const resetPassword = async ({token, password, id}) => {
  const response = await authAxios.post(
    `/update_profile`,
    {password: password, id: id},
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  if (response.status == 200) {
    console.log('i m in Response');
  }
  return response.data;
};

const logout = async ({token}) => {
  console.log('in LogoutOut');
  const response = await authAxios.get(`/logout`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  if (response.status == 200) {
    console.log('i m in Logout');
    AsyncStorage.removeItem('user_info').then(() => {
      console.log('Logut Successfully');
    });
  }
  return response.data;
};
const register = async ({name, email, mobile, password}) => {
  const response = await authAxios.post(
    `/register?name=${name}&email=${email}&mobile=${mobile}&password=${password}`,
  );
  if (response.status == 200) {
    console.log('i m in register');
    subScribeTounpaid();
    await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
  }
  return response.data;
};
const subScribeTounpaid = () => {
  messaging()
    .subscribeToTopic('unpaid')
    .then(() => {
      console.log('subscribed unpaid!!');
    });
};
const subScribeToPaid = () => {
  messaging()
    .subscribeToTopic('paid')
    .then(() => {
      console.log('subscribed Paid!!');
    });
};
const unsubScribeTounpaid = () => {
  messaging()
    .unsubscribeFromTopic('unpaid')
    .then(() => {
      console.log('subscribed!!');
    });
};
const unsubScribeTopaid = () => {
  messaging()
    .unsubscribeFromTopic('paid')
    .then(() => {
      console.log('subscribed!!');
    });
};
const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-1', // (required)
      channelName: 'My_New_channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      // vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
const deleteChannel = () => {
  PushNotification.deleteChannel('channel-1');
  // unsubScribeTounpaid();
  // unsubScribeTopaid();
};
const commanTask = (state, action) => {
  if (action.payload.user) {
    state.token = action.payload.token;
    state.email = action.payload.user.email;
    state.name = action.payload.user.name;
    state.mobile = action.payload.user.mobile;
    state.user_id = action.payload.user.user_id;
    state.pending = false;
    state.error = false;
  }
  if (action.payload.user.paid === '1') {
    console.log('in Paid Method');
    subScribeToPaid();
  }
};
const authService = {
  register,
  commanTask,
  createChannel,
  login,
  deleteChannel,
  unsubScribeTounpaid,
  unsubScribeTopaid,
  subScribeToPaid,
  logout,
  forgotPassword,
  resetPassword,
};
export default authService;
