"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, User, LogOut, Bell, Mail, Phone, Power } from "lucide-react";
import { colors } from "@/constants/colors";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import {
  getSiteSettings,
  toggleMaintenanceMode,
} from "@/services/siteSettingsService";

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
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getSiteSettings();
      setIsMaintenanceMode(settings?.isMaintenanceMode || false);
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleToggleMaintenance = async () => {
    try {
      setToggling(true);
      const newState = !isMaintenanceMode;
      await toggleMaintenanceMode(newState);
      setIsMaintenanceMode(newState);
    } catch (error) {
      console.error("Error toggling maintenance mode:", error);
      alert("Bakım modu değiştirilemedi. Lütfen tekrar deneyin.");
    } finally {
      setToggling(false);
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
      title: "Gelen Mesajlar",
      description: "İletişim formundan gelen mesajları görüntüle",
      icon: Mail,
      href: "/admin/messages",
      color: colors.status.success,
    },
    {
      title: "Avukat Bilgileri",
      description: "Avukat hakkında bilgileri güncelle",
      icon: User,
      href: "/admin/lawyer",
      color: colors.theme2.darkGreen,
    },
    {
      title: "İletişim Bilgileri",
      description: "Telefon, e-posta, adres ve harita bilgilerini güncelle",
      icon: Phone,
      href: "/admin/contact-info",
      color: colors.status.warning,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        {/* Bakım Modu Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isMaintenanceMode ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  <Power
                    className={`w-6 h-6 ${
                      isMaintenanceMode ? "text-red-600" : "text-green-600"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Bakım Modu
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isMaintenanceMode
                      ? "Site şu anda ziyaretçilere kapalı"
                      : "Site ziyaretçilere açık"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggleMaintenance}
                disabled={loading || toggling}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isMaintenanceMode
                    ? "bg-red-600 focus:ring-red-500"
                    : "bg-green-600 focus:ring-green-500"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isMaintenanceMode ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {isMaintenanceMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <p className="text-sm text-amber-800">
                  ⚠️ <strong>Uyarı:</strong> Bakım modu aktif. Normal
                  kullanıcılar siteyi göremez, sadece admin paneline
                  erişebilirsiniz.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
