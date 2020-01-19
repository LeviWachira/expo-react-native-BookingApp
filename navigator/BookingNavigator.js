import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import BookingOverviewScreen from '../screens/booking/BookingOverviewScreen';
import BookingRoomScreen from '../screens/booking/BookingRoomScreen';
import BookingDetailScreen from '../screens/booking/BookingDetailScreen';
import QrcodeScreen from '../screens/booking/QrcodeScreen';
import FavouriteScreen from '../screens/booking/FavouriteScreen';
import BookingCommitScreen from '../screens/admin/BookingCommitScreen'

//handler headerTitle
const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? '#4169E1' : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : '#4169E1'
};

//handler createStackNavigator Booking Screen
const BookingNavigator = createStackNavigator({
    BookingOverView: BookingOverviewScreen,
    BookingRoom: BookingRoomScreen,
    BookingDetail: BookingDetailScreen,
    BookingCommit: BookingCommitScreen,
}, {
    defaultNavigationOptions: defaultNavOptions
});

// const AdminNavigator = createStackNavigator({
// }, {
//     defaultNavigationOptions: defaultNavOptions
// });

//handler createBottomTabNavigator Qrcode Screen
const QrcodeNavigator = createStackNavigator({
    Qrcodes: QrcodeScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

//handler createBottomTabNavigator Favourite Screen
const FavNavigator = createStackNavigator({
    Favourites: FavouriteScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

//handler tabBottomConfig
const tabScreenConfig = {
    Booking: {
        screen: BookingNavigator,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarColor: '#4169E1',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-home'
                        size={23}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Favourite: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favourite',
            tabBarColor: '#4169E1',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-star-outline'
                        size={23}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Notification: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Notification',
            tabBarColor: '#4169E1',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-notifications-outline'
                        size={23}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Qrcode: {
        screen: QrcodeNavigator,
        navigationOptions: {
            tabBarLabel: 'QRcode',
            tabBarColor: '#4169E1',
            tabBarIcon: (tabInfo) => {
                return (
                    <MaterialCommunityIcons
                        name='qrcode-scan'
                        size={23}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    }
};

//handler createBottomTabNavigator
const BookingTabNavigator = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: '#4169E1'
    }
});


export default createAppContainer(BookingTabNavigator);
