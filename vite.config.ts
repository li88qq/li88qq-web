import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from 'node:path'

export default defineConfig(({mode})=>{
    const env = loadEnv(mode,'.')

    return{
        server:{
            host:true,
            proxy:{
                '/apis':{
                    target:env.VITE_APIS_HOST,
                    changeOrigin:true,
                    rewrite: (path) => path.replace(/^\/apis/, '')
                }
            }
        },
        plugins:[vue()],
        resolve:{
            alias:{
                '@':join(__dirname,'./src')
            }
        },
    }
})