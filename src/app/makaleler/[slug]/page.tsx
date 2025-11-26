import { notFound, permanentRedirect } from "next/navigation";
import ArticleDetailClient from "./ArticleDetailClient";
import {
  getArticleByLegacySlug,
  getArticleBySlug,
  getRelatedArticles,
} from "@/services/articleService";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export default async function MakaleDetay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    const legacyArticle = await getArticleByLegacySlug(slug);
    if (legacyArticle?.slug) {
      permanentRedirect(`/makaleler/${legacyArticle.slug}`);
    }
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    article.category,
    article.id,
    article.tags || [],
    3
  );

  return (
    <>
      <ArticleJsonLd
        meta={{
          title: article.title,
          description: article.excerpt,
          imageUrl: article.imageUrl ?? undefined,
          slug: article.slug,
          author: article.author,
          tags: article.tags,
          publishedAt:
            article.createdAt instanceof Date
              ? article.createdAt.toISOString()
              : undefined,
          modifiedAt:
            article.updatedAt instanceof Date
              ? article.updatedAt.toISOString()
              : undefined,
        }}
      />
      <ArticleDetailClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
