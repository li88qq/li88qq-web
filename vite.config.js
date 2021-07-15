import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import process from 'process'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

function pathResolve(dir) {
    return resolve(process.cwd(), '.', dir);
}

export default defineConfig(({mode}) => {
    return {
        plugins: [vue()],
        resolve: {
            alias: [
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
            ]
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8080/',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
