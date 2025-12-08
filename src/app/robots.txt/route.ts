import { readdir } from "fs/promises";
import { headers } from "next/headers";
import path from "path";

export async function GET(request: Request) {
  const isProd = process.env.NODE_ENV === "production";
  const h = await headers();

  const forwardedHost = h.get("x-forwarded-host");
  const host = forwardedHost || h.get("host");

  const proto = h.get("x-forwarded-proto") || "https"; // default https di production

  const origin = `${proto}://${host}`;

  if (!isProd) {
    // Development: block all
    return new Response(
      `User-agent: *
Disallow: /
`,
      { headers: { "Content-Type": "text/plain" } }
    );
  }

  // Production robots.txt

  // Folder absolute path
  const publicPath = path.join(process.cwd(), "public");

  // Read dir → filter sitemap*.xml
  const files = await readdir(publicPath);
  const sitemapFiles = files.filter((file) => file.startsWith("sitemap") && file.endsWith(".xml"));
  const sitemapLines = sitemapFiles.map((file) => `Sitemap: ${origin}/${file}`).join("\n");

  const aiBots = ["ClaudeBot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "Operator", "anthropic-ai", "claude-web", "Bytespider", "cohere-ai", "Google-Extended", "YouBot"];

  const aiBotsDisallows = ["Meta-ExternalFetcher", "meta-externalagent", "PerplexityBot", "Perplexity-User"];

  const disallows = [
    "/rss",
    "/*/rss",
    "/test/",
    "/login/*",
    "/agent/login/*",
    "/visitor/login/*",
    "/register/*",
    "/forgot-password/*",
    "/admin/*",
    "/wp-admin/",
    "/wp-includes/",
    "/dashboard/*",
    "/agent/login/?BackURL=/agent/*",
    "/api/",
    "/mou-api/*",
    "/request-payment-api/*",
    "/*?", // Block URLs with query parameters
    "/*&utm_", // Block URLs with tracking parameters
    "/*?utm_", // Same as above
    "/*?gclid=", // Block Google Ads URLs
    "/*&gclid=", // Same as above
    "/agent/qrcode/*",
    "/agent-us/qrcode/*",
    "/about-us/articles-all/rss",
    "/perumahan-baru/rss",
    "/agent/rss",
    "/*?BackURL=",
    "/*?fbclid=", // Block Facebook tracking URL
    "/*&fbclid=", // Same as above
    "/*?SecurityID=",
    "/*?ved=",
    "/*?Terdekat=",
    "/*?_gl=",
    "/*&_gl=",
    "/*?lay=",
    "/temporary/",
    "/*?temporary=",
    "/*?*&*&*&*",
  ];

  const content = `
User-agent: *
Allow: /_next/static/
Allow: /_next/image
Allow: /assets/
Allow: /static/

${disallows.map((d) => `Disallow: ${d}`).join("\n")}

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n")}
${aiBotsDisallows.map((b) => `User-agent: ${b}\nDisallow: /`).join("\n")}

${sitemapLines}
`;

  return new Response(content.trim() + "\n", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
