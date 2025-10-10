"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/services/articleService";
import { Article } from "@/types";
import { cn } from "@/lib/utils";
import ArticleCard from "@/components/ArticleCard";

// next.config.ts'de tanımlı olan izin verilen hostlar
const ALLOWED_IMAGE_HOSTS = [
  "images.pexels.com",
  "unsplash.com",
  "images.unsplash.com",
  "pixabay.com",
  "cdn.pixabay.com",
];

// URL'nin geçerli ve izin verilen bir hostname'e sahip olup olmadığını kontrol et
function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    return ALLOWED_IMAGE_HOSTS.includes(urlObj.hostname);
  } catch {
    return false;
  }
}

export default function MakaleDetay() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  // URL validation - hooks must be called before any conditional returns
  const isValidUrl = useMemo(
    () => isValidImageUrl(article?.imageUrl),
    [article?.imageUrl]
  );

  const hasImage = isValidUrl && !imageError;

  // Fetch article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const fetchedArticle = await getArticleBySlug(slug);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // Fetch related articles when article is loaded
  useEffect(() => {
    const fetchRelated = async () => {
      if (article) {
        try {
          const related = await getRelatedArticles(
            article.category,
            article.id,
            3
          );
          setRelatedArticles(related);
        } catch (error) {
          console.error("Error fetching related articles:", error);
        }
      }
    };

    fetchRelated();
  }, [article]);

  // Geçersiz URL'leri logla
  useEffect(() => {
    if (article?.imageUrl && !isValidUrl) {
      console.warn(
        `Geçersiz resim URL'si: ${article.imageUrl}\n` +
          `İzin verilen hostlar: ${ALLOWED_IMAGE_HOSTS.join(", ")}`
      );
    }
  }, [article?.imageUrl, isValidUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600">Makale yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Makale Bulunamadı
          </h1>
          <p className="text-slate-600 mb-6">
            Aradığınız makale bulunamadı veya yayından kaldırılmış olabilir.
          </p>
          <Link
            href="/makaleler"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Makalelere Dön
          </Link>
        </div>
      </div>
    );
  }

  // Use article from Firebase
  const displayArticle = article;

  return (
    <div className="bg-white">
      {/* Minimal Header - Just Back Button */}
      <section className="bg-slate-900 pt-24 md:pt-28 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/makaleler"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Tüm Makalelere Dön
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-xs text-sm font-semibold">
              {displayArticle.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            {displayArticle.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-6 text-slate-600 mb-10 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium text-slate-900">
                {displayArticle.author}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{displayArticle.date}</span>
            </div>
          </div>
          {/* Article Image */}
          {hasImage && (
            <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl mb-12 shadow-lg">
              {/* Loading Skeleton */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
              )}

              <Image
                src={displayArticle.imageUrl as string}
                alt={displayArticle.title}
                fill
                className={cn(
                  "object-cover transition-opacity duration-500",
                  imageLoading ? "opacity-0" : "opacity-100"
                )}
                sizes="(min-width: 1024px) 896px, 100vw"
                priority={true}
                onLoad={() => {
                  setImageLoading(false);
                }}
                onError={() => {
                  console.warn(`Resim yüklenemedi: ${displayArticle.imageUrl}`);
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose text-slate-900 prose-lg max-w-none
            prose-headings:text-slate-900 prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-800 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
            prose-li:text-slate-800 prose-li:mb-2 prose-li:leading-relaxed
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: displayArticle.content }}
          />

          {/* Tags */}
          {displayArticle.tags && displayArticle.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Etiketler
              </h3>
              <div className="flex flex-wrap gap-3">
                {displayArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2.5 bg-slate-100 text-slate-800 rounded-full text-sm font-medium hover:bg-amber-100 hover:text-amber-800 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                İlgili Makaleler
              </h2>
              <p className="text-slate-600">
                {displayArticle.category} kategorisinden diğer yazılar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  index={index}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                href="/makaleler"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-lg"
              >
                Tüm Makaleleri Görüntüle
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Hukuki Danışmanlığa İhtiyacınız mı Var?
          </h2>
          <p className="text-lg text-slate-800 mb-8 max-w-2xl mx-auto">
            Uzman kadromuz ile size en uygun çözümü bulmak için buradayız.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-slate-900 text-white px-10 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-xl"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
}
