"use client";

import { colors } from "@/constants/colors";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    kvkkConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      console.log("Submitting contact form:", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        kvkkConsent: formData.kvkkConsent,
      });

      // Phone field'ı boşsa undefined yaparak gönder
      const submitData = {
        ...formData,
        phone: formData.phone.trim() || undefined,
      };

      console.log("Final submit data:", submitData);

      // API endpoint'e POST request gönder
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      let data;
      try {
        data = await response.json();
        console.log("Response data:", data);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error(
          "Response text:",
          await response.text().catch(() => "Could not read response text")
        );
        throw new Error("Sunucu yanıtı işlenirken bir hata oluştu");
      }

      if (!response.ok) {
        // Rate limit hatası için özel mesaj
        if (response.status === 429 && data?.resetTime) {
          const resetDate = new Date(data.resetTime);
          const now = new Date();
          const minutesLeft = Math.ceil(
            (resetDate.getTime() - now.getTime()) / 60000
          );
          throw new Error(
            `Çok fazla mesaj gönderdiniz. Lütfen ${minutesLeft} dakika sonra tekrar deneyin.`
          );
        }

        const errorMessage =
          data?.error || `Sunucu hatası (${response.status})`;
        console.error("Server error:", errorMessage);
        throw new Error(errorMessage);
      }

      // Başarılı
      console.log("Form submission successful");
      setSubmitStatus({
        type: "success",
        message:
          "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        kvkkConsent: false,
      });
    } catch (error: unknown) {
      console.error("Error submitting contact form:", error);
      // Hata
      setSubmitStatus({
        type: "error",
        message:
          (error instanceof Error ? error.message : String(error)) ||
          "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border text-slate-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Adınız ve soyadınız"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            E-posta <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border text-slate-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="ornek@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-slate-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="0555 555 55 55"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Konu <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border text-slate-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Konu seçin</option>
            <option value="Ceza Hukuku">Ceza Hukuku</option>
            <option value="Ticaret Hukuku">Ticaret Hukuku</option>
            <option value="Aile Hukuku">Aile Hukuku</option>
            <option value="İş Hukuku">İş Hukuku</option>
            <option value="Gayrimenkul Hukuku">Gayrimenkul Hukuku</option>
            <option value="Miras Hukuku">Miras Hukuku</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Mesajınız <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border text-slate-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          placeholder="Lütfen mesajınızı detaylı bir şekilde yazın..."
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="kvkk"
          checked={formData.kvkkConsent}
          onChange={(e) =>
            setFormData({ ...formData, kvkkConsent: e.target.checked })
          }
          required
          className="mt-1 w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
        />
        <label htmlFor="kvkk" className="ml-2 text-sm text-gray-600">
          <span className="text-red-500">*</span>{" "}
          <a href="/kvkk" className="text-amber-600 hover:underline">
            KVKK Aydınlatma Metni
          </a>
          &apos;ni okudum ve kabul ediyorum.
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundColor: colors.primary.main }}
        className="w-full text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Gönderiliyor...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <span>Mesaj Gönder</span>
          </>
        )}
      </button>
    </form>
  );
}
