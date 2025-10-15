"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, LogOut, Upload, Loader2, Trash2 } from "lucide-react";
import { colors } from "@/constants/colors";
import { getArticleById, updateArticle } from "@/services/articleService";
import { ArticleFormData } from "@/types";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic import to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-slate-300 rounded-lg p-8 text-center">
      <p className="text-slate-500">Editor yükleniyor...</p>
    </div>
  ),
});

export default function EditArticlePage() {
  return (
    <AdminGuard>
      <EditArticleContent />
    </AdminGuard>
  );
}

function EditArticleContent() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    author: "",
    tags: [],
    imageUrl: null,
    published: false,
    editorStateJSON: null,
  });
  const [tagInput, setTagInput] = useState("");

  const fetchArticle = useCallback(async () => {
    try {
      setLoading(true);
      const article = await getArticleById(articleId);
      if (article) {
        setFormData({
          title: article.title,
          category: article.category,
          excerpt: article.excerpt,
          content: article.content,
          author: article.author,
          tags: article.tags,
          imageUrl: article.imageUrl,
          published: article.published,
          editorStateJSON: article.editorStateJSON ?? null,
        });
      } else {
        alert("Makale bulunamadı!");
        router.push("/admin/articles");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      alert("Makale yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [articleId, router]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.excerpt ||
      !formData.content
    ) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    try {
      setSaving(true);
      await updateArticle(articleId, formData);
      alert("Makale başarıyla güncellendi!");
      router.push("/admin/articles");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Makale güncellenirken bir hata oluştu.");
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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setUploading(true);

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToUpload,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Yükleme başarısız");
      }

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
      }));

      alert("Kapak görseli başarıyla yüklendi!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Fotoğraf yüklenemedi!");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      imageUrl: null,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600">Makale yükleniyor...</p>
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
              href="/admin/articles"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Makale Listesi</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:bg-red-700 bg-red-600 text-white"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Makaleyi Düzenle</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
        >
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Başlık <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-shadow"
              placeholder="Makale başlığı..."
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="custom-select w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow bg-white"
              required
            >
              <option value="">Kategori Seçin...</option>
              <option value="Ceza Hukuku">Ceza Hukuku</option>
              <option value="Ticaret Hukuku">Ticaret Hukuku</option>
              <option value="İş Hukuku">İş Hukuku</option>
              <option value="Medeni Hukuk">Medeni Hukuk</option>
              <option value="Aile Hukuku">Aile Hukuku</option>
              <option value="Miras Hukuku">Miras Hukuku</option>
              <option value="Borçlar Hukuku">Borçlar Hukuku</option>
              <option value="İdare Hukuku">İdare Hukuku</option>
              <option value="Vergi Hukuku">Vergi Hukuku</option>
              <option value="Sigorta Hukuku">Sigorta Hukuku</option>
              <option value="Gayrimenkul Hukuku">Gayrimenkul Hukuku</option>
              <option value="Bilişim Hukuku">Bilişim Hukuku</option>
              <option value="Tüketici Hukuku">Tüketici Hukuku</option>
              <option value="Yabancılar ve Vatandaşlık Hukuku">
                Yabancılar ve Vatandaşlık Hukuku
              </option>
              <option value="İcra ve İflas Hukuku">İcra ve İflas Hukuku</option>
              <option value="Enerji ve Çevre Hukuku">
                Enerji ve Çevre Hukuku
              </option>
              <option value="Sağlık Hukuku">Sağlık Hukuku</option>
              <option value="Deniz ve Taşıma Hukuku">
                Deniz ve Taşıma Hukuku
              </option>
              <option value="Spor Hukuku">Spor Hukuku</option>
              <option value="Uluslararası Hukuk">Uluslararası Hukuk</option>
              <option value="Genel">Genel</option>
            </select>
          </div>

          {/* Author */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Yazar <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-shadow"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Özet <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-shadow h-24 resize-none"
              placeholder="Makalenin kısa özeti..."
              required
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              İçerik <span className="text-red-500">*</span>
            </label>

            <RichTextEditor
              value={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
              initialEditorStateJSON={formData.editorStateJSON ?? null}
              onStateChange={(stateJSON) =>
                setFormData((prev) => ({ ...prev, editorStateJSON: stateJSON }))
              }
              placeholder="Makale içeriğini yazın. Toolbar ile formatlandırabilirsiniz..."
            />

            <p className="text-xs text-gray-500 mt-2">
              <strong>Kullanım:</strong> Metni seçin ve toolbar&apos;daki
              butonlara tıklayın.
              <br />
              <strong>Özellikler:</strong> Kalın, İtalik, Altı Çizili, Başlık
              (H2, H3), Listeler
            </p>
          </div>

          {/* Cover Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Kapak Görseli (Opsiyonel)
            </label>

            {formData.imageUrl && (
              <div className="mb-4 relative w-full max-w-md h-64 rounded-lg overflow-hidden group">
                <Image
                  src={formData.imageUrl}
                  alt="Kapak Görseli"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                  title="Fotoğrafı Kaldır"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    {formData.imageUrl ? "Değiştir" : "Fotoğraf Yükle"}
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <p className="text-sm text-gray-500">Max 5MB • JPEG, PNG, WebP</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Kapak görseli yüklemek isteğe bağlıdır. Görsel yoksa
              placeholder gösterilir.
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Etiketler
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-shadow"
                placeholder="Etiket ekle..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-all"
                style={{ backgroundColor: colors.primary.main }}
              >
                Ekle
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-slate-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Published */}
          <div className="mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-300"
                style={{ accentColor: colors.primary.main }}
              />
              <span className="text-sm font-medium text-slate-900">
                Yayınla
              </span>
            </label>
            <p className="text-xs text-gray-500 ml-7">
              İşaretlenmezse makale taslak olarak kaydedilir
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primary.main }}
            >
              {saving ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Güncelleniyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Değişiklikleri Kaydet
                </>
              )}
            </button>
            <Link
              href="/admin/articles"
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
