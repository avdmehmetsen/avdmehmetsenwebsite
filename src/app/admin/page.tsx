"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, User, LogOut, Bell } from "lucide-react";
import { colors } from "@/constants/colors";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminPageContent />
    </AdminGuard>
  );
}

function AdminPageContent() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const adminCards = [
    {
      title: "Makale Yönetimi",
      description: "Makaleleri ekle, düzenle veya sil",
      icon: FileText,
      href: "/admin/articles",
      color: colors.primary.main,
    },
    {
      title: "Duyuru Yönetimi",
      description: "Duyuruları ekle, düzenle veya sil",
      icon: Bell,
      href: "/admin/announcements",
      color: colors.status.info,
    },
    {
      title: "Avukat Bilgileri",
      description: "Avukat hakkında bilgileri güncelle",
      icon: User,
      href: "/admin/lawyer",
      color: colors.theme2.darkGreen,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Yönetim Paneli
              </h1>
              <p className="text-lg text-gray-300">
                Site içeriğini buradan yönetebilirsiniz
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:bg-red-700 bg-red-600 text-white"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:-translate-y-1">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <card.icon
                      className="w-8 h-8"
                      style={{ color: card.color }}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
