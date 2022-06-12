import {defineConfig} from 'vite'
import {resolve} from 'path'
import process from 'process'
import {setupPlugin} from './build/vite/plugin'

const pathResolve = (dir) => {
    return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: setupPlugin(),
    resolve: {
        alias: [
            // /@/xxxx => src/xxxx
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/',
            },
        ],
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {},
                javascriptEnabled: true,
            },
        }
    },
})
