export const CREATE_ROOM = 'CREATE_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const createRoom = (
    id,
    categoryIds,
    title,
    imageUri,
    timeTitle,
    timeSteps
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
            timeSteps: timeSteps
        }
    }
};

export const deleteRoom = (rid) => {
    return { type: CREATE_ROOM, roomId: rid }
};

export const toggleFavourite = (id) => {
    return { type: TOGGLE_FAVOURITE, roomId: id }
};
