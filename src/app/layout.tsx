import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avdmehmetsen.vercel.app"),
  title: {
    default: "Av. Durdu Mehmet Şen | Hukuk Bürosu - İzmir",
    template: "%s | Av. Durdu Mehmet Şen",
  },
  description:
    "İzmir Bayraklı'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri. Ceza, Ticaret, Aile, İş Hukuku ve daha fazlası.",
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
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://avdmehmetsen.vercel.app",
    siteName: "Av. Durdu Mehmet Şen | Hukuk Bürosu",
    title: "Av. Durdu Mehmet Şen | Hukuk Bürosu - İzmir",
    description:
      "İzmir Bayraklı'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri. Ceza, Ticaret, Aile, İş Hukuku ve daha fazlası.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Av. Durdu Mehmet Şen - Hukuk Bürosu Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Av. Durdu Mehmet Şen | Hukuk Bürosu - İzmir",
    description:
      "İzmir Bayraklı'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri.",
    images: ["/images/logo.png"],
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
      </body>
    </html>
  );
}
