import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Web sitesi gizlilik politikası, kişisel veri koruma uygulamaları ve kullanıcı hakları.",
  alternates: {
    canonical: "/gizlilik",
  },
  openGraph: {
    title: "Gizlilik Politikası | Av. Durdu Mehmet Şen",
    description: "Web sitesi gizlilik politikası ve veri koruma uygulamaları.",
    url: "/gizlilik",
  },
};

export default function Gizlilik() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-xl text-gray-300">
            Web Sitesi Gizlilik ve Güvenlik Politikamız
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

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              1. Giriş
            </h2>
            <p className="text-gray-700 mb-4">
              Av. Durdu Mehmet Şen Hukuk Bürosu olarak, web sitemizi ziyaret
              eden kullanıcılarımızın gizliliğine önem veririz. Bu Gizlilik
              Politikası, web sitemizi kullanırken toplanan bilgilerin nasıl
              kullanıldığını ve korunduğunu açıklar.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              2. Toplanan Bilgiler
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemiz aracılığıyla sadece iletişim formu üzerinden gönüllü
              olarak paylaştığınız bilgiler toplanır:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                <strong>Kişisel Bilgiler:</strong> İletişim formu
                doldurduğunuzda adınız, e-posta adresiniz, telefon numaranız
                (opsiyonel) ve mesajınız
              </li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded-r-lg">
              <p className="text-gray-700 font-semibold mb-2">
                📊 Teknik Bilgiler ve Çerezler
              </p>
              <p className="text-gray-700">
                Bu web sitesinde teknik bilgiler (IP adresi, tarayıcı bilgileri
                vb.) toplanmamaktadır ve çerez kullanılmamaktadır. Ziyaretçi
                davranışları izlenmemektedir.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              3. Bilgilerin Kullanım Amaçları
            </h2>
            <p className="text-gray-700 mb-4">
              İletişim formu üzerinden toplanan bilgiler sadece şu amaçlarla
              kullanılır:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                Hukuki danışmanlık taleplerini değerlendirmek ve yanıtlamak
              </li>
              <li>Size geri dönüş yapmak ve iletişim kurmak</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              4. Bilgilerin Paylaşımı
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel bilgileriniz, sizin açık onayınız olmaksızın üçüncü
              taraflarla paylaşılmaz. Ancak aşağıdaki durumlarda bilgileriniz
              paylaşılabilir:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Yasal bir zorunluluk olduğunda</li>
              <li>Mahkeme kararı veya yasal süreç gereği</li>
              <li>Hukuki haklarımızı korumak için gerekli olduğunda</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              5. Veri Güvenliği
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel bilgilerinizin güvenliğini sağlamak için teknik ve idari
              önlemler alıyoruz:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>SSL sertifikası ile şifreli veri iletimi</li>
              <li>Sınırlı admin erişimi</li>
              <li>Düzenli güvenlik güncellemeleri</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              6. Çerezler
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemizde çerez kullanılmamaktadır. Detaylı bilgi için{" "}
              <Link
                href="/cerezler"
                className="text-amber-600 hover:underline font-semibold"
              >
                Çerez Politikası
              </Link>
              &apos;nı inceleyebilirsiniz.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              7. Haklarınız
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Verilerinize erişim talep etme</li>
              <li>Verilerinizin düzeltilmesini isteme</li>
              <li>Verilerinizin silinmesini talep etme</li>
              <li>Veri işlemeye itiraz etme</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Bu haklarınızı kullanmak için{" "}
              <Link
                href="/kvkk"
                className="text-amber-600 hover:underline font-semibold"
              >
                KVKK Aydınlatma Metni
              </Link>
              &apos;nde belirtilen yöntemlerle bizimle iletişime geçebilirsiniz.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              8. Politika Değişiklikleri
            </h2>
            <p className="text-gray-700 mb-4">
              Bu Gizlilik Politikası&apos;nı zaman zaman güncelleyebiliriz.
              Değişiklikler bu sayfada yayınlanacak ve &quot;Son
              Güncelleme&quot; tarihi güncellenecektir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
