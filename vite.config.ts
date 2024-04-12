import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from 'node:path'

export default defineConfig(()=>{
    return{
        server:{
            host:true,
        },
        plugins:[vue()],
        resolve:{
            alias:{
                '@':join(__dirname,'./src')
            }
        }
    }
})