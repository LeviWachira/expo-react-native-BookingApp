import Booking from '../../models/booking';

export const SET_BOOKINGS = 'SET_BOOKINGS';
export const ADD_TO_BOOKING = 'ADD_TO_BOOKING';
export const REMOVE_FROM_BOOKING = 'REMOVE_FROM_BOOKING';


export const fetchBooking = () => {
    return async (dispatch, getState) => {
        // const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings.json`);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();
            // console.log(`FETCH_BOOKING!! = ${JSON.stringify(resData)}`);
            const loadedBooking = [];
            for (const key in resData) {
                loadedBooking.push(
                    new Booking(
                        key,
                        resData[key].studentName,
                        resData[key].studentId,
                        resData[key].title,
                        resData[key].timeTitle,
                        resData[key].timeUserSelected,
                        resData[key].date,
                        resData[key].userBookingStatus,
                        resData[key].userId
                    )
                );
            }

            // console.log(`SET_BOOKING = ${JSON.stringify(loadedBooking)}`);
            dispatch({ type: SET_BOOKINGS, bookings: loadedBooking });
        } catch (err) {
            throw err;
        }
    }
}

export const addToBooking = (
    title,
    timeTitle,
    timeUserSelected,
    roomBookedItems,

) => {
    return async (dispatch, getState) => {
        const date = new Date();

        // this.id = id;
        // this.studentName = studentName;
        // this.studentId = studentId;
        // this.title = title;
        // this.timeTitle = timeTitle;
        // this.timeSteps = timeSteps;
        // this.approvalStatus = approvalStatus;
        // timeUserSelected
        // this.date = date;
        // console.log(`USER-GETSTATE = ${JSON.stringify(getState())}`);

        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentName: "Wachira WinitChai",
                studentId: "59523206044-2",
                title,
                timeTitle,
                timeUserSelected,
                date: date.toISOString(),
                userBookingStatus: "...Waiting",
                userId: userId
            })
        });
        const resData = await response.json();
        // console.log(`BK1 FECTH_BOOKING = ${JSON.stringify(resData)}`);

        dispatch({
            type: ADD_TO_BOOKING,
            bookingData: {
                room: roomBookedItems,
                timeBooking: timeUserSelected
            }
        })
    }
};

export const removeFromBooking = (roomUserId, roomId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        // await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings/${roomId}.json?auth=${token}`, {
        //     method: 'DELETE',
        // });
        try {
            const response = await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings/${roomId}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userBookingStatus: "DENIDE!!",
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            throw (err);
        }

        // dispatch({ type: REMOVE_FROM_BOOKING, rid: rid })
    }
};
