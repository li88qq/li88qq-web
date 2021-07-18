import vAxios from '/@/utils/axiosUtil'

const Api = {
    LOGIN: '/login',
}

export const login = (params) => vAxios.post(Api.LOGIN, params)