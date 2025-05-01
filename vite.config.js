import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react-swc'
import electron from 'vite-plugin-electron'

// https://vite.dev/config/
export default defineConfig({
  // base: './',
  plugins: [tailwindcss(), react(), electron({entry: 'electron/main.js', 
    output: 'release/electron', 
    onstart: () => {
      try {
        require('child_process').execSync('taskkill /F /IM electron.exe')
      } catch {}
    }})],
})
