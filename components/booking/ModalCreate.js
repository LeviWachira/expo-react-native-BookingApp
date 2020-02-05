import React, { useEffect, useState, useReducer, useCallback } from 'react';
import {
    View,
    Text,
    Modal,
    Alert,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { CATEGORYROOM } from '../../data/dummy-data';
import * as roomActions from '../../store/action/room';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const ModalCreate = props => {

    const selectedMode = CATEGORYROOM.find(room => room.id === props.selectedButton);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: '',
            imageUrl: '',
        },
        inputValidities: {
            title: false,
            imageUrl: false,
        },
        formIsValid: false
    });

    const submitHandler = useCallback(async () => {

        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        // console.log(`create succes`);
        await dispatch(roomActions.createRoom(
            Math.random().toString(),
            props.selectedButton,
            formState.inputValues.title,
            'https://library.tu.ac.th/sites/default/files/styles/punsarn_image_style/public/2018-10/03Room1-1.JPG?itok=qlNQqd3-',
            '120 mins',
            [
                { number: 25, status: true },
                { number: 26, status: true },
                { number: 12, status: true },
                { number: 14, status: true },
                { number: 16, status: true }
            ],
        ))
        await props.loadedRooms();
        props.setIsModalVisible();
    }, [formState]);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <Modal
            visible={props.isModalVisible}
            animationType='slide'
            transparent={true}
        >
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={15}
            >
                <ScrollView >
                    <View style={{ ...styles.screen, ...props.style }}>

                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>Create Room</Text>
                        </View>

                        <View style={styles.textInputContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.textTitle}>Mode :</Text>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ color: Colors.textSecondary }}>
                                        {selectedMode && JSON.stringify(selectedMode.title).split('"')}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.textTitle}>Title :</Text>
                                <Input
                                    id="title"
                                    placeholder='Study Room1'
                                    errorText="Please enter a valid title!"
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    autoCorrect
                                    returnKeyType="next"
                                    onInputChange={inputChangeHandler}
                                    initialValue={''}
                                    initiallyValid={false}
                                    required
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.textTitle}>ImageUrl :</Text>
                                <Input
                                    id="imageUrl"
                                    placeholder='link url'
                                    errorText="Please enter a valid image url!"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onInputChange={inputChangeHandler}
                                    initialValue={''}
                                    initiallyValid={false}
                                    required
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={{ backgroundColor: Colors.primary }}
                                    onSelect={submitHandler}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </Button>
                                <Button
                                    style={{ backgroundColor: Colors.danger }}
                                    onSelect={props.setIsModalVisible}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 400,
        backgroundColor: 'white',
        marginTop: 80,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.26,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    headerTitle: {
        marginTop: 15,
        alignItems: 'center'
    },
    textInputContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        height: 330,
        width: 280,
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    headerText: {
        color: Colors.primary,
        fontSize: 20
    },
    inputContainer: {
        marginVertical: 10
    },
    textTitle: {
        fontSize: 17,
        marginBottom: 7
    },
    inputTextContainer: {
        borderColor: 'black',
        borderBottomWidth: 1,
        marginTop: 3
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});

export default ModalCreate
