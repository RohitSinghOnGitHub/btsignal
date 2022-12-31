import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const isExpired = eTime => {
  // return true;
  var now = new Date();
  var d = new Date(eTime);
  if (now.getTime() > d.getTime()) {
    return true;
  } else {
    return false;
  }
};
const TipComponent = ({item}) => {
  return (
    <View style={styles.tipsBox}>
      <View style={styles.topIconbox}>
        <Image
          source={require('../../assets/icon/stock-market.png')}
          style={styles.topIconimage}
        />
      </View>
      <View
        style={[
          styles.tradeBox,
          isExpired(item.expire_time) === true
            ? styles.grayBox
            : item.tip == 'Call'
            ? styles.greenBox
            : styles.redBox,
        ]}>
        <Text style={styles.tradeHeading}>{item.tip}</Text>
        <Text style={styles.tradeText}>{`${item.currency}`} </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <LinearGradient colors={['#00461f', '#111']} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>
            {' '}
            {`${item.spot_date}/${item.spot_time}`}
          </Text>
        </LinearGradient>
        <LinearGradient colors={['#00461f', '#111']} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>
            {' '}
            {isExpired(item.expire_time) === true
              ? 'Expired '
              : `Valid Till : ${item.validity} min`}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default TipComponent;

const styles = StyleSheet.create({
  tipsBox: {
    height: 'auto',
    paddingBottom: 15,
    margin: 10,
    backgroundColor: '#f8ffbd',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 60,
  },
  topIconbox: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    borderColor: '#f8ffbd',
    borderWidth: 5,
    position: 'absolute',
    top: -45,
    alignItems: 'center',
  },
  topIconimage: {
    height: 40,
    width: 40,
    top: 12,
  },
  tradeBox: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  greenBox: {
    backgroundColor: '#00d45f',
  },
  redBox: {
    backgroundColor: '#ff3000',
  },
  grayBox: {
    backgroundColor: '#B2BEB5',
  },
  tradeHeading: {
    fontSize: 16,
    fontFamily: 'Mulish Bold',
    color: '#fefefe',
  },
  tradeText: {
    fontSize: 16,
    fontFamily: 'Mulish Bold',
    color: '#fefefe',
  },
  loginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    textAlign: 'center',
    //maxWidth: '90%'
    marginTop: 15,
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#fefefe',
    fontFamily: 'Mulish Bold',
    fontSize: 14,
    letterSpacing: 0.5,
    //textTransform: 'uppercase'
  },
});
