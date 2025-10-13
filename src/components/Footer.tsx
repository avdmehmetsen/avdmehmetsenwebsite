import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import PlaceButton from "./PlaceButton";
import { colors } from "@/constants/colors";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hakkımızda */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Av. Durdu Mehmet Şen
            </h3>
            <p className="text-sm">
              Müvekkillerimize en kaliteli hukuki hizmeti sunmak için
              çalışıyoruz. Profesyonel ve güvenilir hukuki danışmanlık.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-500 transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="hover:text-amber-500 transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/uzmanlik-alanlari"
                  className="hover:text-amber-500 transition-colors"
                >
                  Uzmanlık Alanları
                </Link>
              </li>
              <li>
                <Link
                  href="/makaleler"
                  className="hover:text-amber-500 transition-colors"
                >
                  Makaleler
                </Link>
              </li>
              <li>
                <Link
                  href="/duyurular"
                  className="hover:text-amber-500 transition-colors"
                >
                  Duyurular
                </Link>
              </li>
            </ul>
          </div>

          {/* Faydalı Linkler */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Faydalı Linkler
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.izmirbarosu.org.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  İzmir Barosu
                </a>
              </li>
              <li>
                <a
                  href="https://www.barobirlik.org.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Türkiye Barolar Birliği
                </a>
              </li>
              <li>
                <a
                  href="https://www.resmigazete.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Resmi Gazete
                </a>
              </li>
              <li>
                <a
                  href="https://www.anayasa.gov.tr/tr/anasayfa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Anayasa Mahkemesi
                </a>
              </li>
              <li>
                <a
                  href="http://www.yargitay.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Yargıtay
                </a>
              </li>
              <li>
                <a
                  href="http://www.danistay.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Danıştay
                </a>
              </li>
              <li>
                <a
                  href="https://vatandas.uyap.gov.tr/main/vatandas/giris.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  UYAP vatandaş
                </a>
              </li>
              <li>
                <a
                  href="https://avukatbeta.uyap.gov.tr/giris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Uyap avukat
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Mail
                  className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                  style={{ color: colors.primary.main }}
                />
                <span>dmehmetsen@gmail.com</span>
              </li>
              <li className="flex flex-col items-start">
                <div className="flex items-start mb-2">
                  <Phone
                    className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                    style={{ color: colors.primary.main }}
                  />
                  <span>+90 (507) 736 82 55</span>
                </div>
                <div className="ml-6">
                  <a
                    href="tel:+905077368255"
                    className="inline-flex items-center gap-2 px-4 py-1 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90 text-sm"
                    style={{ backgroundColor: colors.primary.main }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Hemen Ara</span>
                  </a>
                </div>
              </li>
              <li className="flex flex-col items-start ">
                <div className="flex items-start mb-2">
                  <MapPin
                    className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                    style={{ color: colors.primary.main }}
                  />
                  <span>
                    Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4. Halil Atilla Sitesi
                    No:233 C Blok K:5 D:9, 35000 Bayraklı/İzmir
                  </span>
                </div>
                <div className="ml-6">
                  <PlaceButton label="Yol Tarifi" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            {/* Copyright - Sol */}
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Av. Durdu Mehmet Şen. Tüm
              hakları saklıdır.
            </p>

            {/* Hukuki Linkler - Sağ */}
            <div className="flex items-center gap-4">
              <Link
                href="/kvkk"
                className="hover:text-amber-500 transition-colors"
              >
                KVKK
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/gizlilik"
                className="hover:text-amber-500 transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/cerezler"
                className="hover:text-amber-500 transition-colors"
              >
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
