import {loginAxios as axios} from '/@/utils/http/axios'
import {GetCaptchaVo, LoginForm, LoginVo,} from './model/index'

const API = {
    CAPTCHA_GET: '/getCaptcha',//获取验证码
    LOGIN: '/login',//登录
    LOGOUT: '/logout',//登出
    REGISTER: '/register',//注册
}

export const getCaptcha = () => axios.get<GetCaptchaVo>(API.CAPTCHA_GET)
export const login = (form: LoginForm) => axios.post<LoginVo>(API.LOGIN, form)