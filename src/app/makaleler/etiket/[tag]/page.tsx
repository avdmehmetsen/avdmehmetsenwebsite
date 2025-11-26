import { getArticlesByTag } from "@/services/articleService";
import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const articles = await getArticlesByTag(tag);

  if (!articles || articles.length === 0) {
    notFound();
  }

  // Decode tag slug to display name (use first article's tag that matches)
  const { slugifyTR } = await import("@/lib/slugify");
  const displayTag =
    articles[0]?.tags?.find((t) => slugifyTR(t) === tag) || tag;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-24 md:pt-28">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            #{displayTag} Etiketi
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Bu etiketle ilişkilendirilmiş {articles.length} makale
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

