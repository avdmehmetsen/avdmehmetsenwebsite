"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, LogOut, Bold, Italic } from "lucide-react";
import { colors } from "@/constants/colors";
import { createArticle } from "@/services/articleService";
import { ArticleFormData } from "@/types";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";

export default function NewArticlePage() {
  return (
    <AdminGuard>
      <NewArticleContent />
    </AdminGuard>
  );
}

function NewArticleContent() {
  const router = useRouter();
  const { logout } = useAuth();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    author: "Av. Mehmet Durdu Şen",
    tags: [],
    imageUrl: null,
    published: false,
  });
  const [tagInput, setTagInput] = useState("");

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
      setLoading(true);
      await createArticle(formData);
      alert("Makale başarıyla oluşturuldu!");
      router.push("/admin/articles");
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Makale oluşturulurken bir hata oluştu.");
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

  // Formatlandırma fonksiyonları
  const insertContentTag = (
    openTag: string,
    closeTag: string,
    placeholder = ""
  ) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const before = formData.content.substring(0, start);
    const after = formData.content.substring(end);
    const newText = before + openTag + textToInsert + closeTag + after;

    setFormData({ ...formData, content: newText });

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + openTag.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatBold = () =>
    insertContentTag("<strong>", "</strong>", "kalın metin");
  const formatItalic = () => insertContentTag("<em>", "</em>", "italik metin");
  const formatParagraph = () =>
    insertContentTag("<p>", "</p>", "paragraf metni");
  const formatHeading = () => insertContentTag("<h2>", "</h2>", "alt başlık");
  const insertLineBreak = () => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const before = formData.content.substring(0, start);
    const after = formData.content.substring(start);
    setFormData({ ...formData, content: before + "<br>" + after });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 4, start + 4);
    }, 0);
  };

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
          <h1 className="text-3xl md:text-4xl font-bold">Yeni Makale Ekle</h1>
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
              style={{ focusRingColor: colors.primary.main }}
              placeholder="Makale başlığı..."
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-shadow"
              placeholder="Örn: Ceza Hukuku, Ticaret Hukuku..."
              required
            />
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

            {/* Formatlandırma Toolbar */}
            <div className="flex flex-wrap gap-2 mb-2 p-3 bg-slate-50 border border-slate-300 rounded-t-lg">
              <button
                type="button"
                onClick={formatParagraph}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
                title="Paragraf ekle"
              >
                <span className="text-xs">P</span>
                <span className="hidden sm:inline">Paragraf</span>
              </button>

              <button
                type="button"
                onClick={formatHeading}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
                title="Alt başlık ekle"
              >
                <span className="text-xs font-bold">H2</span>
                <span className="hidden sm:inline">Başlık</span>
              </button>

              <button
                type="button"
                onClick={formatBold}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
                title="Kalın yap"
              >
                <Bold className="w-4 h-4" />
                <span className="hidden sm:inline">Kalın</span>
              </button>

              <button
                type="button"
                onClick={formatItalic}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
                title="İtalik yap"
              >
                <Italic className="w-4 h-4" />
                <span className="hidden sm:inline">İtalik</span>
              </button>

              <button
                type="button"
                onClick={insertLineBreak}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
                title="Satır sonu ekle"
              >
                <span className="text-xs">↵</span>
                <span className="hidden sm:inline">Satır Sonu</span>
              </button>

              <div className="ml-auto text-xs text-slate-500 flex items-center">
                <span className="hidden md:inline">
                  💡 Metni seçip butonlara tıklayın
                </span>
              </div>
            </div>

            <textarea
              ref={contentRef}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-b-lg focus:outline-none focus:ring-2 transition-shadow h-96 resize-y text-sm"
              placeholder="Makale içeriğini yazın. Yukarıdaki butonları kullanarak formatlandırabilirsiniz..."
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              <strong>Kullanım:</strong> Metni seçin ve yukarıdaki butonlara
              tıklayın. Örneğin, bir metni seçip &quot;Kalın&quot; butonuna
              tıklayın. Alt başlık eklemek için &quot;H2&quot; butonuna
              tıklayın.
            </p>
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Kapak Görseli URL (Opsiyonel)
            </label>
            <input
              type="url"
              value={formData.imageUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value || null })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-shadow"
              placeholder="https://example.com/image.jpg"
            />
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
                Hemen yayınla
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
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primary.main }}
            >
              {loading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Makaleyi Kaydet
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
