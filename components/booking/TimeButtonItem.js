import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const TimeButtonItem = props => {
    return (
        <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.font}>{props.time}<Text>.00</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerButton: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'blue',
        marginVertical: 5,
        margin: 10,
        height : '20%',
        marginHorizontal : 4
    },
    font: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }

})

export default TimeButtonItem;
