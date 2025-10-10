"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { colors } from "@/constants/colors";

type ArticleCardProps = {
  article: {
    id: string;
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    date: string;
    imageUrl?: string | null; // <<< opsiyonel kapak görseli
  };
  index: number;
  placeholderUrl?: string; // <<< sabit placeholder (varsayılan veriyoruz)
};

// next.config.ts'de tanımlı olan izin verilen hostlar
const ALLOWED_IMAGE_HOSTS = [
  "images.pexels.com",
  "unsplash.com",
  "images.unsplash.com",
  "pixabay.com",
  "cdn.pixabay.com",
];

// URL'nin geçerli ve izin verilen bir hostname'e sahip olup olmadığını kontrol et
function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    return ALLOWED_IMAGE_HOSTS.includes(urlObj.hostname);
  } catch {
    // Geçersiz URL formatı
    return false;
  }
}

export default function ArticleCard({
  article,
  index,
  placeholderUrl = "/images/article-placeholder.jpg",
}: ArticleCardProps) {
  // URL yükleme hatası için state
  const [imageError, setImageError] = useState(false);
  // Resim yüklenme durumu için state
  const [imageLoading, setImageLoading] = useState(true);

  // URL'nin geçerli olup olmadığını kontrol et (sadece bir kez hesapla)
  const isValidUrl = useMemo(
    () => isValidImageUrl(article.imageUrl),
    [article.imageUrl]
  );

  // Geçersiz URL'leri logla (development'ta faydalı)
  useEffect(() => {
    if (article.imageUrl && !isValidUrl) {
      console.warn(
        `Geçersiz resim URL'si, placeholder gösteriliyor: ${article.imageUrl}\n` +
          `İzin verilen hostlar: ${ALLOWED_IMAGE_HOSTS.join(", ")}`
      );
    }
  }, [article.imageUrl, isValidUrl]);

  // Resim varsa VE geçerli URL ise VE hata olmamışsa true
  const hasImage = isValidUrl && !imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/makaleler/${article.slug}`}>
        <Card
          className={cn(
            "group h-full rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur-sm",
            "shadow-sm transition-all duration-300",
            "hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
          )}
        >
          {/* Cover / Placeholder */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
            {hasImage ? (
              <>
                {/* Loading Skeleton */}
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </div>
                )}

                <Image
                  src={article.imageUrl as string}
                  alt={article.title}
                  fill
                  className={cn(
                    "object-cover transition-opacity duration-500",
                    imageLoading ? "opacity-0" : "opacity-100"
                  )}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  priority={false}
                  onLoad={() => {
                    // Resim başarıyla yüklendi
                    setImageLoading(false);
                  }}
                  onError={() => {
                    // Resim yüklenemezse placeholder'a geç
                    console.warn(
                      `Resim yüklenemedi, placeholder gösteriliyor: ${article.imageUrl}`
                    );
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
                {/* Hover'da hafif koyulaştırma */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            ) : (
              <>
                {/* SABİT placeholder */}
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url('${placeholderUrl}')` }}
                  aria-hidden
                />

                {/* Okunabilirlik için koyu katman */}
                <div className="absolute inset-0 bg-gray-900/70" aria-hidden />

                {/* İçerik - Flex ile yerleştirme */}
                {/* <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="text-center">
                    <h6
                      className="text-lg md:text-xl font-semibold drop-shadow-lg"
                      style={{ color: colors.primary.main }}
                    >
                      Av. Durdu Mehmet Şen
                    </h6>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-2">
                    <h6
                      className="text-center text-sm md:text-base  font-medium drop-shadow-md line-clamp-3"
                      style={{ color: colors.text.light }}
                    >
                      {article.title}
                    </h6>
                  </div>

                  <div className="text-center space-y-1">
                    <p
                      className="text-sm md:text-base font-semibold drop-shadow-lg"
                      style={{ color: colors.primary.main }}
                    >
                      www.avdurdumehmetsen.com
                    </p>
                    <p
                      className="text-xs md:text-sm font-medium drop-shadow-lg"
                      style={{ color: colors.primary.main }}
                    >
                      +90 (507) 736 82 55
                    </p>
                  </div>
                </div> */}
              </>
            )}
          </div>

          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-semibold"
                style={{
                  color: colors.primary.main,
                }}
              >
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.date}</span>
              </div>
            </div>

            {/* Başlığı burada da tutuyoruz (liste tutarlılığı için).
                İstersen görüntü olmayan kartlarda burayı gizleyebilirsin. */}
            <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
              {article.title}
            </CardTitle>
            {/*<CardTitle
              className={cn(
                "text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2",
                !hasImage && "sr-only" // resim yoksa başlığı header'da gizle
              )}
            >
              {article.title}
            </CardTitle>*/}

            <CardDescription className="text-slate-600 line-clamp-3">
              {article.excerpt}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium transition-all",
                "group-hover:gap-2"
              )}
              style={{ color: colors.primary.main }}
            >
              Devamını Oku
              <ArrowRight className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
