import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const {name, email, mobile} = useSelector(state => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            height: 50,
            backgroundColor: '#000',
            elevation: 0,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircleo" color={'#fefefe'} size={20} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fefefe',
              paddingLeft: 10,
              fontFamily: 'Mulish Bold',
              fontSize: 16,
            }}>
            Profile
          </Text>
        </View>
        <View style={styles.liveTestInfoSection}>
          <View
            style={{
              borderRightColor: '#727272',
              borderRightWidth: 1,
              paddingRight: 30,
            }}>
            <Image
              style={styles.scanImage}
              source={require('../../assets/icon/user-icon.jpg')}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <Ionicons name="create-outline" color={'#f9fafb'} size={20} />
            </TouchableOpacity>
            <Text style={styles.mid_heading}>{name}</Text>
            <Text style={styles.mid_text}>{email}</Text>
            <Text style={styles.mid_text}>+91-{mobile}</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 15,
            alignItems: 'center',
            backgroundColor: '#ffe01a',
          }}>
          <Text
            style={{color: '#2d2d2d', fontFamily: 'Mulish Bold', fontSize: 16}}>
            Follow us on Social Media
          </Text>
        </View>
        <View
          style={{
            margin: 10,
            padding: 15,
            backgroundColor: '#f6ffad',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://youtube.com/@btsignal');
            }}
            style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Ionicons
              name="ios-logo-youtube"
              color={'#FF5E00'}
              size={30}
              style={{textAlign: 'center'}}
            />
            <Text style={[styles.followText, styles.skrytcolor]}>
              Subscribe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://telegram.me/btsignalofficial');
            }}>
            <FontAwesome
              name="telegram"
              color={'#229ED9'}
              size={30}
              style={{textAlign: 'center'}}
            />
            <Text style={[styles.followText, styles.telecolor]}>Telegram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.instagram.com/btsignalofficial');
            }}>
            <AntDesign
              name="instagram"
              color={'#bc2a8d'}
              size={30}
              style={{textAlign: 'center'}}
            />
            <Text style={[styles.followText, styles.instacolor]}>
              Instagram
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
  scanImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fefefe',
  },
  liveTestInfoSection: {
    backgroundColor: '#1e293b',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  mid_heading: {
    color: '#fde68a',
    fontFamily: 'Mulish Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  mid_text: {
    color: '#cbd5e1',
    fontFamily: 'Mulish Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  followText: {
    color: '#737373',
    fontFamily: 'Mulish Bold',
    fontSize: 14,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  skrytcolor: {
    color: '#FF5E00',
  },
  telecolor: {
    color: '#229ED9',
  },
  instacolor: {
    color: '#bc2a8d',
  },
});
