import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Alert,
    Modal
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import CreateRooms from '../../components/booking/CreateRooms';
import Colors from '../../constants/Colors';
import ModalCreate from '../../components/booking/ModalCreate';
import * as roomActions from '../../store/action/room';

const AdminCreateRoom = props => {

    const [selectedButton, setSelectedButton] = useState('');
    const resultAvailableRooms = useSelector(state => state.rooms.rooms);
    const selectCategoryRooms = resultAvailableRooms.filter(room => room.categoryIds === selectedButton);
    const dispatch = useDispatch();

    const [activeStudyRoomButton, setActiveStudyRoomButton] = useState(false);
    const [activeComputerRoomButton, setActiveComputerRoomButton] = useState(false);
    const [activeTheatorRoomButton, setActiveTheatorRoomButton] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    console.log(` ROOM STATUS *****0 = ${JSON.stringify(selectCategoryRooms)}`);

    const loadedRooms = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(roomActions.fetchRooms());

        } catch (err) {

        }
        setIsLoading(false)
    }, [dispatch, setIsLoading]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadedRooms)

        return () => {
            willFocusSub.remove();
        }
    }, [loadedRooms]);

    useEffect(() => {
        loadedRooms();
    }, [dispatch]);

    const onHandlerActiveStudyRoomButton = async () => {
        setIsLoading(true);
        setActiveStudyRoomButton(true);
        setActiveComputerRoomButton(false);
        setActiveTheatorRoomButton(false);
        // console.log(`StudyRoomButton`);
        setSelectedButton('c1')
        setIsLoading(false);
        loadedRooms();
    };

    const onHandlerActiveComputerRoomButton = async () => {
        setIsLoading(true);
        setActiveComputerRoomButton(true);
        setActiveStudyRoomButton(false);
        setActiveTheatorRoomButton(false);
        // console.log(`ComputerRoomButton`);
        setSelectedButton('c2')
        setIsLoading(false);
        loadedRooms();
    };

    const onHandlerActiveTheatorRoomButton = async () => {
        setIsLoading(true);
        setActiveTheatorRoomButton(true);
        setActiveStudyRoomButton(false);
        setActiveComputerRoomButton(false);
        // console.log(`TheatorRoomButton`);
        setSelectedButton('c3')
        setIsLoading(false);
        loadedRooms();
    };

    const onHandleModeVisible = () => {
        setIsModalVisible(false)
    };

    const onHandlerCreatRoom = async () => {
        if (selectedButton === '') {
            Alert.alert('Warning!!', 'Please ,Select mode before push creat room.', [
                { text: 'ok', style: 'default' },
            ]);
        }
        else {
            setIsModalVisible(prev => !prev);
        }
    };


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (isModalVisible) {
        console.log(` isModalVisible === true`);
    };


    return (

        <View style={styles.screen}>

            <View style={{ marginRight: 240, marginVertical: 10 }}>
                <Text style={{ color: Colors.textSecondary, fontSize: 13 }}>MODE</Text>
            </View>

            {/* handler button group */}
            <View style={styles.container}>
                <TouchableOpacity onPress={onHandlerActiveStudyRoomButton} activeOpacity={0.5}>
                    <View style={{
                        ...styles.studyRoomButton,
                        ...{ backgroundColor: activeStudyRoomButton ? Colors.primary : 'white' }
                    }}>
                        <Text style={{
                            ...styles.textButton,
                            ...{ color: activeStudyRoomButton ? 'white' : Colors.primary }
                        }}>Study Room</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandlerActiveComputerRoomButton} activeOpacity={0.5}>
                    <View style={{
                        ...styles.computerRoomButton,
                        ...{ backgroundColor: activeComputerRoomButton ? Colors.primary : 'white' }
                    }}>
                        <Text style={{
                            ...styles.textButton,
                            ...{ color: activeComputerRoomButton ? 'white' : Colors.primary }
                        }}>Computer Room</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandlerActiveTheatorRoomButton} activeOpacity={0.5}>
                    <View style={{
                        ...styles.theartorRoomButton,
                        ...{ backgroundColor: activeTheatorRoomButton ? Colors.primary : 'white' }
                    }}>
                        <Text style={{
                            ...styles.textButton,
                            ...{ color: activeTheatorRoomButton ? 'white' : Colors.primary }
                        }}>Theator Room</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* handler button create room  */}
            <TouchableOpacity onPress={onHandlerCreatRoom} activeOpacity={0.5}>
                <View style={{
                    ...styles.computerRoomButton,
                    ...{ backgroundColor: Colors.primary, flexDirection: 'row', borderRadius: 5, paddingLeft: 10, marginVertical: 5 }
                }}>

                    <View style={styles.createButton}>
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            Create
                        </Text>
                    </View>
                    <View>
                        <Ionicons
                            name='ios-add'
                            size={20}
                            color='white'
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {/* handler modal create room */}
            <ModalCreate
                isModalVisible={isModalVisible}
                setIsModalVisible={onHandleModeVisible}
                selectedButton={selectedButton}
                loadedRooms={loadedRooms}
            />

            {/* handler list item by category */}
            <FlatList
                data={selectCategoryRooms}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <CreateRooms
                        rid={itemData.item.id}
                        title={itemData.item.title}
                        imageUri={itemData.item.imageUri}
                        roomStatus={itemData.item.roomDisableStatus}

                        loadedRooms={loadedRooms}
                    />
                )}
            />

        </View>
    )

}

AdminCreateRoom.navigationOptions = navData => {

    return {
        headerTitle: 'Create',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Back"
                    iconName='ios-arrow-back'
                    onPress={() => {
                        // navData.navigation.toggleDrawer();
                        navData.navigation.navigate('Booking');
                    }}
                />
            </HeaderButtons>
        ),
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //         <Item
        //             title='Create'
        //             iconName='plus'
        //             onPress={() => { }}
        //         />
        //     </HeaderButtons>
        // ),
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        height: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2
    },
    studyRoomButton: {
        height: 40,
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    computerRoomButton: {
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 5,

    },
    theartorRoomButton: {
        height: 40,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7
    },
    textButton: {
        fontWeight: '400'
    },
    createButton: {
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2
    }
})

export default AdminCreateRoom
