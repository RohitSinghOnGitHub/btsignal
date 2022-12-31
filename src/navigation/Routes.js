import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack';
import {AuthStack} from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {chkLogin} from '../redux/slices/authSlice';

const Stack = createNativeStackNavigator();

function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chkLogin());
  }, [token]);

  const {token} = useSelector(state => state.auth);
  const config = {
    screens: {
      Home: 'Home',
      Tips: 'Tips',
      Notification: 'Notification',
    },
  };
  return (
    <NavigationContainer linking={{prefixes: ['btsignal://app'], config}}>
      {token != null ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Routes;
