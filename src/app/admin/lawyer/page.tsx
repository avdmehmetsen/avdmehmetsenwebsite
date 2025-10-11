"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { colors } from "@/constants/colors";
import { getLawyerInfo, updateLawyerInfo } from "@/services/lawyerService";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-slate-300 rounded-lg p-8 text-center">
      <p className="text-slate-500">Editor yükleniyor...</p>
    </div>
  ),
});

export default function LawyerManagementPage() {
  return (
    <AdminGuard>
      <LawyerManagementContent />
    </AdminGuard>
  );
}

function LawyerManagementContent() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    editorStateJSON: null as string | null,
  });

  useEffect(() => {
    fetchLawyerInfo();
  }, []);

  const fetchLawyerInfo = async () => {
    try {
      setLoading(true);
      const info = await getLawyerInfo();
      if (info) {
        setFormData({
          name: info.name || "",
          bio: info.bio || "",
          editorStateJSON: info.editorStateJSON ?? null,
        });
      }
    } catch (error) {
      console.error("Error fetching lawyer info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.bio) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setSaving(true);
      await updateLawyerInfo(formData);
      alert("Avukat bilgileri başarıyla güncellendi!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating lawyer info:", error);
      alert("Bilgiler güncellenirken bir hata oluştu.");
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600">Bilgiler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Yönetim Paneli</span>
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
              Avukat Bilgileri
            </h1>
            <p className="text-lg text-gray-300">
              Hakkımızda sayfasında görüntülenecek bilgileri düzenleyin
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
        >
          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              İsim <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
              placeholder="Örn: Av. Mehmet Durdu Şen"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Hakkımızda sayfasında başlık olarak görünecek
            </p>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Hakkında <span className="text-red-500">*</span>
            </label>

            <RichTextEditor
              value={formData.bio}
              onChange={(html) => setFormData({ ...formData, bio: html })}
              initialEditorStateJSON={formData.editorStateJSON ?? null}
              onStateChange={(stateJSON) =>
                setFormData((prev) => ({ ...prev, editorStateJSON: stateJSON }))
              }
              placeholder="Avukat hakkında bilgi yazın. Toolbar ile formatlandırabilirsiniz..."
            />

            <p className="text-xs text-gray-500 mt-2">
              <strong>Kullanım:</strong> Metni seçin ve toolbar&apos;daki
              butonlara tıklayın.
              <br />
              <strong>Özellikler:</strong> Kalın, İtalik, Altı Çizili, Başlık
              (H2, H3), Listeler, Alıntı, Hizalama, Metin/Arka Plan Rengi
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primary.main }}
            >
              {saving ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Değişiklikleri Kaydet
                </>
              )}
            </button>
            <Link
              href="/admin"
              className="px-6 py-3 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              İptal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
