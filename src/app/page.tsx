"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import ExpertiseAreasSection from "@/components/ExpertiseAreas";
import ArticleCard from "@/components/ArticleCard";
import { CheckCircle, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors } from "@/constants/colors";
import { getLatestArticles } from "@/services/articleService";
import { Article } from "@/types";

export default function Home() {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);

  // Fetch latest articles from Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getLatestArticles(3);
        setLatestArticles(articles);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Neden İzmir'de Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              İzmir avukat olarak müvekkillerimize en iyi hukuki danışmanlık hizmetini sunmak için çalışıyoruz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div
                className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.greenBackground }}
              >
                <CheckCircle
                  className="w-8 h-8"
                  style={{ color: colors.text.light }}
                />
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Uzmanlık
              </h3>
              <p className="text-gray-600">
                Farklı hukuk alanlarında edindiğimiz bilgiyle etkili çözümler
                üretiyoruz
              </p>
            </div>
            <div className="text-center p-6">
              <div
                className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.greenBackground }}
              >
                <Clock
                  className="w-8 h-8"
                  style={{ color: colors.text.light }}
                />
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Çözüm Odaklı Yaklaşım
              </h3>
              <p className="text-gray-600">
                Her müvekkilimizin durumuna özel, etkili ve pratik çözümler
                geliştiriyoruz
              </p>
            </div>
            <div className="text-center p-6">
              <div
                className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.greenBackground }}
              >
                <Users
                  className="w-8 h-8"
                  style={{ color: colors.text.light }}
                />
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Güven ve Şeffaflık
              </h3>
              <p className="text-gray-600">
                Her aşamada müvekkillerimizle açık iletişim ve güvene dayalı bir
                süreç yürütüyoruz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas Section */}
      <ExpertiseAreasSection />

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: "#cb8929" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            İzmir'de Hukuki Sorunlarınız İçin Avukat Desteği
          </h2>
          <p className="text-slate-800 text-lg mb-8 max-w-2xl mx-auto">
            İzmir avukat olarak size yardımcı olmaktan memnuniyet duyarız. Formumuzu doldurarak ya
            da bizi arayarak İzmir'de avukat danışmanlık talebinde bulunabilirsiniz.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg"
          >
            İletişim Formu
          </Link>
        </div>
      </section>

      {/* Latest Articles Preview */}
      {latestArticles.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Son Makaleler
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Hukuk dünyasından güncel yazılar ve analizler
              </p>
              <div className="mx-auto mt-6 h-px w-24 bg-slate-300" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link
                href="/makaleler"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold",
                  "bg-slate-900 text-white shadow-sm ring-1 ring-black/5 transition-all",
                  "hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
                )}
              >
                Tüm Makaleler
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
