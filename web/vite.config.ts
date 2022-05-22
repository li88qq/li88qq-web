import {ConfigEnv, UserConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

const pathResolve = (dir: string) => {
    return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({command, mode}: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, '.')
    return {
        plugins: [vue()],
        resolve: {
            alias: [
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
                // /#/xxxx => types/xxxx
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ],
        },
        server: {
            host: true,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    // rewrite: (path: string) => path.replace(/^\/api/, '')
                },
            }
        },
    }
}