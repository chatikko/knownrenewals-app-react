// vite.config.ts
import { defineConfig } from "file:///D:/2k25-projects/knownrenewals-app-react/node_modules/vite/dist/node/index.js";
import react from "file:///D:/2k25-projects/knownrenewals-app-react/node_modules/@vitejs/plugin-react/dist/index.js";
import { ssgPlugin } from "file:///D:/2k25-projects/knownrenewals-app-react/node_modules/vite-plugin-ssg/dist/plugin.js";
import path from "node:path";
var __vite_injected_original_dirname = "D:\\2k25-projects\\knownrenewals-app-react";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    react(),
    ssgPlugin({
      pages: "src/pages/marketing",
      config: {
        outDir: "dist",
        baseUrl: ".",
        css: {
          globalCssPath: "src/styles/index.css",
          minify: "esbuild"
        },
        images: {
          enabled: false
        },
        html: {
          bodyTags: '<script type="module" src="/assets/app.js"></script>'
        }
      },
      devMiddleware: false
    })
  ],
  server: {
    allowedHosts: ["*"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]"
      }
    }
  },
  css: {
    transformer: "postcss"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwyazI1LXByb2plY3RzXFxcXGtub3ducmVuZXdhbHMtYXBwLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwyazI1LXByb2plY3RzXFxcXGtub3ducmVuZXdhbHMtYXBwLXJlYWN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8yazI1LXByb2plY3RzL2tub3ducmVuZXdhbHMtYXBwLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IHNzZ1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zc2dcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIvXCIsXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHNzZ1BsdWdpbih7XG4gICAgICBwYWdlczogXCJzcmMvcGFnZXMvbWFya2V0aW5nXCIsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICAgICAgYmFzZVVybDogXCIuXCIsXG4gICAgICAgIGNzczoge1xuICAgICAgICAgIGdsb2JhbENzc1BhdGg6IFwic3JjL3N0eWxlcy9pbmRleC5jc3NcIixcbiAgICAgICAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxuICAgICAgICB9LFxuICAgICAgICBpbWFnZXM6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgaHRtbDoge1xuICAgICAgICAgIGJvZHlUYWdzOiAnPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiL2Fzc2V0cy9hcHAuanNcIj48L3NjcmlwdD4nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGRldk1pZGRsZXdhcmU6IGZhbHNlLFxuICAgIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBhbGxvd2VkSG9zdHM6IFtcIipcIl0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL2FwcC5qc1wiLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV1bZXh0bmFtZV1cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgdHJhbnNmb3JtZXI6IFwicG9zdGNzc1wiLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdULFNBQVMsb0JBQW9CO0FBQzdVLE9BQU8sV0FBVztBQUNsQixTQUFTLGlCQUFpQjtBQUMxQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsS0FBSztBQUFBLFVBQ0gsZUFBZTtBQUFBLFVBQ2YsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLFNBQVM7QUFBQSxRQUNYO0FBQUEsUUFDQSxNQUFNO0FBQUEsVUFDSixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sY0FBYyxDQUFDLEdBQUc7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
