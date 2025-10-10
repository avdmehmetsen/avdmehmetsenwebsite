"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Scale,
  Building2,
  Users,
  Briefcase,
  Home,
  FileText,
  Car,
  Landmark,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { colors } from "@/constants/colors";

type ExpertiseArea = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const expertiseAreas: ExpertiseArea[] = [
  {
    id: "ceza-hukuku",
    title: "Ceza Hukuku",
    description: "Ceza davalarında etkin savunma ve müvekkil hakları koruması",
    icon: Scale,
  },
  {
    id: "ticaret-hukuku",
    title: "Ticaret Hukuku",
    description: "Şirket kurulumu, ticari anlaşmazlıklar ve sözleşme hukuku",
    icon: Building2,
  },
  {
    id: "aile-hukuku",
    title: "Aile Hukuku",
    description:
      "Boşanma, velayet ve nafaka davaları konusunda uzman danışmanlık",
    icon: Users,
  },
  {
    id: "is-hukuku",
    title: "İş Hukuku",
    description: "İşçi-işveren ilişkileri ve iş hukuku danışmanlığı",
    icon: Briefcase,
  },
  {
    id: "gayrimenkul-hukuku",
    title: "Gayrimenkul Hukuku",
    description: "Tapu işlemleri, kira anlaşmazlıkları ve emlak hukuku",
    icon: Home,
  },
  {
    id: "miras-hukuku",
    title: "Miras Hukuku",
    description: "Miras paylaşımı, veraset ve vasiyetname danışmanlığı",
    icon: FileText,
  },
  {
    id: "trafik-hukuku",
    title: "Trafik & Kasko",
    description: "Trafik kazaları, sigorta uyuşmazlıkları ve değer kaybı",
    icon: Car,
  },
  {
    id: "idare-hukuku",
    title: "İdare Hukuku",
    description: "İptal davaları, tam yargı ve kamu ihaleleri",
    icon: Landmark,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ExpertiseAreasSection() {
  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 mx-auto h-px w-11/12 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Uzmanlık Alanlarımız
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hukukun farklı alanlarında güvenilir ve etkili çözümler sunuyorum
          </p>
          {/* Divider */}
          <div className="mx-auto mt-6 h-px w-24 bg-slate-300" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {expertiseAreas.map((area) => (
            <motion.div key={area.id} variants={item}>
              <Card
                className={cn(
                  "group h-full rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur-sm",
                  "shadow-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl",
                  "focus-within:shadow-lg"
                )}
              >
                <CardHeader className="space-y-3">
                  <div
                    className="flex size-12 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: colors.primary.main }}
                  >
                    <area.icon className="size-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-slate-600">
                      {area.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link
                    href="/uzmanlik-alanlari"
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium",
                      "text-slate-700 ring-1 ring-inset ring-slate-300 transition-all",
                      "hover:bg-slate-900 hover:text-white hover:ring-slate-900",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    )}
                  >
                    Detaylı Bilgi
                    <ChevronRight className="size-4" />
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
          className="mt-12 flex justify-center"
        >
          <Link
            href="/uzmanlik-alanlari"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold",
              "bg-slate-900 text-white shadow-sm ring-1 ring-black/5 transition-all",
              "hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
            )}
          >
            Tüm Uzmanlık Alanları
            <Scale className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
