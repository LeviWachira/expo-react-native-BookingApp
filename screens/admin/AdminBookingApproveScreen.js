import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Platform,
    Switch
} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import AdminApproveMode from '../../components/booking/AdminApproveMode';

const BookingCommit = props => {

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
                roomTimeSteps: state.booking.booking[key].timeSteps,
                roomDate: state.booking.booking[key].date
            })
        }
        return tranformedBookingItems.sort((a, b) => a.roomDate < b.roomDate ? 1 : -1);
    })
    console.log(`lv3 fecthBooking = ${JSON.stringify(bookingItems)}`);

    const [isAutoApprove, setIsAutoApprove] = useState(false);

    if (selectedBooking.length === 0) {
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
                        roomTimeSteps={itemData.item.roomTimeSteps}
                        roomDate={itemData.item.roomDate}
                        selectedBooking={selectedBooking}
                        isAutoApprove={isAutoApprove}
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
