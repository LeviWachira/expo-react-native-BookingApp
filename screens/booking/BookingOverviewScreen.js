import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORYROOM } from '../../data/dummy-data';
import CategoryRoom from '../../components/booking/CategoryRoom';
import CustomHeaderButton from '../../components/UI/HeaderButton';

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
        <FlatList
            keyExtractor={(item) => item.id}
            data={CATEGORYROOM}
            renderItem={renderGridItem}
        />
    )
};

BookingOverviewScreen.navigationOptions = navData => {

    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Setting"
                    iconName='account-box'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //         <Item
        //             title='Qrcode'
        //             iconName='account-box'
        //             onPress={() => navData.navigation.navigate('BookingCommit')}
        //         />
        //     </HeaderButtons>
        // ),
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default BookingOverviewScreen;
