import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD';

export function timestampToDate(date) {
    if (!date || date <= 0) {
        return '';
    }
    return moment.unix(date).format(DATE_FORMAT);
}

export function timestampToTime(date) {
    if (!date || date <= 0) {
        return '';
    }
    return moment.unix(date).format(DATE_TIME_FORMAT);
}

export function today() {
    return moment().format(DATE_FORMAT);
}

export function toDate(momentObj) {
    if(!momentObj){
        return null;
    }
    return momentObj.format(DATE_FORMAT);
}

export const dateUtil = moment;
