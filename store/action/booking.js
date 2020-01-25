export const ADD_TO_BOOKING = 'ADD_TO_BOOKING';
export const REMOVE_FROM_BOOKING = 'REMOVE_FROM_BOOKING';

export const addToBooking = (room, timeBooking) => {
    console.log(`BK0 Selectedroom = ${JSON.stringify(room)}`);
    return {
        type: ADD_TO_BOOKING,
        bookingData: {
            room: room,
            timeBooking: timeBooking
        }
    }
};

export const removeFromBooking = roomId => {
    return { type: REMOVE_FROM_BOOKING, rid: roomId }
};
