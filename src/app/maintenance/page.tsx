"use client";

import { motion } from "framer-motion";
import { Wrench, Mail, Phone, Clock } from "lucide-react";
import { colors } from "@/constants/colors";
import { useEffect, useState } from "react";
import { getContactInfo } from "@/services/contactInfoService";
import { ContactInfo } from "@/types";

export default function MaintenancePage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await getContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error("Error loading contact info:", error);
      }
    };
    loadContactInfo();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* İkon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8"
            style={{ backgroundColor: `${colors.primary.main}20` }}
          >
            <Wrench
              className="w-12 h-12"
              style={{ color: colors.primary.main }}
            />
          </motion.div>

          {/* Başlık */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Bakım Çalışması
          </motion.h1>

          {/* Açıklama */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-300 mb-8"
          >
            Sitemiz şu anda bakımdadır. Size daha iyi hizmet verebilmek için
            çalışıyoruz.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg text-gray-400 mb-12"
          >
            En kısa sürede tekrar sizlerle olacağız.
          </motion.p>
        </motion.div>

        {/* Animasyonlu Noktalar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center gap-2 mt-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.primary.main }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
