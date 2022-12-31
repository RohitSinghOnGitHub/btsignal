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
import {useDispatch, useSelector} from 'react-redux';
import {fetchPackages} from '../redux/slices/packageSlice';
import PackageComponent from '../components/PackageComponent';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
const HEIGHT = Dimensions.get('window').height;
const PackageDetails = ({navigation}) => {
  const dispatch = useDispatch();

  const [wait, setWait] = useState(false);
  const {token} = useSelector(state => state.auth);
  const {packages, pending} = useSelector(state => state.packages);
  useEffect(() => {
    dispatch(fetchPackages({token}));
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
            Package Details
          </Text>
        </View>
        {wait && <Loader />}
        <ScrollView>
          {pending === true ? (
            <View
              style={{
                height: HEIGHT * 0.85,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#ffe01a" />
            </View>
          ) : (
            <View>
              {packages.map((item, index) => {
                return (
                  <PackageComponent
                    key={index}
                    item={item}
                    token={token}
                    setWait={setWait}
                  />
                );
              })}

              <View style={{height: 50}} />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PackageDetails;

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
});
