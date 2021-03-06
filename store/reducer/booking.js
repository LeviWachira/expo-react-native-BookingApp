import { ADD_TO_BOOKING, REMOVE_FROM_BOOKING, SET_BOOKINGS } from '../action/booking';
import { SET_QRCODE } from '../action/qrcode';
import Booking from '../../models/booking';
import moment from 'moment';

const initialState = {
    booking: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKINGS :
            return {
                ...state ,
                booking : action.bookings
            }

        // case ADD_TO_BOOKING:

        //     const addedBooking = action.bookingData.room;
        //     const roomId = addedBooking.id;
        //     const roomTitle = addedBooking.title;
        //     const roomTimeTitle = addedBooking.timeTitle;
        //     const roomTimeSteps = addedBooking.timeSteps;
        //     const timeStepIndex = roomTimeSteps.findIndex(time => time === action.bookingData.timeBooking);
        //     console.log(`BK1 roomId = ${JSON.stringify(roomId)}`);

        //     const updateOrNewBooking = new Booking(
        //         roomId + roomTimeSteps[timeStepIndex],
        //         "Wachira Winitchai",
        //         "59523206044-1",
        //         roomTitle,
        //         roomTimeTitle,
        //         roomTimeSteps[timeStepIndex],
        //         moment().format('D-MMM-YYYY,hh:mm:ss a'),
        //     );
        //     console.log(`BK2 updateBooking = ${JSON.stringify(updateOrNewBooking)}`);
        //     return {
        //         ...state,
        //         booking: state.booking.concat(updateOrNewBooking)
        //     };

        case REMOVE_FROM_BOOKING:
            return {
                ...state,
                booking: state.booking.filter(room => room.id !== action.rid)
            };

        case SET_QRCODE:
            return {
                ...state,
                booking: state.booking.filter(room => room.id !== action.roomData.roomBookingId)
            };

    }
    return state;
};