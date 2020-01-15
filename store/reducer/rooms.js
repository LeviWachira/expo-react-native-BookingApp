import { ROOM } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE } from '../action/room';

const initialState = {
    rooms: ROOM,
    favouriteRooms: []
}

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            const existingIndex = state.favouriteRooms.findIndex(room => room.favouriteRooms === action.roomId);
            if (existingIndex >= 0) {
                const updateFavRooms = [...state.favouriteRooms];
                updateFavRooms.splice(existingIndex, 1);
                return { ...state, favouriteRooms: updateFavRooms }
            } else {
                const rooms = state.rooms.find(room => room.id === action.roomId);
                return { ...state, favouriteRooms: state.favouriteRooms.concat(rooms) }
            }

        default:
            return state;
    }
}

export default roomsReducer;