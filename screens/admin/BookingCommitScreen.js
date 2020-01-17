import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const BookingCommit = props => {

    // state.booking.booking
    const bookingItems = useSelector(state => {
        const tranformedBookingItems = [];
        for (const key in state.booking.booking) {
            tranformedBookingItems.push({
                roomId: key,
                roomTitle: state.booking.booking[key].title,
                roomTimeTitle: state.booking.booking[key].timeTitle,
                roomtimeSteps: state.booking.booking[key].timeSteps,
            })
        }
        return tranformedBookingItems.sort((a, b) => a.roomId > b.roomId ? 1 : -1);
    })
    console.log(`bookingItems = ${JSON.stringify(bookingItems)}`);


    return (
        <View>
            <Text>Admin Screen</Text>
            <FlatList
                data={bookingItems}
                keyExtractor={item => item.roomId}
                renderItem={itemData => (
                    <View>
                        <Text>{itemData.item.roomTitle}</Text>
                        <Text>{itemData.item.roomTimeTitle}</Text>
                        <Text>{itemData.item.roomtimeSteps}</Text>
                    </View>
                )}
            />
        </View>
    )
};



export default BookingCommit;
