import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import navigationStrings from '../constants/navigationStrings';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {userPurchases} from '../redux/slices/packageSlice';
import {RefreshControl} from 'react-native-gesture-handler';
const HEIGHT = Dimensions.get('window').height;
const MyOrder = ({navigation}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const {user_purchases, pending} = useSelector(state => state.packages);
  useEffect(() => {
    dispatch(userPurchases({token}));
  }, []);
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
            My Order
          </Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                dispatch(userPurchases({token}));
                setRefreshing(false);
              }}
              colors={[`#00ffff`, `#ff1493`, `#ffd700`, `#008000`]}
            />
          }>
          {pending === true ? (
            <View
              style={{
                height: HEIGHT * 0.85,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#ffe01a" />
            </View>
          ) : user_purchases.length > 0 ? (
            <View>
              {user_purchases.map((item, index) => {
                return (
                  <SingleOrder
                    item={item}
                    key={index}
                    navigation={navigation}
                  />
                );
              })}
              <View style={{height: 75}} />
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 700,
              }}>
              <Text style={{color: '#fefefe'}}>No Order Till Now...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const SingleOrder = ({item, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: '#111',
        margin: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <View
        style={{
          padding: 15,
          alignItems: 'center',
          backgroundColor: '#ffe01a',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#2d2d2d',
            fontFamily: 'Mulish Bold',
            fontSize: 12,
          }}>
          Order No :- {item.order_id}
        </Text>
        <Text
          style={{
            color: '#2d2d2d',
            fontFamily: 'Mulish Bold',
            fontSize: 12,
          }}>
          {item.purchase_date}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'Mulish Regular',
          padding: 10,
          fontSize: 13,
          lineHeight: 22,
          color: '#fefefe',
          textAlign: 'center',
          letterSpacing: 1,
        }}>
        Payment Id :- {item.paying_id}
      </Text>
      <View
        style={{
          padding: 15,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopColor: '#727272',
          borderTopWidth: 1,
        }}>
        <Text
          style={{
            color: '#fefefe',
            fontFamily: 'Mulish Bold',
            fontSize: 12,
          }}>
          Package :- {item.title}
        </Text>
        <Text
          style={{
            color: '#fefefe',
            fontFamily: 'Mulish Bold',
            fontSize: 12,
          }}>
          Price :-
          <Text style={{color: '#ffe01a', fontSize: 14}}> {item.price}</Text>
        </Text>
      </View>
      <View
        style={{
          padding: 15,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopColor: '#727272',
          borderTopWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(navigationStrings.TIPS)}>
          <LinearGradient
            colors={['#ffe01a', '#e0ee00']}
            style={styles.loginBtn}>
            <Text style={styles.loginBtnText}> Get Tips </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={{
            color: '#00ff06',
            fontSize: 13,
            fontFamily: 'Mulish Bold',
          }}>
          {item.status}
        </Text>
      </View>
    </View>
  );
};

export default MyOrder;

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
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#2d2d2d',
    fontFamily: 'Mulish Bold',
    fontSize: 12,
    letterSpacing: 0.5,
    //textTransform: 'uppercase'
  },
});
