"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { colors } from "@/constants/colors";
import { Bell } from "lucide-react";
import { getAnnouncements } from "@/services/announcementService";
import { Announcement } from "@/types";
import Image from "next/image";

export default function Duyurular() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const fetchedAnnouncements = await getAnnouncements(true); // Only get published announcements
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <section className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Duyurular
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Hukuk büromuzdan güncel duyurular ve haberler
            </p>
          </motion.div>
        </div>

        {/* Dekoratif SVG (alt sağ köşede) */}
        <div className="hidden md:flex absolute bottom-0 right-0 items-end justify-end pointer-events-none">
          <Image
            src="/images/column.svg"
            alt="Dekoratif sütun"
            width={200}
            height={200}
            className="opacity-4 md:w-[180px] lg:w-[220px]"
          />
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
                <p className="text-slate-600">Duyurular yükleniyor...</p>
              </div>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <p className="text-slate-600 text-base md:text-lg">
                Henüz hiç duyuru bulunmamaktadır.
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
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
          )}
        </div>
      </section>
    </div>
  );
}
