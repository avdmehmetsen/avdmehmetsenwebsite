import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ExpertiseAreasSection from "@/components/ExpertiseAreas";
import { CheckCircle, Clock, Users } from "lucide-react";

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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Son Makaleler
            </h2>
            <p className="text-gray-600 text-lg">
              Hukuk dünyasından güncel yazılar ve analizler
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-slate-200 h-48 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Makale Görseli</span>
                </div>
                <div className="p-6">
                  <span className="text-amber-600 text-sm font-semibold">
                    Ceza Hukuku
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">
                    Örnek Makale Başlığı {item}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Makale özeti buraya gelecek. Firebase entegrasyonundan sonra
                    gerçek veriler gösterilecek.
                  </p>
                  <Link
                    href="/makaleler"
                    className="text-amber-600 font-semibold hover:text-amber-700"
                  >
                    Devamını Oku →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/makaleler"
              className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Tüm Makaleler
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
