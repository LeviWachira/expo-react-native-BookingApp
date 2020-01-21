import { SET_QRCODE, CANCEL_BOOKED } from '../action/qrcode';
import Qrcode from '../../models/qrcode';

const initialState = {
    qrcode: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_QRCODE:
            const addedQrcode = action.roomData.roomBooking;
            const selectedQrcode = addedQrcode.find(room => room.id === action.roomData.roomBookingId);

            console.log(`LV4 addedQrcode || ${JSON.stringify(selectedQrcode)}`);

            const updateOrNewQrcode = new Qrcode(
                selectedQrcode.id,
                selectedQrcode.studentName,
                selectedQrcode.studentId,
                selectedQrcode.title,
                selectedQrcode.timeTitle,
                selectedQrcode.timeSteps,
                selectedQrcode.date,
                selectedQrcode.studentId + '/' + selectedQrcode.id + '/' + selectedQrcode.date
            );
            console.log(`LV5 = ${JSON.stringify(updateOrNewQrcode)}`);
            return {
                ...state,
                qrcode: state.qrcode.concat(updateOrNewQrcode)
            };

        case CANCEL_BOOKED:
            return {
                ...state,
                qrcode: state.qrcode.filter(room => room.id !== action.roomBookedId)
            };

    }
    return state;
};