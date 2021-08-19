/**
 * 获取cookie
 * @param key
 */
function getCookie(key) {
    const cookies = document.cookie;
    if (!cookies || cookies === '') {
        return '';
    }
    const arr = cookies.split(';');
    for (let i = 0; i < arr.length; i++) {
        const array = arr[i].split('=');
        for (let j = 0; j < array.length; j++) {
            if (array[0] === key) {
                return array[1];
            }
        }
    }
    return '';
}

/**
 * 设置cookie
 * @param key
 * @param value
 * @param expires 有效期,单位小时
 */
function setCookie(key, value, hour) {
    hour = hour || 12;
    const date = new Date();
    date.setTime(date.getTime() + (hour * 60 * 60 * 1000));
    const expires = "expires=" + date.toGMTString();
    document.cookie = key + "=" + value + "; " + expires;
}

function removeCookie(key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export {
    getCookie,
    setCookie,
    removeCookie,
}