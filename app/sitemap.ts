import type { MetadataRoute } from "next";
import { templateRegistry } from "@/lib/templates";
import { getEditorial } from "@/lib/templates/editorial";

const baseUrl = "https://www.cursorgenerator.dev";

/**
 * 各路由的真实最后内容更新日期(来自 git 历史)。
 * 页面内容有实质更新时才修改对应日期 —— 虚假的统一 lastmod 会让搜索引擎忽略此字段。
 */
const PAGE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-07-16",
  "/templates": "2026-07-16",
  "/about": "2026-07-16",
  "/guides/how-to-use-cursor-rules": "2026-07-16",
  "/guides/migrate-cursorrules-to-cursor-rules": "2026-07-21",
  "/cursor-rules-generator": "2026-07-16",
  "/cursor-rules": "2026-07-16",
  "/cursor-project-rules": "2026-07-16",
  "/agents-md-generator": "2026-07-16",
  "/cursorrules-generator": "2026-07-16",
};

/** 模板详情页内容来源于 lib/templates,以该目录最后更新日期为准 */
const TEMPLATES_LAST_MODIFIED = "2026-07-16";

function latestModified(...dates: Array<string | undefined>): Date {
  const timestamps = dates
    .filter((date): date is string => Boolean(date))
    .map((date) => new Date(date).getTime());

  return new Date(Math.max(...timestamps));
}

function lastModifiedFor(path: string): Date {
  return new Date(PAGE_LAST_MODIFIED[path] ?? TEMPLATES_LAST_MODIFIED);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const templateUrls = Object.keys(templateRegistry).map((slug) => ({
    url: `${baseUrl}/templates/${slug}`,
    // 模板元数据和 editorial 任一更新时,都使用其中较新的真实日期
    lastModified: latestModified(
      getEditorial(slug)?.lastUpdated,
      TEMPLATES_LAST_MODIFIED
    ),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastModifiedFor("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: lastModifiedFor("/templates"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...templateUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: lastModifiedFor("/about"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides/migrate-cursorrules-to-cursor-rules`,
      lastModified: lastModifiedFor("/guides/migrate-cursorrules-to-cursor-rules"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/how-to-use-cursor-rules`,
      lastModified: lastModifiedFor("/guides/how-to-use-cursor-rules"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cursor-rules-generator`,
      lastModified: lastModifiedFor("/cursor-rules-generator"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cursor-rules`,
      lastModified: lastModifiedFor("/cursor-rules"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cursor-project-rules`,
      lastModified: lastModifiedFor("/cursor-project-rules"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents-md-generator`,
      lastModified: lastModifiedFor("/agents-md-generator"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cursorrules-generator`,
      lastModified: lastModifiedFor("/cursorrules-generator"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
