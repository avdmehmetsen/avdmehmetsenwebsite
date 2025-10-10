/**
 * Proje Renk Paleti
 */

export const colors = {
  // Ana Renkler
  primary: {
    main: "#cb8929", // Altın/Amber
    light: "#e5a645",
    dark: "#a67322",
    hover: "#b77a24",
  },

  // Arka Plan Renkleri
  background: {
    dark: "#0f172a", // slate-900
    medium: "#1e293b", // slate-800
    light: "#334155", // slate-700
    white: "#ffffff",
    gray: "#f9fafb", // gray-50
  },

  // Metin Renkleri
  text: {
    primary: "#0f172a", // slate-900
    secondary: "#475569", // slate-600
    tertiary: "#94a3b8", // slate-400
    light: "#e2e8f0", // slate-200
    white: "#ffffff",
  },

  // Durum Renkleri
  status: {
    success: "#10b981", // green-500
    error: "#ef4444", // red-500
    warning: "#f59e0b", // amber-500
    info: "#3b82f6", // blue-500
  },

  // Border Renkleri
  border: {
    light: "#e5e7eb", // gray-200
    medium: "#d1d5db", // gray-300
    dark: "#9ca3af", // gray-400
  },

  // Overlay Renkleri
  overlay: {
    dark: "rgba(15, 23, 42, 0.9)", // slate-900 with opacity
    medium: "rgba(15, 23, 42, 0.7)",
    light: "rgba(15, 23, 42, 0.5)",
  },

  // Green tonları
  theme2: {
    darkGreen: "#1B4332", // dark green
    mediumGreen: "#2D6A4F", // medium green
    lightGreen: "#40916C", // Açık yeşil (hover veya vurgu için)
    greenBackground: "#328E6E", // green background
    grayBackground: "#F8F9FA", // gray background
    goldenPrestige: "#C6A76E", // golden prestige
  },
};

// Tailwind CSS class isimleri
export const colorClasses = {
  primary: {
    bg: "bg-[#cb8929]",
    text: "text-[#cb8929]",
    border: "border-[#cb8929]",
    hover: {
      bg: "hover:bg-[#b77a24]",
      text: "hover:text-[#b77a24]",
      border: "hover:border-[#b77a24]",
    },
  },
  background: {
    dark: "bg-slate-900",
    medium: "bg-slate-800",
    light: "bg-slate-700",
  },
  text: {
    primary: "text-slate-900",
    secondary: "text-slate-600",
    light: "text-slate-400",
    white: "text-white",
  },
} as const;

export type ColorPalette = typeof colors;
export type ColorClasses = typeof colorClasses;
