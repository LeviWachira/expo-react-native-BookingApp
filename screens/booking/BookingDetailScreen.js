import React, { useEffect, useCallback, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ImageBackground,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import BookingItem from '../../components/booking/BookingItem';
import { toggleFavourite } from '../../store/action/room';

const BookingDetailScreen = props => {

    const roomId = props.navigation.getParam('roomId');
    const roomTitle = props.navigation.getParam('roomTitle');
    const availableRoom = useSelector(state => state.rooms.rooms);
    const selectRooms = availableRoom.find(room => room.id === roomId);

    const currentRoomsFavourite = useSelector(state =>
        state.rooms.favouriteRooms.some(room => room.id === roomId)
    );

    const dispatch = useDispatch();

    const toggleFavouriteHandle = useCallback(() => {
        dispatch(toggleFavourite(roomId));
    }, [dispatch, roomId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavouriteHandle })
    }, [toggleFavouriteHandle]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentRoomsFavourite })
    }, [currentRoomsFavourite]);

    const [isBooked, SetIsBooked] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false);

    const booked = useSelector(state => state.booking.booking.filter(book => book.id))

    useEffect(() => {
        if (booked > 0) {
            setDisabledButton(true)
        }
    }, [booked]);

    return (
        <View style={styles.screen}>
            <ImageBackground style={styles.Image} source={{ uri: selectRooms.imageUri }} >
                <View style={styles.timeTitleContainer}>
                    <Text style={styles.timeTitle}>{selectRooms.timeTitle} | Please help to keep it clean.</Text>
                </View>
            </ImageBackground>
            <ScrollView >
                <View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerTitleText}>{roomTitle}</Text>
                    </View>
                    <View style={styles.roomDetail}>
                        {selectRooms.timeSteps.map(timeItems => (
                            <BookingItem
                                key={timeItems}
                                timeItems={timeItems}
                                selectRooms={selectRooms}
                                isBooked={isBooked}
                                SetIsBooked={SetIsBooked}
                                disabledButton={disabledButton}
                                navigation={props.navigation}
                            />
                        ))}
                    </View>
                    <View style={styles.warningContainer}>
                        <Text style={styles.warningText}>
                            alert
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

BookingDetailScreen.navigationOptions = navData => {
    const roomTitle = navData.navigation.getParam('roomTitle');
    const toggleFavourite = navData.navigation.getParam('toggleFav');
    const isFavourite = navData.navigation.getParam('isFav')

    return {
        headerTitle: roomTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Favourite'
                    iconName={isFavourite ? 'star' : 'star-outline'}
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
        height: 200,
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
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 10,
        borderColor: '#D3D3D3',
        backgroundColor: '#D3D3D3',
        height: 50
    },
    headerTitleText: {
        fontSize: 19,
        fontWeight: '600',
        color: '#4169E1'
    },
    roomDetail: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        height: 20,
        marginVertical: 20,
    },
    warningContainer: {
        marginTop: 60,
        height: 200
    },
    warningText: {
        fontSize: 15,
        color: 'red',
    }
})

export default BookingDetailScreen;
