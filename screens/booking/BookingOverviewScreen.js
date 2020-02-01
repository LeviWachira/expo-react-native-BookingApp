import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORYROOM } from '../../data/dummy-data';
import CategoryRoom from '../../components/booking/CategoryRoom';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const BookingOverviewScreen = props => {
    // let selectedAdmin
    const selectedCheckAdmin = useSelector(state => state.auth.userId === "no1kvaHVbLeK3sg63De7S3uTSym2")

    useEffect(() => {
        props.navigation.setParams({ isAdmin: selectedCheckAdmin })
    }, [selectedCheckAdmin])

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
    const isAdmin = navData.navigation.getParam('isAdmin')

    return {
        headerTitle: 'Booking',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Setting"
                    iconName='ios-settings'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                {isAdmin &&
                    <Item
                        title='Qrcode'
                        iconName='ios-contact'
                        onPress={() => navData.navigation.navigate('Admin')}
                    />
                }
            </HeaderButtons>

        ),
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
