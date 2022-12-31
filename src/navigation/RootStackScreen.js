import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login, Register, Resetpin} from '../screens/index';
import navigationStrings from '../constants/navigationStrings';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name={navigationStrings.LOGIN} component={Login} />
      <RootStack.Screen
        name={navigationStrings.REGISTER}
        component={Register}
      />
      <RootStack.Screen
        name={navigationStrings.RESETPIN}
        component={Resetpin}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;

const styles = StyleSheet.create({});
