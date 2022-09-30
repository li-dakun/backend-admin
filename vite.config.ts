import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],
  server: {
    watch: {
      usePolling: true
    },
    cors: true,
    host: "localhost",
    hmr: true,//热更新
    // open:true,
    // port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
