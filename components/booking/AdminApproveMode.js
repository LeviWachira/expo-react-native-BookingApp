import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
    Button
} from 'react-native'
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as bookingActions from '../../store/action/booking';
import * as qrcodeActions from '../../store/action/qrcode';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AdminApproveMode = props => {

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

    if (props.isAutoApprove) {
        console.log(`is Auto Approve Mode`);
        dispatch(qrcodeActions.setQrcode(props.selectedBooking, props.roomId));
    };
    if (!props.isAutoApprove) {
        console.log(`is Manual Approve Mode`);
    };

    const [isMoreDetail, setIsMoreDetail] = useState(false);

    return (
        <Card style={styles.cardContainer}>
            <View style={{ ...styles.container, ...{ height: isMoreDetail ? 110 : 48} }}>
                <View style={styles.textContainer} >
                    <Text style={styles.textSecondary}><Text style={styles.textPrimary}>room: </Text>{props.roomTitle}</Text>
                    <Text style={styles.textSecondary}><Text style={styles.textPrimary}>time: </Text>{props.roomTimeSteps}
                        <Text>.00-{(props.roomTimeSteps) + 2}.00</Text></Text>

                    {isMoreDetail && (
                        <View>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>name: </Text>{props.roomStudentName}</Text>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>stdId: </Text>{props.roomStudentId}</Text>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>timelimit: </Text>{props.roomTimeTitle}</Text>
                        </View>
                    )}

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { onAdminCommitHandler(props.selectedBooking, props.roomId) }}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-checkmark-circle' : 'ios-checkmark-circle'}
                            size={35}
                            color='#4169E1'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { onCancelCommitHandler(props.roomId) }}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-close-circle' : 'ios-close-circle'}
                            size={35}
                            color='#ffa500'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title={isMoreDetail ? 'hide details' : 'more details'}
                    onPress={() => { setIsMoreDetail(prev => !prev) }}
                    color={Colors.primary}
                />
            </View>
            <View style={styles.date}>
                <Text style={styles.textSecondary}><Text>{props.roomDate}</Text></Text>
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
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
        width: 180,
        marginVertical: 10,
        marginHorizontal: 5,
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
});

export default AdminApproveMode;
