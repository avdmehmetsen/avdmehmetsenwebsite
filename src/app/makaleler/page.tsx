import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Makaleler | Av. Mehmet Dürdüsen",
  description: "Hukuk dünyasından güncel makaleler, analizler ve yorumlar.",
};

export default function Makaleler() {
  // Bu veriler Firebase'den gelecek - şimdilik örnek data
  const articles = [
    {
      id: "1",
      slug: "ceza-hukukunda-zamanaşımı",
      title: "Ceza Hukukunda Zamanaşımı Sürelerinin Önemi",
      category: "Ceza Hukuku",
      excerpt:
        "Ceza hukukunda zamanaşımı sürelerinin hesaplanması ve hukuki sonuçları hakkında detaylı bir inceleme...",
      date: "15 Mart 2024",
      author: "Av. Mehmet Dürdüsen",
      readTime: "8 dk",
    },
    {
      id: "2",
      slug: "ticaret-hukuku-sozlesmeler",
      title: "Ticaret Hukukunda Sözleşme Serbestisi İlkesi",
      category: "Ticaret Hukuku",
      excerpt:
        "Ticari sözleşmelerde tarafların serbestisi, sınırları ve bu ilkenin uygulanmasında dikkat edilmesi gerekenler...",
      date: "10 Mart 2024",
      author: "Av. Mehmet Dürdüsen",
      readTime: "6 dk",
    },
    {
      id: "3",
      slug: "bosanma-davalarinda-velayet",
      title: "Boşanma Davalarında Velayet Hakkı ve Çocuğun Üstün Yararı",
      category: "Aile Hukuku",
      excerpt:
        "Boşanma davalarında velayet hakkının belirlenmesinde mahkemelerin yaklaşımı ve çocuğun üstün yararı ilkesi...",
      date: "5 Mart 2024",
      author: "Av. Mehmet Dürdüsen",
      readTime: "10 dk",
    },
    {
      id: "4",
      slug: "ise-iade-davalari",
      title: "İşe İade Davalarında Süre ve Usul",
      category: "İş Hukuku",
      excerpt:
        "İşten çıkarmalarda işçinin açabileceği işe iade davası, süreleri ve başvuru usulleri hakkında bilgiler...",
      date: "1 Mart 2024",
      author: "Av. Mehmet Dürdüsen",
      readTime: "7 dk",
    },
    {
      id: "5",
      slug: "tapu-iptal-tescil-davalari",
      title: "Tapu İptal ve Tescil Davalarının Özellikleri",
      category: "Gayrimenkul Hukuku",
      excerpt:
        "Gayrimenkul hukukunda tapu iptal ve tescil davalarının açılma şartları, süreci ve sonuçları...",
      date: "25 Şubat 2024",
      author: "Av. Mehmet Dürdüsen",
      readTime: "9 dk",
    },
    {
      id: "6",
      slug: "miras-payi-hesaplama",
      title: "Yasal Miras Paylarının Hesaplanması",
      category: "Miras Hukuku",
      excerpt:
        "Miras hukukunda yasal mirasçılar, miras paylarının hesaplanması ve saklı pay kavramı üzerine açıklamalar...",
      date: "20 Şubat 2024",
      author: "Av. Mehmet Dürdüsen",
      readTime: "8 dk",
    },
  ];

  const categories = [
    "Tümü",
    "Ceza Hukuku",
    "Ticaret Hukuku",
    "Aile Hukuku",
    "İş Hukuku",
    "Gayrimenkul Hukuku",
    "Miras Hukuku",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Makaleler</h1>
          <p className="text-xl text-gray-300">
            Hukuk dünyasından güncel yazılar, analizler ve yorumlar
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-white text-slate-900 border border-gray-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/makaleler/${article.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="bg-slate-200 h-48 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Makale Görseli</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-600 text-sm font-semibold">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      {article.date}
                    </span>
                    <span className="text-amber-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                      Devamını Oku →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination - Firebase'den sonra aktif olacak */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                Önceki
              </button>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                2
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                3
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                Sonraki
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Yeni Makaleleri Kaçırmayın
          </h2>
          <p className="text-gray-600 mb-8">
            E-posta bültenimize abone olun ve yeni makalelerden haberdar olun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
