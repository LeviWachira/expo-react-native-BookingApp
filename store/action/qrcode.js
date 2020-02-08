import Qrcode from '../../models/qrcode';

export const FETCH_QRCODE = 'FETCH_QRCODE';
export const SET_QRCODE = 'SET_QRCODE';
export const CANCEL_BOOKED = 'CANCEL_BOOKED';

export const fetchQrcode = () => {
    return async (dispatch, getState) => {
        // const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings.json`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            // console.log(`QRCODE_FETCH = ${JSON.stringify(resData)}`);
            const loadedQrcode = [];
            for (const key in resData) {
                loadedQrcode.push(
                    new Qrcode(
                        key,
                        resData[key].studentName,
                        resData[key].studentId,
                        resData[key].title,
                        resData[key].timeTitle,
                        resData[key].timeUserSelected,
                        resData[key].date,
                        resData[key].userBookingStatus,
                        resData[key].userQrcode,
                        resData[key].userId
                    )
                )
            };

            dispatch({ type: FETCH_QRCODE, qrcodes: loadedQrcode })
        } catch (err) {
            throw err
        }
    }
}

export const setQrcode = (roomUserId, roomId, roomUserQrcode) => {
    return async (dispatch, getState) => {
        // console.log(`QR0 FECTH_QRCODE_BOOKING = ${JSON.stringify(roomId)}`);
        const token = getState().auth.token;
        // const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings/${roomId}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userBookingStatus: "APPROVED",
                    userQrcode: roomUserQrcode
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            // console.log(`QR2 FECTH_QRCODE_BOOKING = ${JSON.stringify(resData)}`);

        } catch (err) {
            throw err;
        }
    };
};

export const cancelBooked = (roomId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        // const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings/${roomId}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userBookingStatus: "USER CANCEL",
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            // console.log(`QR2 FECTH_QRCODE_BOOKING = ${JSON.stringify(resData)}`);

        } catch (err) {
            throw err;
        }
    };
};