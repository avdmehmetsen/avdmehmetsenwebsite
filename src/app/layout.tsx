import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Av. Durdu Mehmet Şen | Hukuk Bürosu",
  description:
    "Profesyonel hukuki danışmanlık ve avukatlık hizmetleri. Uzman kadromuzla yanınızdayız.",
  keywords: "avukat, hukuk bürosu, hukuki danışmanlık, Durdu Mehmet Şen",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
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
