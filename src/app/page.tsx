"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ExpertiseAreasSection from "@/components/ExpertiseAreas";
import { CheckCircle, Clock, Users, ArrowRight, Calendar } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { colors } from "@/constants/colors";

const articleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

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
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Deneyim
              </h3>
              <p className="text-gray-600">
                Yılların verdiği tecrübe ile her davaya özel strateji
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Hızlı Çözüm
              </h3>
              <p className="text-gray-600">
                Hızlı ve etkili çözümler için profesyonel yaklaşım
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Güvenilirlik
              </h3>
              <p className="text-gray-600">
                Müvekkil memnuniyeti ve güven odaklı hizmet anlayışı
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

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                id: 1,
                category: "Ceza Hukuku",
                title: "Yeni Ceza Kanunu Değişiklikleri ve Uygulamaları",
                excerpt:
                  "2024 yılında yürürlüğe giren ceza kanunu değişikliklerinin detaylı analizi ve pratik uygulamaları...",
                date: "15 Mart 2024",
              },
              {
                id: 2,
                category: "Ticaret Hukuku",
                title: "Şirket Kuruluşunda Dikkat Edilmesi Gerekenler",
                excerpt:
                  "Ticaret hukukunda şirket kuruluş sürecinde önemli noktalar ve yasal gereklilikler hakkında bilgiler...",
                date: "10 Mart 2024",
              },
              {
                id: 3,
                category: "Aile Hukuku",
                title: "Boşanma Davalarında Velayet Hakları",
                excerpt:
                  "Boşanma sürecinde velayet haklarının belirlenmesi ve çocuğun üstün yararı ilkesi üzerine açıklamalar...",
                date: "5 Mart 2024",
              },
            ].map((article) => (
              <motion.div key={article.id} variants={articleVariants}>
                <Card
                  className={cn(
                    "group h-full rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur-sm",
                    "shadow-sm transition-all duration-300",
                    "hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                  )}
                >
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                    <span className="text-slate-400 text-sm font-medium">
                      Makale Görseli
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${colors.primary.main}20`,
                          color: colors.primary.main,
                        }}
                      >
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Link
                      href="/makaleler"
                      className={cn(
                        "inline-flex items-center gap-1 text-sm font-medium transition-all",
                        "group-hover:gap-2"
                      )}
                      style={{ color: colors.primary.main }}
                    >
                      Devamını Oku
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

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
