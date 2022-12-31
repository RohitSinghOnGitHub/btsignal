import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {SliderCustom} from './index';
import PushNotification from 'react-native-push-notification';
import commanServices from '../redux/apiServices/commanServices';
import {useSelector} from 'react-redux';

const Home = () => {
  const [ex, setEx] = useState([]);
  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    commanServices.getExchangeImgs({token}).then(res => {
      console.log('in Exchange' + res);
      setEx(res);
    });
    // console.log('exImages' + ex);
  }, []);
  const Notification = () => {
    console.log('I m in BigBox');

    PushNotification.localNotification({
      channelId: 'channel-1',
      bigText:
        'This is local notification demo in React Native app. Only shown, when expanded.',
      subText: 'Local Notification Demo',
      title: 'Local Notification Title',
      message: 'Expand me to see more',
      vibrate: true,
      playSound: true,
    });
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{margin: 0, borderRadius: 10}}>
            <SliderCustom />
          </View>

          <View style={styles.packageTitlebox}>
            <Text style={styles.packageTitleText}>
              Join Our Membership Plan
            </Text>
          </View>

          <View style={styles.packageWrapper}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PackageDetails');
              }}
              style={[styles.packageBox, {backgroundColor: '#ffe01a'}]}>
              <View>
                <Image
                  source={require('../../assets/icon/binamo-logo.png')}
                  resizeMode="contain"
                  style={styles.tradeIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // makePayment();

                navigation.navigate('PackageDetails');
              }}
              style={[styles.packageBox, {backgroundColor: '#ffe01a'}]}>
              <View>
                {/* <Text style={styles.packageText}>Plan 2</Text> */}
                <Image
                  source={require('../../assets/icon/expert-option-logo.png')}
                  resizeMode="contain"
                  style={styles.tradeIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PackageDetails');
              }}
              style={[
                styles.packageBox,
                styles.packageBoxTopMargin,
                {backgroundColor: '#ffe01a'},
              ]}>
              <View>
                <Image
                  source={require('../../assets/icon/olymp-trade-logo.png')}
                  resizeMode="contain"
                  style={styles.tradeIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('PackageDetails')}
              style={[
                styles.packageBox,
                styles.packageBoxTopMargin,
                {backgroundColor: '#ffe01a'},
              ]}>
              <View>
                <Image
                  source={require('../../assets/icon/quotex-logo.png')}
                  resizeMode="contain"
                  style={styles.tradeIcon}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{margin: 10, borderRadius: 10}}>
            <Image
              source={require('../../assets/new-adv-banner1.jpg')}
              resizeMode="contain"
              style={styles.sliderImage}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
  sliderImage: {
    height: 180,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  packageTitlebox: {
    height: 50,
    backgroundColor: '#ffe01a',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  packageTitleText: {
    fontFamily: 'Mulish Bold',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#000',
  },
  packageWrapper: {
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  packageBox: {
    backgroundColor: '#fefefe',
    width: '48%',
    alignItems: 'center',
    height: 120,
    justifyContent: 'center',
    borderRadius: 10,
  },
  packageBoxTopMargin: {
    marginTop: 15,
  },
  tradeIcon: {
    height: 90,
    width: 90,
  },
  packageText: {
    color: '#000',
    fontFamily: 'Mulish Bold',
  },
});
