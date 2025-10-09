import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Firebase'den makale verisi gelecek
  return {
    title: `${slug} | Av. Mehmet Durdu Şen`,
    description: "Hukuk makalesi detayı",
  };
}

export default async function MakaleDetay({ params }: Props) {
  const { slug } = await params;

  // Bu veri Firebase'den gelecek - şimdilik örnek data
  const article = {
    title: "Ceza Hukukunda Zamanaşımı Sürelerinin Önemi",
    category: "Ceza Hukuku",
    date: "15 Mart 2024",
    author: "Av. Mehmet Durdu Şen",
    readTime: "8 dk",
    content: `
      <p>Ceza hukukunda zamanaşımı, belirli bir süre geçtikten sonra kamu davasının açılamaması veya cezanın infaz edilememesi sonucunu doğuran bir kurumdur. Zamanaşımı sürelerinin doğru hesaplanması ve uygulanması, adaletin tecelli etmesi açısından büyük önem taşır.</p>

      <h2>Zamanaşımı Türleri</h2>
      <p>Ceza hukukunda iki tür zamanaşımı bulunmaktadır:</p>
      <ul>
        <li><strong>Dava zamanaşımı:</strong> Kamu davasının açılamamasına neden olan zamanaşımıdır.</li>
        <li><strong>Ceza zamanaşımı:</strong> Mahkumiyet kararı verilmesine rağmen, cezanın infaz edilememesine neden olan zamanaşımıdır.</li>
      </ul>

      <h2>Zamanaşımı Süreleri</h2>
      <p>Türk Ceza Kanunu'na göre zamanaşımı süreleri, suçun ağırlığına göre değişiklik göstermektedir:</p>
      <ul>
        <li>Ağırlaştırılmış müebbet hapis cezasını gerektiren suçlarda zamanaşımı işlemez</li>
        <li>Müebbet hapis cezasını gerektiren suçlarda 30 yıl</li>
        <li>20 yıldan fazla hapis cezasını gerektiren suçlarda 25 yıl</li>
        <li>5 yıldan fazla 20 yıldan az hapis cezasını gerektiren suçlarda 15 yıl</li>
        <li>5 yıldan az hapis cezasını gerektiren suçlarda 8 yıl</li>
        <li>Sadece adli para cezasını gerektiren suçlarda 5 yıl</li>
      </ul>

      <h2>Zamanaşımının Kesilmesi ve Durması</h2>
      <p>Bazı hallerde zamanaşımı süresi kesilir veya durur. Örneğin, kovuşturma için kanunda yazılı şartların gerçekleşmesine bağlı olan suçlarda, bu şart gerçekleşinceye kadar zamanaşımı işlemez.</p>

      <p>Ayrıca, kamu davasının açılması ile zamanaşımı kesilir ve yeniden işlemeye başlar. Ancak kesinti hallerinde, her halde TCK'da belirtilen azami süre geçtiğinde zamanaşımı gerçekleşir.</p>

      <h2>Sonuç</h2>
      <p>Zamanaşımı, ceza hukukunun önemli kurumlarından biridir. Hem mağdur hem de sanık açısından hukuki güvenlik sağlar. Zamanaşımı sürelerinin doğru hesaplanması için mutlaka uzman bir avukattan destek alınması önerilir.</p>
    `,
    tags: ["Ceza Hukuku", "Zamanaşımı", "Kamu Davası", "TCK"],
  };

  // İlgili makaleler - Firebase'den gelecek
  const relatedArticles = [
    {
      id: "2",
      slug: "ticaret-hukuku-sozlesmeler",
      title: "Ticaret Hukukunda Sözleşme Serbestisi İlkesi",
      category: "Ticaret Hukuku",
    },
    {
      id: "3",
      slug: "bosanma-davalarinda-velayet",
      title: "Boşanma Davalarında Velayet Hakkı",
      category: "Aile Hukuku",
    },
    {
      id: "4",
      slug: "ise-iade-davalari",
      title: "İşe İade Davalarında Süre ve Usul",
      category: "İş Hukuku",
    },
  ];

  return (
    <div>
      {/* Article Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <div className="mb-4">
            <Link
              href="/makaleler"
              className="text-amber-500 hover:text-amber-400 flex items-center gap-2"
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
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime} okuma</span>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-200 h-96 flex items-center justify-center">
            <span className="text-gray-400">Makale Görseli</span>
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
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Etiketler:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg flex items-start gap-4">
            <div className="bg-slate-200 w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Foto</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{article.author}</h3>
              <p className="text-gray-600">
                Ceza Hukuku ve Ticaret Hukuku alanlarında uzman. Yılların
                deneyimi ile müvekkillerine profesyonel hukuki danışmanlık
                hizmeti sunmaktadır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            İlgili Makaleler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/makaleler/${related.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="bg-slate-200 h-40 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Makale Görseli</span>
                </div>
                <div className="p-6">
                  <span className="text-amber-600 text-sm font-semibold">
                    {related.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mt-2 group-hover:text-amber-600 transition-colors">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
