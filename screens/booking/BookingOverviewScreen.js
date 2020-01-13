import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { CATEGORYROOM } from '../../data/dummy-data';
import CategoryRoom from '../../components/booking/CategoryRoom';

const BookingOverviewScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryRoom
                title={itemData.item.title}
                imageUri={itemData.item.imageUri}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'BookingRoom',
                        params: {
                            categoryId: itemData.item.id
                        }
                    })
                }}
            />
        );
    };

    return (
        <FlatList keyExtractor={(item) => item.id}
            data={CATEGORYROOM}
            renderItem={renderGridItem}
        />
    )
};

BookingOverviewScreen.navigationOptions = {
    headerTitle: 'Booking'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default BookingOverviewScreen;
