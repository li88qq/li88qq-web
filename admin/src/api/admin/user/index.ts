import {adminAxios as axios} from "/@/utils/http/axios";
import {UserInfoVo} from './model'

enum API {
    INFO = '/user/info',
}

export const getInfo = () => axios.get<UserInfoVo>(API.INFO)
