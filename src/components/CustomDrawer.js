import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/authSlice';

function CustomDrawer(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {name, token} = useSelector(state => state.auth);
  return (
    <View style={{flex: 1, backgroundColor: '#2d2d2d'}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require('../../assets/advertisment-banner.jpg')}
          style={{
            padding: 30,
            marginTop: -5,
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icon/user-icon.jpg')}
            style={styles.drawerStudentImage}
          />
          <Text style={styles.drawerStudentName}>{name}</Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#797979'}}>
        <TouchableOpacity
          onPress={async () => {
            const share = await Share.share({
              message: 'https://btsignals.in/btsignal.apk',
            });
          }}
          style={{
            marginVertical: 15,
            borderBottomColor: '#515151',
            borderBottomWidth: 1,
          }}>
          <View style={{flexDirection: 'row', paddingBottom: 12}}>
            <Ionicons name="share-social-outline" style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Share With Friends</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginVertical: 15,
            borderBottomColor: '#515151',
            borderBottomWidth: 1,
          }}
          onPress={() => {
            navigation.closeDrawer();
            dispatch(logout({token}));
          }}>
          <View style={{flexDirection: 'row', paddingBottom: 12}}>
            <Ionicons name="md-exit-outline" style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerStudentImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: 'yellow',
    borderWidth: 2,
  },
  drawerStudentName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Mulish Bold',
  },
  drawerIcon: {
    fontSize: 20,
    color: '#fefefe',
  },
  drawerText: {
    color: '#fefefe',
    marginLeft: 10,
    fontFamily: 'Mulish Bold',
    letterSpacing: 0.5,
  },
});
