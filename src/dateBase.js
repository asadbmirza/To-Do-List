//For ensuring that there is a base date for ToDo items

import { min } from "date-fns";

const addBaseDate = (function addBaseDate() {
    const currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if (date < 10) {
        date = "0" + date;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    const dateTime = year + "-" + month + "-" + date + "T" + hour + ":" + minutes;
    return dateTime;
})();

export default addBaseDate;

