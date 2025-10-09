import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hakkımızda */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Av. Mehmet Durdu Şen
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
            </ul>
          </div>

          {/* Hukuki */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hukuki</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/kvkk"
                  className="hover:text-amber-500 transition-colors"
                >
                  KVKK
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik"
                  className="hover:text-amber-500 transition-colors"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/cerezler"
                  className="hover:text-amber-500 transition-colors"
                >
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                <span>info@avmehmetdurdusen.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                <span>+90 (507) 736 82 55</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                <span>
                  Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4. Halil Atilla Sitesi
                  No:233 C Blok K:5 D:9, 35000 Bayraklı/İzmir
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Av. Mehmet Durdu Şen. Tüm hakları
            saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
