import { SET_QRCODE } from '../action/qrcode';
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
                selectedQrcode.title,
                selectedQrcode.timeTitle,
                selectedQrcode.timeSteps,
                selectedQrcode.date,
                selectedQrcode.id + selectedQrcode.date
            );
            console.log(`LV5 = ${JSON.stringify(updateOrNewQrcode)}`);
            return {
                ...state,
                qrcode: state.qrcode.concat(updateOrNewQrcode)
            };

    }
    return state;
};