import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Av. Durdu Mehmet Şen",
  description:
    "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
};

export default function KVKK() {
  return (
    <div>
      {/* Hero Section */}
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
          <div className="prose prose-lg max-w-none">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
              <p className="text-gray-700">
                <strong>Son Güncelleme:</strong> 1 Ocak 2024
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              1. Veri Sorumlusu
            </h2>
            <p className="text-gray-700 mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
              uyarınca, kişisel verileriniz; veri sorumlusu olarak Av. Durdu
              Mehmet Şen Şen Hukuk Bürosu tarafından aşağıda açıklanan kapsamda
              işlenebilecektir.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              2. Kişisel Verilerin Hangi Amaçla İşleneceği
            </h2>
            <p className="text-gray-700 mb-4">
              Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Hukuki danışmanlık ve avukatlık hizmetlerinin sunulması</li>
              <li>Müvekkil-avukat ilişkisinin kurulması ve yönetimi</li>
              <li>İletişim taleplerinin karşılanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Hukuki işlemlerin yürütülmesi</li>
              <li>Talep ve şikayetlerin yönetimi</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              3. İşlenen Kişisel Veriler
            </h2>
            <p className="text-gray-700 mb-4">
              Hukuk büromuz tarafından işlenen kişisel veriler:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                Kimlik Bilgileri: Ad, soyad, T.C. kimlik numarası, doğum tarihi
              </li>
              <li>İletişim Bilgileri: Telefon, e-posta, adres</li>
              <li>
                Müvekkil Bilgileri: Dava ve hukuki süreç ile ilgili bilgiler
              </li>
              <li>Finansal Bilgiler: Ödeme ve fatura bilgileri</li>
              <li>
                Diğer Bilgiler: İletişim formları ve yazışmalar üzerinden elde
                edilen bilgiler
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel verileriniz, web sitemiz, e-posta, telefon, yazılı
              belgeler ve yüz yüze görüşmeler aracılığıyla toplanmaktadır.
              Toplanan veriler KVKK&apos;nın 5. ve 6. maddelerinde belirtilen
              kişisel veri işleme şartları ve amaçları kapsamında işlenmektedir.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              5. Kişisel Verilerin Aktarılması
            </h2>
            <p className="text-gray-700 mb-4">
              Toplanan kişisel verileriniz, yasal yükümlülüklerimizi yerine
              getirmek, hukuki işlemleri yürütmek ve hizmet kalitemizi artırmak
              amacıyla;
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Adli ve idari makamlara</li>
              <li>
                Yasal yükümlülükler çerçevesinde ilgili kurum ve kuruluşlara
              </li>
              <li>Hizmet alınan ve/veya iş birliği yapılan üçüncü taraflara</li>
              <li>Avukatlık mesleğinin gereği olarak gerekli taraflara</li>
            </ul>
            <p className="text-gray-700 mb-4">aktarılabilecektir.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              6. Kişisel Veri Sahibinin Hakları
            </h2>
            <p className="text-gray-700 mb-4">
              KVKK&apos;nın 11. maddesi uyarınca kişisel veri sahipleri olarak
              aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
              </li>
              <li>
                Kişisel verilerin işlenme amacını ve bunların amacına uygun
                kullanılıp kullanılmadığını öğrenme
              </li>
              <li>
                Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı
                üçüncü kişileri bilme
              </li>
              <li>
                Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde
                bunların düzeltilmesini isteme
              </li>
              <li>
                KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde
                kişisel verilerin silinmesini veya yok edilmesini isteme
              </li>
              <li>
                Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesine
                ilişkin işlemlerin, kişisel verilerin aktarıldığı üçüncü
                kişilere bildirilmesini isteme
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
                analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun
                ortaya çıkmasına itiraz etme
              </li>
              <li>
                Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle
                zarara uğraması hâlinde zararın giderilmesini talep etme
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              7. Başvuru Yöntemi
            </h2>
            <p className="text-gray-700 mb-4">
              Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit
              edici gerekli bilgiler ile KVKK&apos;nın 11. maddesinde belirtilen
              haklardan kullanmayı talep ettiğiniz hakkınıza yönelik
              açıklamalarınızı içeren talebinizi;
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                Yazılı olarak kimliğinizi tespit edici belgeler ile birlikte
                ofis adresimize bizzat elden iletebilir,
              </li>
              <li>Noter kanalıyla gönderebilir,</li>
              <li>
                Kayıtlı Elektronik Posta (KEP) adresiniz aracılığıyla KEP
                adresimize iletebilir,
              </li>
              <li>
                Güvenli elektronik imza ile imzalanarak e-posta adresimize
                iletebilirsiniz.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              8. İletişim
            </h2>
            <p className="text-gray-700 mb-4">
              KVKK kapsamındaki talepleriniz için bizimle iletişime
              geçebilirsiniz:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Adres:</strong> Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4.
                Halil Atilla Sitesi No:233 C Blok K:5 D:9 Bayraklı / İzmir
                <br />
                <strong>E-posta:</strong> info@avdurdumehmetsen.com
                <br />
                <strong>Telefon:</strong> +90 (507) 736 82 55
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
