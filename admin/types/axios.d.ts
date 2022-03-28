import {AxiosRequestConfig} from 'axios'

export interface Result<T = any> {
    code: number,
    msg: string,
    data: T
}

export interface Request<T = any> extends AxiosRequestConfig {
    noError?: boolean
}