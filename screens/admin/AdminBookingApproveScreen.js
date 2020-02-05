import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Platform,
    Switch,
    ActivityIndicator,
    Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as bookingActions from '../../store/action/booking';
import * as roomActions from '../../store/action/room';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import AdminApproveMode from '../../components/booking/AdminApproveMode';

const BookingCommit = props => {

    const [isAutoApprove, setIsAutoApprove] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    /*
    * this callback funtion When first render and after handler dispatch.
    */
    const loadedBooking = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(bookingActions.fetchBooking());
            await dispatch(roomActions.fetchRooms());
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading, loadedBooking])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadedBooking)

        return () => {
            willFocusSub.remove();
        }
    }, [loadedBooking])

    useEffect(() => {
        loadedBooking();
    }, [dispatch]);

    /* selectedRoom for handler update admin denided timeShow status */
    const selectedRoom = useSelector(state => state.rooms.rooms);
    // console.log(`ADMIN *0 = ${selectedRoom}`);

    /* selectedBooking for handler update admin update status */
    const selectedBooking = useSelector(state => state.booking.booking);
    const bookingItems = useSelector(state => {
        const tranformedBookingItems = [];
        for (const key in state.booking.booking) {
            tranformedBookingItems.push({
                roomId: state.booking.booking[key].id,
                roomStudentName: state.booking.booking[key].studentName,
                roomStudentId: state.booking.booking[key].studentId,
                roomTitle: state.booking.booking[key].title,
                roomTimeTitle: state.booking.booking[key].timeTitle,
                roomTimeUserSelected: state.booking.booking[key].timeUserSelected,
                roomDate: state.booking.booking[key].date,
                roomUserBookingStatus: state.booking.booking[key].userBookingStatus,
                roomUserId: state.booking.booking[key].userId
            })
        }
        return tranformedBookingItems.filter(booking => booking.roomUserBookingStatus === "...Waiting")
            .sort((a, b) => a.roomDate < b.roomDate ? 1 : -1);
    })
    console.log(`SELECTING_BOOKING = ${JSON.stringify(selectedBooking)}`);
    // console.log(`ADMINBOOKING = ${JSON.stringify(bookingItems)}`);

    if (error) {
        return (
            <View style={styles.centeredText}>
                <Text>An error ocurred!</Text>
                <Button
                    title='Try again'
                    onPress={loadedBooking}
                    color={Colors.primary}
                />
            </View>
        )
    };

    if (isLoading) {
        return (
            <View style={styles.centeredText}>
                <ActivityIndicator color={Colors.primary} size='large' />
            </View>
        )
    };

    if (!isLoading && selectedBooking.length === 0) {
        return (
            <View style={styles.centered}>
                <View style={{ marginVertical: 10, marginLeft: 20 }}>
                    <Text style={{ color: Colors.textSecondary, fontSize: 13 }}>APPROVE</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>Auto</Text>
                    <Switch
                        value={isAutoApprove}
                        onValueChange={prev => setIsAutoApprove(prev)}
                        trackColor={{ true: Colors.primary }}
                        thumbColor={Platform.OS === 'android' ? 'white' : ''}
                    />
                </View>
                {isAutoApprove ?
                    (
                        <View style={styles.centeredText}>
                            <Text>Auto approve mode.</Text>
                        </View>
                    ) :
                    (
                        <View style={styles.centeredText}>
                            <Text>No ,booking from users yet.</Text>
                        </View>
                    )

                }
            </View>
        )
    };

    /*
     * this render bookingItems data of flatlist and pass values props to AdminApproveMode component.
     */
    const renderBookingItems = (itemData) => {

        const resultSelectedRoom = selectedRoom.find(room => room.title === itemData.item.roomTitle);
        console.log(`ADMIN *1 = ${JSON.stringify(resultSelectedRoom.timeSteps)}`);
        console.log(`ADMIN *1.1 = ${JSON.stringify(resultSelectedRoom.id)}`);

        return (
            <AdminApproveMode
                /* handler user booking and dispatch */
                roomId={itemData.item.roomId}
                roomStudentName={itemData.item.roomStudentName}
                roomStudentId={itemData.item.roomStudentId}
                roomTitle={itemData.item.roomTitle}
                roomTimeTitle={itemData.item.roomTimeTitle}
                roomTimeUserSelected={itemData.item.roomTimeUserSelected}
                roomDate={itemData.item.roomDate}
                roomUserBookingStatus={itemData.item.roomUserBookingStatus}
                roomUserId={itemData.item.roomUserId}
                isAutoApprove={isAutoApprove}
                loadedBooking={loadedBooking}
                selectedBooking={selectedBooking}

                /* handler update timeSteps status when admin is denided  booking form user */
                resultUpdateRoomStatusId={resultSelectedRoom.id}
                resultUpdateRoomStatusTime={resultSelectedRoom.timeSteps}
            />
        )
    };

    /*
    *this is parent component of AdminApproveMode component.
     */
    return (

        <View style={styles.screen}>
            <View style={{ marginVertical: 10, marginLeft: 20 }}>
                <Text style={{ color: Colors.textSecondary, fontSize: 13 }}>APPROVE MODE</Text>
            </View>
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Auto</Text>
                <Switch
                    value={isAutoApprove}
                    onValueChange={prev => setIsAutoApprove(prev)}
                    trackColor={{ true: Colors.primary }}
                    thumbColor={Platform.OS === 'android' ? 'white' : ''}
                />
            </View>
            <FlatList
                data={bookingItems}
                keyExtractor={item => item.roomId}
                renderItem={renderBookingItems}
            />
        </View>
    )
};

BookingCommit.navigationOptions = navData => {

    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Back"
                    iconName='ios-arrow-back'
                    onPress={() => {
                        navData.navigation.navigate('Booking');
                    }}
                />
            </HeaderButtons>
        ),
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
    },
    centeredText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 175
    },
    screen: {
        flex: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    switchText: {
        fontSize: 18
    },
});


export default BookingCommit;
