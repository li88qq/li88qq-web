import vAxios from '/@/utils/axiosUtil'

const Api = {
    LOGIN_PAGE: '/log/loginPage',
    ACTION_PAGE: '/log/actionPage',
}

export const loginPage = (params) => vAxios.get(Api.LOGIN_PAGE, {params:params})
export const actionPage = (params) => vAxios.get(Api.ACTION_PAGE, {params:params})
