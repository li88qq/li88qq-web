import * as dayjs from 'dayjs'

export const FORMAT_DATE = 'YYYY-MM-DD'
export const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss'

/**
 * 时间戳格式化日期
 * @param timestamp 时间戳
 */
export const timestampToDate = (timestamp:number):string => {
    if(timestamp && timestamp >0){
        return dayjs.unix(timestamp).format(FORMAT_DATE)
    }
    return ''
}

/**
 * 时间戳格式化时间
 * @param timestamp 时间戳
 */
export const timestampToTime = (timestamp:number):string => {
    if(timestamp && timestamp >0){
        return dayjs.unix(timestamp).format(FORMAT_DATETIME)
    }
    return ''
}