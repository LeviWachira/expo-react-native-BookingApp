import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

import CategoryRoom from './CategoryRoom';
import Colors from '../../constants/Colors';

const RoomList = props => {

  const favouriteRoom = useSelector(state => state.rooms.rooms);

  const renderRoomItem = itemData => {
    //isFavourite return true || false .
    const isFavourite = favouriteRoom.some(room => room.id === itemData.item.id);

    // console.log(`LV1 CHECK roomDisableStatus = ${JSON.stringify(itemData.item.roomDisableStatus)}`);
    return (
      <CategoryRoom
        roomDisableStatus={itemData.item.roomDisableStatus}
        style={styles.roomStatusContainer}
        title={itemData.item.title}
        imageUri={itemData.item.imageUri}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'BookingDetail',
            params: {
              roomId: itemData.item.id,
              roomTitle: itemData.item.title,
              isFav: isFavourite
            }
          });
        }} >
        {/* <View style={styles.roomStatusContainer}>
          <Text>Status : {itemData.item.roomDisableStatus ?
            (
              <Text style={{ color: Colors.danger }}>Close</Text>
            ) :
            (
              <Text style={{ color: Colors.primary }}>Open</Text>
            )}
          </Text>
        </View> */}
        <View style={{ flexDirection : 'row' }}>
          {itemData.item.timeSteps.map(timeItems =>
            (
              <Text key={timeItems}>{timeItems}.00 </Text>
            )
          )}
        </View>
      </CategoryRoom>
    );
  };

  return (
    <View style={styles.list}>
      {props.children}
      <FlatList keyExtractor={(item, index) => item.id}
        data={props.listData}
        renderItem={renderRoomItem}
        style={{ width: '95%' }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomStatusContainer: {
    paddingBottom: 10,
  }
})

export default RoomList;
