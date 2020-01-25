import { ADD_TO_BOOKING, REMOVE_FROM_BOOKING } from '../action/booking';
import { SET_QRCODE } from '../action/qrcode';
import Booking from '../../models/booking';
import moment from 'moment';


const initialState = {
    history: []
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
            console.log(`HLV1 roomId = ${JSON.stringify(roomId)}`);

            const updateOrNewBooking = new Booking(
                roomId + roomTimeSteps[timeStepIndex],
                "Wachira Winitchai",
                "59523206044-1",
                roomTitle,
                roomTimeTitle,
                roomTimeSteps[timeStepIndex],
                moment().format('D-MMM-YYYY,hh:mm:ss a'),
                '...Waiting'
            );
            console.log(`HLV2 Wait Admin = ${JSON.stringify(updateOrNewBooking)}`);
            return {
                ...state,
                history: state.history.concat(updateOrNewBooking)
            };

        case REMOVE_FROM_BOOKING:

            const selectedAdminDeniedIndex = state.history.findIndex(room => room.id === action.rid)
            console.log(`HLV3 DeniedIndex = ${JSON.stringify(selectedAdminDeniedIndex)}`);
            const updateDeniedApprovalStatus = new Booking(
                state.history[selectedAdminDeniedIndex].id,
                state.history[selectedAdminDeniedIndex].studentName,
                state.history[selectedAdminDeniedIndex].studentId,
                state.history[selectedAdminDeniedIndex].title,
                state.history[selectedAdminDeniedIndex].timeTitle,
                state.history[selectedAdminDeniedIndex].timeSteps,
                state.history[selectedAdminDeniedIndex].date,
                'Denied!!'
            );
            console.log(`HLV4 upadateDenied = ${JSON.stringify(updateDeniedApprovalStatus)}`);
            const seletedUpdateAdminDeniedApprovalStatus = [...state.history];
            seletedUpdateAdminDeniedApprovalStatus[selectedAdminDeniedIndex] = updateDeniedApprovalStatus;
            return {
                ...state,
                history: seletedUpdateAdminDeniedApprovalStatus
            };

        case SET_QRCODE:
            const selectedAdminApprovedIndex = state.history.findIndex(room => room.id === action.roomData.roomBookingId)
            console.log(`HLV5 ApprovedIndex = ${JSON.stringify(selectedAdminApprovedIndex)}`);
            const updateApprovedStatus = new Booking(
                state.history[selectedAdminApprovedIndex].id,
                state.history[selectedAdminApprovedIndex].studentName,
                state.history[selectedAdminApprovedIndex].studentId,
                state.history[selectedAdminApprovedIndex].title,
                state.history[selectedAdminApprovedIndex].timeTitle,
                state.history[selectedAdminApprovedIndex].timeSteps,
                state.history[selectedAdminApprovedIndex].date,
                'Approved'
            )
            const seletedUpdateAdminApprovedStatus = [...state.history];
            seletedUpdateAdminApprovedStatus[selectedAdminApprovedIndex] = updateApprovedStatus;
            console.log(`HLV4 upadateApproved = ${JSON.stringify(seletedUpdateAdminApprovedStatus)}`);
            return {
                ...state,
                history: seletedUpdateAdminApprovedStatus
            }
    }
    return state;
};