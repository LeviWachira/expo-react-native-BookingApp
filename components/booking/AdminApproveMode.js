import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
    Button,
    ActivityIndicator
} from 'react-native'
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as bookingActions from '../../store/action/booking';
import * as qrcodeActions from '../../store/action/qrcode';
import * as roomActions from '../../store/action/room';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AdminApproveMode = props => {

    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
    const [isMoreDetail, setIsMoreDetail] = useState(false);
    const dispatch = useDispatch();

    /*
 * this function handler admin is commit booking from user .
 */
    const onAdminCommitHandler = () => {
        Alert.alert('Are you sure?', 'Do you really want to commit this booking?', [
            { text: 'No', style: 'destructive' },
            {
                text: 'Yes',
                style: 'default',
                onPress: async () => {
                    setIsLoading(true);
                    await dispatch(qrcodeActions.setQrcode(
                        props.roomUserId,
                        props.roomId,
                        `${props.roomId}/${props.roomStudentId}/${props.roomTitle}/${props.roomTimeUserSelected}/${props.roomDate}`,
                    ));
                    props.loadedBooking();
                    setIsLoading(false);
                }
            }
        ]);
    };

    /*
   * this function handler admin is cancel booking from user and update room status.
   */
    const onCancelCommitHandler = () => {
        Alert.alert('Are you sure?', 'Do you really want to not approved this booking?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    setIsLoading(true);
                    await dispatch(bookingActions.removeFromBooking(props.roomUserId, props.roomId));
                    await dispatch(roomActions.updateStatusRoom(
                        props.resultUpdateRoomStatusId,
                        props.roomTimeUserSelected,
                        true,
                        props.resultUpdateRoomStatusTime
                    ));
                    props.loadedBooking();
                    setIsLoading(false);
                }
            }
        ]);
    };


    /*
    * this function callback When admin toggle switch for Auto Approve Mode
    */
    const { loadedBooking, isAutoApprove } = props;
    useEffect(() => {
        if (isAutoApprove) {
            console.log(`is Auto Approve Mode`);
            adminAutoApproved();
        };
    }, [isAutoApprove])
    
    const adminAutoApproved = useCallback(async () => {
        setIsLoading(true);
        await dispatch(qrcodeActions.setQrcode(
            props.roomUserId,
            props.roomId,
            `${props.roomId}/${props.roomStudentId}/${props.roomTitle}/${props.roomTimeUserSelected}/${props.roomDate}`,
        ));
        props.loadedBooking();
        setIsLoading(false);
    }, [dispatch, setIsLoading, isAutoApprove, loadedBooking])

    if (isLoading) {
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator color={Colors.primary} size='small' />
        </View >
    }


    /* 
    *this is children component of AdminApproveScreen.
    */
    return (
        <Card style={styles.cardContainer}>
            <View style={{ ...styles.container, ...{ height: isMoreDetail ? 110 : 48 } }}>
                <View style={styles.textContainer} >
                    <Text style={styles.textSecondary}><Text style={styles.textPrimary}>room: </Text>{props.roomTitle}</Text>
                    <Text style={styles.textSecondary}><Text style={styles.textPrimary}>time: </Text>{props.roomTimeUserSelected}
                        <Text>.00-{(props.roomTimeUserSelected) + 2}.00</Text></Text>

                    {isMoreDetail && (
                        <View>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>name: </Text>{props.roomStudentName}</Text>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>stdId: </Text>{props.roomStudentId}</Text>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>timelimit: </Text>{props.roomTimeTitle}</Text>
                        </View>
                    )}

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onAdminCommitHandler}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-checkmark-circle' : 'ios-checkmark-circle'}
                            size={35}
                            color='#4169E1'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCancelCommitHandler}>
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
