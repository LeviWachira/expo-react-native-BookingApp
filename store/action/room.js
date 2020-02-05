import Room from '../../models/room';

export const SET_ROOMS = 'SET_ROOMS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';
export const ENABLE_ROOM = 'ENABLE_ROOM';
export const DISABLE_ROOM = 'DISABLE_ROOM';
export const UPDATE_STATUS_ROOM = 'UPDATE_STATUS_ROOM';
// export const ADMIN_DENIDE_BOOKING = 'ADMIN_DENIDE_BOOKING';
// export const USER_CANCEL_BOOKING_ROOM = 'USER_BOOKING_ROOM';

export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const fetchRooms = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-bookingapp-guide.firebaseio.com/rooms.json');

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            console.log(`FETCHR **1 = ${JSON.stringify(resData)}`);
            const loadedRooms = [];
            for (const key in resData) {
                loadedRooms.push(
                    new Room(
                        key,
                        resData[key].categoryIds,
                        resData[key].title,
                        resData[key].imageUri,
                        resData[key].timeTitle,
                        resData[key].timeSteps,
                        resData[key].roomStatus,
                    )
                );
            }

            console.log(`SETR **2 = ${JSON.stringify(loadedRooms)}`);
            dispatch({ type: SET_ROOMS, rooms: loadedRooms });
        } catch (err) {
            throw err;
        }
    };
};

export const createRoom = (
    id,
    categoryIds,
    title,
    imageUri,
    timeTitle,
    timeSteps,
) => {
    // console.log(`categoryIds = ${categoryIds}`);
    // console.log(`title = ${title}`);
    // console.log(`imageUri = ${imageUri}`);
    // console.log(`timeTitle = ${timeTitle}`);
    // console.log(`timeSteps = ${timeSteps}`);
    return async (dispatch, getState) => {

        console.log(`GET-STATE = ${JSON.stringify(getState())}`);
        const token = getState().auth.token;
        const adminId = getState().auth.userId;
        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/rooms.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoryIds,
                title,
                imageUri,
                timeTitle,
                timeSteps,
                adminId: adminId
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        // console.log(`CR0 createRooms************ = ${JSON.stringify(resData)}`);

        // dispatch({
        //     type: CREATE_ROOM,
        //     roomData: {
        //         id: resData.name,
        //         categoryIds: categoryIds,
        //         title: title,
        //         imageUri: imageUri,
        //         timeTitle: timeTitle,
        //         timeSteps: timeSteps,
        //     }
        // })
    }
};

export const updateStatusRoom = (roomId, roomTimeShowValue, roomTimeShowUpdateStatus, roomSelected) => {
    return async (dispatch, getState) => {

        const selectedTimeShowIndex = roomSelected.findIndex(time => time.number === roomTimeShowValue);
        const updateRoomTimeShowStatus = roomSelected;
        updateRoomTimeShowStatus[selectedTimeShowIndex].status = roomTimeShowUpdateStatus;
        console.log(`LV *6 = ${JSON.stringify(updateRoomTimeShowStatus)}`);

        const token = getState().auth.token;
        // console.log(`ENABLE-TOKEN = ${JSON.stringify(token)}`);
        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/rooms/${roomId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeSteps: updateRoomTimeShowStatus,
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
    }
};


export const enableRoom = (roomId, roomStatus) => {
    // console.log(`ENBR0 enable= ${roomStatus}`);

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        console.log(`ENABLE-TOKEN = ${JSON.stringify(token)}`);
        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/rooms/${roomId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomStatus,
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        // console.log(`ENBR1 enable= ${JSON.stringify(resData)}`);

        // dispatch({
        //     type: ENABLE_ROOM,
        //     roomData: {
        //         roomId: rid,
        //         roomStatus: roomStatus
        //     }
        // })
    }
};

export const disableRoom = (roomId, roomStatus) => {
    // console.log(`DSBR0 disable= ${roomStatus}`);

    return async (dispatch, getState) => {

        const token = getState().auth.token;
        console.log(`DISABLE-TOKEN = ${JSON.stringify(token)}`);
        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/rooms/${roomId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomStatus,
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        // console.log(`DSBR0 disable= ${JSON.stringify(resData)}`);

        // dispatch({
        //     type: DISABLE_ROOM,
        //     roomData: {
        //         roomDisableId: rid,
        //         roomDisableStatus: roomStatus
        //     }
        // })
    }
};


export const deleteRoom = (roomId) => {
    console.log(`delete roomId = ${JSON.stringify(roomId)}`);
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://rn-bookingapp-guide.firebaseio.com/rooms/${roomId}.json?auth=${token}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        // dispatch({ type: DELETE_ROOM, roomId: rid })
    }
};



export const toggleFavourite = (id) => {
    return { type: TOGGLE_FAVOURITE, roomId: id }
};
