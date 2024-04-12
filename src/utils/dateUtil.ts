import dayjs from 'dayjs'

//格式化
export const FORMAT_DATE_TIME: string = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT_DATE: string = 'YYYY-MM-DD'
export const FORMAT_TIME: string = 'HH:mm'

/**
 * 时间戳格式化时间
 * @param timestamp 时间长,秒
 */
export const timestampToTime = (timestamp: number):string => {
    if (timestamp > 0) {
        return dayjs.unix(timestamp).format(FORMAT_DATE_TIME)
    }
    return '';
}

/**
 * 时间戳格式化日期
 * @param timestamp 时间戳,秒
 */
export const timestampToDate = (timestamp: number):string => {
    if (timestamp > 0) {
        return dayjs.unix(timestamp).format(FORMAT_DATE)
    }
    return '';
}

export default dayjs