"use client";

import { useEffect, useState } from "react";
import { colors } from "@/constants/colors";
import Image from "next/image";
import { getAboutPage } from "@/services/aboutService";
import { AboutPage } from "@/types";

export default function Hakkimizda() {
  const [aboutData, setAboutData] = useState<AboutPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const data = await getAboutPage();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
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
      <section className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
        {/* Metin Alanı */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-24 md:pt-28">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            İzmir Avukat - Hakkımızda
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            İzmir&apos;de profesyonel avukatlık hizmeti sunan Şen Hukuk Bürosu olarak müvekkillerimize en iyi hizmeti sunma misyonuyla çalışıyoruz.
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
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid gap-12 items-center ${
              aboutData?.officeImageUrl
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            <div
              className={aboutData?.officeImageUrl ? "" : "max-w-4xl mx-auto"}
            >
              {aboutData?.officeDescription ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: aboutData.officeDescription,
                  }}
                  className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                />
              ) : (
                /* Fallback content if no data */
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Şen Hukuk Bürosu olarak, İzmir&apos;de avukat hizmeti veren bir hukuk bürosu olarak müvekkillerimize en kaliteli hukuki
                    hizmeti sunmak ve haklarını en iyi şekilde korumak için
                    çalışıyoruz.
                  </p>
                  <p>
                    İzmir&apos;de hizmet veren hukuk büromuz, müvekkil memnuniyetini ön planda tutarak,
                    profesyonel ve güvenilir avukatlık danışmanlık hizmeti
                    vermektedir.
                  </p>
                </div>
              )}
            </div>

            {/* Sabit oranlı kapsayıcı + sizes/placeholder - Only show if image exists */}
            {aboutData?.officeImageUrl && (
              <div className="relative rounded-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={aboutData.officeImageUrl}
                    alt="Ofis Görseli"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lawyer Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid gap-12 items-center ${
              aboutData?.lawyerImageUrl
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {/* Text - Mobilde önce gelir */}
            <div
              className={`order-1 ${
                aboutData?.lawyerImageUrl ? "lg:order-2" : "max-w-4xl mx-auto"
              }`}
            >
              {aboutData?.lawyerName && (
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  {aboutData.lawyerName}
                </h2>
              )}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {aboutData?.lawyerBio ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutData.lawyerBio }}
                    className="prose prose-gray max-w-none"
                  />
                ) : (
                  <>
                    <p>
                      İzmir&apos;de hizmet veren Avukat Mehmet Durdu Şen, hukuk eğitimini tamamladıktan
                      sonra mesleki tecrübesini bireysel ve kurumsal
                      müvekkillere sunduğu hukuki danışmanlık hizmetleriyle
                      pekiştirmiştir. İzmir&apos;de başta aile hukuku, iş hukuku, ceza hukuku
                      ve ticaret hukuku olmak üzere birçok alanda avukatlık hizmeti
                      vermektedir.
                    </p>
                    <p>
                      İzmir&apos;de avukat olarak çalışan Av. Mehmet Durdu Şen, her dosyaya özenle yaklaşarak
                      müvekkillerinin haklarını en etkin biçimde korumayı ve
                      adaletin sağlanmasına katkıda bulunmayı temel ilke
                      edinmiştir.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Image - Only show if image exists - Mobilde sonra gelir */}
            {aboutData?.lawyerImageUrl && (
              <div className="relative rounded-lg overflow-hidden order-2 lg:order-1">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={aboutData.lawyerImageUrl}
                    alt={aboutData?.lawyerName || "Av. Mehmet Durdu Şen"}
                    fill
                    className="object-contain bg-white"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-gray-50">
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
