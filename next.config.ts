import type { NextConfig } from "next";

// Legacy URLs from the pre-Next.js (WordPress) site that Google still has indexed.
// This site has no URL-based i18n — Korean is a runtime toggle in
// LanguageContext (see app/contexts/LanguageContext.tsx), so the old Korean
// pages have no separate route. Each "-kr" URL is 308'd to its single
// canonical route. Added 2026-08-18 after /services-kr and /services-2 showed up as 404s
// in Google results.
//
// NOTE: /subscribe is deliberately excluded — that page is intentionally
// unlinked (see CLAUDE.md §6) and must not gain a new inbound path.
const CANONICAL_ROUTES = [
  "/about",
  "/accounting-service",
  "/assurance-service",
  "/consulting-service",
  "/contact",
  "/corporate-service",
  "/hr-service",
  "/insights",
  "/leadership",
  "/our-values",
  "/services",
  "/tax-service",
];

// Suffixes the old WordPress site produced:
//   "-kr" = the Korean-language duplicate of a page
//   "-2"  = WordPress's automatic collision suffix when a slug was reused
const LEGACY_SUFFIXES = ["-kr", "-2"];

// Old URLs whose slug does not simply equal "<route><suffix>".
const EXTRA_REDIRECTS = [
  { source: "/service-kr", destination: "/services" }, // singular legacy form
  { source: "/service-2", destination: "/services" },
  { source: "/service", destination: "/services" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...CANONICAL_ROUTES.flatMap((route) =>
        LEGACY_SUFFIXES.map((suffix) => ({
          source: `${route}${suffix}`,
          destination: route,
          permanent: true, // 308 — transfers ranking signals to the canonical URL
        }))
      ),
      ...EXTRA_REDIRECTS.map((r) => ({ ...r, permanent: true })),
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
          { key: "Content-Type", value: "text/plain" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
