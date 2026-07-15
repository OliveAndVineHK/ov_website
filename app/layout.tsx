import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./animations.css";
import PageTitle from "./components/PageTitle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const CANONICAL_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oliveandvinehk.com"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Olive & Vine | Accounting and Advisory Solutions",
    template: "%s | Olive & Vine",
  },
  description: "Olive & Vine is a company that provides accounting and advisory solutions to businesses in Hong Kong.",
  keywords: ["accounting", "advisory", "Hong Kong", "corporate services", "tax", "HR", "consulting", "assurance", "Olive & Vine"],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ko_KR",
    siteName: "Olive & Vine",
    url: CANONICAL_ORIGIN,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/logo.png",
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "iLNTwiHUwAirzW8fr_IBXlI6Pwb7h_ozzI6cjDzi-OY",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <PageTitle />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <SpeedInsights />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
