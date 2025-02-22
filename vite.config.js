import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
export default defineConfig({
    resolve: {
        alias: {
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@scss/vars" as *;`
            }
        }
    },
    plugins: [
        react(),
    ],
    server: {
        host: true
    }
})