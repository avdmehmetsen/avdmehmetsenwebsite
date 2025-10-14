"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, MapPin, Phone, Mail, Globe } from "lucide-react";
import { colors } from "@/constants/colors";
import {
  getContactInfo,
  updateContactInfo,
} from "@/services/contactInfoService";
import { ContactInfoFormData } from "@/types";

export default function ContactInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactInfoFormData>({
    phone: "",
    email: "",
    address: "",
    addressShort: "",
    googleMapsIframe: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const data = await getContactInfo();
      if (data) {
        setFormData({
          phone: data.phone,
          email: data.email,
          address: data.address,
          addressShort: data.addressShort,
          googleMapsIframe: data.googleMapsIframe,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    } catch (error) {
      console.error("Error loading contact info:", error);
      setMessage("İletişim bilgileri yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      await updateContactInfo(formData);

      setMessage(
        "İletişim bilgileri başarıyla güncellendi! Yönlendiriliyorsunuz..."
      );

      // 1.5 saniye sonra yönetim paneline yönlendir
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } catch (error) {
      console.error("Error updating contact info:", error);
      setMessage("Güncellenirken bir hata oluştu.");
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.primary.main }}
          ></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              İletişim Bilgileri Yönetimi
            </h1>
            <p className="text-gray-600">
              Web sitesinde görünen telefon, e-posta, adres ve harita
              bilgilerini buradan düzenleyebilirsiniz.
            </p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                message.includes("başarıyla")
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 space-y-6"
          >
            {/* Telefon */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone
                  className="w-4 h-4"
                  style={{ color: colors.primary.main }}
                />
                Telefon
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+90 (507) 736 82 51"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Telefon numarasını formatıyla birlikte yazın (örn: +90 (507) 736
                82 51)
              </p>
            </div>

            {/* E-posta */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail
                  className="w-4 h-4"
                  style={{ color: colors.primary.main }}
                />
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="dmehmetsen@gmail.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Adres (Tam) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin
                  className="w-4 h-4"
                  style={{ color: colors.primary.main }}
                />
                Tam Adres
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4. Halil Atilla Sitesi No:233 C Blok K:5 D:9, 35000 Bayraklı/İzmir"
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Footer ve iletişim sayfasında gösterilir
              </p>
            </div>

            {/* Adres (Kısa) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin
                  className="w-4 h-4"
                  style={{ color: colors.primary.main }}
                />
                Kısa Adres (Mobil için)
              </label>
              <input
                type="text"
                name="addressShort"
                value={formData.addressShort}
                onChange={handleChange}
                placeholder="Bayraklı / İzmir"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Navbar&apos;da mobil görünümde gösterilir
              </p>
            </div>

            {/* Google Maps Koordinatları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe
                    className="w-4 h-4"
                    style={{ color: colors.primary.main }}
                  />
                  Enlem (Latitude)
                </label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="38.4652783"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe
                    className="w-4 h-4"
                    style={{ color: colors.primary.main }}
                  />
                  Boylam (Longitude)
                </label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="27.1906063"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Google Maps iFrame */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe
                  className="w-4 h-4"
                  style={{ color: colors.primary.main }}
                />
                Google Maps Embed URL
              </label>
              <textarea
                name="googleMapsIframe"
                value={formData.googleMapsIframe}
                onChange={handleChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-xs"
              />
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 font-medium mb-1">
                  💡 Google Maps Embed URL Nasıl Alınır:
                </p>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Google Maps&apos;te konumunuzu bulun</li>
                  <li>&quot;Paylaş&quot; butonuna tıklayın</li>
                  <li>&quot;Harita ekle&quot; sekmesine geçin</li>
                  <li>
                    Görünen iframe kodundaki{" "}
                    <code className="bg-blue-100 px-1 rounded">src=&quot;...&quot;</code>{" "}
                    kısmındaki URL&apos;yi kopyalayın
                  </li>
                </ol>
              </div>
            </div>

            {/* Map Preview */}
            {formData.googleMapsIframe && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Harita Önizleme
                </label>
                <div className="bg-slate-200 rounded-lg overflow-hidden">
                  <iframe
                    src={formData.googleMapsIframe}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.primary.main }}
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
