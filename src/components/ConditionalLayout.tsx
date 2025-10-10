"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    // Admin sayfalarında sadece içerik
    return <main className="flex-grow">{children}</main>;
  }

  // Normal sayfalarda navbar ve footer
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
