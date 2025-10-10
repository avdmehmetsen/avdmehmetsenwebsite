"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Eye,
  EyeOff,
  Calendar,
  LogOut,
} from "lucide-react";
import { colors } from "@/constants/colors";
import { getArticles, deleteArticle } from "@/services/articleService";
import { Article } from "@/types";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";

export default function ArticlesManagementPage() {
  return (
    <AdminGuard>
      <ArticlesManagementContent />
    </AdminGuard>
  );
}

function ArticlesManagementContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const fetchedArticles = await getArticles(false); // Get all articles including unpublished
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Makaleler yüklenirken bir hata oluştu.");
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

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `"${title}" başlıklı makaleyi silmek istediğinizden emin misiniz?`
      )
    ) {
      return;
    }

    try {
      await deleteArticle(id);
      alert("Makale başarıyla silindi!");
      fetchArticles(); // Refresh the list
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Makale silinirken bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-6">
            <Link
              href="/admin"
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
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Makale Yönetimi
              </h1>
              <p className="text-lg text-gray-300">
                Makalelerinizi ekleyin, düzenleyin veya silin
              </p>
            </div>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: colors.primary.main }}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Yeni Makale</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
              <p className="text-slate-600">Makaleler yükleniyor...</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg mb-4">
              Henüz hiç makale eklenmemiş.
            </p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: colors.primary.main }}
            >
              <Plus className="w-5 h-5" />
              İlk Makaleyi Ekle
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {article.title}
                      </h3>
                      {article.published ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Eye className="w-3 h-3" />
                          Yayında
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <EyeOff className="w-3 h-3" />
                          Taslak
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span
                        className="font-medium"
                        style={{ color: colors.primary.main }}
                      >
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                      <span>{article.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() =>
                        router.push(`/admin/articles/edit/${article.id}`)
                      }
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Düzenle"
                    >
                      <Edit className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
