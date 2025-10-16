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
  Scroll,
  Landmark,
  Monitor,
  Shield,
  ShoppingCart,
  Globe,
  Gavel,
  Ship,
  Trophy,
  Earth,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { colors } from "@/constants/colors";
import Image from "next/image";

// Icon map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Ceza Hukuku": Scale,
  "Ticaret Hukuku": Building2,
  "Aile Hukuku": Users,
  "İş Hukuku": Briefcase,
  "Gayrimenkul Hukuku": Home,
  "Miras Hukuku": FileText,
  "Borçlar Hukuku": Scroll,
  "İdare Hukuku": Landmark,
  "Bilişim Hukuku": Monitor,
  "Sigorta Hukuku": Shield,
  "Tüketici Hukuku": ShoppingCart,
  "Yabancılar ve Vatandaşlık Hukuku": Globe,
  "İcra ve İflas Hukuku": Gavel,
  "Deniz ve Taşıma Hukuku": Ship,
  "Spor Hukuku": Trophy,
  "Uluslararası Hukuk": Earth,
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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

type ExpertiseAreaType = {
  title: string;
  description: string;
  services: string[];
};

export default function UzmanlikAlanlari() {
  const expertiseAreas: ExpertiseAreaType[] = [
    {
      title: "Ceza Hukuku",
      description:
        "Ceza davalarında etkin savunma hizmeti sunuyoruz. Soruşturma ve kovuşturma aşamalarında müvekkillerimizin haklarını en iyi şekilde koruyoruz.",
      services: [
        "Suç duyurusu ve şikayet işlemleri",
        "Sanık savunması",
        "Mağdur ve katılma müdafiiliği",
        "İtiraz ve temyiz işlemleri",
        "Uzlaştırma süreci yönetimi",
      ],
    },
    {
      title: "Ticaret Hukuku",
      description:
        "Şirket kurulumundan ticari anlaşmazlıklara kadar geniş yelpazede hizmet veriyoruz. İşletmenizin hukuki ihtiyaçları için güvenilir ortağınızız.",
      services: [
        "Şirket kuruluş işlemleri",
        "Ticari sözleşmeler",
        "Birleşme ve devir işlemleri",
        "Ortaklık anlaşmazlıkları",
        "Ticari alacak takibi",
      ],
    },
    {
      title: "Aile Hukuku",
      description:
        "Aile içi hukuki sorunlarda hassas ve çözüm odaklı yaklaşımla hizmet veriyoruz. Müvekkillerimizin aile hayatının korunması önceliğimizdir.",
      services: [
        "Boşanma davaları",
        "Velayet ve nafaka davaları",
        "Mal paylaşımı",
        "Evlilik sözleşmeleri",
        "Nişan ve düğün iptali",
      ],
    },
    {
      title: "İş Hukuku",
      description:
        "İşçi ve işveren hakları konusunda uzman danışmanlık hizmeti sunuyoruz. İş yerindeki hukuki sorunlarınız için yanınızdayız.",
      services: [
        "İş sözleşmeleri",
        "İşe iade davaları",
        "Kıdem ve ihbar tazminatı",
        "Mobbing davaları",
        "İş kazası ve meslek hastalığı",
      ],
    },
    {
      title: "Gayrimenkul Hukuku",
      description:
        "Tapu işlemlerinden kira anlaşmazlıklarına kadar tüm gayrimenkul hukuku konularında hizmet veriyoruz.",
      services: [
        "Tapu iptal ve tescil davaları",
        "Kira sözleşmeleri ve uyuşmazlıkları",
        "Tahliye davaları",
        "Kat mülkiyeti ve kat irtifakı",
        "İmar ve kamulaştırma",
      ],
    },
    {
      title: "Miras Hukuku",
      description:
        "Miras paylaşımı ve veraset işlemlerinde uzman kadromuzla hizmet veriyoruz. Hak kayıplarının önüne geçiyoruz.",
      services: [
        "Veraset belgesi",
        "Miras paylaşımı davaları",
        "Mal rejimi tasfiyesi",
        "Vasiyetname düzenleme",
        "Tenkis ve iptali vasiyet davaları",
      ],
    },
    {
      title: "Borçlar Hukuku",
      description:
        "Sözleşme hukuku ve borç ilişkilerinde profesyonel danışmanlık ve dava takibi hizmeti sunuyoruz.",
      services: [
        "Sözleşme hazırlama ve inceleme",
        "Alacak ve borç davaları",
        "Tüketici hukuku",
        "Haksız fiil ve tazminat davaları",
        "İcra takibi ve itirazlar",
      ],
    },
    {
      title: "İdare Hukuku",
      description:
        "Kamu idaresi ile vatandaşlar arasındaki uyuşmazlıklarda etkili çözümler üretiyoruz.",
      services: [
        "İdari davalar",
        "Vergi davaları",
        "Kamulaştırma davaları",
        "İmar uyuşmazlıkları",
        "İdari yaptırımlara itiraz",
      ],
    },
    {
      title: "Bilişim Hukuku",
      description:
        "Dijital çağın gerektirdiği hukuki ihtiyaçlar için uzman danışmanlık hizmeti sunuyoruz.",
      services: [
        "KVKK uyum danışmanlığı",
        "E-ticaret hukuku",
        "Telif hakları ve patent",
        "Siber suçlar",
        "Sosyal medya hukuku",
      ],
    },
    {
      title: "Sigorta Hukuku",
      description:
        "Sigorta sözleşmeleri ve tazminat süreçlerinde müvekkillerimizin haklarını koruyoruz.",
      services: [
        "Trafik kazası tazminat davaları",
        "Hayat ve sağlık sigortası uyuşmazlıkları",
        "Sigorta şirketlerine karşı dava süreçleri",
        "Poliçe inceleme ve iptal işlemleri",
        "Zorunlu mali sorumluluk sigortaları",
      ],
    },
    {
      title: "Tüketici Hukuku",
      description:
        "Ayıplı mal veya hizmet kaynaklı uyuşmazlıklarda tüketici haklarını savunuyoruz.",
      services: [
        "Tüketici hakem heyeti başvuruları",
        "Ayıplı mal ve hizmet davaları",
        "İade ve tazminat işlemleri",
        "Sözleşme iptali ve fesih işlemleri",
        "Banka ve finans kuruluşlarına karşı davalar",
      ],
    },
    {
      title: "Yabancılar ve Vatandaşlık Hukuku",
      description:
        "Türkiye’de yaşamak, yatırım yapmak veya vatandaşlık almak isteyen yabancı müvekkillere danışmanlık sunuyoruz.",
      services: [
        "Oturma ve çalışma izni başvuruları",
        "Türk vatandaşlığı işlemleri",
        "Yabancı yatırımcı danışmanlığı",
        "Evlilik ve boşanma işlemleri",
        "Mülk edinme süreçleri",
      ],
    },
    {
      title: "İcra ve İflas Hukuku",
      description:
        "Alacakların tahsili ve borç yapılandırma süreçlerinde hukuki destek sağlıyoruz.",
      services: [
        "Alacak takibi",
        "İcra ve haciz işlemleri",
        "İflas erteleme davaları",
        "Konkordato süreçleri",
        "Borçlu ve alacaklı vekilliği",
      ],
    },
    {
      title: "Enerji ve Çevre Hukuku",
      description:
        "Enerji sektörü ve çevresel düzenlemelerde hukuki süreçlerde danışmanlık sunuyoruz.",
      services: [
        "ÇED (Çevresel Etki Değerlendirmesi) davaları",
        "Enerji lisanslama işlemleri",
        "Yenilenebilir enerji yatırımları",
        "Çevre cezalarına itiraz",
        "Kamu izinleri ve denetimler",
      ],
    },
    {
      title: "Sağlık Hukuku",
      description:
        "Sağlık çalışanları, hastaneler ve hastalar arasındaki hukuki süreçlerde hakların korunmasını sağlıyoruz.",
      services: [
        "Tıbbi malpraktis (doktor hatası) davaları",
        "Hastane ve sigorta uyuşmazlıkları",
        "Hasta hakları başvuruları",
        "İlaç ve tıbbi ürün sorumluluğu",
        "Disiplin soruşturmaları",
      ],
    },
    {
      title: "Vergi Hukuku",
      description:
        "Vergi cezaları ve denetim süreçlerinde müvekkillerimizin çıkarlarını savunuyoruz.",
      services: [
        "Vergi cezası ve tarhiyat itirazları",
        "Vergi uyuşmazlık davaları",
        "Uzlaşma ve yapılandırma işlemleri",
        "Mali denetim danışmanlığı",
        "Vergisel risk analizi",
      ],
    },
    {
      title: "Deniz ve Taşıma Hukuku",
      description:
        "Deniz, hava ve kara taşımacılığı alanında ulusal ve uluslararası uyuşmazlıklar için hukuki destek sunuyoruz.",
      services: [
        "Deniz kazaları ve yük hasarları",
        "Taşıma sözleşmeleri",
        "Sigorta ve tazminat süreçleri",
        "Navlun anlaşmazlıkları",
        "Gemi alım-satım ve sicil işlemleri",
      ],
    },
    {
      title: "Spor Hukuku",
      description:
        "Sporcular, kulüpler ve federasyonlar arasındaki sözleşme ve disiplin uyuşmazlıklarında profesyonel destek sağlıyoruz.",
      services: [
        "Sözleşme hazırlama",
        "TFF ve CAS başvuruları",
        "Transfer anlaşmazlıkları",
        "Sponsorluk ve lisans sözleşmeleri",
        "Disiplin cezalarına itiraz",
      ],
    },
    {
      title: "Uluslararası Hukuk",
      description:
        "Yabancı unsurlu ticari işlemler ve uluslararası sözleşmelerde hukuki danışmanlık sunuyoruz.",
      services: [
        "Milletlerarası sözleşme hazırlama",
        "Tahkim ve arabuluculuk",
        "Yabancı mahkeme kararlarının tanınması",
        "Uluslararası ticaret hukuku",
        "Yabancı şirket temsilcilikleri",
      ],
    },
  ];

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
              Uzmanlık Alanlarımız
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Hukukun farklı alanlarında güvenilir ve etkili çözümler sunuyorum
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

      {/* Expertise Areas Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {expertiseAreas.map((area, index) => {
              const Icon = iconMap[area.title] || Scale;
              return (
                <motion.div key={index} variants={item}>
                  <Card
                    className={cn(
                      "group h-full rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur-sm",
                      "shadow-sm transition-all duration-300",
                      "hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                    )}
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex size-14 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: colors.primary.main }}
                        >
                          <Icon className="size-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl font-bold text-slate-900">
                            {area.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-slate-700 text-base leading-relaxed">
                        {area.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="border-t border-slate-200 pt-6">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <CheckCircle
                            className="w-5 h-5"
                            style={{ color: colors.primary.main }}
                          />
                          Sunduğumuz Hizmetler
                        </h3>
                        <ul className="space-y-2.5">
                          {area.services.map((service, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-slate-600 group/item"
                            >
                              <CheckCircle
                                className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 transition-colors"
                                style={{
                                  color: colors.primary.main,
                                  opacity: 0.7,
                                }}
                              />
                              <span className="text-sm leading-relaxed group-hover/item:text-slate-900 transition-colors">
                                {service}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Hukuki Danışmanlık İhtiyacınız mı Var?
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
              Hukuki süreçlerinizde doğru adımlar atmanız için rehberlik
              ediyoruz. Sizin için en uygun çözümü birlikte belirleyelim.
            </p>
            <Link
              href="/iletisim"
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-6 py-3 md:px-10 md:py-4 font-semibold text-sm md:text-base",
                "text-slate-900 shadow-lg transition-all",
                "hover:-translate-y-0.5 hover:shadow-xl"
              )}
              style={{ backgroundColor: colors.primary.main }}
            >
              Hemen İletişime Geçin
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
