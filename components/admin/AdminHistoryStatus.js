import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AdminHistoryStatus = props => {
    const [isMoreDetail, setIsMoreDetail] = useState(false);

    let selectedColorStatus = Colors.textSecondary;
    if (props.roomHistoryApprovalStatus === "Approved") {
        selectedColorStatus = Colors.primary;
    } else if (props.roomHistoryApprovalStatus === "Denied!!") {
        selectedColorStatus = Colors.danger;
    }


    return (
        <Card style={styles.cardContainer}>
            <View style={{ ...styles.container, ...{ height: isMoreDetail ? 110 : 48 } }}>
                <View style={styles.textContainer} >
                    <Text style={styles.textSecondary}><Text style={styles.textPrimary}>room: </Text>{props.roomHistoryTitle}</Text>
                    <Text style={styles.textSecondary}><Text style={styles.textPrimary}>time: </Text>{props.roomHistoryTimeUserSelected}
                        <Text>.00-{(props.roomHistoryTimeUserSelected) + 2}.00</Text></Text>

                    {isMoreDetail && (
                        <View>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>name: </Text>{props.roomHistoryStudentName}</Text>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>stdId: </Text>{props.roomHistoryStudentId}</Text>
                            <Text style={styles.textSecondary}><Text style={styles.textPrimary}>timelimit: </Text>{props.roomHistoryTimeTitle}</Text>
                        </View>
                    )}

                </View>
                <View style={styles.buttonContainer}>
                    <Text style={{ color: selectedColorStatus }}>{props.roomHistoryApprovalStatus}</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title={isMoreDetail ? 'hide details' : 'more details'}
                    onPress={() => { setIsMoreDetail(prev => !prev) }}
                    color={Colors.primary}
                />
            </View>
            <View style={styles.date}>
                <Text style={styles.textSecondary}><Text>{props.roomHistoryDate}</Text></Text>
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,

    },
    centeredText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 19
    },
    cardContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
        marginTop: 15
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 5
    },
    textContainer: {
        justifyContent: 'center',
        width: 180,
        marginVertical: 10,
        marginHorizontal: 5,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    textPrimary: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black'
    },
    textSecondary: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary
    },
    buttonContainer: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    date: {
        alignItems: 'center',
        marginBottom: 5
    }
})



export default AdminHistoryStatus;
