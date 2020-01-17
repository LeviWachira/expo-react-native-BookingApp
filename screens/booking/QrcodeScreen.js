import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrcodeScreen = props => {

    return (
        // <View style={styles.screen}>
        //     <QRCode
        //         value="http://awesome.link.qr"
        //         size={250}
        //     />
        // </View>

        // Try setting `alignItems` to 'flex-start'
        // Try setting `justifyContent` to `flex-end`.
        // Try setting `flexDirection` to `row`.
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexWrap : 'wrap',
                alignContent : 'stretch'
            }}>
            <View style={{ width: '50%', height: 90, backgroundColor: 'powderblue' , }} >
               
            </View>
            <View style={{ width: '50%', height: 90, backgroundColor: 'skyblue'  }} />
            <View style={{ width: '50%', height: 90, backgroundColor: 'steelblue' }} />
            <View style={{ width: '50%', height: 90, backgroundColor: 'skyblue' }} />
            <View style={{ width: '50%', height: 90, backgroundColor: 'steelblue' }} />
            <View style={{ width: '50%', height: 90, backgroundColor: 'skyblue' }} />
            <View style={{ width: '50%', height: 90, backgroundColor: 'steelblue' }} />
            <View style={{ width: '50%', height: 90, backgroundColor: 'skyblue' }} />

        </View>



    );
};

QrcodeScreen.navigationOptions = {
    headerTitle: 'Qrcode'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default QrcodeScreen;
