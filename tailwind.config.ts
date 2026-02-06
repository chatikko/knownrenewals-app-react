import type { Config } from "tailwindcss";
import fs from "node:fs";
import path from "node:path";

type FigmaJson = {
  styles: {
    colors: Record<string, string>;
    typography: {
      font: string;
      h1: { size: number; weight: number };
      h2: { size: number; weight: number };
      body: { size: number; weight: number };
      small: { size: number; weight: number };
    };
  };
};

const figmaCandidates = [
  path.resolve(process.cwd(), "../KnowRenewals_Figma_UI.json"),
  path.resolve(process.cwd(), "KnowRenewals_Figma_UI.json"),
];
const figmaPath = figmaCandidates.find((candidate) => fs.existsSync(candidate));

if (!figmaPath) {
  throw new Error("KnowRenewals_Figma_UI.json not found. Expected near the frontend folder.");
}

const figma = JSON.parse(fs.readFileSync(figmaPath, "utf-8")) as FigmaJson;

const colors = figma.styles.colors;
const typo = figma.styles.typography;

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        h1: [`${typo.h1.size}px`, { lineHeight: "1.3", fontWeight: `${typo.h1.weight}` }],
        h2: [`${typo.h2.size}px`, { lineHeight: "1.35", fontWeight: `${typo.h2.weight}` }],
        body: [`${typo.body.size}px`, { lineHeight: "1.45", fontWeight: `${typo.body.weight}` }],
        small: [`${typo.small.size}px`, { lineHeight: "1.4", fontWeight: `${typo.small.weight}` }],
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.08)",
        focus: `0 0 0 3px ${colors.primary}33`,
      },
    },
  },
  plugins: [],
};

export default config;
