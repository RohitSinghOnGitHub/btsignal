import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import TextinputWithLabel from '../components/TextInputWithLabel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../redux/slices/authSlice';
import ButtonWithLoader from '../components/ButtonWithLoader';
import commanServices from '../redux/apiServices/commanServices';

const EditProfile = ({navigation}) => {
  const [pin, setPin] = useState('');
  const {token, pending} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isEmpty = () => {
    if (pin === '') {
      return true;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.topHeaderBg}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircleo" color={'#fefefe'} size={20} />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle}>Edit Profile</Text>
        </View>
        <ScrollView>
          <View
            style={{
              paddingVertical: 15,
              position: 'relative',
              marginBottom: 5,
            }}>
            <TouchableOpacity>
              <Image
                style={styles.scanImage}
                source={require('../../assets/icon/user-icon.jpg')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#111',
              marginHorizontal: 10,
              borderRadius: 10,
              paddingHorizontal: 15,
            }}>
            <Text style={styles.regtxtlabel}>PIN</Text>
            <View style={styles.formBox}>
              <MaterialCommunityIcons
                name="cellphone-key"
                size={26}
                style={styles.iconcolor}
              />
              <TextinputWithLabel
                maxLength={4}
                value={pin}
                keyboardType="numeric"
                onChangeText={text => {
                  setPin(text);
                }}
              />
            </View>
            <ButtonWithLoader
              isLoading={pending}
              text="Update Pin"
              style={styles.loginBtn}
              textstyle={styles.loginBtnText}
              onPress={() => {
                if (!isEmpty()) {
                  dispatch(resetPassword({token: token, password: pin}));
                  setPin('');
                } else {
                  commanServices.showToast('Pin can not be Blank');
                }
                Keyboard.dismiss;
              }}
            />
            <TouchableOpacity>
              {/* <LinearGradient
                colors={['#ffe01a', '#e0ee00']}
                style={styles.loginBtn}>
                <Text style={styles.loginBtnText}> Update Now </Text>
              </LinearGradient> */}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
  topHeaderBg: {
    height: 50,
    backgroundColor: '#000',
    elevation: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topHeaderTitle: {
    color: '#fefefe',
    paddingLeft: 10,
    fontFamily: 'Mulish Bold',
    fontSize: 16,
  },
  scanImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fefefe',
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
  loginBtn: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 40,
    textAlign: 'center',
    marginVertical: 20,
    //maxWidth: '90%'
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#2d2d2d',
    fontFamily: 'Mulish Bold',
    fontSize: 14,
    letterSpacing: 0.5,
    //textTransform: 'uppercase'
  },
});

{
  /* <Text style={styles.regtxtlabel}>Name</Text>
            <View style={styles.formBox}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={26}
                style={styles.iconcolor}
              />
              <TextinputWithLabel />
            </View>
            <Text style={styles.regtxtlabel}>Email</Text>
            <View style={styles.formBox}>
              <MaterialCommunityIcons
                name="email-edit"
                size={26}
                style={styles.iconcolor}
              />
              <TextinputWithLabel />
            </View>
            <Text style={styles.regtxtlabel}>Mobile Number</Text>
            <View style={styles.formBox}>
              <Ionicons
                name="phone-portrait"
                size={26}
                style={styles.iconcolor}
              />
              <Text style={styles.formBoxText}>+91</Text>
              <TextinputWithLabel />
            </View> */
}
