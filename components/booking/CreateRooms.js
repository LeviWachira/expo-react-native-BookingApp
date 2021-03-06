import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import Card from '../UI/Card';
import Colors from '../../constants/Colors';
import Button from '../UI/Button';
import * as roomActions from '../../store/action/room';


const CreateRooms = props => {

    const dispatch = useDispatch();

    const toggleHandlerDisableRoomStatus = (rid, isDisableRoom = true) => {
        Alert.alert('Are you sure?', 'Do you really want to disable this room?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    await dispatch(roomActions.disableRoom(rid, isDisableRoom));
                    await props.loadedRooms();
                }
            }
        ]);
    };

    const toggleHandlerEnableRoomStatus = (rid, isEnableRoom = false) => {
        Alert.alert('Are you sure?', 'Do you really want to enable this room?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    await dispatch(roomActions.enableRoom(rid, isEnableRoom));
                    await props.loadedRooms();
                }
            }
        ]);
    };

    const toggleHandleronDeleteRoom = (rid) => {
        Alert.alert('Warning!!', 'Do you really want to Delete this room?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    await dispatch(roomActions.deleteRoom(rid));
                    await props.loadedRooms();
                }
            }
        ]);
    };

    console.log(`STATUS ROOM *****1 ${JSON.stringify(props.roomStatus)}`);

    return (
        <View style={styles.list}>
            <Card style={styles.cardContainer}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    <Button
                        onSelect={() => {
                            toggleHandleronDeleteRoom(props.rid);
                        }}
                    >
                        <MaterialIcons
                            name='cancel'
                            size={30}
                            color={Colors.danger}
                        />
                    </Button>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>{props.title}</Text>
                </View>

                <Image
                    style={styles.image}
                    resizeMode='contain'
                    source={{ uri: props.imageUri }}
                />


                <View style={styles.roomStatusContainer}>
                    <Text style={{ fontSize : 15}}>Status : 
                        <Text style={{ ...styles.textStatus, ...{ color: props.roomStatus === false ? Colors.primary : Colors.danger } }}> {props.roomStatus === false ? 'open' : 'close'}</Text></Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        style={{ backgroundColor: props.roomStatus ? Colors.primary : Colors.textSecondary }}
                        onSelect={() => {
                            if (props.roomStatus === false) {
                                toggleHandlerDisableRoomStatus(props.rid);
                            } else {
                                toggleHandlerEnableRoomStatus(props.rid);
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>{props.roomStatus ? 'Enable Room' : 'Disable Room'}</Text>
                    </Button>

                </View>
            </Card>

        </View >
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        flex: 1,
    },
    cardContainer: {
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2
    },
    roomStatusContainer: {
        alignItems: 'center',
        marginVertical: 8
    },
    textStatus: {
        fontSize: 16
    },
    image: {
        height: 200,
        width: 250
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    textTitle: {
        fontSize: 17,
        color: Colors.textSecondary
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    }
})

export default CreateRooms;
