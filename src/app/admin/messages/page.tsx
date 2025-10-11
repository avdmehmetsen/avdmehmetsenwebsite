"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MailOpen,
  Trash2,
  Calendar,
  Phone,
  User,
  LogOut,
  Tag,
} from "lucide-react";
import { colors } from "@/constants/colors";
import {
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
} from "@/services/contactService";
import { ContactMessage } from "@/types";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/contexts/AuthContext";

export default function MessagesManagementPage() {
  return (
    <AdminGuard>
      <MessagesManagementContent />
    </AdminGuard>
  );
}

function MessagesManagementContent() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const fetchedMessages = await getContactMessages(filter === "unread");
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Mesajlar yüklenirken bir hata oluştu.");
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

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      // Update local state
      setMessages((prev) => {
        const updatedMessages = prev.map((msg) =>
          msg.id === id ? { ...msg, isRead: true } : msg
        );

        // Eğer "okunmamış" filtresindeyiz ve artık okunmamış mesaj kalmadıysa, "tümü" filtresine geç
        const remainingUnread = updatedMessages.filter(
          (msg) => !msg.isRead
        ).length;
        if (filter === "unread" && remainingUnread === 0) {
          setFilter("all");
        }

        return updatedMessages;
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
      alert("Mesaj okundu olarak işaretlenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (id: string, senderName: string) => {
    if (
      !confirm(
        `${senderName} tarafından gönderilen mesajı silmek istediğinizden emin misiniz?`
      )
    ) {
      return;
    }

    try {
      // Silinen mesajın okunmamış olup olmadığını kontrol et
      const messageToDelete = messages.find((msg) => msg.id === id);
      const wasUnread = messageToDelete && !messageToDelete.isRead;

      await deleteContactMessage(id);
      alert("Mesaj başarıyla silindi!");

      // Local state'i güncelle
      setMessages((prev) => {
        const updatedMessages = prev.filter((msg) => msg.id !== id);

        // Eğer "okunmamış" filtresindeyiz ve silinen mesaj okunmamıştı ve artık okunmamış mesaj kalmadıysa
        const remainingUnread = updatedMessages.filter(
          (msg) => !msg.isRead
        ).length;
        if (filter === "unread" && wasUnread && remainingUnread === 0) {
          setFilter("all");
        }

        return updatedMessages;
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Mesaj silinirken bir hata oluştu.");
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

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
                Gelen Mesajlar
              </h1>
              <p className="text-lg text-gray-300">
                İletişim formundan gelen mesajları yönetin
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === "all"
                    ? "bg-white text-slate-900"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
              >
                Tümü ({messages.length})
              </button>
              <button
                onClick={() => unreadCount > 0 && setFilter("unread")}
                disabled={unreadCount === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === "unread"
                    ? "bg-white text-slate-900"
                    : unreadCount === 0
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                title={unreadCount === 0 ? "Okunmamış mesaj bulunmuyor" : ""}
              >
                Okunmamış ({unreadCount})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
              <p className="text-slate-600">Mesajlar yükleniyor...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-2">
              {filter === "unread" ? "Okunmamış mesaj" : "Mesaj"}{" "}
              bulunmamaktadır.
            </p>
            <p className="text-slate-500">
              İletişim formundan gelen mesajlar burada görünecek.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-lg shadow-sm border-2 p-6 hover:shadow-md transition-shadow ${
                  message.isRead
                    ? "border-slate-200"
                    : "border-blue-200 bg-blue-50/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {message.isRead ? (
                      <MailOpen className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Mail className="w-5 h-5 text-blue-600" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {message.name}
                      </h3>
                      <p className="text-slate-600">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!message.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Okundu olarak işaretle"
                      >
                        <MailOpen className="w-5 h-5 text-blue-600" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id, message.name)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">
                      {message.subject}
                    </span>
                  </div>
                  {message.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">
                        {message.phone}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
