import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as bookingActions from '../../store/action/booking';
import Card from '../../components/UI/Card';

const BookingCommit = props => {

    const bookingItems = useSelector(state => {
        const tranformedBookingItems = [];
        for (const key in state.booking.booking) {
            tranformedBookingItems.push({
                roomId: state.booking.booking[key].id,
                roomTitle: state.booking.booking[key].title,
                roomTimeTitle: state.booking.booking[key].timeTitle,
                roomtimeSteps: state.booking.booking[key].timeSteps,
            })
        }
        return tranformedBookingItems.sort((a, b) => a.roomId > b.roomId ? 1 : -1);
    })
    console.log(`lv2 = ${JSON.stringify(bookingItems)}`);

    const dispatch = useDispatch();

    const onCancelCommit = (rid) => {
        dispatch(bookingActions.removeFromBooking(rid));
    };


    return (

        <View style={styles.screen}>
            <FlatList
                data={bookingItems}
                keyExtractor={item => item.roomId}
                renderItem={itemData => (
                    <Card style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text><Text style={styles.text}>Room: </Text>{itemData.item.roomTitle}</Text>
                            <Text><Text style={styles.text}>Timelimit: </Text>{itemData.item.roomTimeTitle}</Text>
                            <Text><Text style={styles.text}>Time: </Text>{itemData.item.roomtimeSteps}<Text>.00-{(itemData.item.roomtimeSteps) + 1}.00</Text></Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { }}>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-checkmark-circle' : 'ios-checkmark-circle'}
                                    size={35}
                                    color='#4169E1'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { onCancelCommit(itemData.item.roomId) }}>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-close-circle' : 'ios-close-circle'}
                                    size={35}
                                    color='red'
                                />
                            </TouchableOpacity>
                        </View>
                    </Card>
                )}
            />
        </View>
    )
};

BookingCommit.navigationOptions = {
    headerTitle: 'Admin'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 5
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 5
    },
    textContainer: {
        justifyContent: 'center',
        height: 80,
        width: 180,
        marginVertical: 10,
        marginHorizontal: 10,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4169E1'
    },
    buttonContainer: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }

})


export default BookingCommit;
