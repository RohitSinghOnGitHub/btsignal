import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Home, Header, Tips, MyOrder, Profile, Feedback, PackageDetails, EditProfile, Notification} from '../screens/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen 
                name={navigationStrings.HOME} 
                component={Home} />
        </Stack.Navigator>
    );
}


const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View
            style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderColor: '#fefefe',
                borderWidth: 3,
                backgroundColor: '#ffe01a'
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
);

function TabRoutes(){
    return(
       
            <Tab.Navigator 
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: '#ffe01a',
                    tabBarInactiveTintColor: '#fefefe',
                    tabBarStyle: { backgroundColor: '#000', paddingBottom: 6, paddingTop: 4, height: 52, },
              }}
            >
                <Tab.Screen name="HomeScreen" component={HomeStack} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={25} />
                        ),
                    }}
                />
                <Tab.Screen name="MyOrder" component={MyOrder} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="ios-cart" color={color} size={25} />
                        ),
                    }}
                />
                <Tab.Screen name="Tips" component={Tips} 
                    options={{
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="bulb-sharp" color={'#000'} size={30} />
                        ),
                    }}
                />
                <Tab.Screen name="Feedback" component={Feedback} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="mail-unread-outline" color={color} size={25} />
                        ),
                    }}
                />
                <Tab.Screen name="Profile" component={Profile} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="person" color={color} size={25} />
                        ),
                    }}
                />
            </Tab.Navigator>
        
    )
}

export default TabRoutes

const styles = StyleSheet.create({})