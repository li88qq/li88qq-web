import vAxios from '/@/utils/axiosUtil'

const Api = {
    CAPTCHA: '/p/getCaptcha',
    IP: '/p/ip',
}

export const getCaptcha = () => vAxios.get(Api.CAPTCHA, {responseType: 'blob'})
export const getIp = () => vAxios.get(Api.IP)