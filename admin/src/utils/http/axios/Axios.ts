import {AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from 'axios'
import axios from "axios";
import type {Result, Request} from '/#/axios'
import {message} from 'ant-design-vue'
import {useUserStore} from "/@/store/modules/user";

export class vAxios {
    private axiosInstance: AxiosInstance;
    private readonly options?: AxiosRequestConfig;

    constructor(options?: AxiosRequestConfig) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    //拦截器处理
    private setupInterceptors() {
        // 添加请求拦截器
        this.axiosInstance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        this.axiosInstance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            let result = response.data as Result;
            if (!result) {
                return Promise.reject(new Error("请求失败"));
            }
            if (result.code != 0) {
                return Promise.reject(new Error(result.msg));
            }
            return result;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    get<T = any>(url: string, params?: any, noError?: boolean): Promise<T> {
        const userStore = useUserStore()
        return this.request({url, method: 'GET', params: params, noError, headers: {'amtoken': userStore.token}});
    }

    post<T = any>(url: string, data?: any, noError?: boolean): Promise<T> {
        const userStore = useUserStore()
        return this.request({url, method: 'POST', data: data, noError, headers: {'amtoken': userStore.token}});
    }

    request<T = any>(config: Request): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(config)
                .then((res: AxiosResponse<Result>) => {
                    const result = res as unknown as Result
                    if (!config.noError && config.method === 'POST') {
                        const msg = result.msg || '操作成功'
                        message.success(msg).then()
                    }
                    resolve(result.data);
                }).catch((e: Error) => {
                if (!config.noError) {
                    const msg = e.message || '请求失败!'
                    message.error(msg).then()
                }
                // reject(e);
            });
        });
    }
}
