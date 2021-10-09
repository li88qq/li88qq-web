import vAxios from '/@/utils/axiosUtil'

const Api = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    LOGIN_MOBILE: '/loginMobile',
}

export const login = (params) => vAxios.post(Api.LOGIN, params, {hideMsg: true})
export const loginMobile = (params) => vAxios.post(Api.LOGIN_MOBILE, params, {hideMsg: true})
export const logout = (params) => vAxios.post(Api.LOGOUT, params,)