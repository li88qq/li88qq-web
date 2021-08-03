import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_SECOND_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * 时间戳格式化日期
 * @param date
 * @returns {string}
 */
export function timestampToDate(date) {
    if (!date || date <= 0) {
        return '';
    }
    return moment.unix(date).format(DATE_FORMAT);
}

/**
 * 时间戳格式化时间
 * @param date
 * @param second 是否显示秒
 * @returns {string}
 */
export function timestampToTime(date, second) {
    if (!date || date <= 0) {
        return '';
    }
    if (!second) {
        return moment.unix(date).format(DATE_TIME_FORMAT);
    } else {
        return moment.unix(date).format(DATE_SECOND_FORMAT);
    }
}

/**
 * 当前日期格式化日期
 * @returns {string}
 */
export function today() {
    return moment().format(DATE_FORMAT);
}

/**
 * moment格式化日期
 * @param momentObj
 * @returns {null|*}
 */
export function toDate(momentObj) {
    if (!momentObj) {
        return null;
    }
    return momentObj.format(DATE_FORMAT);
}

/**
 * moment转时间戳秒
 * @param momentObj
 * @returns {null|*}
 */
export function momentToSecond(momentObj) {
    if (!momentObj) {
        return null;
    }
    return momentObj.unix();
}

/**
 * moment转时间戳毫秒
 * @param momentObj
 * @returns {Object|null}
 */
export function momentToMs(momentObj) {
    if (!momentObj) {
        return null;
    }
    return momentObj.valueOf();
}

/**
 * 时间戳秒转moment
 * @param timestamp
 */
export function timestampToMoment(timestamp) {
    if (!timestamp) {
        return null;
    }
    return moment.unix(timestamp);
}

/**
 * 时间戳毫秒转moment
 * @param timestamp
 */
export function msToMoment(timestamp) {
    if (!timestamp) {
        return null;
    }
    return moment(timestamp);
}

/**
 * 获取当前moment
 * @returns {moment.Moment}
 */
export function momentNow() {
    return moment();
}

/**
 * moment格式化
 * @param momentObj
 */
export function momentFormat(momentObj) {
    if (!momentObj) {
        return null;
    }
    return momentObj.format(DATE_SECOND_FORMAT);
}

export const dateUtil = moment;
