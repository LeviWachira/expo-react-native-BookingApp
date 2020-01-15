import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'

const TimeButtonItem = props => {
    return (
        <View >
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.font} numberOfLines={2} >{props.time}<Text>.00</Text></Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#ccc',
        backgroundColor: '#4169E1',
        height: '10%',
        marginHorizontal: 10,
        paddingVertical: 4,
        paddingHorizontal: 5,
    },
    font: {
        fontSize: 16,
        color: 'white'
    }

})

export default TimeButtonItem;
