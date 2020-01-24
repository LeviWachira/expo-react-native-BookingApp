export const CREATE_ROOM = 'CREATE_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';
export const ENABLE_ROOM = 'ENABLE_ROOM';
export const DISABLE_ROOM = 'DISABLE_ROOM';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

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
    return {
        type: CREATE_ROOM,
        roomData: {
            id: id,
            categoryIds: categoryIds,
            title: title,
            imageUri: imageUri,
            timeTitle: timeTitle,
            timeSteps: timeSteps,
        }
    }
};

export const deleteRoom = (rid) => {
    console.log(`delete roomId = ${JSON.stringify(rid)}`);
    return { type: DELETE_ROOM, roomId: rid }
};

export const enableRoom = (rid, roomStatus) => {
    console.log(`ENBR0 = ${roomStatus}`);

    return {
        type: ENABLE_ROOM, roomData: {
            roomId: rid,
            roomStatus: roomStatus
        }
    }
};

export const disableRoom = (rid, roomStatus) => {
    console.log(`ENBR0 = ${roomStatus}`);

    return {
        type: DISABLE_ROOM, roomData: {
            roomDisableId: rid,
            roomDisableStatus: roomStatus
        }
    }
};

export const toggleFavourite = (id) => {
    return { type: TOGGLE_FAVOURITE, roomId: id }
};
