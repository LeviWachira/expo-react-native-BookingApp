import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../UI/Card';
import Colors from '../../constants/Colors';
import Button from '../UI/Button';
import * as roomActions from '../../store/action/room';


const CreateRooms = props => {
    const dispatch = useDispatch();
    return (
        <View style={styles.list}>
            <Card style={styles.cardContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>{props.title}</Text>
                </View>
                <Image
                    style={styles.image}
                    resizeMode='contain'
                    source={{ uri: props.imageUri }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        style={{ backgroundColor: Colors.danger }}
                        onSelect={() => {
                            dispatch(roomActions.deleteRoom(props.rid))
                        }}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </Button>
                </View>
            </Card>
        </View>
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
    image: {
        height: 200,
        width: 250
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    textTitle: {
        fontSize: 17,
        color: Colors.textSecondary
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    }
})

export default CreateRooms;
