import vAxios from '/@/utils/axiosUtil'

const Api = {
    CAPTCHA: '/p/getCaptcha',
}

export const getCaptcha = () => vAxios.get(Api.CAPTCHA, {responseType: 'blob'})