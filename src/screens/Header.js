import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Share} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationStrings from '../constants/navigationStrings';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 50,
        backgroundColor: '#000',
        elevation: 0,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" color={'#fefefe'} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fefefe',
            paddingLeft: 10,
            fontFamily: 'Mulish Bold',
            fontSize: 16,
          }}>
          BT SIGNAL
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{paddingRight: 10}}
          onPress={() => {
            navigation.navigate(navigationStrings.NOTIFICATION);
          }}>
          <Ionicons name="notifications" color={'#fefefe'} size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const share = await Share.share({
              message: 'https://btsignals.in/btsignal.apk',
            });
          }}>
          <Ionicons name="share-social-outline" color={'#fefefe'} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
