"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getArticleBySlug } from "@/services/articleService";
import { Article } from "@/types";

export default function MakaleDetay() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div>
      {/* Article Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <div className="mb-6">
            <Link
              href="/makaleler"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Tüm Makalelere Dön
            </Link>
          </div>
          <span className="text-amber-500 font-semibold">
            {displayArticle.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6">
            {displayArticle.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <span>{displayArticle.author}</span>
            <span>•</span>
            <span>{displayArticle.date}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none
            prose-headings:text-slate-900 prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-li:text-gray-700 prose-li:mb-2
            prose-strong:text-slate-900 prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: displayArticle.content }}
          />

          {/* Tags */}
          {displayArticle.tags && displayArticle.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Etiketler:</h3>
              <div className="flex flex-wrap gap-2">
                {displayArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Info */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg flex items-start gap-4">
            <div className="bg-slate-200 w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Foto</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {displayArticle.author}
              </h3>
              <p className="text-gray-600">
                Ceza Hukuku ve Ticaret Hukuku alanlarında uzman. Yılların
                deneyimi ile müvekkillerine profesyonel hukuki danışmanlık
                hizmeti sunmaktadır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles - TODO: Implement related articles feature */}
      {/* <section className="py-16 bg-gray-50">...</section> */}

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Hukuki Danışmanlığa İhtiyacınız mı Var?
          </h2>
          <p className="text-slate-800 mb-8">
            Uzman kadromuz ile size en uygun çözümü bulmak için buradayız.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
}
