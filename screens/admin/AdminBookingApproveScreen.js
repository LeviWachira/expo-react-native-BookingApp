import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
    Switch
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as bookingActions from '../../store/action/booking';
import * as qrcodeActions from '../../store/action/qrcode';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
const BookingCommit = props => {

    const selectedBooking = useSelector(state => state.booking.booking);

    const bookingItems = useSelector(state => {
        const tranformedBookingItems = [];
        for (const key in state.booking.booking) {
            tranformedBookingItems.push({
                roomId: state.booking.booking[key].id,
                roomTitle: state.booking.booking[key].title,
                roomTimeTitle: state.booking.booking[key].timeTitle,
                roomTimeSteps: state.booking.booking[key].timeSteps,
                roomDate: state.booking.booking[key].date
            })
        }
        return tranformedBookingItems.sort((a, b) => a.roomDate < b.roomDate ? 1 : -1);
    })
    // console.log(`lv2 = ${JSON.stringify(bookingItems)}`);
    const [isAutoApprove, setIsAutoApprove] = useState(false);

    const dispatch = useDispatch();

    const onAdminCommitHandler = (roomBooking, rid) => {
        Alert.alert('Are you sure?', 'Do you really want to commit this booking?', [
            { text: 'No', style: 'destructive' },
            {
                text: 'Yes',
                style: 'default',
                onPress: () => {
                    dispatch(qrcodeActions.setQrcode(roomBooking, rid));
                }
            }
        ]);
    };

    const onCancelCommitHandler = (rid) => {
        Alert.alert('Are you sure?', 'Do you really want to not approved this booking?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(bookingActions.removeFromBooking(rid));
                }
            }
        ]);
    };

    if (isAutoApprove) {
        console.log(`is Auto Approve Mode`);
    }

    if (!isAutoApprove) {
        console.log(`is Manual Approve Mode`);
    }

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
                            <Text>No ,booking from user yet.</Text>
                        </View>
                    ) :
                    (
                        <View style={styles.centeredText}>
                            <Text>Auto approve mode.</Text>
                        </View>
                    )
                }
            </View>
        )
    };


    return (

        <View style={styles.screen}>
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
            <FlatList
                data={bookingItems}
                keyExtractor={item => item.roomId}
                renderItem={itemData => (
                    <Card style={styles.cardContainer}>
                        <View style={styles.container}>
                            <View style={styles.textContainer} >
                                <Text style={{ ...styles.textPrimary, ...{ color: Colors.primary } }}>Detail</Text>
                                <Text style={styles.textSecondary}><Text style={styles.textPrimary}>Room: </Text>{itemData.item.roomTitle}</Text>
                                <Text style={styles.textSecondary}><Text style={styles.textPrimary}>Timelimit: </Text>{itemData.item.roomTimeTitle}</Text>
                                <Text style={styles.textSecondary}><Text style={styles.textPrimary}>Time: </Text>{itemData.item.roomTimeSteps}<Text>.00-{(itemData.item.roomTimeSteps) + 1}.00</Text></Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => { onAdminCommitHandler(selectedBooking, itemData.item.roomId) }}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-checkmark-circle' : 'ios-checkmark-circle'}
                                        size={35}
                                        color='#4169E1'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { onCancelCommitHandler(itemData.item.roomId) }}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-close-circle' : 'ios-close-circle'}
                                        size={35}
                                        color='#ffa500'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.textSecondary}><Text>{itemData.item.roomDate}</Text></Text>
                        </View>
                    </Card>
                )}
            />
        </View>
    )
};

BookingCommit.navigationOptions = navData => {
    const roomQrcod = navData.navigation.getParam('roomQrcodeId');
    console.log(`Lv : ${roomQrcod}`);

    return {
        headerTitle: roomQrcod,
        headerLeft: (
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
    cardContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
        marginTop: 15
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 5
    },
    textContainer: {
        justifyContent: 'center',
        height: 60,
        width: 180,
        marginVertical: 10,
        marginHorizontal: 10,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    textPrimary: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black'
    },
    textSecondary: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary
    },
    buttonContainer: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    date: {
        alignItems: 'center',
        marginBottom: 5
    }

})


export default BookingCommit;
