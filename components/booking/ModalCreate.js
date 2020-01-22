import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, StyleSheet, TextInput, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import Button from '../UI/Button';
import { CATEGORYROOM } from '../../data/dummy-data';

const ModalCreate = props => {


    const selectedMode = CATEGORYROOM.find(room => room.id === props.selectedButton);

    return (
        <Modal
            visible={props.isModalVisible}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.screen}>

                <View style={styles.headerTitle}>
                    <Text style={styles.headerText}>Create Room</Text>
                </View>

                <View style={styles.textInputContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Mode :</Text>
                        <View style={{ marginTop: 5 }}>
                            {/* <Text style={{ color: Colors.textSecondary }}>{JSON.stringify(selectedMode.title).split('"')}</Text> */}
                            <Text>
                                {selectedMode && JSON.stringify(selectedMode.title).split('"')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Title :</Text>
                        <TextInput
                            style={styles.inputTextContainer}
                            placeholder='Study Room1'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>ImageUrl :</Text>
                        <TextInput
                            style={styles.inputTextContainer}
                            placeholder={`'https://*****'`}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            style={{ backgroundColor: Colors.primary }}
                            onSelect={props.setIsModalVisible}
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

        </Modal>



    )
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 340,
        backgroundColor: 'white',
        marginTop: 100,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.26,
        borderColor: Colors.primary,
        borderWidth: 1
    },
    headerTitle: {
        marginTop: 15,
        alignItems: 'center'
    },
    textInputContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
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
    text: {
        fontSize: 17
    },
    inputTextContainer: {
        borderColor: 'black',
        borderBottomWidth: 1,
        marginTop: 3
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }

})

export default ModalCreate
