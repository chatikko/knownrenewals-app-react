import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ssgPlugin } from "vite-plugin-ssg";
import path from "node:path";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    ssgPlugin({
      pages: "src/pages/marketing",
      config: {
        outDir: "dist/static",
        baseUrl: "/static",
        css: {
          globalCssPath: "src/styles/index.css",
          minify: "esbuild",
        },
        images: {
          enabled: false,
        },
      },
      devMiddleware: false,
    }),
  ],
  server: {
    allowedHosts: ["*"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
