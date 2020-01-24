import { ROOM } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE, CREATE_ROOM, DELETE_ROOM } from '../action/room';
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
                action.roomData.timeSteps
            )
            return {
                ...state,
                rooms: state.rooms.concat(newRoom)
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