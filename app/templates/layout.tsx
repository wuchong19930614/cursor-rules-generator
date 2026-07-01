import type { Metadata } from "next";

const siteUrl = "https://www.cursorgenerator.dev";

export const metadata: Metadata = {
  title: "Cursor Rules Templates — 26+ Tech Stacks",
  description:
    "Browse Cursor Rules templates for React, Next.js, Python, Go, Rust, Vue, Angular, FastAPI, Docker, and more. Generate tailored Project Rules, AGENTS.md, or .cursorrules files.",
  alternates: {
    canonical: `${siteUrl}/templates`,
  },
  openGraph: {
    url: `${siteUrl}/templates`,
    title: "Cursor Rules Templates — 26+ Tech Stacks",
    description:
      "Browse Cursor Rules templates for popular frameworks and generate tailored AI coding rules for Cursor IDE.",
  },
};

export default function TemplatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
