import Room from '../../models/room';

export const CREATE_ROOM = 'CREATE_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';
export const ENABLE_ROOM = 'ENABLE_ROOM';
export const DISABLE_ROOM = 'DISABLE_ROOM';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SET_ROOMS = 'SET_ROOMS';

export const fetchRooms = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-bookingapp-guide.firebaseio.com/rooms.json');

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            console.log(`FETCHR = ${JSON.stringify(resData)}`);
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

            console.log(`SETR = ${JSON.stringify(loadedRooms)}`);
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
    console.log(`id = ${id}`);
    console.log(`categoryIds = ${categoryIds}`);
    console.log(`title = ${title}`);
    console.log(`imageUri = ${imageUri}`);
    console.log(`timeTitle = ${timeTitle}`);
    console.log(`timeSteps = ${timeSteps}`);
    return async dispatch => {

        const response = await fetch('https://rn-bookingapp-guide.firebaseio.com/rooms.json', {
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
            })
        });
        const resData = await response.json();
        console.log(`CR0 createRooms = ${JSON.stringify(resData)}`);

        dispatch({
            type: CREATE_ROOM,
            roomData: {
                id: resData.name,
                categoryIds: categoryIds,
                title: title,
                imageUri: imageUri,
                timeTitle: timeTitle,
                timeSteps: timeSteps,
            }
        })
    }
};

export const enableRoom = (rid, roomStatus) => {
    console.log(`ENBR0 enable= ${roomStatus}`);

    return async dispatch => {

        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/rooms/${rid}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomStatus,
            })
        });
        const resData = await response.json();
        console.log(`ENBR1 enable= ${JSON.stringify(resData)}`);

        dispatch({
            type: ENABLE_ROOM,
            roomData: {
                roomId: rid,
                roomStatus: roomStatus
            }
        })
    }
};

export const disableRoom = (rid, roomStatus) => {
    console.log(`DSBR0 disable= ${roomStatus}`);

    return async dispatch => {

        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/rooms/${rid}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomStatus,
            })
        });
        const resData = await response.json();
        console.log(`DSBR0 disable= ${JSON.stringify(resData)}`);

        dispatch({
            type: DISABLE_ROOM,
            roomData: {
                roomDisableId: rid,
                roomDisableStatus: roomStatus
            }
        })
    }
};


export const deleteRoom = (rid) => {
    console.log(`delete roomId = ${JSON.stringify(rid)}`);
    return async dispatch => {
        
        await fetch(`https://rn-bookingapp-guide.firebaseio.com/rooms/${rid}.json`, {
            method: 'DELETE',
        });

        dispatch({ type: DELETE_ROOM, roomId: rid })
    }
};



export const toggleFavourite = (id) => {
    return { type: TOGGLE_FAVOURITE, roomId: id }
};
