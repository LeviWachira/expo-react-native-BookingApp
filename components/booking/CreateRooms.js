import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native';

import Card from '../UI/Card';
import Colors from '../../constants/Colors';



const CreateRooms = props => {
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
                <Button
                    title='delete'
                    onPress={() => { }}
                    color={Colors.danger}
                />
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
        borderColor : '#ccc' ,
        borderWidth : 1
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
        fontSize: 17 ,
        color : Colors.textSecondary
    },
})

export default CreateRooms;
