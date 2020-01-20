// import moment from 'moment';

class Booking {
    constructor(id, studentName, studentId, title, timeTitle, timeSteps, date) {
        this.id = id;
        this.studentName = studentName;
        this.studentId = studentId;
        this.title = title;
        this.timeTitle = timeTitle;
        this.timeSteps = timeSteps;
        this.date = date;
    }

    // get readableDate() {
    //     return moment(this.date).startOf('hour').fromNow();
    //     return moment(this.date).format('MMMM Do YYYY, hh:mm:ss a');
    // }
}

export default Booking;