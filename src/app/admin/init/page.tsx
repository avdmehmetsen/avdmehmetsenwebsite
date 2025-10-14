"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { colors } from "@/constants/colors";
import { initializeContactInfo } from "@/services/contactInfoService";
import { initializeSiteSettings } from "@/services/siteSettingsService";
import AdminGuard from "@/components/AdminGuard";

export default function InitPage() {
  return (
    <AdminGuard>
      <InitPageContent />
    </AdminGuard>
  );
}

function InitPageContent() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleInitialize = async () => {
    try {
      setStatus("loading");
      setMessage("Sistem ayarları oluşturuluyor...");

      await initializeContactInfo();
      await initializeSiteSettings();

      setStatus("success");
      setMessage(
        "Sistem ayarları başarıyla oluşturuldu! Şimdi yönetim panelinden değiştirebilirsiniz."
      );
    } catch (error) {
      console.error("Error initializing:", error);
      setStatus("error");
      setMessage("Bir hata oluştu. Belki veriler zaten mevcut olabilir.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Sistem Başlatma
          </h1>
          <p className="text-gray-600 mb-8">
            Bu sayfa Firebase&apos;de başlangıç sistem ayarlarını (iletişim
            bilgileri, bakım modu, vb.) oluşturur. İlk kurulumda bir kez
            çalıştırmanız yeterlidir.
          </p>

          {status === "idle" && (
            <button
              onClick={handleInitialize}
              className="w-full px-6 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary.main }}
            >
              Sistem Ayarlarını Oluştur
            </button>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2
                className="w-12 h-12 animate-spin mb-4"
                style={{ color: colors.primary.main }}
              />
              <p className="text-gray-600">{message}</p>
            </div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-gray-700 font-medium">{message}</p>
              <a
                href="/admin"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary.main }}
              >
                Yönetim Paneline Dön
              </a>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <p className="text-gray-700 font-medium mb-6">{message}</p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary.main }}
              >
                Tekrar Dene
              </button>
            </motion.div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Bilgi</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Bu işlem sadece bir kere yapılmalıdır</li>
              <li>
                • İletişim bilgileri ve site ayarları Firebase&apos;e
                kaydedilecektir
              </li>
              <li>• Daha sonra admin panelinden güncelleyebilirsiniz</li>
              <li>• Eğer veriler zaten mevcutsa, bu işlem atlanacaktır</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
