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
        outDir: "dist",
        baseUrl: "/",
        css: {
          globalCssPath: "src/styles/index.css",
          minify: "esbuild",
        },
        images: {
          enabled: false,
        },
        html: {
          bodyTags: '<script type="module" src="/assets/app.js"></script>',
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
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  css: {
    transformer: "postcss",
  },
});
