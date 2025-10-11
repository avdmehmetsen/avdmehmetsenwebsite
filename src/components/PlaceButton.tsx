// components/PlaceSearchButton.tsx
"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { colors } from "@/constants/colors";

type Props = {
  /** Google Maps'te aranacak ifade (işletme adı + opsiyonel adres) */
  query?: string;
  /** Buton metni */
  label?: string;
  /** Ek sınıflar (Tailwind) */
  className?: string;
};

const DEFAULT_QUERY = "Avukat Durdu Mehmet Şen";
const buildSearchUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function PlaceSearchButton({
  query = DEFAULT_QUERY,
  label = "Google Haritalar’da Ara",
  className,
}: Props) {
  const href = buildSearchUrl(query);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-1 font-semibold transition-all",
        "border-2 hover:-translate-y-0.5 hover:text-white",
        className
      )}
      style={{
        borderColor: colors.primary.main,
        color: colors.primary.main,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.main;
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = colors.primary.main;
      }}
      aria-label={`${query} için Google Haritalar'da arama yap`}
    >
      <MapPin className="w-4 h-4" />
      {label}
    </Link>
  );
}
