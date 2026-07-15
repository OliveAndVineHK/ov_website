import { INSIGHT_PAGES } from "@/app/utils/dynamicPageConfig";

// Use canonical production URL for sitemap so Search Console accepts it (never use Vercel deployment URL)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oliveandvinehk.com";

const root = baseUrl.replace(/\/$/, "");

const staticRoutes = [
  "",
  "/services",
  "/contact",
  "/about",
  "/our-values",
  "/insights",
  "/accounting-service",
  "/assurance-service",
  "/consulting-service",
  "/corporate-service",
  "/tax-service",
  "/hr-service",
  "/leadership",
  "/leadership/rebecca",
  "/leadership/miyoung",
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  for (const path of staticRoutes) {
    const url = `${root}${path || "/"}`;
    urls.push(
      `  <url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>${path === "" || path === "/services" || path === "/contact" ? "weekly" : "monthly"}</changefreq><priority>${path === "" ? "1.0" : path === "/services" || path === "/contact" ? "0.9" : "0.8"}</priority></url>`
    );
  }

  for (const key of Object.keys(INSIGHT_PAGES)) {
    const url = `${root}/${key}`;
    urls.push(
      `  <url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
