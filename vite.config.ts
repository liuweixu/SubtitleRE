import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import electron from "vite-plugin-electron";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    electron({
      entry: "electron/main.ts", // 主进程入口文件
      onstart(args) {
        args.reload();
      },
      vite: {
        build: {
          outDir: "dist",
          rollupOptions: {
            external: ["electron"],
          },
        },
      },
    }),
  ],
  build: {
    emptyOutDir: true, // 确保electron构建时不会清空输出目录
    outDir: "dist", // 指定输出目录
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@models": path.resolve(__dirname, "./models"),
    },
  },
});
