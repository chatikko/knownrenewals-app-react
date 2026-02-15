import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const mode = process.argv.includes("--dist") ? "dist" : "source";
const bannedPhrases = ["search intent", "target keyword", "internal note", "for seo only"];

function collectFilesByExtension(dirPath, extension) {
  if (!existsSync(dirPath)) return [];
  const files = [];
  const stack = [dirPath];

  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;

    for (const name of readdirSync(current)) {
      const fullPath = path.join(current, name);
      const stats = statSync(fullPath);
      if (stats.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (fullPath.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function collectBlogHtmlFiles(dirPath) {
  if (!existsSync(dirPath)) return [];
  return readdirSync(dirPath)
    .filter((name) => /^blog-.*\.html$/i.test(name))
    .map((name) => path.join(dirPath, name));
}

function findLineNumbers(content, phrase) {
  const lower = content.toLowerCase();
  const lines = new Set();
  let cursor = 0;

  while (cursor < lower.length) {
    const found = lower.indexOf(phrase, cursor);
    if (found === -1) break;
    const line = content.slice(0, found).split("\n").length;
    lines.add(line);
    cursor = found + phrase.length;
  }

  return [...lines].sort((a, b) => a - b);
}

function getFilesToScan() {
  const sourceFiles = [
    ...collectFilesByExtension(path.join(root, "src", "pages", "marketing"), ".tsx"),
    path.join(root, "src", "content", "articles.json"),
    ...collectBlogHtmlFiles(path.join(root, "public")),
  ];

  if (mode === "dist") {
    return [
      ...sourceFiles,
      ...collectBlogHtmlFiles(path.join(root, "dist")),
    ];
  }

  return sourceFiles;
}

const files = getFilesToScan().filter((filePath) => existsSync(filePath));
const violations = [];

for (const filePath of files) {
  const content = readFileSync(filePath, "utf8");
  for (const phrase of bannedPhrases) {
    const lineNumbers = findLineNumbers(content, phrase);
    for (const lineNumber of lineNumbers) {
      violations.push({
        filePath: path.relative(root, filePath),
        lineNumber,
        phrase,
      });
    }
  }
}

if (violations.length) {
  // eslint-disable-next-line no-console
  console.error(`seo: copy check failed (${mode})`);
  for (const violation of violations) {
    // eslint-disable-next-line no-console
    console.error(
      ` - ${violation.filePath}:${violation.lineNumber} contains banned phrase "${violation.phrase}"`,
    );
  }
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log(`seo: copy check passed (${mode}, ${files.length} files)`);
