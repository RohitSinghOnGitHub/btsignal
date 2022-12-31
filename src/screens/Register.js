import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextinputWithLabel from '../components/TextInputWithLabel';
import ButtonWithLoader from '../components/ButtonWithLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../redux/slices/authSlice';
import commanServices from '../redux/apiServices/commanServices';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const {pending} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isEmpty = () => {
    if (name === '' || mobile === '' || password === '' || email === '') {
      return true;
    }
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={['#112435', '#000', '#2d2d2d']}
      start={{x: 0.2, y: 0.2}}
      end={{x: 1, y: 1}}>
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
          <MaterialIcons name="app-registration" color="#2d2d2d" size={22} />
          <Text style={styles.topHeaderText}>Register Here</Text>
        </View>
        <ScrollView>
          <View
            style={{
              padding: 15,
            }}>
            <Text style={styles.regtxtlabel}>Enter Name</Text>
            <View style={styles.formBox}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={26}
                style={styles.iconcolor}
              />
              <TextinputWithLabel
                placeholder="Enter Your Name Here"
                keyboardType="default"
                onChangeText={text => {
                  setName(text);
                }}
              />
            </View>
            <Text style={styles.regtxtlabel}>Enter Email</Text>
            <View style={styles.formBox}>
              <MaterialCommunityIcons
                name="email-edit"
                size={26}
                style={styles.iconcolor}
              />
              <TextinputWithLabel
                placeholder="Enter Your Email Here"
                keyboardType="email-address"
                onChangeText={text => {
                  setEmail(text);
                }}
              />
            </View>
            <Text style={styles.regtxtlabel}>Enter Mobile Number</Text>
            <View style={styles.formBox}>
              <Ionicons
                name="phone-portrait"
                size={26}
                style={styles.iconcolor}
              />
              <Text style={styles.formBoxText}>+91</Text>
              <TextinputWithLabel
                placeholder="Enter Mobile No"
                keyboardType="numeric"
                onChangeText={text => {
                  setMobile(text);
                }}
              />
            </View>

            <Text style={styles.regtxtlabel}>Enter PIN</Text>
            <View style={styles.formBox}>
              <MaterialCommunityIcons
                name="cellphone-key"
                size={26}
                style={styles.iconcolor}
              />
              <TextinputWithLabel
                placeholder="Choose Your Password"
                keyboardType="decimal-pad"
                onChangeText={text => {
                  setPassword(text);
                }}
                isSecure={true}
                maxLength={4}
              />
            </View>

            <ButtonWithLoader
              isLoading={pending}
              text="Submit For Registration"
              style={{marginTop: 20}}
              onPress={() => {
                if (!isEmpty()) {
                  dispatch(register({name, email, mobile, password}));
                } else {
                  commanServices.showToast('Text fields can not be Blank ✋');
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flex: 1,
    //backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2.5,
    //backgroundColor: '#FAFAFA',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
  },
  logoStyle: {
    height: 100,
    transform: [{rotate: '10deg'}],
    resizeMode: 'contain',
  },
  topHeader: {
    padding: 15,
    backgroundColor: '#ffe01a',
    flexDirection: 'row',
  },
  topHeaderText: {
    color: '#2d2d2d',
    fontFamily: 'Mulish Bold',
    fontSize: 14,
    marginLeft: 15,
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
  regtxtlabel: {
    fontFamily: 'Mulish Bold',
    marginTop: 20,
    color: '#fefefe',
  },
  iconcolor: {
    color: '#fefefe',
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
});
