import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {notification} from '../redux/slices/packageSlice';

const Notification = ({navigation}) => {
  const {token} = useSelector(state => state.auth);
  const {notifications} = useSelector(state => state.packages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notification({token}));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.topHeaderBg}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircleo" color={'#fefefe'} size={20} />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle}>Notification</Text>
        </View>
        <ScrollView>
          {notifications.length > 0 ? (
            notifications.map((item, index) => {
              return <Singlenotification item={item} key={index} />;
            })
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 700,
              }}>
              <Text style={{color: '#fefefe'}}>No Notification</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const getDate = date => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
const Singlenotification = ({item}) => {
  return (
    <View style={styles.notificationBox}>
      <View style={styles.NotificationBoxDelete}>
        <Ionicons name="ios-trash-sharp" size={20} color={'#fefefe'} />
      </View>
      <Image
        source={require('../../assets/icon/user-icon.jpg')}
        style={styles.notificationImage}
      />
      <View style={styles.notificationContentBox}>
        <Text style={styles.NotificationHeading}>{item.title}</Text>
        <Text style={styles.NotificationMessage}>{item.description}</Text>
        <Text style={styles.NotificationTime}>
          {getDate(new Date(item.created_at))}
        </Text>
      </View>
    </View>
  );
};

export default Notification;

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
  notificationBox: {
    height: 'auto',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    borderLeftColor: '#A8A9AD',
    borderLeftWidth: 5,
    borderRadius: 10,
    //justifyContent: 'center',
    flexDirection: 'row',
    //alignItems: 'center'
    elevation: 2,
  },
  notificationImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    padding: 5,
    backgroundColor: '#5A28E9',
    borderWidth: 1,
    borderColor: '#A8A9AD',
    //resizeMode: 'center',
  },
  notificationContentBox: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    //flexWrap: 'wrap',
    marginLeft: 10,
    width: '75%',
  },
  NotificationHeading: {
    fontSize: 13,
    fontFamily: 'Mulish Bold',
    color: '#212129',
    flexWrap: 'wrap',
  },
  NotificationMessage: {
    fontSize: 12,
    fontFamily: 'Mulish Regular',
    color: '#949496',
    flexWrap: 'wrap',
    lineHeight: 18,
    marginTop: 5,
  },
  NotificationTime: {
    textAlign: 'right',
    fontFamily: 'Mulish Bold',
    color: '#212121',
    fontSize: 11,
  },
  NotificationBoxDelete: {
    position: 'absolute',
    top: 8,
    right: 6,
  },
  deleteIcon: {
    fontSize: 10,
    color: '#F14D02',
  },
});
