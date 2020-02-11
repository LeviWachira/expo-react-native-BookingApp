import { SET_USER_DATA, TOGGLE_FAVOURITE } from '../action/user';

const initialState = {
    user: [],
    favouriteRooms: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                user: action.userData
            }

        // case TOGGLE_FAVOURITE:
        //     return {
        //         favouriteRooms: favouriteRooms.concat(filterFavouriteRoomsId)
        //     }

        default:
            return state;
    }
}