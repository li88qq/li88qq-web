/**
 * 字节单位换算
 * @param bytes
 */
export const compBytes = (bytes) => {
    if (!bytes) {
        return '';
    }
    const k = 1024;

    const units = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const num = bytes / Math.pow(k, i);
    return num.toPrecision(3) + ' ' + units[i];
}