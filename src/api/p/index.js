import vAxios from '/@/utils/axiosUtil'

const Api = {
    CAPTCHA: '/p/getCaptcha',
    IP: '/p/ip',
    ARTICLE: '/p/article',
    ARTICLE_READ: '/p/readArticle',
}

export const getCaptcha = () => vAxios.get(Api.CAPTCHA, {responseType: 'blob'})
export const getIp = () => vAxios.get(Api.IP)
export const getArticle = (params) => vAxios.get(Api.ARTICLE, {params: params})
export const readArticle = (params) => vAxios.post(Api.ARTICLE_READ, params, {hideMsg: true});