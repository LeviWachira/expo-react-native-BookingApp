class User {
    constructor(id, ownerId, userOnlineStatus, favouriteRoomId) {
        this.id = id;
        this.ownerId = ownerId;
        this.userOnlineStatus = userOnlineStatus;
        this.favouriteRoomId = favouriteRoomId;
    }
};

export default User;