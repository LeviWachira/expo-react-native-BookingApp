import React, { useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import * as userActions from '../../store/action/user';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import BookingItem from '../../components/booking/BookingItem';
import Colors from '../../constants/Colors';

const BookingDetailScreen = props => {
    const dispatch = useDispatch();

    /* Handler Category Room */
    const roomId = props.navigation.getParam('roomId');
    const roomTitle = props.navigation.getParam('roomTitle');
    const userBookedStatus = props.navigation.getParam('userBookedStatus');
    // console.log(`CHECK LV**3 BOOKED = ${JSON.stringify(userBookedStatus)}`);

    const availableRoom = useSelector(state => state.rooms.rooms);
    const selectRooms = availableRoom.find(room => room.id === roomId);

    /* Handler Favourite Room */
    // const currentRoomsFavourite = useSelector(state =>
    //     state.rooms.favouriteRooms.some(room => room.id === roomId)
    // );

    // const selectedUserId = useSelector(state => state.id)
    const selectedUserId = useSelector(state => state.auth.userId);
    console.log(`CHECK LV**0 USER ID = ${JSON.stringify(selectedUserId)}`);

    const selectedUserData = useSelector(state => state.user.user)
    const viceSelectedUserData = selectedUserData.filter(data => data.id === selectedUserId);
    console.log(`CHECK LV**1 USER ID = ${JSON.stringify(selectedUserData)}`);
    console.log(`CHECK LV**1 USER ID = ${JSON.stringify(viceSelectedUserData)}`);


    console.log(`CHECK LV**1.1 USER ID = ${JSON.stringify(selectedUserData.id)}`);
    console.log(`CHECK LV**2 USER ID = ${JSON.stringify(selectedUserData.favouriteRoomId)}`);


    const toggleFavouriteHandle = useCallback(() => {
        dispatch(userActions.toggleFavourite(selectedUserData.id, roomId, selectedUserData.favouriteRoomId))
        // dispatch(toggleFavourite(roomId));
    }, [dispatch, roomId, selectedUserData.id, selectedUserData.favouriteRoomId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavouriteHandle })
    }, [toggleFavouriteHandle]);

    // useMemo(() => {
    //     props.navigation.setParams({ isFav: currentRoomsFavourite });
    // }, [currentRoomsFavourite]);

    // console.log(` LV *3 = ${JSON.stringify(selectRooms.timeSteps)}`);

    /*
    *this is parent component of BookingItems component. 
     */
    return (
        <View style={styles.screen}>
            <ImageBackground style={styles.Image} source={{ uri: selectRooms.imageUri }} >
                <View style={styles.timeTitleContainer}>
                    <Text style={styles.timeTitle}>{selectRooms.timeTitle} | Please help to keep it clean.</Text>
                </View>
            </ImageBackground>
            <View>

                <View style={styles.headerTitle}>
                    <Ionicons
                        name='ios-time'
                        size={27}
                        color='white'
                    />
                    <Text style={styles.headerTitleText}>   {roomTitle}</Text>
                </View>

                <View style={styles.roomDetail}>
                    <FlatList
                        data={selectRooms.timeSteps}
                        keyExtractor={item => item.number.toString()}
                        horizontal={true}
                        renderItem={itemData => (
                            <BookingItem
                                selectRooms={selectRooms.timeSteps}
                                timeShowId={itemData.item.id}
                                id={selectRooms.id}
                                categoryIds={selectRooms.categoryIds}
                                title={selectRooms.title}
                                imageUri={selectRooms.imageUri}
                                timeTitle={selectRooms.timeTitle}
                                timeShowValues={itemData.item.number}
                                timeShowStatus={itemData.item.status}
                                roomDisableStatus={selectRooms.roomDisableStatus}
                                navigation={props.navigation}

                                resultUserBookedStatus={userBookedStatus}
                            />
                        )}
                    />

                </View>
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                        alert
                        </Text>
                </View>
            </View>
        </View>
    )
}

BookingDetailScreen.navigationOptions = navData => {
    const roomTitle = navData.navigation.getParam('roomTitle');
    const toggleFavourite = navData.navigation.getParam('toggleFav');
    const isFavourite = navData.navigation.getParam('isFav')

    return {
        headerTitle: roomTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Favourite'
                    iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
                    // iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFavourite}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    Image: {
        height: 250,
        justifyContent: 'flex-end',
    },
    timeTitleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 5
    },
    timeTitle: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
    headerTitle: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 10,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        height: 50
    },
    headerTitleText: {
        fontSize: 19,
        fontWeight: '600',
        color: 'white'
    },
    roomDetail: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        height: 10,
        marginTop: 30,
    },
    warningContainer: {
        marginTop: 60,
        height: 200
    },
    warningText: {
        fontSize: 15,
        color: Colors.danger,
    }
})

export default BookingDetailScreen;
