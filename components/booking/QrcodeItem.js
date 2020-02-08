import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import Colors from '../../constants/Colors';


const QrcodeItem = props => {

    const selectedRoom = useSelector(state => state.rooms.rooms);
    // console.log(`QRCODE **LV2.3 = ${JSON.stringify(selectedRoom)}`);

    const resultSelectedRoom = selectedRoom.find(room => room.title === props.title)
    // console.log(`QRCODE **LV3.1 = ${JSON.stringify(resultSelectedRoom.timeSteps)}`);
    // console.log(`QRCODE **LV3.2 = ${JSON.stringify(resultSelectedRoom.id)}`);
    // console.log(`QRCODE **LV3.3 = ${JSON.stringify(props.timeUserSelected)}`);
    // console.log(`QRCODE **LV3.4 = ${JSON.stringify(props.bookingId)}`);

    return (
        <View style={styles.screen}>
            <Card style={styles.cardContainer}>
                <View style={styles.ImageQrcode}>
                    <QRCode
                        value={props.qrcode}
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
                        <Text style={styles.textBooked}>{props.date}</Text>
                        <Text style={styles.textBooked}>{props.studentName}</Text>
                        <Text style={styles.textBooked}>{props.studentId}</Text>
                        <Text style={styles.textBooked}>{props.title}</Text>
                        <Text style={styles.textBooked}>{props.timeTitle}</Text>
                        <Text style={styles.textBooked}>{props.timeUserSelected}.00-{(props.timeUserSelected) + 2}.00 am</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => {
                        props.onCancelBooked(
                            props.bookingId,
                            props.timeUserSelected,
                            resultSelectedRoom.id,
                            resultSelectedRoom.timeSteps
                        )
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
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

export default QrcodeItem;
