"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { colors } from "@/constants/colors";
import { getAboutPage, updateAboutPage } from "@/services/aboutService";
import Image from "next/image";
import { ArrowLeft, Upload, Save, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
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

export default function AdminAboutPage() {
  return (
    <AdminGuard>
      <AboutPageContent />
    </AdminGuard>
  );
}

function AboutPageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    officeDescription: "",
    officeImageUrl: "",
    lawyerName: "",
    lawyerBio: "",
    lawyerImageUrl: "",
    officeEditorStateJSON: null as string | null,
    lawyerEditorStateJSON: null as string | null,
  });

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      setLoading(true);
      const data = await getAboutPage();
      if (data) {
        setFormData({
          officeDescription: data.officeDescription,
          officeImageUrl: data.officeImageUrl,
          lawyerName: data.lawyerName,
          lawyerBio: data.lawyerBio,
          lawyerImageUrl: data.lawyerImageUrl,
          officeEditorStateJSON: data.officeEditorStateJSON ?? null,
          lawyerEditorStateJSON: data.lawyerEditorStateJSON ?? null,
        });
      }
    } catch (error) {
      console.error("Error loading about data:", error);
      alert("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "officeImageUrl" | "lawyerImageUrl"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("Dosya boyutu 5MB'dan büyük olamaz!");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Sadece JPEG, PNG ve WebP formatları kabul edilir!");
      return;
    }

    try {
      setUploading(field);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Yükleme başarısız");
      }

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        [field]: data.url,
      }));

      alert("Fotoğraf başarıyla yüklendi!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Fotoğraf yüklenemedi!");
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.officeDescription.trim()) {
      alert("Ofis açıklaması boş olamaz!");
      return;
    }

    // Lawyer fields are optional
    // No validation needed for lawyerName and lawyerBio

    try {
      setSaving(true);
      await updateAboutPage(formData);
      alert("Hakkımızda sayfası başarıyla güncellendi!");
    } catch (error) {
      console.error("Error updating about page:", error);
      alert("Güncelleme sırasında bir hata oluştu!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-slate-900 mx-auto mb-4" />
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Dön
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            Hakkımızda Sayfası Yönetimi
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Hakkımızda sayfasındaki metinleri ve fotoğrafları güncelleyin
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Office Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Ofis Bilgileri
            </h2>

            <div className="space-y-6">
              {/* Office Description - RichTextEditor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ofis Açıklaması
                </label>
                <RichTextEditor
                  value={formData.officeDescription}
                  onChange={(html) =>
                    setFormData({ ...formData, officeDescription: html })
                  }
                  initialEditorStateJSON={
                    formData.officeEditorStateJSON ?? null
                  }
                  onStateChange={(stateJSON) =>
                    setFormData((prev) => ({
                      ...prev,
                      officeEditorStateJSON: stateJSON,
                    }))
                  }
                  placeholder="Hukuk bürosu hakkında bilgi yazın. Toolbar ile formatlandırabilirsiniz..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  <strong>Kullanım:</strong> Metni seçin ve toolbar&apos;daki
                  butonlara tıklayın.
                  <br />
                  <strong>Özellikler:</strong> Kalın, İtalik, Altı Çizili,
                  Başlık (H2, H3), Listeler, Alıntı, Hizalama, Metin/Arka Plan
                  Rengi
                </p>
              </div>

              {/* Office Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ofis Fotoğrafı
                </label>

                {formData.officeImageUrl && (
                  <div className="mb-4 relative w-full max-w-md h-64 rounded-lg overflow-hidden group">
                    <Image
                      src={formData.officeImageUrl}
                      alt="Ofis"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, officeImageUrl: "" })
                      }
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                      title="Fotoğrafı Kaldır"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    {uploading === "officeImageUrl" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        {formData.officeImageUrl
                          ? "Değiştir"
                          : "Fotoğraf Yükle"}
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => handleImageUpload(e, "officeImageUrl")}
                      className="hidden"
                      disabled={uploading === "officeImageUrl"}
                    />
                  </label>
                  <p className="text-sm text-gray-500">
                    Max 5MB • JPEG, PNG, WebP
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Fotoğraf yüklemek isteğe bağlıdır. Fotoğraf yoksa metin tam
                  genişlikte görünür.
                </p>
              </div>
            </div>
          </div>

          {/* Lawyer Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Avukat Bilgileri
            </h2>

            <div className="space-y-6">
              {/* Lawyer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avukat Adı
                </label>
                <input
                  type="text"
                  value={formData.lawyerName}
                  onChange={(e) =>
                    setFormData({ ...formData, lawyerName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Örn: Av. Mehmet Durdu Şen"
                />
                <p className="text-xs text-gray-500 mt-1">
                  İsteğe bağlı - Boş bırakılırsa başlık gösterilmez
                </p>
              </div>

              {/* Lawyer Bio - RichTextEditor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avukat Biyografisi
                </label>
                <RichTextEditor
                  value={formData.lawyerBio}
                  onChange={(html) =>
                    setFormData({ ...formData, lawyerBio: html })
                  }
                  initialEditorStateJSON={
                    formData.lawyerEditorStateJSON ?? null
                  }
                  onStateChange={(stateJSON) =>
                    setFormData((prev) => ({
                      ...prev,
                      lawyerEditorStateJSON: stateJSON,
                    }))
                  }
                  placeholder="Avukat hakkında bilgi yazın. Toolbar ile formatlandırabilirsiniz..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  <strong>Kullanım:</strong> Metni seçin ve toolbar&apos;daki
                  butonlara tıklayın.
                  <br />
                  <strong>Özellikler:</strong> Kalın, İtalik, Altı Çizili,
                  Başlık (H2, H3), Listeler, Alıntı, Hizalama, Metin/Arka Plan
                  Rengi
                </p>
              </div>

              {/* Lawyer Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avukat Fotoğrafı
                </label>

                {formData.lawyerImageUrl && (
                  <div className="mb-4 relative w-full max-w-md h-64 rounded-lg overflow-hidden group">
                    <Image
                      src={formData.lawyerImageUrl}
                      alt="Avukat"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, lawyerImageUrl: "" })
                      }
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                      title="Fotoğrafı Kaldır"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    {uploading === "lawyerImageUrl" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        {formData.lawyerImageUrl
                          ? "Değiştir"
                          : "Fotoğraf Yükle"}
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => handleImageUpload(e, "lawyerImageUrl")}
                      className="hidden"
                      disabled={uploading === "lawyerImageUrl"}
                    />
                  </label>
                  <p className="text-sm text-gray-500">
                    Max 5MB • JPEG, PNG, WebP
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Fotoğraf yüklemek isteğe bağlıdır. Fotoğraf yoksa metin tam
                  genişlikte görünür.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving || uploading !== null}
              style={{ backgroundColor: colors.primary.main }}
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Değişiklikleri Kaydet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
