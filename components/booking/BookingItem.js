import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import * as bookingActions from '../../store/action/booking';
import Colors from '../../constants/Colors';

const BookingItem = props => {

    const [disabledButton, setDisabledButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const checkTimeHours = new Date().getHours();
    // console.log(`checktime = ${checkTimeHours}`);
    // console.log(`BOOKING_START = ${JSON.stringify(props.selectRooms)}`);

    useEffect(() => {

        if (checkTimeHours >= props.timeItems) {
            setDisabledButton(true);
            console.log(`เลยเวลาแล้ว`);
        }
        else if (checkTimeHours < props.timeItems) {
            setDisabledButton(false);
            console.log(`ยังไมถึงเวลาโว้ย`);
        }
    })

    const onBookingHandler = () => {
        Alert.alert('Are you sure?', 'Do you really want to Booking this this time?', [
            { text: 'No', style: 'destructive' },
            {
                text: 'Yes',
                style: 'default',
                onPress: () => {
                    dispatch(bookingActions.addToBooking(
                        props.id,
                        props.categoryIds,
                        props.title,
                        props.imageUri,
                        props.timeTitle,
                        props.timeSteps,
                        props.roomDisableStatus,
                        props.timeItems,
                        props.selectRooms
                    ));
                    props.navigation.popToTop();
                }
            }
        ]);
    };


    return (
        <TouchableOpacity
            onPress={onBookingHandler}
            disabled={disabledButton}
        >
            <View style={{ ...styles.button, ...{ backgroundColor: disabledButton ? '#ccc' : '#4169E1' } }}>
                <Text style={styles.font} >{props.timeItems}<Text>.00</Text></Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        width: 60,
        marginHorizontal: 10,
        paddingVertical: 4,
        paddingHorizontal: 6,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20
    },
    font: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }

})

export default BookingItem;
