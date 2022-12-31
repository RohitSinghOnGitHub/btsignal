import React, {useState} from 'react';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
import {
  Home,
  Header,
  Tips,
  MyOrder,
  Register,
  Resetpin,
  PackageDetails,
  Profile,
  Notification,
  EditProfile,
  Feedback,
  Login,
} from '../screens/index';
import DrawerNavigation from './DrawerNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default MainStack = () => {
  const [token, setToken] = useState();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={navigationStrings.DRAWERNAVIGATION}
        component={DrawerNavigation}
      />

      <Stack.Screen name={navigationStrings.TIPS} component={Tips} />
      <Stack.Screen
        name={navigationStrings.EDITPROFILE}
        component={EditProfile}
      />
      <Stack.Screen name={navigationStrings.FEEDBACK} component={Feedback} />
      {/* <Stack.Screen name={navigationStrings.LOGIN} component={Login} /> */}

      {/* <Stack.Screen name={navigationStrings.HEADER} component={Header} /> */}
      {/* <Stack.Screen name={navigationStrings.TIPS} component={Tips} /> */}

      <Stack.Screen name={navigationStrings.PROFILE} component={Profile} />
      {/* <Stack.Screen name={navigationStrings.RESETPIN} component={Resetpin} /> */}
      {/* <Stack.Screen name={navigationStrings.REGISTER} component={Register} /> */}
      {/* <Stack.Screen name={navigationStrings.MYORDER} component={MyOrder} /> */}
      <Stack.Screen
        name={navigationStrings.NOTIFICATION}
        component={Notification}
      />
      <Stack.Screen
        name={navigationStrings.PACKAGEDETAILS}
        component={PackageDetails}
      />
      {/* <Stack.Screen
        name={navigationStrings.EDITPROFILE}
        component={EditProfile}
      /> */}
    </Stack.Navigator>
  );
};
