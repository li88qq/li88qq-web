import {vAxios} from './Axios'

const {VITE_API} = import.meta.env
const loginAxios = new vAxios({baseURL: `${VITE_API}/login/p`});
const adminAxios = new vAxios({baseURL: `${VITE_API}/main`});

export {loginAxios, adminAxios,}