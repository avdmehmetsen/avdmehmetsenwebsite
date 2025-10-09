import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uzmanlık Alanları | Av. Mehmet Dürdüsen",
  description: "Hukuk büromuzun uzmanlaştığı alanlar ve sunduğu hizmetler.",
};

export default function UzmanlikAlanlari() {
  const expertiseAreas = [
    {
      title: "Ceza Hukuku",
      icon: "⚖️",
      description:
        "Ceza davalarında etkin savunma hizmeti sunuyoruz. Soruşturma ve kovuşturma aşamalarında müvekkillerimizin haklarını en iyi şekilde koruyoruz.",
      services: [
        "Suç duyurusu ve şikayet işlemleri",
        "Sanık savunması",
        "Mağdur ve katılma müdafiiliği",
        "İtiraz ve temyiz işlemleri",
        "Uzlaştırma süreci yönetimi",
      ],
    },
    {
      title: "Ticaret Hukuku",
      icon: "💼",
      description:
        "Şirket kurulumundan ticari anlaşmazlıklara kadar geniş yelpazede hizmet veriyoruz. İşletmenizin hukuki ihtiyaçları için güvenilir ortağınızız.",
      services: [
        "Şirket kuruluş işlemleri",
        "Ticari sözleşmeler",
        "Birleşme ve devir işlemleri",
        "Ortaklık anlaşmazlıkları",
        "Ticari alacak takibi",
      ],
    },
    {
      title: "Aile Hukuku",
      icon: "👨‍👩‍👧‍👦",
      description:
        "Aile içi hukuki sorunlarda hassas ve çözüm odaklı yaklaşımla hizmet veriyoruz. Müvekkillerimizin aile hayatının korunması önceliğimizdir.",
      services: [
        "Boşanma davaları",
        "Velayet ve nafaka davaları",
        "Mal paylaşımı",
        "Evlilik sözleşmeleri",
        "Nişan ve düğün iptali",
      ],
    },
    {
      title: "İş Hukuku",
      icon: "🏢",
      description:
        "İşçi ve işveren hakları konusunda uzman danışmanlık hizmeti sunuyoruz. İş yerindeki hukuki sorunlarınız için yanınızdayız.",
      services: [
        "İş sözleşmeleri",
        "İşe iade davaları",
        "Kıdem ve ihbar tazminatı",
        "Mobbing davaları",
        "İş kazası ve meslek hastalığı",
      ],
    },
    {
      title: "Gayrimenkul Hukuku",
      icon: "🏠",
      description:
        "Tapu işlemlerinden kira anlaşmazlıklarına kadar tüm gayrimenkul hukuku konularında hizmet veriyoruz.",
      services: [
        "Tapu iptal ve tescil davaları",
        "Kira sözleşmeleri ve uyuşmazlıkları",
        "Tahliye davaları",
        "Kat mülkiyeti ve kat irtifakı",
        "İmar ve kamulaştırma",
      ],
    },
    {
      title: "Miras Hukuku",
      icon: "📜",
      description:
        "Miras paylaşımı ve veraset işlemlerinde uzman kadromuzla hizmet veriyoruz. Hak kayıplarının önüne geçiyoruz.",
      services: [
        "Veraset belgesi",
        "Miras paylaşımı davaları",
        "Mal rejimi tasfiyesi",
        "Vasiyetname düzenleme",
        "Tenkis ve iptali vasiyet davaları",
      ],
    },
    {
      title: "Borçlar Hukuku",
      icon: "📋",
      description:
        "Sözleşme hukuku ve borç ilişkilerinde profesyonel danışmanlık ve dava takibi hizmeti sunuyoruz.",
      services: [
        "Sözleşme hazırlama ve inceleme",
        "Alacak ve borç davaları",
        "Tüketici hukuku",
        "Haksız fiil ve tazminat davaları",
        "İcra takibi ve itirazlar",
      ],
    },
    {
      title: "İdare Hukuku",
      icon: "🏛️",
      description:
        "Kamu idaresi ile vatandaşlar arasındaki uyuşmazlıklarda etkili çözümler üretiyoruz.",
      services: [
        "İdari davalar",
        "Vergi davaları",
        "Kamulaştırma davaları",
        "İmar uyuşmazlıkları",
        "İdari yaptırımlara itiraz",
      ],
    },
    {
      title: "Bilişim Hukuku",
      icon: "💻",
      description:
        "Dijital çağın gerektirdiği hukuki ihtiyaçlar için uzman danışmanlık hizmeti sunuyoruz.",
      services: [
        "KVKK uyum danışmanlığı",
        "E-ticaret hukuku",
        "Telif hakları ve patent",
        "Siber suçlar",
        "Sosyal medya hukuku",
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Uzmanlık Alanlarımız
          </h1>
          <p className="text-xl text-gray-300">
            Geniş hukuk alanında uzman kadromuzla hizmetinizdeyiz
          </p>
        </div>
      </section>

      {/* Expertise Areas Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="text-5xl mr-4">{area.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {area.title}
                    </h2>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{area.description}</p>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Sunduğumuz Hizmetler:
                  </h3>
                  <ul className="space-y-2">
                    {area.services.map((service, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hukuki Danışmanlık İhtiyacınız mı Var?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Uzman kadromuz ile size en uygun çözümü bulmak için buradayız.
            Ücretsiz ön görüşme için iletişime geçin.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-amber-500 text-slate-900 px-10 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors shadow-lg"
          >
            Hemen İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
}
