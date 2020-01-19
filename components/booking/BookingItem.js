import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, T } from 'react-native';
import { useDispatch } from 'react-redux';

import * as bookingActions from '../../store/action/booking';

const BookingItem = props => {

    const dispatch = useDispatch();

    const onBookingHandler =  (room, time) => {
        Alert.alert('Are you sure?', 'Do you really want to Booking this this time?', [
            { text: 'No', style: 'destructive' },
            {
                text: 'Yes',
                style: 'default',
                onPress: () => {
                    props.SetIsBooked(true);
                     dispatch(bookingActions.addToBooking(room, time));
                }
            }
        ]);
    };

    return (
        <TouchableOpacity
            onPress={() => {
                onBookingHandler(props.selectRooms, props.timeItems);
            }}
            disabled={props.disabledButton}
        >
            <View style={{ ...styles.button, ...{ backgroundColor: props.isBooked ? '#ccc' : '#4169E1' } }}>
                <Text style={styles.font} >{props.timeItems}<Text>.00</Text></Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        height: 30,
        marginHorizontal: 10,
        paddingVertical: 4,
        paddingHorizontal: 6,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 5
    },
    font: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    }

})

export default BookingItem;
