import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

import CategoryRoom from './CategoryRoom';
const RoomList = props => {

  const renderRoomItem = itemData => {
    return (
      <CategoryRoom
        title={itemData.item.title}
        imageUri={itemData.item.imageUri}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'BookingDetail',
            params: {
              roomId: itemData.item.id,
              roomTitle: itemData.item.title,
            }
          });
        }} />
    );
  };

  return (
    <View style={styles.list}>
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
  }
})

export default RoomList;
