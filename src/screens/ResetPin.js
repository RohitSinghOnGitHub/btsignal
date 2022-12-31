import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ButtonWithLoader from '../../src/components/ButtonWithLoader';
import TextinputWithLabel from '../../src/components/TextInputWithLabel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import commanServices from '../redux/apiServices/commanServices';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../redux/slices/authSlice';

const Resetpin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {pending} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isEmpty = () => {
    if (email === '') {
      return true;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoStyle}
        />
        <Text style={styles.logonametxt}>BT Signal</Text>
        <Text style={styles.tagnametxt}>Most Accurate Predictions</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.topHeader}>
          <AntDesign name="slack-square" color="#2d2d2d" size={22} />
          <Text style={styles.topHeaderText}>Reset PIN</Text>
        </View>
        <View
          style={{
            padding: 15,
          }}>
          <Text style={[styles.labelText, {marginTop: 0}]}>Enter Email</Text>
          <View style={styles.formBox}>
            <MaterialCommunityIcons
              name="email-edit"
              color="#fefefe"
              size={26}
            />

            <TextinputWithLabel
              placeholder="Enter Email id"
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>
          <ButtonWithLoader
            text="Send Reset Link"
            isLoading={pending}
            onPress={() => {
              if (!isEmpty()) {
                dispatch(forgotPassword({email}));
                setEmail('');
              } else {
                commanServices.showToast('Email Field can not be blank.');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default Resetpin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141006',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1.5,
    shadowColor: '#000',
  },
  logoStyle: {
    height: 180,
    resizeMode: 'contain',
    transform: [{rotate: '10deg'}],
  },
  topHeader: {
    padding: 15,
    backgroundColor: '#ffe01a',
    flexDirection: 'row',
  },
  logonametxt: {
    color: '#ffe01a',
    fontFamily: 'Cairo Bold',
    fontSize: 18,
    marginLeft: 15,
    letterSpacing: 0.5,
  },
  tagnametxt: {
    color: '#fefefe',
    fontFamily: 'Mulish Regular',
    fontSize: 16,
    marginLeft: 15,
    letterSpacing: 2,
  },
  topHeaderText: {
    color: '#2d2d2d',
    fontFamily: 'Mulish Bold',
    fontSize: 14,
    marginLeft: 15,
  },
  labelText: {
    fontFamily: 'Mulish Bold',
    color: '#fefefe',
  },
  formBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBoxText: {
    fontFamily: 'Mulish Bold',
    color: '#fefefe',
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
