import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AdminHistoryStatus from '../../components/admin/AdminHistoryStatus';
import * as bookingActions from '../../store/action/booking';
import Colors from '../../constants/Colors';

const AdminHistoryScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const loadedBookingHistory = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(bookingActions.fetchBooking());
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading, selectedHistoryItems])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadedBookingHistory)

        return () => {
            willFocusSub.remove();
        }
    }, [loadedBookingHistory]);

    useEffect(() => {
        loadedBookingHistory();
    }, [dispatch]);

    const historyItems = useSelector(state => state.booking.booking);
    const selectedHistoryItems = useSelector(state => {
        const tranfromedHistoryItems = [];
        for (const key in state.booking.booking) {
            tranfromedHistoryItems.push({
                roomHistoryId: state.booking.booking[key].id,
                roomHistoryStudentName: state.booking.booking[key].studentName,
                roomHistoryStudentId: state.booking.booking[key].studentId,
                roomHistoryTitle: state.booking.booking[key].title,
                roomHistoryTimeTitle: state.booking.booking[key].timeTitle,
                roomHistoryTimeUserSelected: state.booking.booking[key].timeUserSelected,
                roomHistoryDate: state.booking.booking[key].date,
                roomHistoryApprovalStatus: state.booking.booking[key].userBookingStatus,
            })
        }
        return tranfromedHistoryItems.sort((a, b) => a.roomHistoryDate < b.roomHistoryDate ? 1 : -1);
    });

    if (error) {
        return (
            <View style={styles.centered}>
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
        <View style={styles.centered}>
            <ActivityIndicator color={Colors.primary} size='large' />
        </View>
    };

    if (historyItems.length === 0) {
        return (
            <View style={styles.centered}>
                <Text >No ,history data from booking yet. </Text>
            </View>
        )
    };

    return (
        <View style={StyleSheet.screen}>
            <FlatList
                data={selectedHistoryItems}
                keyExtractor={item => item.roomHistoryId}
                renderItem={itemData => (
                    <AdminHistoryStatus
                        historyItems={historyItems}
                        roomHistoryId={itemData.item.roomHistoryId}
                        roomHistoryStudentName={itemData.item.roomHistoryStudentName}
                        roomHistoryStudentId={itemData.item.roomHistoryStudentId}
                        roomHistoryTitle={itemData.item.roomHistoryTitle}
                        roomHistoryTimeTitle={itemData.item.roomHistoryTimeTitle}
                        roomHistoryTimeUserSelected={itemData.item.roomHistoryTimeUserSelected}
                        roomHistoryDate={itemData.item.roomHistoryDate}
                        roomHistoryApprovalStatus={itemData.item.roomHistoryApprovalStatus}
                    />
                )}
            />
        </View>
    )
};

AdminHistoryScreen.navigationOptions = navData => {
    return {
        headerTitle: 'History'
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    screen: {
        flex: 1
    }
})
export default AdminHistoryScreen;
