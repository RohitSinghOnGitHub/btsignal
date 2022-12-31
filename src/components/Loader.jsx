import {Text, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Loader = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <LinearGradient
      colors={['#ffe01a', '#fff3a6']}
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 350,
        left: width * 0.075,
        zIndex: 1,
        height: height * 0.2,
        width: width * 0.85,
        marginHorizontal: 'auto',
        backgroundColor: '#ffe01a',
        opacity: 0.9,
        borderRadius: 5,
      }}>
      <ActivityIndicator size="large" />
      <Text style={{color: 'teal', fontSize: 15}}>Please Wait...</Text>
    </LinearGradient>
  );
};

export default Loader;
