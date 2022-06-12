import dayjs from 'dayjs';

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
    return dayjs.unix(date).format(DATE_FORMAT);
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
        return dayjs.unix(date).format(DATE_TIME_FORMAT);
    } else {
        return dayjs.unix(date).format(DATE_SECOND_FORMAT);
    }
}

/**
 * 当前日期格式化日期
 * @returns {string}
 */
export function today() {
    return dayjs().format(DATE_FORMAT);
}

/**
 * obj格式化日期
 * @param obj
 * @returns {null|*}
 */
export function toDate(obj) {
    if (!obj) {
        return null;
    }
    return obj.format(DATE_FORMAT);
}

/**
 * obj转时间戳秒
 * @param obj
 * @returns {null|*}
 */
export function objToSecond(obj) {
    if (!obj) {
        return null;
    }
    return obj.unix();
}

/**
 * moment转时间戳毫秒
 * @param obj
 * @returns {Object|null}
 */
export function objToMs(obj) {
    if (!obj) {
        return null;
    }
    return obj.valueOf();
}

/**
 * 时间戳秒转obj
 * @param timestamp
 */
export function timestampToObj(timestamp) {
    if (!timestamp) {
        return null;
    }
    return dayjs.unix(timestamp);
}

/**
 * 时间戳毫秒转moment
 * @param timestamp
 */
export function msToObj(timestamp) {
    if (!timestamp) {
        return null;
    }
    return dayjs(timestamp);
}

/**
 * 获取当前obj
 * @returns
 */
export function objNow() {
    return dayjs();
}

/**
 * obj格式化
 * @param obj
 */
export function objFormat(obj) {
    if (!obj) {
        return null;
    }
    return obj.format(DATE_SECOND_FORMAT);
}

export const dateUtil = dayjs;
