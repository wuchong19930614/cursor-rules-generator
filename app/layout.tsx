import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getWebApplicationSchema,
  getBreadcrumbSchema,
  getFAQPageSchema,
} from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.cursorgenerator.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cursor Rules Generator — Free .cursorrules File Generator",
    template: "%s | Cursor Rules Generator",
  },
  description:
    "Generate customized .cursorrules files for your tech stack in minutes. Choose from 21+ templates (React, Next.js, Python, Go, Rust & more), set your coding style, and download production-ready AI rules for Cursor IDE.",
  keywords: [
    "cursor rules",
    ".cursorrules",
    "cursor rules generator",
    "cursor ide",
    "cursor ai rules",
    "cursor configuration",
    "cursorrules file",
    "ai coding rules",
    "cursor custom instructions",
  ],
  authors: [{ name: "Cursor Rules Generator" }],
  creator: "Cursor Rules Generator",
  publisher: "Cursor Rules Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Cursor Rules Generator",
    title: "Cursor Rules Generator — Free .cursorrules File Generator",
    description:
      "Generate customized .cursorrules files for your tech stack in minutes. 21+ templates, real-time preview, one-click download.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cursor Rules Generator — Create custom .cursorrules files",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cursorrulesgen",
    creator: "@cursorrulesgen",
    title: "Cursor Rules Generator — Free .cursorrules File Generator",
    description:
      "Generate customized .cursorrules files for your tech stack in minutes. 21+ templates, real-time preview, one-click download.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeBreadcrumb = getBreadcrumbSchema([
    { name: "Home", url: siteUrl },
  ]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebApplicationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeBreadcrumb),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFAQPageSchema()),
          }}
        />
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "x58f26t4cc");`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        {/* Skip-to-content for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2NM7XLC7H2" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2NM7XLC7H2');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
