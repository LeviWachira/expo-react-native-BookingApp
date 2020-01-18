export const SET_QRCODE = 'SET_QRCODE';

export const setQrcode = (room, rid) => {
    console.log(`lz3 room : ${JSON.stringify(room)}`);

    return {
        type: SET_QRCODE, roomData: {
            roomBooking: room,
            roomBookingId: rid
        }
    };
};