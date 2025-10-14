"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";
import { useAuth } from "@/contexts/AuthContext";
import { getSiteSettings } from "@/services/siteSettingsService";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAdminPage = pathname?.startsWith("/admin");
  const isMaintenancePage = pathname === "/maintenance";

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const settings = await getSiteSettings();
        setIsMaintenanceMode(settings?.isMaintenanceMode || false);
      } catch (error) {
        console.error("Error checking maintenance mode:", error);
      } finally {
        setLoading(false);
      }
    };

    checkMaintenanceMode();
  }, [pathname]);

  // Bakım modu kontrolü
  useEffect(() => {
    if (!loading && !isAdminPage && !isMaintenancePage && !user) {
      if (isMaintenanceMode) {
        router.push("/maintenance");
      }
    }
  }, [
    loading,
    isMaintenanceMode,
    isAdminPage,
    isMaintenancePage,
    user,
    router,
  ]);

  if (isAdminPage) {
    // Admin sayfalarında sadece içerik
    return <main className="flex-grow">{children}</main>;
  }

  // Bakım modu sayfasında layout yok
  if (isMaintenancePage) {
    return <main className="flex-grow">{children}</main>;
  }

  // Loading durumu
  if (loading && !user) {
    return (
      <main className="flex-grow flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </main>
    );
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
