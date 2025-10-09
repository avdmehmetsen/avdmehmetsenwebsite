"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { colors } from "@/constants/colors";
import { Bell } from "lucide-react";

export default function Duyurular() {
  // Bu veriler Firebase'den gelecek - şimdilik örnek data
  const announcements = [
    {
      id: "1",
      title: "Ofis Yeri Değişikliği",
      date: "20 Mart 2024",
      content:
        "1 Nisan 2024 tarihi itibariyle ofisimiz yeni adresine taşınmaktadır. Yeni adresimiz: Örnek Mahallesi, Hukuk Sokak No:15 Kat:3 İstanbul. Tüm müvekkillerimize duyurulur.",
    },
    {
      id: "2",
      title: "Bayram Tatili Duyurusu",
      date: "15 Mart 2024",
      content:
        "Ofisimiz 28 Mart - 31 Mart 2024 tarihleri arasında Ramazan Bayramı nedeniyle kapalı olacaktır. Acil durumlar için iletişim numaramızdan bize ulaşabilirsiniz.",
    },
    {
      id: "3",
      title: "Yeni Kanun Değişiklikleri Semineri",
      date: "10 Mart 2024",
      content:
        "25 Mart 2024 tarihinde saat 14:00'te ofisimizde 'Yeni Kanun Değişiklikleri ve Uygulamadaki Etkileri' konulu bir seminer düzenlenecektir. Katılım ücretsizdir. Rezervasyon için bizimle iletişime geçiniz.",
    },
    {
      id: "4",
      title: "Online Danışmanlık Hizmeti Başladı",
      date: "5 Mart 2024",
      content:
        "Müvekkillerimizin talepleri doğrultusunda online danışmanlık hizmeti başlatılmıştır. Randevu almak için iletişim formumuz üzerinden bize ulaşabilirsiniz.",
    },
    {
      id: "5",
      title: "KVKK Uyum Danışmanlığı",
      date: "1 Mart 2024",
      content:
        "Şirketlerin KVKK'ya uyum süreçlerinde danışmanlık hizmeti vermeye başladık. Detaylı bilgi için iletişime geçiniz.",
    },
    {
      id: "6",
      title: "Yılbaşı Tatili",
      date: "25 Aralık 2023",
      content:
        "Ofisimiz 31 Aralık 2023 - 2 Ocak 2024 tarihleri arasında yılbaşı tatili nedeniyle kapalı olacaktır. Mutlu yıllar dileriz.",
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Duyurular</h1>
            <p className="text-xl text-gray-300">
              Hukuk büromuzdan güncel duyurular ve haberler
            </p>
          </motion.div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-6"
          >
            {announcements.map((announcement) => (
              <motion.div key={announcement.id} variants={item}>
                <Card
                  className={cn(
                    "group rounded-xl border-l-4 border-slate-900 bg-white/80 backdrop-blur-sm",
                    "shadow-sm transition-all duration-300",
                    "hover:-translate-x-1 hover:shadow-xl"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex size-12 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: colors.background.light }}
                      >
                        <Bell className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                          {announcement.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
