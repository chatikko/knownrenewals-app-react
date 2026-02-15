import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const routeToHtmlFile = new Map([
  ["/", "index.html"],
  ["/renewal-tracking-software", "renewal-tracking-software.html"],
  ["/subscription-renewal-tracker", "subscription-renewal-tracker.html"],
  ["/contract-renewal-management-software", "contract-renewal-management-software.html"],
  ["/saas-renewal-management", "saas-renewal-management.html"],
  ["/renewal-tracking-software-pricing", "renewal-tracking-software-pricing.html"],
  ["/excel-vs-renewal-tracking-software", "excel-vs-renewal-tracking-software.html"],
  ["/blog", "blog.html"],
  ["/privacy-policy", "privacy-policy.html"],
  ["/terms-of-service", "terms-of-service.html"],
]);

function resolveSsrEntry() {
  const candidates = [
    "render.mjs",
    "render.js",
    path.join("ssg", "render.mjs"),
    path.join("ssg", "render.js"),
    path.join("assets", "app.js"),
  ];
  for (const candidate of candidates) {
    const absPath = path.join(ssrDir, candidate);
    if (existsSync(absPath)) return absPath;
  }

  const stack = [ssrDir];
  while (stack.length) {
    const current = stack.pop();
    if (!current) break;
    for (const name of readdirSync(current)) {
      const full = path.join(current, name);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (name.endsWith(".js") || name.endsWith(".mjs")) {
        return full;
      }
    }
  }

  throw new Error("Could not find SSR entry (.js/.mjs) in dist-ssr.");
}

function injectIntoRoot(html, appHtml) {
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    throw new Error("Could not find root marker in template HTML.");
  }
  return html.replace(marker, `<div id="root">${appHtml}</div>`);
}

const ssrEntryPath = resolveSsrEntry();
const ssrModule = await import(pathToFileURL(ssrEntryPath).href);

if (typeof ssrModule.render !== "function") {
  throw new Error("SSR module does not export a render(url) function.");
}

for (const [route, htmlFile] of routeToHtmlFile.entries()) {
  const filePath = path.join(distDir, htmlFile);
  if (!existsSync(filePath)) {
    throw new Error(`Missing HTML template in dist: ${htmlFile}`);
  }

  const template = readFileSync(filePath, "utf8");
  const appHtml = ssrModule.render(route);
  const output = injectIntoRoot(template, appHtml);
  writeFileSync(filePath, output, "utf8");
  // eslint-disable-next-line no-console
  console.log(`prerender: rendered ${route} -> dist/${htmlFile}`);
}

if (existsSync(ssrDir)) {
  rmSync(ssrDir, { recursive: true, force: true });
  // eslint-disable-next-line no-console
  console.log("prerender: removed temporary dist-ssr");
}
