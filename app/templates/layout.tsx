import type { Metadata } from "next";

const siteUrl = "https://www.cursorgenerator.dev";
const pageDescription =
  "Browse 26+ Cursor Rules templates for React, Next.js, Python, Go, and more. Generate Project Rules (.mdc), AGENTS.md, or .cursorrules files for free.";

export const metadata: Metadata = {
  title: "Cursor Rules Templates — 26+ Tech Stacks",
  description: pageDescription,
  alternates: {
    canonical: `${siteUrl}/templates`,
  },
  openGraph: {
    url: `${siteUrl}/templates`,
    title: "Cursor Rules Templates — 26+ Tech Stacks",
    description: pageDescription,
  },
};

export default function TemplatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
