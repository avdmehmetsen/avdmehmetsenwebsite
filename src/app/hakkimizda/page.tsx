"use client";

import { useEffect, useState } from "react";
import { colors } from "@/constants/colors";
import Image from "next/image";
import { getLawyerInfo } from "@/services/lawyerService";
import { LawyerInfo } from "@/types";
import hakkimizda1 from "@/assets/hakkimizda/hakkimizda1.jpg";
import hakkimizda2 from "@/assets/hakkimizda/hakkimizda2.jpg";

export default function Hakkimizda() {
  const [lawyerInfo, setLawyerInfo] = useState<LawyerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyerInfo = async () => {
      try {
        setLoading(true);
        const info = await getLawyerInfo();
        setLawyerInfo(info);
      } catch (error) {
        console.error("Error fetching lawyer info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyerInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-16 overflow-hidden">
        {/* Metin Alanı */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Müvekkillerimize en iyi hizmeti sunma misyonuyla çalışıyoruz.
          </p>
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

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Şen Hukuk Bürosu olarak, müvekkillerimize en kaliteli hukuki
                  hizmeti sunmak ve haklarını en iyi şekilde korumak için
                  çalışıyoruz. Yılların verdiği tecrübe ve deneyimle, her davaya
                  özel strateji geliştirerek, en iyi sonuçları elde etmeyi
                  hedefliyoruz.
                </p>
                <p>
                  Hukuk büromuz, müvekkil memnuniyetini ön planda tutarak,
                  profesyonel ve güvenilir hukuki danışmanlık hizmeti
                  vermektedir. Etik değerlere bağlı kalarak, adaletin tecelli
                  etmesi için çalışıyoruz.
                </p>
                <p>
                  Sürekli gelişen hukuk dünyasını yakından takip ederek,
                  müvekkillerimize en güncel ve etkili çözümleri sunuyoruz.
                  Uzman kadromuzla birlikte, her türlü hukuki sorunda
                  yanınızdayız.
                </p>
              </div>
            </div>

            {/* Sabit oranlı kapsayıcı + sizes/placeholder */}
            <div className="relative rounded-lg overflow-hidden">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={hakkimizda1}
                  alt="Ofis Görseli"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyer Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text - Mobilde önce gelir */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {lawyerInfo?.name || "Av. Mehmet Durdu Şen"}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {lawyerInfo?.bio ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: lawyerInfo.bio }}
                    className="prose prose-gray max-w-none"
                  />
                ) : (
                  <>
                    <p>
                      Avukat Mehmet Durdu Şen, hukuk eğitimini tamamladıktan
                      sonra mesleki tecrübesini bireysel ve kurumsal
                      müvekkillere sunduğu hukuki danışmanlık hizmetleriyle
                      pekiştirmiştir. Başta aile hukuku, iş hukuku, ceza hukuku
                      ve ticaret hukuku olmak üzere birçok alanda faaliyet
                      göstermektedir.
                    </p>
                    <p>
                      Av. Mehmet Durdu Şen, her dosyaya özenle yaklaşarak
                      müvekkillerinin haklarını en etkin biçimde korumayı ve
                      adaletin sağlanmasına katkıda bulunmayı temel ilke
                      edinmiştir.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Image - Mobilde sonra gelir */}
            <div className="relative rounded-lg overflow-hidden order-2 lg:order-1">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={hakkimizda2}
                  alt={lawyerInfo?.name || "Av. Mehmet Durdu Şen"}
                  fill
                  className="object-contain bg-white"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.greenBackground }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Güvenilirlik
              </h3>
              <p className="text-gray-600">
                Müvekkillerimizin güvenini kazanmak ve korumak en önemli
                önceliğimizdir.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.greenBackground }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Etik
              </h3>
              <p className="text-gray-600">
                Tüm çalışmalarımızda etik değerlere bağlı kalarak hareket
                ediyoruz.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.greenBackground }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">Hız</h3>
              <p className="text-gray-600">
                Hızlı ve etkili çözümler üreterek zamanınıza değer veriyoruz.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.theme2.greenBackground }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-slate-900 font-semibold mb-2">
                Profesyonellik
              </h3>
              <p className="text-gray-600">
                Her işte profesyonel yaklaşım ve uzmanlık sergiliyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
