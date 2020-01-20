import React from 'react';
import { Platform, Button, SafeAreaView, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import BookingOverviewScreen from '../screens/booking/BookingOverviewScreen';
import BookingRoomScreen from '../screens/booking/BookingRoomScreen';
import BookingDetailScreen from '../screens/booking/BookingDetailScreen';
import QrcodeScreen from '../screens/booking/QrcodeScreen';
import FavouriteScreen from '../screens/booking/FavouriteScreen';
import AdminBookingApproveScreen from '../screens/admin/AdminBookingApproveScreen';
import AdminCreateRoomScreen from '../screens/admin/AdminCreateRoomScreen';

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
    AdminBookingApprove: AdminBookingApproveScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});


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

//handler user mode
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
                        size={27}
                        color={tabInfo.tintColor}
                    />
                );
            },
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
                        size={27}
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
                        size={28}
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

//handler admin mode
const AdminBookingApproveNavigator = createStackNavigator({
    Approve: AdminBookingApproveScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const AdminCreateRoomNavigator = createStackNavigator({
    HandlerRoom: AdminCreateRoomScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const AdminTabScreenConfig = {
    Approve: {
        screen: AdminBookingApproveNavigator,
        navigationOptions: {
            tabBarLabel: 'Approve',
            tabBarColor: '#4169E1',
            tabBarIcon: (tabInfo) => {
                return (
                    <MaterialCommunityIcons
                        name='checkbox-marked-outline'
                        size={27}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Room: {
        screen: AdminCreateRoomNavigator,
        navigationOptions: {
            tabBarLabel: 'Create',
            tabBarColor: '#4169E1',
            tabBarIcon: (tabInfo) => {
                return (
                    <MaterialCommunityIcons
                        name='home-plus'
                        size={30}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
};

//handler createBottomTabNavigator
const BookingTabNavigator = createBottomTabNavigator(tabScreenConfig, {
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#4169E1',
        showLabel: false
    }
});

const AdminBookingTabNavigator = createBottomTabNavigator(AdminTabScreenConfig, {
    swipeEnabled: true,

    tabBarOptions: {
        activeTintColor: '#4169E1',
        showLabel: false

    }
});


const MainNavigator = createDrawerNavigator(
    {
        Booking: BookingTabNavigator,
        Admin: AdminBookingTabNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItems {...props} />
                        <Button
                            title="Logout"
                            color={Colors.primary}
                            onPress={() => {
                                // dispatch(authActions.logout());
                                // props.navigation.navigate('Auth');
                            }} />
                    </SafeAreaView>
                </View>
            )
        }
    }
);


export default createAppContainer(MainNavigator, BookingTabNavigator);
