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
import Colors from '../../constants/Colors';

const BookingDetailScreen = props => {
    const dispatch = useDispatch();

    /* Handler Category Room */
    const roomId = props.navigation.getParam('roomId');
    const roomTitle = props.navigation.getParam('roomTitle');
    const availableRoom = useSelector(state => state.rooms.rooms);
    const selectRooms = availableRoom.find(room => room.id === roomId);


    /* Handler Favourite Room */
    const currentRoomsFavourite = useSelector(state =>
        state.rooms.favouriteRooms.some(room => room.id === roomId)
    );

    const toggleFavouriteHandle = useCallback(() => {
        dispatch(toggleFavourite(roomId));
    }, [dispatch, roomId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavouriteHandle })
    }, [toggleFavouriteHandle]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentRoomsFavourite })
    }, [currentRoomsFavourite]);



    console.log(` LV *3 = ${JSON.stringify(selectRooms.timeSteps)}`);

    return (
        <View style={styles.screen}>
            <ImageBackground style={styles.Image} source={{ uri: selectRooms.imageUri }} >
                <View style={styles.timeTitleContainer}>
                    <Text style={styles.timeTitle}>{selectRooms.timeTitle} | Please help to keep it clean.</Text>
                </View>
            </ImageBackground>
            <View>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerTitleText}>{roomTitle}</Text>
                </View>
                <View style={styles.roomDetail}>
                    <FlatList
                        data={selectRooms.timeSteps}
                        keyExtractor={item => item.number.toString()}
                        horizontal={true}
                        renderItem={itemData => (
                            <BookingItem
                                timeShowId={itemData.item.id}
                                navigation={props.navigation}
                                id={selectRooms.id}
                                categoryIds={selectRooms.categoryIds}
                                title={selectRooms.title}
                                imageUri={selectRooms.imageUri}
                                timeTitle={selectRooms.timeTitle}
                                timeShowValues={itemData.item.number}
                                timeShowStatus={itemData.item.status}
                                roomDisableStatus={selectRooms.roomDisableStatus}
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
