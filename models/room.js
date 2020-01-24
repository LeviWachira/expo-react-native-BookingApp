class Room {
    constructor(
        id,
        categoryIds,
        title,
        imageUri,
        timeTitle,
        timeSteps,
        roomDisableStatus
    ) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.imageUri = imageUri;
        this.timeTitle = timeTitle;
        this.timeSteps = timeSteps;
        this.roomDisableStatus = roomDisableStatus;
    }
}

export default Room;