import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableNativeFeedback,
    Platform,
    Image
} from 'react-native';

import Card from '../UI/Card';


const CategoryRoom = props => {

    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.room}>

            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onSelect} useForeground>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.imageUri }} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    room: {
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '85%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 5
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontWeight: 'bold'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }

})
export default CategoryRoom;
