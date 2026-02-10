import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

const copies = [
  { from: path.join(root, "redirects.json"), to: path.join(distDir, "redirects.json") },
  { from: path.join(root, "public", "spa.html"), to: path.join(distDir, "spa.html") },
];

for (const { from, to } of copies) {
  if (existsSync(from)) {
    copyFileSync(from, to);
    // eslint-disable-next-line no-console
    console.log(`postbuild: copied ${path.relative(root, from)} -> ${path.relative(root, to)}`);
  }
}
