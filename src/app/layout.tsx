import type { Metadata } from "next";
import { Montserrat, Inter, Nunito } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import ToasterClient from "@/components/custom/ToasterClient";
// 1. IMPORT THE LIBRARY
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { headers } from "next/headers";
import { AUTO_BREADCRUMB_ALLOWED, STATIC_BREADCRUMB_PATHS } from "@/lib/schema/breadcrumb-config";
import { InjectSchema } from "@/lib/schema/inject-schema";
import { generateBreadcrumbFromPath } from "@/lib/schema/generate-breadcrumb-from-path";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // from brighton
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NC8GFK6";
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-R4G2CPHB0E";
  const headerList = await headers();
  const path = headerList.get("x-url") || "";

  const firstSegment = path.split("/")[1];
  const isStatic = STATIC_BREADCRUMB_PATHS.includes(`/${firstSegment}`);
  const isAllowedAuto = AUTO_BREADCRUMB_ALLOWED.includes(`/${firstSegment}`);

  // set manual
  // const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WCPVVMJ4";
  // const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-X4ZSSFL33Y";
  return (
    <html lang="en">
      <head>
        {/*ADD GTM COMPONENT */}
        <GoogleTagManager gtmId={GTM_ID} />
        {/* Note: standard Next.js fonts usually don't need these manual link tags, 
            but keeping them per your request. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link rel="preload" href="/globals.css" as="style" /> */}
        {!isStatic && isAllowedAuto && <InjectSchema data={generateBreadcrumbFromPath(path)} />}
      </head>

      <body
        className={`
          ${montserrat.variable}
          ${inter.variable}
          ${nunito.variable}
          antialiased
        `}
      >
        <NextTopLoader color="#facc15" showSpinner={false} height={4} />
        {children}
        <ToasterClient />

        {/*ADD GA4 COMPONENT HERE */}
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
