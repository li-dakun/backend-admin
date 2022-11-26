import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],
  base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
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
        target: 'http://localhost:8080',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  }

})
