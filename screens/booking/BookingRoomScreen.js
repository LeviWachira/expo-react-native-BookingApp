import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, ActivityIndicator, Button, FlatList } from 'react-native';

import { CATEGORYROOM } from '../../data/dummy-data';
import RoomList from '../../components/booking/RoomList';
import * as roomActions from '../../store/action/room';
import * as bookingActions from '../../store/action/booking';
import Colors from '../../constants/Colors';

const BookingRoomScreen = props => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const catId = props.navigation.getParam('categoryId');
    const availableRooms = useSelector(state => state.rooms.rooms);
    const displayedRooms = availableRooms.filter(room => room.categoryIds.indexOf(catId) >= 0);

    const selectedUserId = useSelector(state => state.auth.userId);
    const selectedBooked = useSelector(state => state.booking.booking);
    const filterUserBookedExisting = selectedBooked.filter(booked => booked.userId === selectedUserId);
    // console.log(`CHECK LV**1 BOOKED = ${JSON.stringify(filterUserBookedExisting)}`);
    const filterUserBookedStatus = filterUserBookedExisting.filter(booked =>
        booked.userBookingStatus === "...Waiting" || booked.userBookingStatus === "APPROVED");
    // console.log(`CHECK LV**2 BOOKED = ${JSON.stringify(filterUserBookedStatus)}`);

    const loadRooms = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(roomActions.fetchRooms());
            await dispatch(bookingActions.fetchBooking());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadRooms);

        return () => {
            willFocusSub.remove();
        };
    }, [loadRooms]);

    useEffect(() => {
        loadRooms();
    }, [dispatch]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error ocurred!</Text>
                <Button
                    title='Try again'
                    onPress={loadRooms}
                    color={Colors.primary}
                />
            </View>
        )
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={Colors.primary} size='large' />
            </View>
        )
    };

    if (!isLoading && availableRooms.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No rooms found. Maybe adding some!</Text>
            </View>
        )
    };

    return (
        <RoomList
            listData={displayedRooms}
            navigation={props.navigation}
            resultSelectedRoom={availableRooms}
            resultSelectedUserBookedStatus={filterUserBookedStatus}
        />
    )
};

BookingRoomScreen.navigationOptions = navData => {
    const catId = navData.navigation.getParam('categoryId');
    const selectCategory = CATEGORYROOM.find(cat => cat.id === catId);

    return {
        headerTitle: selectCategory.title
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BookingRoomScreen;
