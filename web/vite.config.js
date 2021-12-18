import {defineConfig, loadEnv,} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import process from 'process'

const pathResolve = (dir) => {
    return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);

    return {
        root,
        resolve: {
            alias: [
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
            ],
        },
        server: {
            // Listening on all local IPs
            host: true,
            port: parseInt(env.VITE_PORT),
            // Load proxy configuration from .env
            // proxy: createProxy(VITE_PROXY),
        },
        plugins: [vue()],
    }
})

