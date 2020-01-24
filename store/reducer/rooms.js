import { ROOM } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE, CREATE_ROOM, DELETE_ROOM, ENABLE_ROOM, DISABLE_ROOM } from '../action/room';
import Room from '../../models/room';

const initialState = {
    rooms: [],
    favouriteRooms: []
}

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ROOM:
            const newRoom = new Room(
                action.roomData.id,
                action.roomData.categoryIds,
                action.roomData.title,
                action.roomData.imageUri,
                action.roomData.timeTitle,
                action.roomData.timeSteps,
            )
            console.log(`Lv1 = ${JSON.stringify(newRoom)}`);

            return {
                ...state,
                rooms: state.rooms.concat(newRoom)
            };

        case ENABLE_ROOM:

            const selectedIndex = state.rooms.findIndex(room => room.id === action.roomData.roomId)
            console.log(`ENBR1 = ${JSON.stringify(selectedIndex)}}`);
            const updateRoomStatus = new Room(
                state.rooms[selectedIndex].id,
                state.rooms[selectedIndex].categoryIds,
                state.rooms[selectedIndex].title,
                state.rooms[selectedIndex].imageUri,
                state.rooms[selectedIndex].timeTitle,
                state.rooms[selectedIndex].timeSteps,
                action.roomData.roomStatus
            )
            const seletedUpdateRoomStatus = [...state.rooms];
            seletedUpdateRoomStatus[selectedIndex] = updateRoomStatus;
            console.log(`ENBR2 = ${JSON.stringify(updateRoomStatus)}}`);
            console.log(`ENBR3 = ${JSON.stringify(seletedUpdateRoomStatus)}}`);
            return {
                ...state,
                rooms: seletedUpdateRoomStatus
            };


        case DISABLE_ROOM:
            const selectedDisableIndex = state.rooms.findIndex(room => room.id === action.roomData.roomDisableId)
            console.log(`DABR1 = ${JSON.stringify(selectedDisableIndex)}}`);
            const updateDisableRoomStatus = new Room(
                state.rooms[selectedDisableIndex].id,
                state.rooms[selectedDisableIndex].categoryIds,
                state.rooms[selectedDisableIndex].title,
                state.rooms[selectedDisableIndex].imageUri,
                state.rooms[selectedDisableIndex].timeTitle,
                state.rooms[selectedDisableIndex].timeSteps,
                action.roomData.roomDisableStatus
            )
            const seletedUpdateDisableRoomStatus = [...state.rooms];
            seletedUpdateDisableRoomStatus[selectedDisableIndex] = updateDisableRoomStatus;
            console.log(`DABR2 = ${JSON.stringify(updateRoomStatus)}}`);
            console.log(`DABR3 = ${JSON.stringify(seletedUpdateDisableRoomStatus)}}`);
            return {
                ...state,
                rooms: seletedUpdateDisableRoomStatus
            };

        case DELETE_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter(room => room.id !== action.roomId)
            };

        case TOGGLE_FAVOURITE:
            const existingIndex = state.favouriteRooms.findIndex(room => room.id === action.roomId);
            if (existingIndex >= 0) {
                const updateFavRooms = [...state.favouriteRooms];
                updateFavRooms.splice(existingIndex, 1);
                return { ...state, favouriteRooms: updateFavRooms }
            } else {
                const rooms = state.rooms.find(room => room.id === action.roomId);
                return { ...state, favouriteRooms: state.favouriteRooms.concat(rooms) }
            };

        default:
            return state;
    }
}

export default roomsReducer;