"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/hero/hero1.jpg",
    title: "Hukukun Gücünü Yanınıza Alın",
    subtitle: "Haklarınız İçin Güvenilir Temsil",
    description:
      "Her davada adaletin sesi oluyor, müvekkillerimizin haklarını kararlılıkla savunuyoruz.",
  },
  {
    image: "/images/hero/hero2.jpg",
    title: "Adalet İçin Kararlıyız",
    subtitle: "Her Adımda Profesyonel Destek",
    description:
      "Hukukun tüm alanlarında çözüm odaklı yaklaşımımızla, sizin için en doğru stratejiyi belirliyoruz.",
  },
  {
    image: "/images/hero/hero3.jpg",
    title: "Tecrübe, Güven ve Başarı",
    subtitle: "Uzman Kadromuzla Yanınızdayız",
    description:
      "Yılların birikimiyle müvekkillerimize güçlü, etik ve etkili bir hukuk hizmeti sunuyoruz.",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 saniyede bir değişir

    return () => clearInterval(timer);
  }, []);
  {
    /*
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
*/
  }
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/30" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
                  {slide.title}
                  <span className="block mt-2" style={{ color: "#cb8929" }}>
                    {slide.subtitle}
                  </span>
                </h1>
                <p className="text-sm sm:text-md md:text-lg text-gray-300 mb-8 animate-fade-in-delay">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
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
      ))}

      {/* Navigation Arrows 
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      */}

      {/* Dots Navigation */}
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
