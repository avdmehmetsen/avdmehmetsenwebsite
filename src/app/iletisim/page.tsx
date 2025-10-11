"use client";

import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { colors } from "@/constants/colors";
import PlaceButton from "@/components/PlaceButton";

export default function Iletisim() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
            <p className="text-xl text-gray-300">
              Hukuki danışmanlık için bizimle iletişime geçin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                İletişim Bilgileri
              </h2>
              <p className="text-gray-600 mb-8">
                Hukuki sorularınız ve danışmanlık talepleriniz için aşağıdaki
                iletişim kanallarından bize ulaşabilirsiniz. En kısa sürede size
                dönüş yapılacaktır.
              </p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Address */}
                <div className="flex items-start group">
                  <div
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${colors.primary.main}20` }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: colors.primary.main }}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Adres
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. <br /> 4. Halil
                      Atilla Sitesi No:233 C Blok K:5 D:9
                      <br />
                      Bayraklı / İzmir
                    </p>
                    <PlaceButton label="Yol Tarifi" />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start group">
                  <div
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${colors.primary.main}20` }}
                  >
                    <Phone
                      className="w-6 h-6"
                      style={{ color: colors.primary.main }}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Telefon
                    </h3>
                    <p className="text-gray-600 mb-3">+90 (507) 736 82 55</p>
                    <a
                      href="tel:+905077368255"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90 text-sm"
                      style={{ backgroundColor: colors.primary.main }}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Hemen Ara</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start group">
                  <div
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${colors.primary.main}20` }}
                  >
                    <Mail
                      className="w-6 h-6"
                      style={{ color: colors.primary.main }}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      E-posta
                    </h3>
                    <p className="text-gray-600">info@avdurdumehmetsen.com</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start group">
                  <div
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${colors.primary.main}20` }}
                  >
                    <Clock
                      className="w-6 h-6"
                      style={{ color: colors.primary.main }}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-gray-600">
                      Pazartesi - Cuma: 09:00 - 18:00
                      <br />
                      Cumartesi: 10:00 - 14:00
                      <br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Sosyal Medya
                </h3>
                <div className="flex gap-4">
                  {[
                    { Icon: Linkedin, label: "LinkedIn" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Instagram, label: "Instagram" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                      style={{ backgroundColor: colors.background.dark }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          colors.primary.main)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          colors.background.dark)
                      }
                    >
                      <span className="sr-only">{label}</span>
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Mesaj Gönderin
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ofisimizin Konumu
            </h2>
          </div>
          <div className="bg-slate-200 h-96 rounded-lg flex items-center justify-center shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.9689396410945!2d27.19060637655294!3d38.46527837181961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b97de32f1226ed%3A0x3487243a82ced214!2zQXZ1a2F0IER1cmR1IE1laG1ldCDFnmVuIC0gxZ5lbiBIdWt1ayBCw7xyb3N1IC0gxLB6bWlyIEF2dWthdCAtIMSwem1pciBLaXJhIEF2dWthdMSxIC0gxLB6bWlyIMSwxZ8gQXZ1a2F0xLEgLSDEsHptaXIgQm_Fn2FubWEgQXZ1a2F0xLE!5e0!3m2!1str!2str!4v1760042428526!5m2!1str!2str"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
