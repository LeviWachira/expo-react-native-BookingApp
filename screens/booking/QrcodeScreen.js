import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

import * as qrcodeActions from '../../store/action/qrcode'
import * as roomActions from '../../store/action/room';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';


const QrcodeScreen = props => {


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const selectedUserId = useSelector(state => state.auth.userId)
    const selectedShowQrcode = useSelector(state => state.qrcode.qrcode.filter(selectQr => selectQr.userId === selectedUserId));
    const resultSelectedShowQrcode = selectedShowQrcode.filter(qrcode => qrcode.userBookingStatus === "APPROVED");

    console.log(`QRCODE **LV1 = ${JSON.stringify(selectedShowQrcode)}`);
    console.log(`QRCODE **LV2 = ${JSON.stringify(resultSelectedShowQrcode)}`);
    console.log(`QRCODE **LV3 = ${Array.isArray(resultSelectedShowQrcode)}`);

    const dispatch = useDispatch();

    const loadedQrcode = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(qrcodeActions.fetchQrcode());
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

    const onUserCancelBooked = async (roomId) => {
        try {
            setIsLoading(true);
            await dispatch(qrcodeActions.cancelBooked(roomId))
            await loadedQrcode();
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const onCancelBooked = (roomId) => {
        Alert.alert('Are you sure?', 'Do you really want to cancel this booked?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    onUserCancelBooked(roomId);
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
                <Text>Please wait , admin commit booking.</Text>
            </View>
        )
    };

    const renderQrcodeItems = (itemData) => {

        return (
            <Card style={styles.cardContainer}>
                <View style={styles.ImageQrcode}>
                    <QRCode
                        value={itemData.item.qrcode}
                        size={260}
                    />
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detail}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: Colors.primary }}>Detail</Text>
                        <Text style={styles.textDetail}>name:</Text>
                        <Text style={styles.textDetail}>studentId:</Text>
                        <Text style={styles.textDetail}>room:</Text>
                        <Text style={styles.textDetail}>duration:</Text>
                        <Text style={styles.textDetail}>limit: </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textBooked}>{itemData.item.date}</Text>
                        <Text style={styles.textBooked}>{itemData.item.studentName}</Text>
                        <Text style={styles.textBooked}>{itemData.item.studentId}</Text>
                        <Text style={styles.textBooked}>{itemData.item.title}</Text>
                        <Text style={styles.textBooked}>{itemData.item.timeTitle}</Text>
                        <Text style={styles.textBooked}>{itemData.item.timeUserSelected}.00-{(itemData.item.timeUserSelected) + 2}.00 am</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => { onCancelBooked(itemData.item.id) }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={resultSelectedShowQrcode}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderQrcodeItems}
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
    cardContainer: {
        marginVertical: 10,
        marginHorizontal: 4,
        paddingBottom: 10
    },
    ImageQrcode: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
        paddingBottom: 10,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        paddingVertical: 3
    },
    detail: {
        padding: 5
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 5,
        paddingVertical: 3
    },
    textDetail: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 3
    },
    textBooked: {
        fontSize: 15,
        marginVertical: 4,
        color: Colors.textSecondary
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.danger,
        height: 30,
        width: 100,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500'

    }
})

export default QrcodeScreen;
