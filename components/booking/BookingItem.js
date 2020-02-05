import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as bookingActions from '../../store/action/booking';
import * as roomActons from '../../store/action/room';
import Colors from '../../constants/Colors';

const BookingItem = props => {

    const [disabledButton, setDisabledButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const checkTimeHours = new Date().getHours();
    // console.log(`checktime = ${checkTimeHours}`);
    // console.log(`BOOKING_START = ${JSON.stringify(props.selectRooms)}`);

    const seletedUserId = useSelector(state => state.auth.userId);
    // console.log(`USER-ID = ${seletedUserId}`);
    // console.log(`JASON-USER-ID = ${JSON.stringify(seletedUserId)}`);

    const selectedBooked = useSelector(state => state.booking.booking);




    // console.log(`USER_BOOKED = ${JSON.stringify(selectedBooked)}`);

    useEffect(() => {
        if (checkTimeHours >= props.timeShowValues) {
            setDisabledButton(true);
            console.log(`เลยเวลาแล้ว`);
        }
        else if (checkTimeHours < props.timeShowValues) {
            setDisabledButton(false);
            console.log(`ยังไมถึงเวลาโว้ย`);
        }
    })

    /*Handler user press booking*/
    const onBookingHandler = () => {
        Alert.alert('Are you sure?', `Do you really want to booking a room ${props.title} at ${props.timeShowValues}.00 am ?`, [
            { text: 'No', style: 'destructive' },
            {
                text: 'Yes',
                style: 'default',
                onPress: async () => {
                    await dispatch(bookingActions.addToBooking(
                        props.id,
                        props.categoryIds,
                        props.title,
                        props.imageUri,
                        props.timeTitle,
                        props.timeSteps,
                        props.roomDisableStatus,
                        props.timeShowValues,
                        props.selectRooms
                    ));
                    await dispatch(roomActons.updateStatusRoom(
                        props.id,
                    ))
                    await props.navigation.popToTop();
                }
            }
        ]);
    };
    // timeShowValues
    // timeShowStatus
    console.log(` LV *4 = ${JSON.stringify(props.timeShowValues)}`);
    console.log(` LV *5 = ${JSON.stringify(props.timeShowStatus)}`);


    return (
        <TouchableOpacity
            onPress={onBookingHandler}
            disabled={disabledButton}
        >
            <View style={{ ...styles.button, ...{ backgroundColor: !disabledButton || !props.timeShowStatus ? Colors.primary : Colors.textSecondary } }}>
                <Text
                    style={styles.font}
                >
                    {`${props.timeShowValues}.00`}
                </Text>
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
        width: 70,
        marginHorizontal: 15,
        paddingVertical: 4,
        paddingHorizontal: 7,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
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
