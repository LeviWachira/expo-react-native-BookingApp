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
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import AdminApproveMode from '../../components/booking/AdminApproveMode';

const BookingCommit = props => {

    const [isAutoApprove, setIsAutoApprove] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const loadedBooking = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(bookingActions.fetchBooking());
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
            })
        }
        return tranformedBookingItems.filter(booking => booking.roomUserBookingStatus === "...Waiting")
            .sort((a, b) => a.roomDate < b.roomDate ? 1 : -1);
    })
    console.log(`SELECTING_BOOKING = ${JSON.stringify(selectedBooking)}`);
    console.log(`ADMINBOOKING = ${JSON.stringify(bookingItems)}`);

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
                renderItem={itemData => (
                    <AdminApproveMode
                        roomId={itemData.item.roomId}
                        roomStudentName={itemData.item.roomStudentName}
                        roomStudentId={itemData.item.roomStudentId}
                        roomTitle={itemData.item.roomTitle}
                        roomTimeTitle={itemData.item.roomTimeTitle}
                        roomTimeUserSelected={itemData.item.roomTimeUserSelected}
                        roomDate={itemData.item.roomDate}
                        roomUserBookingStatus={itemData.item.roomUserBookingStatus}
                        selectedBooking={selectedBooking}
                        isAutoApprove={isAutoApprove}
                        loadedBooking={loadedBooking}
                    />
                )}
            />
        </View>
    )
};

BookingCommit.navigationOptions = navData => {

    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Setting"
                    iconName='format-list-bulleted'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
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
