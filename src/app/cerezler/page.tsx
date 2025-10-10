import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası | Av. Mehmet Dürdüsen",
  description: "Web sitesinde kullanılan çerezler hakkında detaylı bilgi.",
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
                <strong>Son Güncelleme:</strong> 1 Ocak 2024
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              1. Çerez Nedir?
            </h2>
            <p className="text-gray-700 mb-4">
              Çerezler, ziyaret ettiğiniz internet siteleri tarafından
              tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan
              küçük metin dosyalarıdır. Çerezler, web sitesinin işlevselliğini
              artırmak ve kullanıcı deneyimini iyileştirmek amacıyla kullanılır.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              2. Çerez Türleri
            </h2>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
              2.1. Zorunlu Çerezler
            </h3>
            <p className="text-gray-700 mb-4">
              Web sitesinin düzgün çalışması için gerekli olan çerezlerdir. Bu
              çerezler olmadan web sitesi düzgün çalışmaz. Örnek olarak:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Oturum yönetimi çerezleri</li>
              <li>Güvenlik çerezleri</li>
              <li>Yük dengeleme çerezleri</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
              2.2. İşlevsel Çerezler
            </h3>
            <p className="text-gray-700 mb-4">
              Web sitesinin daha işlevsel hale gelmesini ve
              kişiselleştirilmesini sağlayan çerezlerdir. Örnek olarak:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Dil ve bölge tercihleri</li>
              <li>Özelleştirme ayarları</li>
              <li>Form bilgilerinin hatırlanması</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
              2.3. Analitik Çerezler
            </h3>
            <p className="text-gray-700 mb-4">
              Web sitesinin nasıl kullanıldığını anlamamıza yardımcı olan ve
              performansı iyileştirmemizi sağlayan çerezlerdir. Örnek olarak:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Ziyaretçi sayısı ve davranış analizi</li>
              <li>Sayfa görüntüleme istatistikleri</li>
              <li>Trafik kaynağı bilgileri</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
              2.4. Pazarlama Çerezleri
            </h3>
            <p className="text-gray-700 mb-4">
              Reklamların ve pazarlama kampanyalarının etkinliğini ölçmek için
              kullanılan çerezlerdir. Bu tür çerezler şu anda web sitemizde
              kullanılmamaktadır.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              3. Çerez Kullanım Amaçlarımız
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemizde çerezleri aşağıdaki amaçlarla kullanıyoruz:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Web sitesinin güvenli ve düzgün çalışmasını sağlamak</li>
              <li>Kullanıcı deneyimini iyileştirmek</li>
              <li>Web sitesi performansını analiz etmek</li>
              <li>Tercihlerinizi hatırlamak</li>
              <li>İstatistiksel analizler yapmak</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              4. Kullandığımız Çerezler
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Çerez Adı
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Türü
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Süresi
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Açıklama
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      session_id
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Zorunlu
                    </td>
                    <td className="border border-gray-300 px-4 py-2">Oturum</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Kullanıcı oturumunu yönetir
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      cookie_consent
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Zorunlu
                    </td>
                    <td className="border border-gray-300 px-4 py-2">1 yıl</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Çerez tercihlerinizi saklar
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      language
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      İşlevsel
                    </td>
                    <td className="border border-gray-300 px-4 py-2">1 yıl</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Dil tercihini hatırlar
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">_ga</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Analitik
                    </td>
                    <td className="border border-gray-300 px-4 py-2">2 yıl</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Google Analytics - Ziyaretçileri ayırt eder
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              5. Çerezleri Yönetme ve Silme
            </h2>
            <p className="text-gray-700 mb-4">
              Tarayıcınızın ayarlarından çerezleri kontrol edebilir, silebilir
              veya engelleyebilirsiniz. Çerezleri nasıl yöneteceğiniz
              tarayıcınıza göre değişir:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                <strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve
                güvenlik &gt; Çerezler ve diğer site verileri
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Seçenekler &gt; Gizlilik ve
                Güvenlik &gt; Çerezler ve Site Verileri
              </li>
              <li>
                <strong>Safari:</strong> Tercihler &gt; Gizlilik &gt; Çerezler
                ve web sitesi verileri
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Ayarlar &gt; Çerezler ve site
                izinleri
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>Önemli Not:</strong> Zorunlu çerezleri devre dışı
              bırakırsanız, web sitesinin bazı özellikleri düzgün
              çalışmayabilir.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              6. Üçüncü Taraf Çerezleri
            </h2>
            <p className="text-gray-700 mb-4">
              Web sitemizde, hizmetlerin iyileştirilmesi amacıyla üçüncü taraf
              çerezler kullanılabilir:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                <strong>Google Analytics:</strong> Web sitesi trafiğini analiz
                etmek için
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Bu üçüncü taraf hizmetlerin gizlilik politikalarını ilgili
              sitelerde incelemenizi öneririz.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              7. Çerez Politikası Güncellemeleri
            </h2>
            <p className="text-gray-700 mb-4">
              Bu Çerez Politikası&apos;nı gerektiğinde güncelleyebiliriz.
              Değişiklikler bu sayfada yayınlanacak ve &quot;Son
              Güncelleme&quot; tarihi güncellenecektir.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              8. İletişim
            </h2>
            <p className="text-gray-700 mb-4">
              Çerez Politikası ile ilgili sorularınız için bizimle iletişime
              geçebilirsiniz:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>E-posta:</strong> info@avdurdumehmetsen.com
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
