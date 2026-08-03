import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            jsxRuntime: 'automatic',
        }),
    ],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
                timeout: 120000,
                proxyTimeout: 120000,
            },
            '/uploads': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
                timeout: 120000,
                proxyTimeout: 120000,
            },
        },
    },
})
