import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

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
    Qrcode: QrcodeScreen
}, {
    defaultNavigationOptoions: defaultNavOptions
});

export default createAppContainer(BookingNavigator);
