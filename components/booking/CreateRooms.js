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
                onPress: () => {
                    dispatch(roomActions.enableRoom(rid, isDisableRoom));
                }
            }
        ]);

    }

    const toggleHandlerEnableRoomStatus = (rid, isEnableRoom = false) => {
        Alert.alert('Are you sure?', 'Do you really want to enable this room?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(roomActions.disableRoom(rid, isEnableRoom));

                }
            }
        ]);
    }

    const toggleHandleronDeleteRoom = (rid) => {
        Alert.alert('Warning!!', 'Do you really want to Delete this room?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(roomActions.deleteRoom(rid));
                }
            }
        ]);
    }

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
                            size={35}
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
                    <Text>Status :
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        style={{ backgroundColor: Colors.textSecondary }}
                        onSelect={() => {
                            toggleHandlerDisableRoomStatus(props.rid);
                        }}
                    >
                        <Text style={styles.buttonText}>Disable</Text>
                    </Button>


                    <Button
                        style={{ backgroundColor: Colors.primary }}
                        onSelect={() => {
                            toggleHandlerEnableRoomStatus(props.rid);
                        }}
                    >
                        <Text style={styles.buttonText}>Enable</Text>
                    </Button>

                </View>
            </Card>

        </View >
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    cardContainer: {
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1
    },
    roomStatusContainer: {
        alignItems: 'center',
        marginVertical: 8
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
