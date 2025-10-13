"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff, LogOut } from "lucide-react";
import { colors } from "@/constants/colors";
import {
  getAnnouncementById,
  updateAnnouncement,
} from "@/services/announcementService";
import { AnnouncementFormData } from "@/types";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";

export default function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <AdminGuard>
      <EditAnnouncementContent announcementId={id} />
    </AdminGuard>
  );
}

function EditAnnouncementContent({
  announcementId,
}: {
  announcementId: string;
}) {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    content: "",
    published: false,
  });

  const fetchAnnouncement = useCallback(async () => {
    try {
      setInitialLoading(true);
      const announcement = await getAnnouncementById(announcementId);

      if (!announcement) {
        alert("Duyuru bulunamadı!");
        router.push("/admin/announcements");
        return;
      }

      setFormData({
        title: announcement.title,
        content: announcement.content,
        published: announcement.published,
      });
    } catch (error) {
      console.error("Error fetching announcement:", error);
      alert("Duyuru yüklenirken bir hata oluştu.");
    } finally {
      setInitialLoading(false);
    }
  }, [announcementId, router]);

  useEffect(() => {
    fetchAnnouncement();
  }, [fetchAnnouncement]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    try {
      setLoading(true);
      await updateAnnouncement(announcementId, formData);
      alert("Duyuru başarıyla güncellendi!");
      router.push("/admin/announcements");
    } catch (error) {
      console.error("Error updating announcement:", error);
      alert("Duyuru güncellenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600">Duyuru yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-6">
            <Link
              href="/admin/announcements"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Geri Dön</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:bg-red-700 bg-red-600 text-white"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Duyuru Düzenle
            </h1>
            <p className="text-lg text-gray-300">
              Duyuru bilgilerini güncelleyin
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-8"
          >
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Başlık <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="Duyuru başlığını girin..."
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  İçerik <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                  placeholder="Duyuru içeriğini girin..."
                  required
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {formData.published ? (
                    <Eye className="w-5 h-5 text-green-600" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-yellow-600" />
                  )}
                  <div>
                    <label
                      htmlFor="published"
                      className="block text-sm font-semibold text-slate-900"
                    >
                      Yayın Durumu
                    </label>
                    <p className="text-sm text-slate-600">
                      {formData.published
                        ? "Duyuru şu anda yayında"
                        : "Duyuru taslak olarak kaydedilecek"}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colors.primary.main }}
                >
                  <Save className="w-5 h-5" />
                  {loading ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
                </button>
                <Link
                  href="/admin/announcements"
                  className="px-6 py-3 rounded-lg font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-all text-center"
                >
                  İptal
                </Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
