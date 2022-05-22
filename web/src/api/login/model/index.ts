export interface GetCaptchaVo {
    code: string,
    captcha: string,
}

export interface LoginForm {
    username: string,
    password: string,
    code: string,
    checkCode: string,
}

export interface LoginVo {
    token: string,
}