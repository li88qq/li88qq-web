import vAxios from '/@/utils/axiosUtil'

const Api = {
    LOGIN_PAGE: '/log/loginPage',
}

export const loginPage = (params) => vAxios.get(Api.LOGIN_PAGE, {params:params})
