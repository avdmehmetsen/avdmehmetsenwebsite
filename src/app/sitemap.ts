import { MetadataRoute } from "next";
import { getArticles, getAllTagSlugsWithCount } from "@/services/articleService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.avdurdumehmetsen.com.tr";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uzmanlik-alanlari`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/makaleler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/duyurular`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cerezler`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic article pages
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticles(true); // Only published
    articlePages = articles.map((article) => ({
      url: `${baseUrl}/makaleler/${article.slug}`,
      lastModified: article.updatedAt || article.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
  }

  // Tag pages (only tags with 2+ articles)
  let tagPages: MetadataRoute.Sitemap = [];
  try {
    const tags = await getAllTagSlugsWithCount();
    tagPages = tags
      .filter((t) => t.count >= 2)
      .map((t) => ({
        url: `${baseUrl}/makaleler/etiket/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.3,
      }));
  } catch (error) {
    console.error("Error fetching tags for sitemap:", error);
  }

  // Note: Announcements are not individual pages, so not included in sitemap

  return [...staticPages, ...articlePages, ...tagPages];
}
