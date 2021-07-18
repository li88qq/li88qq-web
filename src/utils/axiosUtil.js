import axios from "axios";
import {message, Modal} from 'ant-design-vue'

const vAxios = axios.create({
    baseURL: '/api'
})

vAxios.defaults.withCredentials = true; // 允许携带cookie
vAxios.defaults.timeout = 10 * 1000;

//处理响应状态
function checkErrorStatus(error) {
    if (!error || !error.response) {
        return;
    }
    // 对响应数据做点什么
    let status = error.response.status;
    let errMessage = '请求失败!';
    switch (status) {
        case 400:
            errMessage = '请求方法或参数错误！';
            break;
        case 401:
            errMessage = '用户没有权限（令牌、用户名、密码错误）!';
            break;
        case 403:
            errMessage = '用户得到授权，但是访问是被禁止的!';
            break;
        case 404:
            errMessage = '网络请求错误,未找到该资源!';
            break;
        case 405:
            errMessage = '网络请求错误,请求方法未允许!';
            break;
        case 408:
            errMessage = '网络请求超时!';
            break;
        case 500:
            errMessage = '服务器错误,请联系管理员!';
            break;
        case 501:
            errMessage = '网络未实现!';
            break;
        case 502:
            errMessage = '网络错误!';
            break;
        case 503:
            errMessage = '服务不可用，服务器维护中!';
            break;
        case 504:
            errMessage = '网络超时!';
            break;
        case 505:
            errMessage = 'http版本不支持该请求!';
            break;
        default:
            break;
    }
    message.error({content: errMessage});
}

//校验响应结果
const checkResponse = (response) => {
    let data = response.data;
    if (!data) {
        return Promise.reject(new Error('操作失败!'));
    }
    // content-type
    const contentType = response.headers['content-type'];
    if (contentType.indexOf('application/json') === -1) {
        return data;
    }

    let code = data.code;
    let msg = data.msg;
    let method = response.config.method.toUpperCase();
    if (code === 0) {
        if (method === 'POST') {
            Modal.success({
                content: msg || '操作成功！'
            })
        }
        return data.data;
    }
    if (method === 'GET') {
        message.error({content: msg || '查询失败！'})
    } else if (method === 'POST') {
        // message.error({content: msg || '操作失败！'})
        Modal.error({
            content: msg || '操作失败！'
        })
    }
    return Promise.reject(new Error('操作失败!'));
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
    return checkResponse(response);
}, function (error) {
    // 对响应错误做点什么
    checkErrorStatus(error);
    return Promise.reject(error);
});

export default vAxios