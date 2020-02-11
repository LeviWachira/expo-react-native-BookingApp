import User from "../../models/user";

export const SET_USER_DATA = 'SET_USER_DATA';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

export const fecthUserData = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;

        console.log(`USER DATA *********** = ${JSON.stringify(userId)}`);
        try {
            const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/users/${userId}.json?auth=${token}`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            console.log(`USER DATA **0 = ${JSON.stringify(resData)}`);
            const loadedUserData = [];
            for (const key in resData) {
                loadedUserData.push(
                    new User(
                        key,
                        resData[key].ownerId,
                        resData[key].userOnlineStatus,
                        resData[key].favouriteRooms,
                    )
                );
            }

            console.log(`USER DATA **1 = ${JSON.stringify(loadedUserData)}`);
            dispatch({ type: SET_USER_DATA, userData: loadedUserData });
        } catch (err) {
            throw err;
        }
    }
}

export const signUpUserData = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/users/${userId}/${userId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userOnlineStatus: true,
                ownerId: userId
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        console.log(`FAV ROOM **1 = ${JSON.stringify(resData)}`);

        // dispatch({ type: TOGGLE_FAVOURITE, favouriteRoomsData: resData })
    }
};

export const updateUserData = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/users/${userId}/${userId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userOnlineStatus: true,
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        console.log(`FAV ROOM **1 = ${JSON.stringify(resData)}`);

        // dispatch({ type: TOGGLE_FAVOURITE, favouriteRoomsData: resData })
    }
};

export const toggleFavourite = (favouriteRoomId, resultFavouriteRoomId) => {
    return async (dispatch, getState) => {

        // console.log(`TOGGLEFAV ROOM **0 favRoomId = ${JSON.stringify(favouriteRoomId)}`);
        // console.log(`TOGGLEFAV ROOM **0.1 = ${JSON.stringify(selectedUserId)}`);
        // console.log(`TOGGLEFAV ROOM **0.2 resultPreviousFavRoomId = ${JSON.stringify(resultFavouriteRoomId)}`);

        // const handlerUpdateFavouriteRoom = (favRoomId, resultPreviousFavRoomId) => {

        //     let updateFavouritreRoomId = resultPreviousFavRoomId;

        //     if (updateFavouritreRoomId) {

        //         const favouriteRoomExistingIndex = updateFavouritreRoomId.find(fav => fav.roomId === favRoomId);
        //         const favouriteRoomExistingIndex = updateFavouritreRoomId.findIndex(fav => fav.roomId === favRoomId);
        //         console.log(`RESULT FAVROOM **0 = ${JSON.stringify(favouriteRoomExistingIndex)}`);
        //         console.log(`RESULT FAVROOM **1 = ${JSON.stringify(updateFavouritreRoomId)}`);
        //         if (favouriteRoomExistingIndex >= 0) {
        //             delete updateFavouritreRoomId[favouriteRoomExistingIndex].roomId;
        //             return updateFavouritreRoomId
        //         } else {
        //             updateFavouritreRoomId = updateFavouritreRoomId.concat({ roomId: favRoomId });
        //             return updateFavouritreRoomId
        //         }


        //     } else if (!updateFavouritreRoomId) {
        //         return updateFavouritreRoomId = { roomId: favRoomId }
        //     }

        // };

        // const result = handlerUpdateFavouriteRoom(favouriteRoomId, resultFavouriteRoomId)
        // console.log(`RESULT FAVROOM **3 result = ${JSON.stringify(result)}`);

        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/users/${userId}/${userId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                favouriteRooms: result
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        console.log(`TOGGLEFAV ROOM **1 = ${JSON.stringify(resData)}`);

        dispatch({ type: TOGGLE_FAVOURITE, favouriteRoomsData: resData })
    }
}