import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Av. Mehmet Dürdüsen",
  description: "Web sitesi gizlilik politikası ve veri koruma uygulamaları.",
};

export default function Gizlilik() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <strong>Son Güncelleme:</strong> 1 Ocak 2024
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              1. Giriş
            </h2>
            <p className="text-gray-700 mb-4">
              Av. Mehmet Dürdüsen Hukuk Bürosu olarak, web sitemizi ziyaret eden
              kullanıcılarımızın gizliliğine önem veririz. Bu Gizlilik
              Politikası, web sitemizi kullanırken toplanan bilgilerin nasıl
              kullanıldığını ve korunduğunu açıklar.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              2. Toplanan Bilgiler
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemiz aracılığıyla aşağıdaki bilgiler toplanabilir:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                <strong>Kişisel Bilgiler:</strong> İletişim formu
                doldurduğunuzda adınız, e-posta adresiniz, telefon numaranız ve
                mesajınız
              </li>
              <li>
                <strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü,
                işletim sistemi, ziyaret edilen sayfalar ve ziyaret süresi
              </li>
              <li>
                <strong>Çerez Bilgileri:</strong> Web sitesinin işlevselliğini
                artırmak için kullanılan çerezler
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              3. Bilgilerin Kullanım Amaçları
            </h2>
            <p className="text-gray-700 mb-4">
              Toplanan bilgiler şu amaçlarla kullanılır:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                Hukuki danışmanlık taleplerini değerlendirmek ve yanıtlamak
              </li>
              <li>
                Web sitesinin performansını ve kullanıcı deneyimini iyileştirmek
              </li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
              <li>İletişim kurmak ve bilgi vermek</li>
              <li>Güvenlik ve dolandırıcılığı önlemek</li>
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
              <li>
                Hizmet sağlayıcılarımızla (ancak sadece hizmet sunumu için
                gerekli olduğu ölçüde)
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              5. Veri Güvenliği
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel bilgilerinizin güvenliğini sağlamak için teknik ve idari
              önlemler alıyoruz. Bu önlemler şunları içerir:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>SSL sertifikası ile şifreli veri iletimi</li>
              <li>Güvenli sunucu altyapısı</li>
              <li>Düzenli güvenlik güncellemeleri</li>
              <li>Yetkisiz erişime karşı koruma</li>
              <li>Sınırlı personel erişimi</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              6. Çerezler
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler
              kullanır. Çerezler hakkında detaylı bilgi için{" "}
              <Link
                href="/cerezler"
                className="text-amber-600 hover:underline font-semibold"
              >
                Çerez Politikası
              </Link>
              &apos;nı inceleyebilirsiniz.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              7. Üçüncü Taraf Bağlantıları
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir.
              Bu sitelerin gizlilik politikalarından sorumlu değiliz. Üçüncü
              taraf siteleri ziyaret ettiğinizde kendi gizlilik politikalarını
              incelemenizi öneririz.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              8. Çocukların Gizliliği
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemiz 18 yaşın altındaki çocuklara yönelik değildir. Bilerek
              18 yaşın altındaki bireylerden kişisel bilgi toplamayız.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              9. Haklarınız
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Verilerinize erişim talep etme</li>
              <li>Verilerinizin düzeltilmesini isteme</li>
              <li>Verilerinizin silinmesini talep etme</li>
              <li>Veri işlemeye itiraz etme</li>
              <li>Veri taşınabilirliği talep etme</li>
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
              10. Politika Değişiklikleri
            </h2>
            <p className="text-gray-700 mb-4">
              Bu Gizlilik Politikası&apos;nı zaman zaman güncelleyebiliriz.
              Değişiklikler bu sayfada yayınlanacak ve &quot;Son
              Güncelleme&quot; tarihi güncellenecektir. Düzenli olarak bu
              sayfayı ziyaret ederek güncellemelerden haberdar olabilirsiniz.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              11. İletişim
            </h2>
            <p className="text-gray-700 mb-4">
              Gizlilik Politikası ile ilgili sorularınız için bizimle iletişime
              geçebilirsiniz:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>E-posta:</strong> info@avmehmetdurdusen.com
                <br />
                <strong>Telefon:</strong> +90 (212) 555 55 55
                <br />
                <strong>Adres:</strong> Örnek Mahallesi, Hukuk Sokak No:15 Kat:3
                Şişli / İstanbul
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
