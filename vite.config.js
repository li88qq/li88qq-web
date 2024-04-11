import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(()=>{
    return{
        server:{
            host:true,
        },
        plugins:[vue()]
    }
})