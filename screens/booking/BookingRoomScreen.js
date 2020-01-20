import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

import { CATEGORYROOM } from '../../data/dummy-data';
import RoomList from '../../components/booking/RoomList';


const BookingRoomScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const availableRooms = useSelector(state => state.rooms.rooms);
    const displayedRooms = availableRooms.filter(room => room.categoryIds.indexOf(catId) >= 0);

    return (
        <RoomList
            listData={displayedRooms}
            navigation={props.navigation}
        />
    )
}

BookingRoomScreen.navigationOptions = navData => {
    const catId = navData.navigation.getParam('categoryId');
    const selectCategory = CATEGORYROOM.find(cat => cat.id === catId);

    return {
        headerTitle: selectCategory.title
    }
}

const styles = StyleSheet.create({

})

export default BookingRoomScreen;
