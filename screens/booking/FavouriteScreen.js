import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import RoomList from '../../components/booking/RoomList';

const FavouriteScreen = props => {

    const favRoom = useSelector(state => state.rooms.favouriteRooms);

    if (favRoom.length === 0) {
        return (
            <View style={styles.content}>
                <Text>No favourite meals found. Start adding some!</Text>
            </View>
        );
    };

    return (
        <RoomList
            listData={favRoom}
            navigation={props.navigation}
        />
    );
};

FavouriteScreen.navigationOptions = {
    headerTitle: 'Favourite'
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavouriteScreen;
