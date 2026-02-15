import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/seo/routeMeta";

const DEFAULT_OG_IMAGE = "https://knowrenewals.com/logo.png";

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") return;
  let node = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === "undefined") return;
  let node = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

export function SeoSync() {
  const location = useLocation();

  useEffect(() => {
    const pathname = normalizePathname(location.pathname);
    const meta = getRouteMeta(pathname);
    if (!meta) return;

    if (typeof document === "undefined") return;

    document.title = meta.title;

    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "robots", meta.robots);

    upsertMeta("property", "og:type", meta.ogType);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", meta.canonical);
    upsertMeta("property", "og:image", DEFAULT_OG_IMAGE);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", DEFAULT_OG_IMAGE);

    upsertLink("canonical", meta.canonical);
  }, [location.pathname]);

  return null;
}
