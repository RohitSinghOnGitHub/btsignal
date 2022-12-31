import React, {Component, useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

export default function TextinputWithLabel({
  label,
  placeholder,
  isSecure,
  value,
  editable,
  onChangeText,
  onSubmit,
  keyboardType,
  ...props
}) {
  return (
    <View style={styles.container}>
      <TextInput
        editable={editable}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#fefefe"
        style={styles.formInput}
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
        onSubmitEditing={onSubmit}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formInput: {
    borderBottomWidth: 1,
    fontSize: 14,
    borderColor: '#737373',
    borderRadius: 5,
    color: '#fefefe',
    height: 48,
    fontFamily: 'Mulish Bold',
  },
});
