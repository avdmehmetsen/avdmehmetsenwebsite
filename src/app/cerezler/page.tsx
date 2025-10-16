import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Web sitesinde kullanılan çerezler, izleme teknolojileri ve gizlilik tercihleri hakkında detaylı bilgi.",
  openGraph: {
    title: "Çerez Politikası | Av. Durdu Mehmet Şen",
    description: "Web sitesinde kullanılan çerezler hakkında detaylı bilgi.",
    url: "https://www.avdurdumehmetsen.com.tr/cerezler",
  },
  alternates: {
    canonical: "https://www.avdurdumehmetsen.com.tr/cerezler",
  },
};

export default function Cerezler() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Çerez Politikası
          </h1>
          <p className="text-xl text-gray-300">
            Web Sitesinde Kullanılan Çerezler Hakkında Bilgilendirme
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
              <p className="text-gray-700">
                <strong>Son Güncelleme:</strong>{" "}
                {new Date().toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-8 rounded-r-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Çerez Kullanımı Hakkında
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Bu web sitesinde çerez kullanılmamaktadır ve ziyaretçi
                davranışları izlenmemektedir.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Gelecekteki Değişiklikler
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                İleride analitik veya işlevsel çerezlerin kullanımı gündeme
                gelirse, ziyaretçiler bu konuda bilgilendirilecek ve gerekliyse
                onayları alınacaktır.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                İletişim
              </h3>
              <p className="text-gray-700">
                Çerez Politikası ile ilgili sorularınız için bizimle iletişime
                geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
