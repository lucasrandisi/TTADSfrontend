import moment from 'moment';

export const getDate = (date) => moment(date).add(3, 'hours');

export const getSubsDate = (date) => moment(date).subtract(3, 'hours');

export const unionDateTime = (date, time) => {
    return moment(date.setHours(
        time.substring(0, 2), 
        time.substring(3, 5), 
        0)
    ).format("YYYY-MM-DD HH:mm");
}

export const getActualDate = (date) => {
    return new Date(moment(date).add(1, 'd').format("YYYY-MM-DD"))
}
