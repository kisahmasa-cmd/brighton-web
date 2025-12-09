import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

interface ApiRedirect {
  Message: { Code: number; Text: string };
  Data: ApiDataRedirect[];
  Count: number;
}

interface ApiDataRedirect {
  ID: number;
  URLFrom: string;
  URLTo: string;
  Code: number;
}

const nextConfig: NextConfig = {
  async redirects() {
    // 1. Fetch redirects from your API
    let apiRedirects: ApiDataRedirect[] = [];

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || process.env.CLIENT_ID;

      const res = await fetch(`${apiUrl}/redirectionlinks?ClientID=${clientId}`);

      if (res.ok) {
        const { Data } = await res.json();
        apiRedirects = Data;
      } else {
        console.error("Failed to fetch API redirects:", res.status);
      }
    } catch (err) {
      console.error("Failed to fetch API redirects:", err);
    }

    // Map API redirects into Next.js redirect format
    const dynamicRedirects = apiRedirects.map((redirect) => ({
      source: redirect.URLFrom,
      destination: redirect.URLTo,
      permanent: true as const,
    }));

    // Static redirects
    const staticRedirects = [
      {
        source: "/faq",
        destination: "/hubungi/faq",
        permanent: true as const,
      },
      {
        source: "/articles-all",
        destination: "/about/articles-all",
        permanent: true as const,
      },
      {
        source: "/kpr",
        destination: "/hitung-angsuran-kpr-bank",
        permanent: true as const,
      },
      {
        source: "/agent",
        destination: "/agent/dashboard",
        permanent: true as const,
      },
      {
        source: "/join-us",
        destination: "https://landing.brighton.co.id/mengapabrighton",
        permanent: true as const,
      },
    ];

    return [...staticRedirects, ...dynamicRedirects];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-files.brighton.co.id",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.brighton.co.id",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.brighton.co.id",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "api.mapbox.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    reactCompiler: true,
  },
  // swcMinify: true,
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options
  org: "sentry",

  project: "brighton-site",
  sentryUrl: "https://sentry.brighton.co.id/",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
