import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as qrcodeActions from '../../store/action/qrcode'
import * as roomActions from '../../store/action/room';
import Colors from '../../constants/Colors';
import QrcodeItem from '../../components/booking/QrcodeItem';


const QrcodeScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const selectedUserId = useSelector(state => state.auth.userId);
    const selectedShowQrcode = useSelector(state => state.qrcode.qrcode.filter(selectQr => selectQr.userId === selectedUserId));
    const resultSelectedShowQrcode = selectedShowQrcode.filter(qrcode => qrcode.userBookingStatus === "APPROVED");


    console.log(`QRCODE **LV1 = ${JSON.stringify(selectedShowQrcode)}`);
    console.log(`QRCODE **LV2 = ${JSON.stringify(resultSelectedShowQrcode)}`);
    // console.log(`QRCODE **LV2.1 = ${Array.isArray(resultSelectedShowQrcode)}`);

    const dispatch = useDispatch();

    const loadedQrcode = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(qrcodeActions.fetchQrcode());
            await dispatch(roomActions.fetchRooms());
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadedQrcode)

        return () => {
            willFocusSub.remove();
        }
    }, [loadedQrcode])

    useEffect(() => {
        loadedQrcode();
    }, [dispatch])

    const onUserCancelBooked = async (bookingId, timeUserSelected, roomId, roomTimeShowSelected) => {
        try {
            setIsLoading(true);
            await dispatch(qrcodeActions.cancelBooked(bookingId));
            await dispatch(roomActions.updateStatusRoom(
                roomId,
                timeUserSelected,
                true,
                roomTimeShowSelected
            ));
            await loadedQrcode();
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const onCancelBooked = (bookingId, timeUserSelected, roomId, roomTimeShowSelected) => {
        Alert.alert('Are you sure?', 'Do you really want to cancel this booked?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    onUserCancelBooked(
                        bookingId,
                        timeUserSelected,
                        roomId,
                        roomTimeShowSelected
                    );
                }
            }
        ]);
    };

    if (isLoading) {
        <View style={styles.centered}>
            <ActivityIndicator color={Colors.primary} size='large' />
        </View>
    };

    if (selectedShowQrcode.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Please wait , Admin commit booking.</Text>
            </View>
        )
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={resultSelectedShowQrcode}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={itemData => (
                    <QrcodeItem
                        bookingId={itemData.item.id}
                        qrcode={itemData.item.qrcode}
                        date={itemData.item.date}
                        studentName={itemData.item.studentName}
                        studentId={itemData.item.studentId}
                        title={itemData.item.title}
                        timeTitle={itemData.item.timeTitle}
                        timeUserSelected={itemData.item.timeUserSelected}
                        resultSelectedShowQrcode={resultSelectedShowQrcode}

                        onCancelBooked={onCancelBooked}
                    />
                )
                }
            />
        </View>
    );
};

QrcodeScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Qrcode'
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'flex-start',
    },

})

export default QrcodeScreen;
