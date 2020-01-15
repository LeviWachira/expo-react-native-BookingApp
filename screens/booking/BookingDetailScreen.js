import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import TimeButtonItem from '../../components/booking/TimeButtonItem';

const BookingDetailScreen = props => {

    const roomId = props.navigation.getParam('roomId');
    const roomTitle = props.navigation.getParam('roomTitle');
    const availableRoom = useSelector(state => state.rooms.rooms);
    const selectRooms = availableRoom.find(room => room.id === roomId);
    return (
        <View style={styles.screen}>
            <ImageBackground style={styles.Image} source={{ uri: selectRooms.imageUri }} >
                <View style={styles.timeTitleContainer}>
                    <Text style={styles.timeTitle}>{selectRooms.timeTitle} | Please help to keep it clean.</Text>
                </View>
            </ImageBackground>
            <ScrollView  style={styles.container}>
                <View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerTitleText}>{roomTitle}</Text>
                    </View>
                    <View style={styles.roomDetail}>
                        {selectRooms.timeSteps.map(timeItems => (
                            <TimeButtonItem
                                key={timeItems}
                                time={timeItems}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

BookingDetailScreen.navigationOptions = navData => {
    const roomTitle = navData.navigation.getParam('roomTitle');
    return {
        headerTitle: roomTitle
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
    },
    Image: {
        height: 200,
        width: '100%',
        justifyContent: 'flex-end',
    },
    timeTitleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 5
    },
    container: {
        flex: 1
    },
    timeTitle: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
    headerTitle: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 10,
        borderColor: '#D3D3D3',
        backgroundColor: '#D3D3D3'
    },
    headerTitleText: {
        fontSize: 20,
        color: '#4169E1'
    },
    roomDetail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',
        marginVertical: 35,

    },
    warningText: {
        fontSize: 15,
        color: 'red'
    }
})

export default BookingDetailScreen;
