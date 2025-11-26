"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { cn } from "@/lib/utils";
import ArticleCard from "@/components/ArticleCard";
import { colors } from "@/constants/colors";

const ALLOWED_IMAGE_HOSTS = [
  "images.pexels.com",
  "unsplash.com",
  "images.unsplash.com",
  "pixabay.com",
  "cdn.pixabay.com",
];

function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.endsWith(".public.blob.vercel-storage.com")) {
      return true;
    }
    return ALLOWED_IMAGE_HOSTS.includes(urlObj.hostname);
  } catch {
    return false;
  }
}

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetailClient({
  article,
  relatedArticles,
}: ArticleDetailClientProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const isValidUrl = useMemo(
    () => isValidImageUrl(article?.imageUrl),
    [article?.imageUrl]
  );

  const hasImage = isValidUrl && !imageError;

  useEffect(() => {
    if (article?.imageUrl && !isValidUrl) {
      console.warn(
        `Geçersiz resim URL'si: ${article.imageUrl}\n` +
          `İzin verilen hostlar: ${ALLOWED_IMAGE_HOSTS.join(", ")}`
      );
    }
  }, [article?.imageUrl, isValidUrl]);

  return (
    <div className="bg-white">
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

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-xs text-sm font-semibold">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            {article.title}
          </h1>

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
              <span className="font-medium text-slate-900">{article.author}</span>
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
              <span>{article.date}</span>
            </div>
          </div>

          {hasImage && (
            <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl mb-12 shadow-lg">
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
              )}

              <Image
                src={article.imageUrl as string}
                alt={article.title}
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
                  console.warn(`Resim yüklenemedi: ${article.imageUrl}`);
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            </div>
          )}

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
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Etiketler</h3>
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
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

      {relatedArticles.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                İlgili Makaleler
              </h2>
              <p className="text-slate-600">
                {article.category} kategorisinden diğer yazılar
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

      <section className="py-20" style={{ backgroundColor: colors.primary.main }}>
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

