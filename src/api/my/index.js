import vAxios from '/@/utils/axiosUtil'

const Api = {
    UPDATE_PASSWORD: '/my/updatePassword',
    UPDATE_PROFILE: '/my/updateProfile',
    GET_PROFILE: '/my/profile',
}

export const updatePassword = (params) => vAxios.post(Api.UPDATE_PASSWORD, params)
export const updateProfile = (params) => vAxios.post(Api.UPDATE_PROFILE, params)
export const profile = (params) => vAxios.get(Api.GET_PROFILE, {params: params})