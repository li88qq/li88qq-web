import vAxios from '/@/utils/axiosUtil'

const Api = {
    LOGIN: '/login',
    LOGOUT: '/logout',
}

export const login = (params) => vAxios.post(Api.LOGIN, params, {hideMsg: true})
export const logout = (params) => vAxios.post(Api.LOGOUT, params,)