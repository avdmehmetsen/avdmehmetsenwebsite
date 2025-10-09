import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duyurular | Av. Mehmet Dürdüsen",
  description: "Hukuk büromuzdan güncel duyurular ve haberler.",
};

export default function Duyurular() {
  // Bu veriler Firebase'den gelecek - şimdilik örnek data
  const announcements = [
    {
      id: "1",
      title: "Ofis Yeri Değişikliği",
      date: "20 Mart 2024",
      type: "Genel",
      content:
        "1 Nisan 2024 tarihi itibariyle ofisimiz yeni adresine taşınmaktadır. Yeni adresimiz: Örnek Mahallesi, Hukuk Sokak No:15 Kat:3 İstanbul. Tüm müvekkillerimize duyurulur.",
      priority: "high",
    },
    {
      id: "2",
      title: "Bayram Tatili Duyurusu",
      date: "15 Mart 2024",
      type: "Tatil",
      content:
        "Ofisimiz 28 Mart - 31 Mart 2024 tarihleri arasında Ramazan Bayramı nedeniyle kapalı olacaktır. Acil durumlar için iletişim numaramızdan bize ulaşabilirsiniz.",
      priority: "medium",
    },
    {
      id: "3",
      title: "Yeni Kanun Değişiklikleri Semineri",
      date: "10 Mart 2024",
      type: "Etkinlik",
      content:
        "25 Mart 2024 tarihinde saat 14:00'te ofisimizde 'Yeni Kanun Değişiklikleri ve Uygulamadaki Etkileri' konulu bir seminer düzenlenecektir. Katılım ücretsizdir. Rezervasyon için bizimle iletişime geçiniz.",
      priority: "medium",
    },
    {
      id: "4",
      title: "Online Danışmanlık Hizmeti Başladı",
      date: "5 Mart 2024",
      type: "Hizmet",
      content:
        "Müvekkillerimizin talepleri doğrultusunda online danışmanlık hizmeti başlatılmıştır. Randevu almak için iletişim formumuz üzerinden bize ulaşabilirsiniz.",
      priority: "low",
    },
    {
      id: "5",
      title: "KVKK Uyum Danışmanlığı",
      date: "1 Mart 2024",
      type: "Hizmet",
      content:
        "Şirketlerin KVKK'ya uyum süreçlerinde danışmanlık hizmeti vermeye başladık. Detaylı bilgi için iletişime geçiniz.",
      priority: "low",
    },
    {
      id: "6",
      title: "Yılbaşı Tatili",
      date: "25 Aralık 2023",
      type: "Tatil",
      content:
        "Ofisimiz 31 Aralık 2023 - 2 Ocak 2024 tarihleri arasında yılbaşı tatili nedeniyle kapalı olacaktır. Mutlu yıllar dileriz.",
      priority: "medium",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Önemli";
      case "medium":
        return "Orta";
      case "low":
        return "Bilgi";
      default:
        return "";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Genel":
        return "📢";
      case "Tatil":
        return "🏖️";
      case "Etkinlik":
        return "📅";
      case "Hizmet":
        return "⚡";
      default:
        return "📌";
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Duyurular</h1>
          <p className="text-xl text-gray-300">
            Hukuk büromuzdan güncel duyurular ve haberler
          </p>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 ${
                  announcement.priority === "high"
                    ? "border-red-500"
                    : announcement.priority === "medium"
                    ? "border-amber-500"
                    : "border-blue-500"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {getTypeIcon(announcement.type)}
                      </span>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {announcement.title}
                        </h2>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-gray-500 text-sm">
                            {announcement.date}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600 text-sm font-medium">
                            {announcement.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                        announcement.priority
                      )}`}
                    >
                      {getPriorityLabel(announcement.priority)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {announcement.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                Önceki
              </button>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                2
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                Sonraki
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Duyurulardan Haberdar Olun
          </h2>
          <p className="text-gray-600 mb-8">
            E-posta bültenimize abone olun ve önemli duyurulardan anında
            haberdar olun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
