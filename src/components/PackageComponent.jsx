import axios from 'axios';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import authService from '../redux/apiServices/authService';
import paymentServices from '../redux/apiServices/paymentServices';

const makePayment = ({order_id, auth, packageId}) => {
  {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_live_25MOKkJCIfdh6d',
      amount: '5000',
      name: 'Btsignal',
      order_id: order_id, //Replace this with an order_id created using Orders API.
      prefill: {
        email: auth.email,
        contact: auth.mobile,
        name: auth.name,
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_signature}`);
        paymentVerification({
          package_id: packageId,
          rpay_order_id: data.razorpay_order_id,
          rpay_payment_id: data.razorpay_payment_id,
          rpay_signature: data.razorpay_signature,
          token: auth.token,
        })
          .then(res => {
            authService.subScribeToPaid();
            console.log(`Payment Response =>${res.data}`);
          })
          .catch(e => {
            console.log(`Payment Error${e}`);
          });
      })
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description.error}`);
        alert(`Payment Canelled by user.`);
      });
  }
};
const paymentVerification = async ({
  package_id,
  rpay_order_id,
  rpay_payment_id,
  rpay_signature,
  token,
}) => {
  const response = await axios.post(
    'http://btsignals.in/api/payment-verification',
    {
      package_id: package_id,
      rpay_order_id: rpay_order_id,
      rpay_payment_id: rpay_payment_id,
      rpay_signature: rpay_signature,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  return response.data;
};

const PackageComponent = ({item, token, setWait}) => {
  const auth = useSelector(state => state.auth);
  return (
    <View style={{backgroundColor: '#fefefe', margin: 10}}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          alignItems: 'center',
          backgroundColor: '#ffe01a',
        }}>
        <Text
          style={{
            color: '#2d2d2d',
            fontFamily: 'Mulish Bold',
            fontSize: 16,
          }}>
          {item.title}
        </Text>
      </View>

      <View style={{marginHorizontal: 10, marginTop: 10, alignItems: 'center'}}>
        <Text
          style={{
            color: '#2d2d2d',
            fontFamily: 'Mulish Regular',
            fontSize: 13,
            textAlign: 'justify',
          }}>
          {item.description}
        </Text>
      </View>

      <View style={{margin: 10, borderRadius: 10}}>
        <Image
          source={{uri: `http://btsignals.in/storage/app/files/${item.image}`}}
          resizeMode="contain"
          style={styles.scanImage}
        />
      </View>
      <View>
        <View style={styles.row}>
          <LinearGradient colors={['#00461f', '#111']} style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>
              {' '}
              {`Price : ₹ ${item.price}`}{' '}
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={['#ffe01a', '#fff3a6']}
            style={styles.loginBtn}>
            <Text style={[styles.loginBtnText, {color: '#080701'}]}>
              {' '}
              {item.exchange}
            </Text>
          </LinearGradient>
        </View>
      </View>
      <LinearGradient colors={['#ffe01a', '#fff3a6']}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 15,
            marginTop: 15,
          }}
          onPress={() => {
            setWait(true);
            paymentServices
              .generateOrderId({token: token, packageId: item.id})
              .then(res => {
                // console.log(res.data.order_id);
                setWait(false);
                makePayment({
                  order_id: res.data.order_id,
                  auth: auth,
                  packageId: item.id,
                });
              })
              .catch(e => {
                setWait(false);
              });
          }}>
          <Text
            style={{
              color: '#2d2d2d',
              fontFamily: 'Mulish Bold',
              fontSize: 17,
            }}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
export default PackageComponent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
  scanImage: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
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
  row: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
