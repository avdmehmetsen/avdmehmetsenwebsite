"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      router.push("/admin");
    } catch (error) {
      console.error("Login error:", error);

      // Firebase error messages
      const errorCode = (error as { code?: string }).code;

      if (
        errorCode === "auth/invalid-credential" ||
        errorCode === "auth/wrong-password"
      ) {
        setError("E-posta veya şifre hatalı.");
      } else if (errorCode === "auth/user-not-found") {
        setError("Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.");
      } else if (errorCode === "auth/too-many-requests") {
        setError(
          "Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin."
        );
      } else if (errorCode === "auth/network-request-failed") {
        setError("Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.");
      } else {
        setError("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    if (!resetEmail) {
      setResetError("Lütfen e-posta adresinizi girin.");
      return;
    }

    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess(
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin. Spam klasörünü de kontrol etmeyi unutmayın."
      );
      setResetEmail("");
      // Auto-close after 5 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetSuccess("");
      }, 5000);
    } catch (error) {
      console.error("Password reset error:", error);
      const errorCode = (error as { code?: string }).code;

      if (errorCode === "auth/user-not-found") {
        setResetError("Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.");
      } else if (errorCode === "auth/invalid-email") {
        setResetError("Geçersiz e-posta adresi.");
      } else if (errorCode === "auth/network-request-failed") {
        setResetError(
          "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin."
        );
      } else {
        setResetError(
          "Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu."
        );
      }
    } finally {
      setResetLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${colors.primary.main}20` }}
          >
            <Lock className="w-8 h-8" style={{ color: colors.primary.main }} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Admin Girişi
          </h1>
          <p className="text-slate-600">
            Yönetim paneline erişmek için giriş yapın
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-900 mb-2"
              >
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-0 transition-shadow"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-900 mb-2"
              >
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-0 transition-shadow"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primary.main }}
            >
              {loading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Giriş yapılıyor...
                </>
              ) : (
                "Giriş Yap"
              )}
            </button>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(!showForgotPassword);
                  setResetError("");
                  setResetSuccess("");
                }}
                className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
              >
                Şifremi Unuttum
              </button>
            </div>
          </form>

          {/* Forgot Password Section */}
          {showForgotPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-slate-200"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Şifre Sıfırlama
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                E-posta adresinizi girin, size şifre sıfırlama bağlantısı
                gönderelim.
              </p>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                {/* Reset Error Message */}
                {resetError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                  >
                    {resetError}
                  </motion.div>
                )}

                {/* Reset Success Message */}
                {resetSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                  >
                    {resetSuccess}
                  </motion.div>
                )}

                {/* Email Input */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-0 transition-shadow"
                      placeholder="E-posta adresiniz"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetEmail("");
                      setResetError("");
                      setResetSuccess("");
                    }}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-white shadow hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: colors.primary.main }}
                  >
                    {resetLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Gönderiliyor...
                      </div>
                    ) : (
                      "Gönder"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Ana sayfaya dön
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
