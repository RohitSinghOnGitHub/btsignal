import {Login, Register, Resetpin} from '../screens/index';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import {Text, View} from 'react-native';

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    // <View>
    //   <Text>Hello</Text>
    // </View>

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.REGISTER} component={Register} />
      <Stack.Screen name={navigationStrings.RESETPIN} component={Resetpin} />
    </Stack.Navigator>
  );
};
