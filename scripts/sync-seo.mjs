import { writeFileSync } from "node:fs";
import path from "node:path";
import {
  articlePath,
  getAllIndexableRoutes,
  loadArticles,
  routePathToTemplateFile,
} from "./seo-utils.mjs";

const root = process.cwd();
const publicDir = path.join(root, "public");
const homeTemplatePath = path.join(root, "index.html");

const allRoutes = getAllIndexableRoutes(root);
const articles = loadArticles(root);
const articleByPath = new Map(articles.map((article) => [articlePath(article), article]));

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function toScriptJsonLd(value) {
  return `<script type="application/ld+json">\n${JSON.stringify(value, null, 2)}\n</script>`;
}

function buildBreadcrumbSchema(route) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://knowrenewals.com/",
    },
  ];

  if (route.path === "/") {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    };
  }

  if (route.path === "/blog") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://knowrenewals.com/blog",
    });
  } else if (route.path.startsWith("/blog/")) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://knowrenewals.com/blog",
    });
    items.push({
      "@type": "ListItem",
      position: 3,
      name: route.breadcrumbName,
      item: route.canonical,
    });
  } else {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: route.breadcrumbName,
      item: route.canonical,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function getDefaultFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is renewal tracking software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Renewal tracking software helps businesses monitor subscription, contract, SaaS, domain, and license renewal dates and automate reminders.",
        },
      },
      {
        "@type": "Question",
        name: "How do automated renewal reminders work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Teams set reminder intervals such as 90, 60, and 30 days before renewal and assign owners who receive alerts.",
        },
      },
      {
        "@type": "Question",
        name: "What should I look for in subscription renewal software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Look for automated reminders, ownership workflows, a centralized dashboard, reporting, and clear pricing.",
        },
      },
    ],
  };
}

function getPricingFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I start on Founders and upgrade later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Teams can start on Founders and upgrade to Pro or Team when renewal volume and collaboration needs increase.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in Slack alerts by plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Founders includes daily Slack digest. Pro and Team include digest plus instant alerts for risk and due-in-7-days renewals.",
        },
      },
      {
        "@type": "Question",
        name: "Do all plans support spreadsheet import?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All plans include CSV import and export so teams can migrate from spreadsheet workflows quickly.",
        },
      },
      {
        "@type": "Question",
        name: "Is yearly billing discounted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Yearly billing offers the equivalent of two months free compared with monthly pricing.",
        },
      },
      {
        "@type": "Question",
        name: "Which plan is best for cross-functional teams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pro fits most cross-functional teams. Team is best for higher seat requirements and stronger role-based collaboration.",
        },
      },
    ],
  };
}

function getFeaturesFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What features matter most in renewal tracking software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Teams prioritize automated reminders, ownership workflows, risk visibility, and import/export support for consistent renewal execution.",
        },
      },
      {
        "@type": "Question",
        name: "Can we track contracts, SaaS tools, licenses, and domains together?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Teams can centralize contracts, SaaS subscriptions, licenses, and domains in one dashboard with shared ownership.",
        },
      },
      {
        "@type": "Question",
        name: "How do Slack alerts work for renewals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Slack supports daily digest and plan-based instant alerts so teams can respond quickly to risk and due-soon renewals.",
        },
      },
      {
        "@type": "Question",
        name: "Can we start from a spreadsheet and move into the app?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Teams can start with a spreadsheet template, then sign up and import into Contracts to sync renewal data.",
        },
      },
      {
        "@type": "Question",
        name: "Does this reduce manual follow-up work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Scheduled reminders and shared status tracking reduce manual follow-ups and missed deadline risk.",
        },
      },
    ],
  };
}

function getFaqSchema(route) {
  if (route.path === "/renewal-tracking-software-pricing") {
    return getPricingFaqSchema();
  }
  if (route.path === "/renewal-tracking-software-features") {
    return getFeaturesFaqSchema();
  }
  return getDefaultFaqSchema();
}

function getPricingProductOffers(canonical) {
  return [
    {
      "@type": "Offer",
      name: "Founders Monthly",
      priceCurrency: "USD",
      price: "19",
      availability: "https://schema.org/InStock",
      url: `${canonical}#pricing-founders`,
    },
    {
      "@type": "Offer",
      name: "Founders Yearly",
      priceCurrency: "USD",
      price: "190",
      availability: "https://schema.org/InStock",
      url: `${canonical}#pricing-founders`,
    },
    {
      "@type": "Offer",
      name: "Pro Monthly",
      priceCurrency: "USD",
      price: "99",
      availability: "https://schema.org/InStock",
      url: `${canonical}#pricing-pro`,
    },
    {
      "@type": "Offer",
      name: "Pro Yearly",
      priceCurrency: "USD",
      price: "990",
      availability: "https://schema.org/InStock",
      url: `${canonical}#pricing-pro`,
    },
    {
      "@type": "Offer",
      name: "Team Monthly",
      priceCurrency: "USD",
      price: "199",
      availability: "https://schema.org/InStock",
      url: `${canonical}#pricing-team`,
    },
    {
      "@type": "Offer",
      name: "Team Yearly",
      priceCurrency: "USD",
      price: "1990",
      availability: "https://schema.org/InStock",
      url: `${canonical}#pricing-team`,
    },
  ];
}

function getSchemaBlocks(route) {
  const schemaBlocks = [];
  const schemaTypes = new Set(route.schemaTypes ?? []);

  if (schemaTypes.has("BreadcrumbList")) {
    schemaBlocks.push(buildBreadcrumbSchema(route));
  }

  if (schemaTypes.has("Organization")) {
    schemaBlocks.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://knowrenewals.com/#organization",
      name: "KnowRenewals",
      alternateName: "Know Renewals",
      url: "https://knowrenewals.com",
      logo: "https://knowrenewals.com/logo.png",
      email: "contact@knowrenewals.com",
    });
  }

  if (schemaTypes.has("WebSite")) {
    schemaBlocks.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://knowrenewals.com/#website",
      name: "KnowRenewals",
      alternateName: "Know Renewals",
      url: "https://knowrenewals.com",
      publisher: {
        "@id": "https://knowrenewals.com/#organization",
      },
    });
  }

  if (schemaTypes.has("SoftwareApplication")) {
    schemaBlocks.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "KnowRenewals",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: route.canonical,
      description:
        "Renewal tracking software for subscriptions, contracts, SaaS, domains, and licenses with automated reminders.",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "19",
        availability: "https://schema.org/InStock",
      },
    });
  }

  if (schemaTypes.has("FAQPage")) {
    schemaBlocks.push(getFaqSchema(route));
  }

  if (schemaTypes.has("CollectionPage")) {
    schemaBlocks.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Renewal Management Blog",
      description:
        "Long-tail guides for subscription renewal tracking, SaaS renewals, contract reminders, and renewal operations.",
      url: route.canonical,
      about: [
        "renewal tracking software",
        "subscription renewal tracker",
        "contract renewal management software",
        "SaaS renewal management",
      ],
    });
  }

  if (schemaTypes.has("Product")) {
    const offers =
      route.path === "/renewal-tracking-software-pricing"
        ? getPricingProductOffers(route.canonical)
        : {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "19",
            availability: "https://schema.org/InStock",
          };

    schemaBlocks.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "KnowRenewals Renewal Tracking Software",
      description:
        "Renewal management platform for tracking subscriptions, contracts, SaaS, licenses, and domain renewals.",
      brand: {
        "@type": "Brand",
        name: "KnowRenewals",
      },
      url: route.canonical,
      offers,
    });
  }

  if (schemaTypes.has("Article")) {
    const article = articleByPath.get(route.path);
    const headline = article ? article.title : route.title.replace(" | KnowRenewals", "");
    schemaBlocks.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description: route.description,
      author: {
        "@type": "Organization",
        name: "KnowRenewals",
      },
      publisher: {
        "@type": "Organization",
        name: "KnowRenewals",
        logo: {
          "@type": "ImageObject",
          url: "https://knowrenewals.com/logo.png",
        },
      },
      mainEntityOfPage: route.canonical,
    });
  }

  if (schemaTypes.has("WebPage")) {
    schemaBlocks.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: route.title.replace(" | KnowRenewals", ""),
      url: route.canonical,
      description: route.description,
    });
  }

  return schemaBlocks.map(toScriptJsonLd).join("\n    ");
}

function validateMeta(route) {
  if (!route.canonical.startsWith("https://knowrenewals.com")) {
    throw new Error(`Canonical must be absolute and on knowrenewals.com: ${route.path}`);
  }
  if (route.title.length > 70) {
    throw new Error(`Title too long (${route.title.length}): ${route.path}`);
  }
  if (route.description.length > 170) {
    throw new Error(`Description too long (${route.description.length}): ${route.path}`);
  }
}

function buildCommonHead(route) {
  const schemaBlocks = getSchemaBlocks(route);
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);
  const canonical = escapeAttr(route.canonical);
  const robots = escapeAttr(route.robots);
  const ogType = escapeAttr(route.ogType);

  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${robots}" />
    <meta name="application-name" content="KnowRenewals" />
    <meta name="apple-mobile-web-app-title" content="KnowRenewals" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="KnowRenewals" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="https://knowrenewals.com/logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://knowrenewals.com/logo.png" />
    ${schemaBlocks}`;
}

function buildHomeTemplate(route) {
  const head = buildCommonHead(route);
  return `<!doctype html>
<html lang="en">
  <head>
    <base href="/" />
${head}
    <script>function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
      o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
      o.onload=function(){window.trackingFunctions.onLoad({appId:"698ccda74e4598001d42532e"})},
      document.head.appendChild(o)}initApollo();</script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-S7EJJSX1T1"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-S7EJJSX1T1");</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function buildStaticTemplate(route) {
  const head = buildCommonHead(route);
  return `<!doctype html>
<html lang="en">
  <head>
${head}
    <link rel="stylesheet" href="/assets/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/app.js"></script>
  </body>
</html>
`;
}

function writeRouteTemplate(route) {
  validateMeta(route);
  const templateFile = routePathToTemplateFile(route.path);
  const isHome = route.path === "/";
  const outputPath = isHome ? homeTemplatePath : path.join(publicDir, templateFile);
  const html = isHome ? buildHomeTemplate(route) : buildStaticTemplate(route);
  writeFileSync(outputPath, html, "utf8");
}

function buildSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = routes.map((route) => {
    const article = articleByPath.get(route.path);
    const lastmod = article?.updatedAt ?? today;
    return `  <url>
    <loc>${route.canonical}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${Number(route.priority).toFixed(1)}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
}

for (const route of allRoutes) {
  writeRouteTemplate(route);
}

const sitemapXml = buildSitemap(allRoutes);
writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");

// eslint-disable-next-line no-console
console.log(`seo: synced ${allRoutes.length} route templates and sitemap`);
