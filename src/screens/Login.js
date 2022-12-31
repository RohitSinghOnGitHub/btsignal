import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import ButtonWithLoader from '../../src/components/ButtonWithLoader';
import TextinputWithLabel from '../../src/components/TextInputWithLabel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLogin} from '../redux/slices/authSlice';
import navigationStrings from '../constants/navigationStrings';
import commanServices from '../redux/apiServices/commanServices';

const Login = ({navigation}) => {
  const {token, isLoading} = useSelector(state => state.auth);

  return isLoading === true ? (
    <WaitScreen />
  ) : (
    <LoginScreen navigation={navigation} />
  );
};
export default Login;

const WaitScreen = () => {
  return (
    <View style={styles.container_new}>
      <View>
        <ActivityIndicator size="large" color="pink" />
      </View>
    </View>
  );
};
const LoginScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const {pending} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleMobile = val => {
    setMobile(val);
  };
  const isEmpty = () => {
    if (mobile === '' || password === '') {
      return true;
    }
  };
  const handlePassword = val => {
    setPassword(val);
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
        {/* <View style={styles.formBox}>
          <EvilIcons name="sc-instagram" color="#F14D02" size={22} />
          <EvilIcons name="sc-instagram" color="#47A432" size={22} />
          <EvilIcons name="sc-instagram" color="#ffe74d" size={22} />
        </View> */}
      </View>
      <View style={styles.footer}>
        <View style={styles.topHeader}>
          <AntDesign name="login" color="#2d2d2d" size={22} />
          <Text style={styles.topHeaderText}>Login Here</Text>
        </View>
        <View
          style={{
            padding: 15,
          }}>
          <Text style={styles.labelText}>Enter Mobile Number</Text>
          <View style={styles.formBox}>
            <Ionicons name="phone-portrait" color="#fefefe" size={26} />
            <Text style={styles.formBoxText}>+91</Text>
            <TextinputWithLabel
              editable={!pending}
              placeholder="Enter Number"
              keyboardType="numeric"
              onChangeText={text => handleMobile(text)}
            />
          </View>
          <Text style={[styles.labelText, {marginTop: 20}]}>Enter PIN</Text>
          <View style={styles.formBox}>
            <MaterialCommunityIcons
              name="cellphone-lock"
              color="#fefefe"
              size={26}
            />

            <TextinputWithLabel
              editable={!pending}
              placeholder="Enter Pin"
              isSecure={true}
              keyboardType="numeric"
              maxLength={4}
              onChangeText={val => handlePassword(val)}
              onSubmit={() => dispatch(fetchLogin({mobile, password}))}
            />
          </View>
          <ButtonWithLoader
            isLoading={pending}
            onPress={() => {
              if (!isEmpty()) {
                dispatch(fetchLogin({mobile, password}));
              } else {
                commanServices.showToast('Mobile and Pin can not be Blank');
              }
              Keyboard.dismiss;
              // navigation.navigate(navigationStrings.DRAWERNAVIGATION);
            }}
            text="Login"
          />
          <View style={styles.btnBox}>
            <ButtonWithLoader
              style={{marginTop: 20}}
              text="Register Here"
              onPress={() => navigation.navigate(navigationStrings.REGISTER)}
            />
            <ButtonWithLoader
              text="Forgot Password"
              onPress={() => navigation.navigate('ResetPin')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141006',
  },
  container_new: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: '#ffe74d',
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
