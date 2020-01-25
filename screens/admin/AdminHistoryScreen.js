import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import AdminHistoryStatus from '../../components/admin/AdminHistoryStatus';

const AdminHistoryScreen = props => {

    const selectedHistoryItems = useSelector(state => {
        const tranfromedHistoryItems = [];
        for (const key in state.history.history) {
            tranfromedHistoryItems.push({
                roomHistoryId: state.history.history[key].id,
                roomHistoryStudentName: state.history.history[key].studentName,
                roomHistoryStudentId: state.history.history[key].studentId,
                roomHistoryTitle: state.history.history[key].title,
                roomHistoryTimeTitle: state.history.history[key].timeTitle,
                roomHistorytimeSteps: state.history.history[key].timeSteps,
                roomHistoryDate: state.history.history[key].date,
                roomHistoryApprovalStatus: state.history.history[key].approvalStatus,
            })
        }
        return tranfromedHistoryItems.sort((a, b) => a.roomHistoryDate < b.roomHistoryDate ? 1 : -1);
    });

    return (
        <View style={StyleSheet.screen}>
            <FlatList
                data={selectedHistoryItems}
                keyExtractor={item => item.roomHistoryId}
                renderItem={itemData => (
                    <AdminHistoryStatus
                        roomHistoryId={itemData.item.roomHistoryId}
                        roomHistoryStudentName={itemData.item.roomHistoryStudentName}
                        roomHistoryStudentId={itemData.item.roomHistoryStudentId}
                        roomHistoryTitle={itemData.item.roomHistoryTitle}
                        roomHistoryTimeTitle={itemData.item.roomHistoryTimeTitle}
                        roomHistorytimeSteps={itemData.item.roomHistorytimeSteps}
                        roomHistoryDate={itemData.item.roomHistoryDate}
                        roomHistoryApprovalStatus={itemData.item.roomHistoryApprovalStatus}
                    />
                )}
            />
        </View>
    )
};

AdminHistoryScreen.navigationOptions = navData => {
    return {
        headerTitle: 'History'
    }
};

const style = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screen: {
        flex: 1
    }
})
export default AdminHistoryScreen;
