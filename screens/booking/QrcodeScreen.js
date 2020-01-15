import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrcodeScreen = props => {

    return (
        <View style={styles.screen}>
            <QRCode
                value="http://awesome.link.qr"
                size={250}
            />
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
