import React, { useEffect, useCallback, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as userActions from '../../store/action/user';
import { CATEGORYROOM } from '../../data/dummy-data';
import CategoryRoom from '../../components/booking/CategoryRoom';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const BookingOverviewScreen = props => {
    // let selectedAdmin
    const dispatch = useDispatch();
    const selectedCheckAdmin = useSelector(state => state.auth.userId === "")
    useEffect(() => {
        props.navigation.setParams({ isAdmin: selectedCheckAdmin })
    }, [selectedCheckAdmin])

    const seletedUserData = useSelector(state => state.user.user);
    console.log(`USER DATA **END = ${JSON.stringify(seletedUserData)}`);

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);


    // const selectedUserId = useSelector(state => state.auth.userId);
    // const selectedUserData = useSelector(state => state.user.user);
    // const checkUserExisting = selectedUserData.find(user => user.ownerId === selectedUserId);

    const loadUserData = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(userActions.fecthUserData());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);


    // console.log(`LOGIN 0 = ${JSON.stringify(selectedUserId)}`);
    // console.log(`LOGIN 1 = ${JSON.stringify(checkUserExisting)}`);
    // console.log(`LOGIN 2 = ${JSON.stringify(checkUserExisting.id)}`);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadUserData);

        return () => {
            willFocusSub.remove();
        };
    }, [loadUserData]);

    useEffect(() => {
        setIsLoading(true);
        loadUserData().then(() => {
            setIsLoading(false);
        })
    }, [dispatch, loadUserData]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error ocurred!</Text>
                <Button
                    title='Try again'
                    onPress={loadUserData}
                    color={Colors.primary}
                />
            </View>
        )
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={Colors.primary} size='large' />
            </View>
        )
    };

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
            onRefresh={loadUserData}
            refreshing={isRefreshing}
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BookingOverviewScreen;
