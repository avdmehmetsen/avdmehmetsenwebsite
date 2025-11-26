import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.avdurdumehmetsen.com.tr"),
  title: {
    default: "İzmir Avukat | Av. Durdu Mehmet Şen - Hukuk Bürosu",
    template: "%s | İzmir Avukat - Av. Durdu Mehmet Şen",
  },
  description:
    "İzmir avukat olarak Bayraklı'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri sunuyoruz. İzmir'de Ceza, Ticaret, Aile, İş Hukuku ve daha fazlası alanlarında avukat hizmeti veriyoruz.",
  keywords: [
    "avukat",
    "izmir avukat",
    "bayraklı avukat",
    "hukuk bürosu",
    "hukuki danışmanlık",
    "Durdu Mehmet Şen",
    "ceza avukatı",
    "ticaret avukatı",
    "aile avukatı",
    "boşanma avukatı",
    "iş avukatı",
    "gayrimenkul avukatı",
  ],
  authors: [{ name: "Av. Durdu Mehmet Şen" }],
  creator: "Av. Durdu Mehmet Şen",
  publisher: "Şen Hukuk Bürosu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Zenginleştirilmiş favicon yapılandırması
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" }, // Modern tarayıcılar için SVG
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  // Canonical URL - Duplicate content'i önler
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.avdurdumehmetsen.com.tr",
    siteName: "İzmir Avukat | Av. Durdu Mehmet Şen - Hukuk Bürosu",
    title: "İzmir Avukat | Av. Durdu Mehmet Şen - Hukuk Bürosu",
    description:
      "İzmir avukat olarak Bayraklı'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri sunuyoruz. İzmir'de Ceza, Ticaret, Aile, İş Hukuku ve daha fazlası alanlarında avukat hizmeti veriyoruz.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Av. Durdu Mehmet Şen - Hukuk Bürosu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İzmir Avukat | Av. Durdu Mehmet Şen - Hukuk Bürosu",
    description:
      "İzmir avukat olarak Bayraklı'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri sunuyoruz.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification eklenebilir
    // google: 'your-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ClientProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
