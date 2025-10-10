"use client";

import { useMemo } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition"; // kendi hook'unu import et

export default function FloatingWhatsAppButton() {
  const { isScrolled } = useScrollPosition();

  const href = useMemo(() => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
    const base = `https://wa.me/${phone}`;
    const prefill =
      process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
      "Merhaba, uygun olduğunuz bir zamanda görüşme talep ediyorum.";
    const text = prefill;
    return `${base}?text=${encodeURIComponent(text)}`;
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3 shadow-lg bg-[#25D366] hover:opacity-90 transition-all duration-300 ${
        isScrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* WhatsApp logosu */}
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white" aria-hidden>
        <path d="M19.11 17.49c-.26-.13-1.52-.75-1.76-.84-.24-.09-.41-.13-.59.13-.17.26-.68.84-.83 1.01-.15.17-.31.19-.57.06-.26-.13-1.09-.4-2.07-1.28-.76-.68-1.27-1.52-1.42-1.77-.15-.26-.02-.4.11-.53.11-.11.26-.28.39-.43.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45l-.5-.01c-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.81 2.76 4.38 3.87.61.26 1.08.41 1.45.52.61.19 1.16.16 1.6.1.49-.07 1.52-.62 1.74-1.22.21-.6.21-1.11.15-1.22-.06-.11-.24-.17-.5-.3zM16.02 28c-2.09 0-4.05-.56-5.78-1.53L6 26l.58-4.13A11.93 11.93 0 0 1 4 16c0-6.63 5.39-12 12.02-12 3.21 0 6.22 1.25 8.49 3.52A11.88 11.88 0 0 1 28 16c0 6.63-5.39 12-11.98 12zm-5.19-3.25c1.53.9 3.28 1.38 5.19 1.38 5.45 0 9.89-4.42 9.89-9.88 0-2.64-1.03-5.12-2.9-6.98A9.86 9.86 0 0 0 16.02 6C10.56 6 6.15 10.42 6.15 15.88c0 1.73.46 3.42 1.33 4.9l-.88 3.1 3.23-.13z" />
      </svg>
      <span className="text-white font-medium hidden sm:inline">WhatsApp</span>
    </a>
  );
}
