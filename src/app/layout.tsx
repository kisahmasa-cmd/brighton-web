import type { Metadata } from "next";
import { Montserrat, Inter, Nunito } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import ToasterClient from "@/components/custom/ToasterClient";
import LoadAnalyticsOnInteraction from "@/components/custom/LoadAnalyticsOnInteraction";



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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NC8GFK6";
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-R4G2CPHB0E";

  return (
    <html lang="en">
      <head>
        {/* <ClientBreadcrumbSchema /> */}

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${nunito.variable} antialiased`}
      >
        <NextTopLoader color="#facc15" showSpinner={false} height={4} />

        <LoadAnalyticsOnInteraction gtmId={GTM_ID} gaId={GA_ID} />

        {children}

        <ToasterClient />
      </body>
    </html>
  );
}
