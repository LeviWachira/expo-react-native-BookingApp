import { ADD_TO_BOOKING, REMOVE_FROM_BOOKING } from '../action/booking';
import Booking from '../../models/booking';

const initialState = {
    booking: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BOOKING:

            const addedBooking = action.bookingData.room;
            const roomId = addedBooking.id;
            const roomTitle = addedBooking.title;
            const roomTimeTitle = addedBooking.timeTitle;
            const roomTimeSteps = addedBooking.timeSteps;
            const timeStepIndex = roomTimeSteps.findIndex(time => time === action.bookingData.timeBooking);

            const updateOrNewBooking = new Booking(
                roomId + roomTimeSteps[timeStepIndex],
                roomTitle,
                roomTimeTitle,
                roomTimeSteps[timeStepIndex]
            );
            console.log(`lv1 = ${JSON.stringify(updateOrNewBooking)}`);

            return {
                ...state,
                booking: state.booking.concat(updateOrNewBooking)
            };

        case REMOVE_FROM_BOOKING:
            return {
                ...state,
                booking: state.booking.filter(room => room.id !== action.rid)
            }


    }
    return state;
}