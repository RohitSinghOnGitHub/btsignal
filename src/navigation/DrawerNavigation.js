import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import navigationStrings from '../constants/navigationStrings';
import {TermsConditions, PrivacyPolicy, About} from '../screens/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from '../components/CustomDrawer';
import RefundPolicy from '../screens/RefundPolicy';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#000',
        drawerActiveTintColor: '#fefefe',
        drawerInactiveTintColor: '#fefefe',
        drawerInactiveBackgroundColor: '#2d2d2d',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Mulish Bold',
          fontSize: 12,
          letterSpacing: 1,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabRoutes}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" style={styles.drawerIcon} />
          ),
        }}
      />
      <Drawer.Screen
        name={navigationStrings.ABOUT}
        component={About}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="web" style={styles.drawerIcon} />
          ),
        }}
      />
      <Drawer.Screen
        name={navigationStrings.TERMSCONDITIONS}
        component={TermsConditions}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="alpha-r-box"
              style={styles.drawerIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={navigationStrings.PRIVACYPOLICY}
        component={PrivacyPolicy}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="alpha-p-box"
              style={styles.drawerIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={navigationStrings.REFUNDPOLICY}
        component={RefundPolicy}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="alpha-r-box"
              style={styles.drawerIcon}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawerIcon: {
    fontSize: 22,
    color: '#fefefe',
  },
});
