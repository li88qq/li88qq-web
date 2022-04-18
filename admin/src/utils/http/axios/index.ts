import {vAxios} from './Axios'

const {VITE_API} = import.meta.env
const loginAxios = new vAxios({baseURL: `${VITE_API}/login/am`});
const adminAxios = new vAxios({baseURL: `${VITE_API}/admin`});

export {loginAxios, adminAxios,}