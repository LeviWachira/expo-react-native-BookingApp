
class Booking {
    constructor(id, studentName, studentId, title, timeTitle, timeUserSelected, date , userBookingStatus) {
        this.id = id;
        this.studentName = studentName;
        this.studentId = studentId;
        this.title = title;
        this.timeTitle = timeTitle;
        this.timeUserSelected = timeUserSelected;
        this.date = date;
        this.userBookingStatus = userBookingStatus;
    }

    // get readableDate() {
    //     return moment(this.date).startOf('hour').fromNow();
    //     return moment(this.date).format('MMMM Do YYYY, hh:mm:ss a');
    // }
}

export default Booking;