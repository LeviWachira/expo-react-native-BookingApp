import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

const Button = (props) => {

    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    };

    return (
        <TouchableComponent onPress={props.onSelect}>
            <View style={{ ...styles.button, ...props.style }}>
                {props.children}
            </View>
        </TouchableComponent>
    )
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
    }
})

export default Button;
