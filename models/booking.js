// import moment from 'moment';

class Booking {
    constructor(id, title, timeTitle, timeSteps) {
        this.id = id;
        this.title = title;
        this.timeTitle = timeTitle;
        this.timeSteps = timeSteps;
    }

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Booking;