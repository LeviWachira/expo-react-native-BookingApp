import { ROOM } from "../../data/dummy-data";

const initialState = {
    rooms: ROOM
}

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default roomsReducer;