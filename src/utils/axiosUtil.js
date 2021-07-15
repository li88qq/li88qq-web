import axios from "axios";

const vAxios = axios.create({
    baseURL: '/api'
})

vAxios.defaults.timeout = 10 * 1000;

//校验响应状态异常
const checkError = () => {

}

//校验响应结果
const checkResponse = () => {

}

// 添加请求拦截器
vAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
vAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default vAxios