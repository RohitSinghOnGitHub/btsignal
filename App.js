import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Routes from './src/navigation/Routes';
import {
  notificationListner,
  requestUserPermission,
} from '../btsignal/src/utils/fservice';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: props => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: '#ffe01a',
          borderLeftColor: '#ffe01a',
        }}
        contentContainerStyle={{
          paddingHorizontal: 40,
          justifyContent: 'center',
          alignContent: 'center',
        }}
        text1Style={{
          color: 'teal',
          fontSize: 13,
          fontWeight: '400',
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({text1, props}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
