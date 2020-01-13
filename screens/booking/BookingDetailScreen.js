import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';

import TimeButtonItem from '../../components/booking/TimeButtonItem';

const BookingDetailScreen = props => {

    const roomId = props.navigation.getParam('roomId');
    const availableRoom = useSelector(state => state.rooms.rooms);
    const selectRooms = availableRoom.find(room => room.id === roomId);
    return (
        <ScrollView>
            <View >
                <Image style={{ width: '100%', height: '100%' }} source={{ uri: selectRooms.imageUri }} />
                <Text>{selectRooms.timeTitle}</Text>
                <View style={{ ...styles.mealrow, ...styles.mealDatail }}>
                    {selectRooms.timeSteps.map(timeItems => (
                        <TimeButtonItem
                            key={timeItems}
                            time={timeItems}
                        />
                    ))}
                </View>
            </View>

        </ScrollView>
    )
}

BookingDetailScreen.navigationOptions = navData => {
    const roomTitle = navData.navigation.getParam('roomTitle')
    return {
        headerTitle: roomTitle
    }
}

const styles = StyleSheet.create({
    bgImage: {
        height: '100%',
        width: '100%',
    },
    mealDatail: {
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    },
    mealrow: {
        flexDirection: 'row',
    },
})

export default BookingDetailScreen;
