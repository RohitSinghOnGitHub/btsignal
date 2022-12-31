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
import AntDesign from 'react-native-vector-icons/AntDesign';
import TipComponent from '../components/TipComponent';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTips} from '../redux/slices/packageSlice';
import {RefreshControl} from 'react-native-gesture-handler';

const HEIGHT = Dimensions.get('window').height;

const Tips = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useSelector(state => state.auth);
  const {Tips, pending} = useSelector(state => state.packages);
  useEffect(() => {
    dispatch(fetchTips({token}));
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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign name="leftcircleo" color={'#fefefe'} size={20} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fefefe',
              paddingLeft: 10,
              fontFamily: 'Mulish Bold',
              fontSize: 16,
            }}>
            Tips
          </Text>
        </View>
        <ScrollView
          style={{height: HEIGHT * 0.85}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                dispatch(fetchTips({token}));
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
          ) : Tips.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 700,
              }}>
              <Text style={{color: '#fefefe'}}>
                Plan Expired or Not Purchased...
              </Text>
            </View>
          ) : (
            <View>
              {Tips.map((item, index) => {
                return <TipComponent item={item} key={index} />;
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Tips;

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
