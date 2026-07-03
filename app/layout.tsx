import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "@/components/layout/site-header";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";
import "./globals.css";

const geistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://www.cursorgenerator.dev";

const primaryNav = [
  { href: "/", label: "Generator" },
  { href: "/templates", label: "Templates" },
  { href: "/cursor-rules", label: "Cursor Rules" },
  { href: "/cursor-project-rules", label: "Project Rules" },
  { href: "/agents-md-generator", label: "AGENTS.md" },
];

const footerLinks = [
  { href: "/cursor-rules-generator", label: "Cursor Rules Generator" },
  { href: "/cursorrules-generator", label: ".cursorrules Generator" },
  { href: "/guides/how-to-use-cursor-rules", label: "How to Use Cursor Rules" },
  {
    href: "/guides/migrate-cursorrules-to-cursor-rules",
    label: "Migration Guide",
  },
  { href: "/about", label: "About" },
];

const popularTemplateLinks = [
  { href: "/templates/nextjs", label: "Next.js" },
  { href: "/templates/react", label: "React" },
  { href: "/templates/python", label: "Python" },
  { href: "/templates/typescript", label: "TypeScript" },
  { href: "/templates/go", label: "Go" },
  { href: "/templates/docker", label: "Docker" },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cursor Rules Generator — Project Rules, AGENTS.md & .cursorrules Generator",
    template: "%s | Cursor Rules Generator",
  },
  description:
    "Generate Project Rules (.mdc), AGENTS.md, or legacy .cursorrules for Cursor IDE. Choose from 26+ templates (React, Next.js, Python, Go, Rust & more), set your coding style, and download production-ready AI rules in your preferred format.",
  keywords: [
    "cursor rules",
    "project rules",
    ".mdc",
    "AGENTS.md",
    ".cursorrules",
    "cursor rules generator",
    "cursor ide",
    "cursor ai rules",
    "cursor configuration",
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
    title: "Cursor Rules Generator — Project Rules, AGENTS.md & .cursorrules Generator",
    description:
      "Generate Project Rules (.mdc), AGENTS.md, or legacy .cursorrules for Cursor IDE. 26+ templates, real-time preview, one-click download in your preferred format.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cursor Rules Generator — Create Project Rules, AGENTS.md & .cursorrules files",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cursorrulesgen",
    creator: "@cursorrulesgen",
    title: "Cursor Rules Generator — Project Rules, AGENTS.md & .cursorrules Generator",
    description:
      "Generate Project Rules (.mdc), AGENTS.md, or legacy .cursorrules for Cursor IDE. 26+ templates, real-time preview, one-click download in your preferred format.",
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
        {/* Preconnect for analytics origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
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
            __html: JSON.stringify(homeBreadcrumb),
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
        <SiteHeader navItems={primaryNav} />
        {children}
        <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:px-6 md:grid-cols-3">
            <div>
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Cursor Rules Generator
              </h2>
              <p className="mt-3 max-w-sm text-zinc-600 dark:text-zinc-400">
                Generate Project Rules, AGENTS.md, and legacy .cursorrules files
                for Cursor IDE with stack-aware templates.
              </p>
            </div>
            <nav aria-label="Footer" className="space-y-2">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Guides
              </h2>
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav aria-label="Popular templates" className="space-y-2">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Popular Templates
              </h2>
              <div className="flex flex-wrap gap-2">
                {popularTemplateLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md bg-zinc-100 px-2.5 py-1 text-zinc-600 hover:text-blue-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
