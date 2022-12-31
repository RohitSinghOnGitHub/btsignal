import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonWithLoader = ({isLoading, text, onPress, style, textstyle}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#ffe01a', '#fcbd01']}
        style={[styles.loginBtn, style]}>
        {!!isLoading ? (
          <ActivityIndicator size="large" color="#white" />
        ) : (
          <Text style={[styles.loginBtnText, textstyle]}>{text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtn: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 20,
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#2d2d2d',
    fontFamily: 'Mulish Bold',
    fontSize: 13,
    textTransform: 'uppercase',
  },
});

export default ButtonWithLoader;
