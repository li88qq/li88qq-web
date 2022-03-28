export interface LoginForm {
    mobile: string,
    code: string,
}

export interface LoginVo {
    token: string
}

export interface GetSmsForm {
    mobile: string,
}