import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

import TimeShow from '../booking/TimeShow';
import CategoryRoom from './CategoryRoom';
import Colors from '../../constants/Colors';

const RoomList = props => {

  const resultSelectedRoom = useSelector(state => state.rooms.rooms);
  // const selectedBooking = useSelector(state => state.booking.booking);

  const renderRoomItem = itemData => {
    //isFavourite return true || false .
    const isFavourite = resultSelectedRoom.some(room => room.id === itemData.item.id);
    const isTimeShow = resultSelectedRoom.find(room => room.id === itemData.item.id)
    console.log(`LV *0 = ${JSON.stringify(isTimeShow.timeSteps)}`);

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
        <View style={styles.roomStatusContainer}>
          <Text>Status : {itemData.item.roomDisableStatus ?
            (
              <Text style={{ color: Colors.danger }}>Close</Text>
            ) :
            (
              <Text style={{ color: Colors.primary }}>Open</Text>
            )}
          </Text>
          {/* 
          *callback and pass value renderIsTimeShow to Roomlist*
          */}
          <RoomList
            renderIsTimeShow={isTimeShow.timeSteps}
          />

        </View>
      </CategoryRoom>
    );
  };


  return (
    <View style={styles.list}>
      {props.children}

      {/* children of BookingRoomScreen 
      * parent of renderRoomItem function
      */}
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        listKey={(item) => 'A' + (index + item.id).toString()}
        renderItem={renderRoomItem}
        style={{ width: '95%' }}
      />

      {/* children of BookingRoomScreen 
      *parent of TimeShow Component
      */}
      <FlatList
        data={props.renderIsTimeShow}
        keyExtractor={item => item.id}
        listKey={(item) => 'B' + (index + item.id).toString()}
        numColumns={5}
        renderItem={itemData => (
          <TimeShow
            timeShowValues={itemData.item.number}
            timeShowStatus={itemData.item.status}
          />
        )}
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
