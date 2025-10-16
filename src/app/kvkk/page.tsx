import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metni ve veri işleme politikalarımız.",
  alternates: {
    canonical: "/kvkk",
  },
  openGraph: {
    title: "KVKK Aydınlatma Metni | Av. Durdu Mehmet Şen",
    description:
      "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
    url: "/kvkk",
  },
};

export default function KVKK() {
  const LAST_UPDATED = "1 Ekim 2025"; // istersen burayı güncelle

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-xl text-gray-300">
            Kişisel Verilerin Korunması ve İşlenmesi Hakkında Bilgilendirme
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
            <p className="text-gray-700">
              <strong>Son Güncelleme:</strong> {LAST_UPDATED}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-slate-800">
            <h2>1. Veri Sorumlusu</h2>
            <p>
              Bu metin kapsamında veri sorumlusu:{" "}
              <strong>Av. Durdu Mehmet Şen</strong> (Av. Durdu Mehmet Şen Hukuk
              Bürosu) olup, sorumluya ilişkin iletişim bilgileri sayfanın
              sonunda yer almaktadır.
            </p>

            <h2>2. İşleme Amaçları</h2>
            <p>
              Kişisel verileriniz genel olarak aşağıdaki amaçlarla
              işlenmektedir:
            </p>
            <ul>
              <li>İletişim taleplerine yanıt vermek ve geri dönüş sağlamak</li>
              <li>Hukuki danışmanlık talebi ve sözleşme hazırlığı</li>
              <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
              <li>Hizmetlerin yürütülmesi ve kalite takibi</li>
            </ul>
            <p>
              İletişim formu aracılığıyla alınan verilerde amaç öncelikle
              <strong> iletişim kurmak</strong> olup, başka amaçlarla
              kullanılmayacaktır.
            </p>

            <h2>3. İşlenen Kişisel Veri Kategorileri</h2>
            <p>Toplanan ve işlenebilecek temel veri kategorileri şunlardır:</p>
            <ul>
              <li>Kimlik bilgileri (varsa)</li>
              <li>İletişim bilgileri (e-posta, telefon, adres vb.)</li>
              <li>Mesaj/iletişim içeriği (gönderdiğiniz konu ve mesaj)</li>
              <li>
                İşleme faaliyetinin gerektirdiği diğer hukuki ve idari bilgiler
              </li>
            </ul>

            <h2>4. İletişim Formu - Toplanan Alanlar</h2>
            <p>
              Web sitemizdeki iletişim formunda yalnızca aşağıdaki alanlar
              istenmekte ve işlenmektedir:
            </p>
            <ul>
              <li>
                <strong>Ad Soyad</strong>
              </li>
              <li>
                <strong>E-posta</strong>
              </li>
              <li>
                <strong>Telefon</strong>
              </li>
              <li>
                <strong>Konu</strong>
              </li>
              <li>
                <strong>Mesaj</strong>
              </li>
            </ul>
            <p>
              Bu bilgiler yalnızca iletişime geçmek amacıyla işlenir. Başka
              amaçlarla kullanılmaz.
            </p>

            <h2>5. Yurt Dışına Aktarım</h2>
            <p>
              İletişim formunda sağladığınız kişisel verileriniz{" "}
              <strong>yurt dışına aktarılmamaktadır</strong>.
            </p>

            <h2>7. İşleme Hukuki Sebebi</h2>
            <p>
              Veri işlemenin hukuki dayanağı; ilgili verinin niteliğine göre
              sözleşmenin ifası, hukuki yükümlülüklerin yerine getirilmesi,
              meşru menfaat ve/veya KVKK&apos;da sayılan diğer hukuki
              sebeplerdir. İletişim formu bağlamında öncelikli amaç iletişim
              olduğundan, ilgili işlemler genellikle meşru menfaat veya hizmet
              sunumu kapsamında değerlendirilir.
            </p>

            <h2>8. Alıcılar</h2>
            <p>
              Kişisel verileriniz, yalnızca yasal zorunluluklar veya hizmetin
              gerektirdiği durumlarda; ilgili üçüncü taraf hizmet sağlayıcılar
              veya resmi makamlara aktarılabilir. İletişim formu özelinde
              verilerinizin otomatik olarak üçüncü şahıslara paylaşıldığı bir
              süreç bulunmamaktadır.
            </p>

            <h2>9. Kişisel Veri Sahibinin Hakları</h2>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca kişisel veri sahipleri olarak
              aşağıdaki haklara sahipsiniz:
            </p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
              </li>
              <li>Kişisel verilerin işlenme amacını öğrenme</li>
              <li>Kişisel verilerin düzeltilmesini veya silinmesini isteme</li>
              <li>
                İşlemenin hukuka aykırı olması hâlinde zararın giderilmesini
                talep etme
              </li>
            </ul>
            <p>
              Haklarınıza ilişkin taleplerinizi açık kimlik bilgileri ile
              birlikte yazılı olarak iletmeniz gerekmektedir; başvuru kanıtı ve
              talep içeriği değerlendirildikten sonra Kanun&apos;da öngörülen
              süreler içinde cevap verilecektir.
            </p>

            <h2>10. Başvuru Yöntemi</h2>
            <p>
              KVKK kapsamındaki taleplerinizi aşağıdaki kanallardan
              iletebilirsiniz:
            </p>
            <ul>
              <li>Ofisimize bizzat gelerek veya noter kanalıyla</li>
              <li>
                E-posta: <strong>dmehmetsen@gmail.com</strong> (güvenli kimlik
                doğrulaması gerekebilir)
              </li>
              <li>Yazılı talep halinde posta veya KEP kanalı</li>
            </ul>

            <h2>11. Kuruma Şikâyet Hakkı</h2>
            <p>
              Başvurularınıza Kanun&apos;da öngörülen şekilde yanıt alamamanız
              veya ihlal şüpheniz halinde, KVKK (Kişisel Verileri Koruma
              Kurumu)’na şikâyette bulunma hakkınız saklıdır.
            </p>

            <h2>12. İletişim</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Adres:</strong> Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4.
                Halil Atilla Sitesi No:233 C Blok K:5 D:9 Bayraklı / İzmir
                <br />
                <strong>E-posta:</strong> dmehmetsen@gmail.com
              </p>
            </div>

            <h2>13. Güncelleme Politikası</h2>
            <p>
              Bu aydınlatma metni gerektiğinde güncellenebilir; güncellenmiş
              metin sitede yayımlanacaktır. Önemli değişikliklerde uygun
              iletişim kanalları ile bilgilendirme yapılacaktır.
            </p>

            <hr />
          </div>
        </div>
      </section>
    </div>
  );
}
