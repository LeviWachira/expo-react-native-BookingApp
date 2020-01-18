import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    FlatList
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';


const QrcodeScreen = props => {

    const selectedShowQrcode = useSelector(state => state.qrcode.qrcode)

    // console.log(`Lv6 : ${JSON.stringify(selectedShowQrcode)}`);

    if (selectedShowQrcode.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Please wait , admin commit booking.</Text>
            </View>
        )
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={selectedShowQrcode}
                keyExtractor={(item, index) => item.toString()}
                renderItem={itemData => (
                    <View>
                        <QRCode
                            value={itemData.item.qrcode}
                            size={240}
                        />
                        <Text>{itemData.item.title}</Text>
                        <Text>{itemData.item.timeTitle}</Text>
                        <Text>{itemData.item.timeSteps}.00-{(itemData.item.timeSteps) + 1}.00</Text>
                    </View>
                )}
            />
        </View>
    );
};

QrcodeScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Qrcode'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default QrcodeScreen;
