import { defineConfig } from 'vite'
import path from 'path'
import inject from '@rollup/plugin-inject'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
    }
},
build: {
    rollupOptions: {
        plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
},
})
