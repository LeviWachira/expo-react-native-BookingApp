import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import BookingOverviewScreen from '../screens/booking/BookingOverviewScreen';
import BookingRoomScreen from '../screens/booking/BookingRoomScreen';
import BookingDetailScreen from '../screens/booking/BookingDetailScreen';
import QrcodeScreen from '../screens/booking/QrcodeScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.accent : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accent
};

const BookingNavigator = createStackNavigator({
    BookingOverView: BookingOverviewScreen,
    BookingRoom: BookingRoomScreen,
    BookingDetail: BookingDetailScreen,
}, {
    defaultNavigationOptoions: defaultNavOptions
});

const QrcodeNavigator = createStackNavigator({
    Qrcodes: QrcodeScreen
}, {
    defaultNavigationOptoions: defaultNavOptions
})


const tabScreenConfig = {
    Booking: {
        screen: BookingNavigator,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarColor: Colors.primaryColor,
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
    Qrcode: {
        screen: QrcodeNavigator,
        navigationOptions: {
            tabBarLabel: 'Qrcode',
            tabBarColor: Colors.orangeColor,
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
}

const BookingTabNavigator = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: 'black'
    }
})


export default createAppContainer(BookingTabNavigator);
