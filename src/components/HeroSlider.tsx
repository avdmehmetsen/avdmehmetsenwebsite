"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// Statik import: otomatik blurDataURL üretir
import hero1 from "@/assets/hero/hero1.jpg";
import hero2 from "@/assets/hero/hero2.jpg";
import hero3 from "@/assets/hero/hero3.jpg";

const slides = [
  {
    image: hero1,
    title: "Hukukun Gücünü Yanınıza Alın",
    subtitle: "İzmir'de Güvenilir Avukatlık Hizmeti",
    description:
      "İzmir'de profesyonel avukatlık hizmeti sunuyoruz. Her davada adaletin sesi oluyor, müvekkillerimizin haklarını kararlılıkla savunuyoruz.",
  },
  {
    image: hero2,
    title: "Adalet İçin Kararlıyız",
    subtitle: "Her Adımda Profesyonel Destek",
    description:
      "İzmir'de hizmet veren hukuk büromuz, hukukun tüm alanlarında çözüm odaklı yaklaşımımızla, sizin için en doğru stratejiyi belirliyoruz.",
  },
  {
    image: hero3,
    title: "Tecrübe, Güven ve Başarı",
    subtitle: "İzmir'de Yılların Birikimi",
    description:
      "İzmir'de yılların birikimiyle müvekkillerimize güçlü, etik ve etkili bir avukatlık hizmeti sunuyoruz.",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Basit “sonraki görseli ısıt” mekanizması
  const nextIndex = useMemo(
    () => (currentSlide + 1) % slides.length,
    [currentSlide]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Geçişten önce bir sonraki görseli ısıt
    const img = new window.Image();
    img.src = slides[nextIndex].image.src; // static import sayesinde gerçek URL
  }, [nextIndex]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              // LCP için sadece ilk görsel: priority + high
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              placeholder="blur"
              // Tarayıcıya “tam genişlik” ipucu: doğru çözünürlük indirsin
              sizes="100vw"
              // 90 genelde gereksiz; 70 çoğu projede fark edilmez ama ciddi küçültür
              quality={index === 0 ? 75 : 70}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/30" />

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {slide.title}
                    <span className="block mt-2" style={{ color: "#cb8929" }}>
                      {slide.subtitle}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-md md:text-lg text-gray-300 mb-8">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/iletisim"
                      className="inline-block text-[#cb8929] border border-[#cb8929] px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#cb8929] hover:text-white"
                    >
                      Hemen İletişime Geçin
                    </Link>

                    <Link
                      href="/hakkimizda"
                      className="inline-block bg-transparent border border-gray-300 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 hover:text-slate-900 transition-all"
                    >
                      Hakkımızda
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-[#cb8929] w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
