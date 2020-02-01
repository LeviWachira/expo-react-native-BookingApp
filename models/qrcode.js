
class Qrcode {
    constructor(id, studentName, studentId, title, timeTitle, timeUserSelected, date, qrcode, userId) {
        this.id = id;
        this.studentName = studentName;
        this.studentId = studentId;
        this.title = title;
        this.timeTitle = timeTitle;
        this.timeUserSelected = timeUserSelected;
        this.date = date;
        this.qrcode = qrcode;
        this.userId = userId;
    }
}

export default Qrcode;