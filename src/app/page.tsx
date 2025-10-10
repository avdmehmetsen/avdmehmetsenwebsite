"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ExpertiseAreasSection from "@/components/ExpertiseAreas";
import ArticleCard from "@/components/ArticleCard";
import { CheckCircle, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors } from "@/constants/colors";

export default function Home() {
  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Müvekkillerimize en iyi hizmeti sunmak için çalışıyoruz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div
                className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.lightGreen }}
              >
                <CheckCircle
                  className="w-8 h-8"
                  style={{ color: colors.theme2.darkGreen }}
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
                style={{ backgroundColor: colors.theme2.lightGreen }}
              >
                <Clock
                  className="w-8 h-8"
                  style={{ color: colors.theme2.darkGreen }}
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
                style={{ backgroundColor: colors.theme2.lightGreen }}
              >
                <Users
                  className="w-8 h-8"
                  style={{ color: colors.theme2.darkGreen }}
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
            Hukuki Sorunlarınız İçin Hemen İletişime Geçin
          </h2>
          <p className="text-slate-800 text-lg mb-8 max-w-2xl mx-auto">
            Size yardımcı olmaktan memnuniyet duyarız. Formumuzu doldurarak ya
            da bizi arayarak danışmanlık talebinde bulunabilirsiniz.
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
            {[
              {
                id: "1",
                slug: "yeni-ceza-kanunu-degisiklikleri",
                category: "Ceza Hukuku",
                title: "Yeni Ceza Kanunu Değişiklikleri ve Uygulamaları",
                excerpt:
                  "2024 yılında yürürlüğe giren ceza kanunu değişikliklerinin detaylı analizi ve pratik uygulamaları...",
                date: "15 Mart 2024",
                imageUrl: null,
              },
              {
                id: "2",
                slug: "sirket-kurulusunda-dikkat-edilmesi-gerekenler",
                category: "Ticaret Hukuku",
                title: "Şirket Kuruluşunda Dikkat Edilmesi Gerekenler",
                excerpt:
                  "Ticaret hukukunda şirket kuruluş sürecinde önemli noktalar ve yasal gereklilikler hakkında bilgiler...",
                date: "10 Mart 2024",
                imageUrl: null,
              },
              {
                id: "3",
                slug: "bosanma-davalarinda-velayet-haklari",
                category: "Aile Hukuku",
                title: "Boşanma Davalarında Velayet Hakları",
                excerpt:
                  "Boşanma sürecinde velayet haklarının belirlenmesi ve çocuğun üstün yararı ilkesi üzerine açıklamalar...",
                date: "5 Mart 2024",
                imageUrl: null,
              },
            ].map((article, index) => (
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
    </div>
  );
}
