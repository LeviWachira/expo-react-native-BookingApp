import React, { useState, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as bookingActions from '../../store/action/booking';
import * as roomActons from '../../store/action/room';
import Colors from '../../constants/Colors';

const BookingItem = props => {

    const [disabledButton, setDisabledButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const checkTimeHours = new Date().getHours();
    const [isUserBookedStatus, setIsUserBookedStatus] = useState(false);

    // console.log(`checktime = ${checkTimeHours}`);
    // console.log(`BOOKING_START = ${JSON.stringify(props.selectRooms)}`);

    /*
     *  this function is handler about check time hour and render.
    */

    const checkRenderTime = () => {
        if (checkTimeHours >= props.timeShowValues || !props.timeShowStatus) {
            setDisabledButton(true);
            // console.log(`เลยเวลาแล้ว`);
        }
        else if (checkTimeHours < props.timeShowValues || props.timeShowStatus) {
            setDisabledButton(false);
            // console.log(`ยังไมถึงเวลาโว้ย`);
        }
    };
    const { resultUserBookedStatus } = props;
    console.log(` LV *CHECK 0 = ${JSON.stringify(resultUserBookedStatus.length)}`);
    const checkRenderBooked = () => {
        if (resultUserBookedStatus.length === 0) {
            setIsUserBookedStatus(false);
        }
        else if (resultUserBookedStatus) {
            setIsUserBookedStatus(true);
        }
    };

    useEffect(() => {
        const resultRender = async () => {
            await checkRenderTime();
            await checkRenderBooked();
        }

        resultRender();
    }, [checkTimeHours, resultUserBookedStatus]);

    // console.log(`LV *4.1 IndexTimeShow = ${JSON.stringify(props.selectRooms)}`);
    // console.log(`LV *4.2 IndexTimeShow = ${JSON.stringify(selectedTimeShowIndex)}`);

    /*
     * handler user press booking
     */
    const onBookingHandler = () => {
        Alert.alert('Are you sure?', `Do you really want to booking a room ${props.title} at ${props.timeShowValues}.00 am ?`, [
            { text: 'No', style: 'destructive' },
            {
                text: 'Yes',
                style: 'default',
                onPress: async () => {
                    setIsLoading(true);
                    await dispatch(bookingActions.addToBooking(
                        props.title,
                        props.timeTitle,
                        props.timeShowValues,
                        props.selectRooms
                    ));
                    await dispatch(roomActons.updateStatusRoom(
                        props.id,
                        props.timeShowValues,
                        false,
                        props.selectRooms
                    ));
                    setIsLoading(false);
                    await props.navigation.popToTop();
                }
            }
        ]);
    };

    /*
     * this working When is loading
     */
    if (isLoading) {
        <View style={styles.centered}>
            <ActivityIndicator color={Colors.primary} size='large' />
        </View>
    }

    // console.log(` LV *CHECK = ${JSON.stringify(isUserBookedStatus)}`);
    // console.log(` LV *5 = ${JSON.stringify(props.timeShowStatus)}`);

    /*
     * this handler render time button 
     */
    let handlerBookedRoom;
    if (isUserBookedStatus) {
        handlerBookedRoom = (
            <TouchableOpacity
                onPress={onBookingHandler}
                disabled={isUserBookedStatus}
            >
                <View style={{ ...styles.button, ...{ backgroundColor: Colors.textSecondary } }}>
                    <Text style={styles.font} >
                        {`${props.timeShowValues}.00`}
                    </Text>
                </View>
            </TouchableOpacity >
        )
    };

    if (!isUserBookedStatus) {
        handlerBookedRoom = (
            <TouchableOpacity
                onPress={onBookingHandler}
                disabled={disabledButton}
            >
                <View style={{ ...styles.button, ...{ backgroundColor: disabledButton ? Colors.textSecondary : Colors.primary } }}>
                    <Text style={styles.font} >
                        {`${props.timeShowValues}.00`}
                    </Text>
                </View>
            </TouchableOpacity >
        )
    };


    /*
    * this component is children of BookingDetailScreen.
    */
    return (
        <View>
            {handlerBookedRoom}
        </View>
    )
};

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        width: 70,
        marginHorizontal: 12,
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
