import {loginAxios as axios} from "/@/utils/http/axios";
import {LoginForm, LoginVo, GetSmsForm} from './model'

enum API {
    LOGIN = '/login',
    LOGOUT = '/logout',
    SMS_GET = '/getSms',
}

export const login = (form: LoginForm) => axios.post<LoginVo>(API.LOGIN, form)
export const logout = (form: LoginForm) => axios.post<LoginVo>(API.LOGOUT, form)
export const getSms = (form: GetSmsForm) => axios.post<void>(API.SMS_GET, form)
