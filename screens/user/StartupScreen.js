import React, { useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/action/auth';
import Colors from '../../constants/Colors';

const StartupScreen = props => {
    const dispatch = useDispatch();

    const tryLoging = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            props.navigation.navigate('Auth');
            return;
        }

        const tranformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = tranformedData;
        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
            props.navigation.navigate('Auth');
            return;
        };

        const expirationTime = expirationDate.getTime() - new Date().getTime();

        props.navigation.navigate('Booking');
        dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    useEffect(() => {
        tryLoging();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen;
