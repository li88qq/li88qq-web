import vAxios from '/@/utils/axiosUtil'

const Api = {
    TYPE_SAVE: '/nav/saveType',
    TYPE_UPDATE: '/nav/updateType',
    TYPE_DELETE: '/nav/deleteType',
    NAV_LIST: '/nav/list',
    NAV_SAVE: '/nav/save',
    NAV_CLICK: '/nav/addCount',
    NAV_DELETE: '/nav/delete',
}

export const saveType = (params) => vAxios.post(Api.TYPE_SAVE, params)
export const updateType = (params) => vAxios.post(Api.TYPE_UPDATE, params)
export const getList = (params) => vAxios.get(Api.NAV_LIST, {params: params})
export const deleteType = (params) => vAxios.post(Api.TYPE_DELETE, params)
export const saveNav = (params) => vAxios.post(Api.NAV_SAVE, params)
export const addCount = (params) => vAxios.post(Api.NAV_CLICK, params, {hideMsg: true})
export const deleteNav = (params) => vAxios.post(Api.NAV_DELETE, params,)
