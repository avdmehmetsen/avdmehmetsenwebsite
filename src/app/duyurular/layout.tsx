import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duyurular",
  description:
    "Şen Hukuk Bürosu'ndan güncel duyurular ve haberler. Hukuk alanındaki önemli gelişmeler ve büro duyuruları.",
  alternates: {
    canonical: "/duyurular",
  },
  openGraph: {
    title: "Duyurular | Av. Durdu Mehmet Şen",
    description:
      "Şen Hukuk Bürosu'ndan güncel duyurular ve haberler. Hukuk alanındaki önemli gelişmeler ve büro duyuruları.",
    url: "/duyurular",
  },
};

export default function DuyurularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
