"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { colors } from "@/constants/colors";

export default function Makaleler() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Bu veriler Firebase'den gelecek - şimdilik örnek data
  const allArticles = [
    {
      id: "1",
      slug: "ceza-hukukunda-zamanaşımı",
      title: "Ceza Hukukunda Zamanaşımı Sürelerinin Önemi",
      category: "Ceza Hukuku",
      excerpt:
        "Ceza hukukunda zamanaşımı sürelerinin hesaplanması ve hukuki sonuçları hakkında detaylı bir inceleme...",
      date: "15 Mart 2024",
    },
    {
      id: "2",
      slug: "ticaret-hukuku-sozlesmeler",
      title: "Ticaret Hukukunda Sözleşme Serbestisi İlkesi",
      category: "Ceza Hukuku",
      excerpt:
        "Ticari sözleşmelerde tarafların serbestisi, sınırları ve bu ilkenin uygulanmasında dikkat edilmesi gerekenler...",
      date: "10 Mart 2024",
    },
    {
      id: "3",
      slug: "bosanma-davalarinda-velayet",
      title: "Boşanma Davalarında Velayet Hakkı ve Çocuğun Üstün Yararı",
      category: "Ceza Hukuku",
      excerpt:
        "Boşanma davalarında velayet hakkının belirlenmesinde mahkemelerin yaklaşımı ve çocuğun üstün yararı ilkesi...",
      date: "5 Mart 2024",
    },
    {
      id: "4",
      slug: "ise-iade-davalari",
      title: "İşe İade Davalarında Süre ve Usul",
      category: "Ceza Hukuku",
      excerpt:
        "İşten çıkarmalarda işçinin açabileceği işe iade davası, süreleri ve başvuru usulleri hakkında bilgiler...",
      date: "1 Mart 2024",
    },
    {
      id: "5",
      slug: "tapu-iptal-tescil-davalari",
      title: "Tapu İptal ve Tescil Davalarının Özellikleri",
      category: "Ceza Hukuku",
      excerpt:
        "Gayrimenkul hukukunda tapu iptal ve tescil davalarının açılma şartları, süreci ve sonuçları...",
      date: "25 Şubat 2024",
    },
    {
      id: "6",
      slug: "miras-payi-hesaplama",
      title: "Yasal Miras Paylarının Hesaplanması",
      category: "Ceza Hukuku",
      excerpt:
        "Miras hukukunda yasal mirasçılar, miras paylarının hesaplanması ve saklı pay kavramı üzerine açıklamalar...",
      date: "20 Şubat 2024",
    },
    {
      id: "7",
      slug: "is-sozlesmesi-feshi",
      title: "İş Sözleşmesinin Feshi ve Hukuki Sonuçları",
      category: "Ceza Hukuku",
      excerpt:
        "İş sözleşmesinin fesih türleri, işveren ve işçinin fesih hakları ve tazminat talepleri...",
      date: "15 Şubat 2024",
    },
    {
      id: "8",
      slug: "ticari-alacak-takibi",
      title: "Ticari Alacakların Takibi ve İcra Süreci",
      category: "Ceza Hukuku",
      excerpt:
        "Ticari alacakların yasal yollarla tahsili, icra takibi ve alacaklı haklarının korunması...",
      date: "10 Şubat 2024",
    },
    {
      id: "9",
      slug: "kira-sozlesmesi-tahliye",
      title: "Kira Sözleşmeleri ve Tahliye Davaları",
      category: "Ceza Hukuku",
      excerpt:
        "Kira hukukunda kiracı ve kiralayan hakları, tahliye davası açma şartları ve süreçleri...",
      date: "5 Şubat 2024",
    },
  ];

  // Sayfalandırma hesaplamaları
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = allArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Makaleler</h1>
            <p className="text-xl text-gray-300">
              Hukuk dünyasından güncel yazılar, analizler ve yorumlar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex gap-2 items-center">
              {/* Önceki Butonu */}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "p-2 rounded-lg border transition-all",
                  currentPage === 1
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Sayfa Numaraları */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all",
                      page === currentPage
                        ? "text-white shadow-md"
                        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                    )}
                    style={{
                      backgroundColor:
                        page === currentPage ? colors.primary.main : undefined,
                    }}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Sonraki Butonu */}
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={cn(
                  "p-2 rounded-lg border transition-all",
                  currentPage === totalPages
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Sayfa Bilgisi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 text-center text-sm text-slate-600"
          >
            {startIndex + 1} - {Math.min(endIndex, allArticles.length)} arası
            gösteriliyor (Toplam {allArticles.length} makale)
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary.main}20` }}
            >
              <Mail
                className="w-8 h-8"
                style={{ color: colors.primary.main }}
              />
            </div>
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
                className="flex-1 px-4 py-3 border text-black border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb8929] transition-shadow"
              />
              <button
                onClick={() => alert("Bu özellik yakında aktif olacaktır.")}
                className={cn(
                  "px-6 py-3 rounded-lg font-semibold transition-all shadow-sm",
                  "hover:-translate-y-0.5 hover:shadow-md text-white"
                )}
                style={{ backgroundColor: colors.primary.main }}
              >
                Abone Ol
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      */}
    </div>
  );
}
