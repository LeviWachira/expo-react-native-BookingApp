import Booking from '../../models/booking';

export const SET_BOOKINGS = 'SET_BOOKINGS';
export const ADD_TO_BOOKING = 'ADD_TO_BOOKING';
export const REMOVE_FROM_BOOKING = 'REMOVE_FROM_BOOKING';


export const fetchBooking = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-bookingapp-guide.firebaseio.com/bookings.json');

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();
            console.log(`FETCH_BOOKING = ${JSON.stringify(resData)}`);
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
                        resData[key].userBookingStatus
                    )
                );
            }

            console.log(`SET_BOOKING = ${JSON.stringify(loadedBooking)}`);
            dispatch({ type: SET_BOOKINGS, bookings: loadedBooking });
        } catch (err) {
            throw err;
        }
    }
}

export const addToBooking = (
    id,
    categoryIds,
    title,
    imageUri,
    timeTitle,
    timeSteps,
    roomDisableStatus,
    timeUserSelected,
    roomBookedItems,

) => {
    // console.log(`BK0 id = ${JSON.stringify(id)}`);
    // console.log(`BK0 categoryIds = ${JSON.stringify(categoryIds)}`);
    // console.log(`BK0 title = ${JSON.stringify(title)}`);
    // console.log(`BK0 timeTitle = ${JSON.stringify(timeTitle)}`);
    // console.log(`BK0 timeSteps = ${JSON.stringify(timeSteps)}`);
    // console.log(`BK0 roomDisableStatus = ${JSON.stringify(roomDisableStatus)}`);
    // console.log(`BK0 timeUserSelected = ${JSON.stringify(timeUserSelected)}`);

    return async dispatch => {
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


        const response = await fetch('https://rn-bookingapp-guide.firebaseio.com/bookings.json', {
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
            })
        });
        const resData = await response.json();
        console.log(`BK1 FECTH_BOOKING = ${JSON.stringify(resData)}`);

        dispatch({
            type: ADD_TO_BOOKING,
            bookingData: {
                room: roomBookedItems,
                timeBooking: timeUserSelected
            }
        })
    }
};

export const removeFromBooking = rid => {
    return async dispatch => {

        await fetch(`https://rn-bookingapp-guide.firebaseio.com/bookings/${rid}.json`, {
            method: 'DELETE',
        });

        dispatch({ type: REMOVE_FROM_BOOKING, rid: rid })
    }
};
