import { ADD_TO_BOOKING, REMOVE_FROM_BOOKING } from '../action/booking';
import Booking from '../../models/booking';

const initialState = {
    booking: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BOOKING:

            const addedBooking = action.bookingData.room;
            const roomTitle = addedBooking.title;
            const roomTimeTitle = addedBooking.timeTitle;
            const roomTimeSteps = addedBooking.timeSteps;
            const timeStepIndex = roomTimeSteps.findIndex(time => time === action.bookingData.timeBooking);

            const updateOrNewBooking = new Booking(
                roomTitle,
                roomTimeTitle,
                roomTimeSteps[timeStepIndex]
            );
            console.log(`updateBooking = ${JSON.stringify(updateOrNewBooking)}`);


            return {
                ...state,
                booking: state.booking.concat(updateOrNewBooking)
            };
    }
    return state;
}