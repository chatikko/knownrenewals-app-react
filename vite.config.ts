import fs from "node:fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

type RedirectRule = {
  source: string;
  destination: string;
  type: "rewrite" | "redirect";
};

function normalizePathname(url: string) {
  const pathname = url.split("?")[0]?.split("#")[0] ?? "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function loadRedirectRules() {
  const redirectsFile = path.resolve(__dirname, "redirects.json");
  const raw = fs.readFileSync(redirectsFile, "utf8");
  return JSON.parse(raw) as RedirectRule[];
}

function devRedirectsPlugin(): Plugin {
  const rules = loadRedirectRules();
  const rewrites = new Map<string, string>();
  const redirects = new Map<string, string>();

  for (const rule of rules) {
    if (rule.source === "/*") continue;
    if (rule.type === "rewrite") rewrites.set(normalizePathname(rule.source), rule.destination);
    if (rule.type === "redirect") redirects.set(normalizePathname(rule.source), rule.destination);
  }

  const install = (
    middlewares: {
      use: (
        handler: (
          req: { method?: string; url?: string; headers?: { accept?: string } },
          res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (value?: string) => void },
          next: () => void,
        ) => void,
      ) => void;
    },
    transformHtml?: (url: string, html: string) => Promise<string>,
  ) => {
    middlewares.use((req, res, next) => {
      if (!req.url) return next();
      if (req.method !== "GET" && req.method !== "HEAD") return next();

      const accept = req.headers?.accept ?? "";
      if (typeof accept !== "string" || !accept.includes("text/html")) return next();

      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      const pathname = normalizePathname(req.url);

      const redirectTo = redirects.get(pathname);
      if (redirectTo) {
        res.statusCode = 301;
        res.setHeader("Location", redirectTo);
        res.end();
        return;
      }

      const rewriteTo = rewrites.get(pathname);
      if (!rewriteTo) return next();

      if (transformHtml && rewriteTo.endsWith(".html") && rewriteTo !== "/index.html") {
        const filePath = path.resolve(__dirname, "public", rewriteTo.replace(/^\/+/, ""));
        if (!fs.existsSync(filePath)) return next();

        const htmlSource = fs.readFileSync(filePath, "utf8")
          .replace('<link rel="stylesheet" href="/assets/index.css" />', "")
          .replace('src="/assets/app.js"', 'src="/src/main.tsx"');

        transformHtml(pathname, htmlSource)
          .then((html) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
          })
          .catch(() => next());
        return;
      }

      req.url = `${rewriteTo}${query}`;
      next();
    });
  };

  return {
    name: "dev-redirects-json",
    configureServer(server) {
      install(server.middlewares, (url, html) => server.transformIndexHtml(url, html));
    },
    configurePreviewServer(server) {
      install(server.middlewares);
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), devRedirectsPlugin()],
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
