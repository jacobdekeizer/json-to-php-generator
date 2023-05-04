import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
    plugins: [vue()],
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './tests/test-utils.ts'
    },
})