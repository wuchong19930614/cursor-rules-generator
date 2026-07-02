import type { MetadataRoute } from "next";
import { templateRegistry } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.cursorgenerator.dev";
  const lastModified = new Date("2026-07-02");
  const templateUrls = Object.keys(templateRegistry).map((slug) => ({
    url: `${baseUrl}/templates/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...templateUrls,
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides/migrate-cursorrules-to-cursor-rules`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/how-to-use-cursor-rules`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cursor-rules-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cursor-rules`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cursor-project-rules`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents-md-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cursorrules-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
