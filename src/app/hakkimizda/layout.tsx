import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | İzmir Avukat - Av. Durdu Mehmet Şen",
  description:
    "İzmir avukat olarak hizmet veren Şen Hukuk Bürosu ve Av. Durdu Mehmet Şen hakkında detaylı bilgi. İzmir Bayraklı'da güvenilir ve profesyonel avukatlık hizmetleri.",
  keywords: [
    "izmir avukat",
    "bayraklı avukat",
    "izmir hukuk bürosu",
    "av durdu mehmet şen",
    "izmir avukat ofisi",
  ],
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    title: "Hakkımızda | İzmir Avukat - Av. Durdu Mehmet Şen",
    description:
      "İzmir avukat olarak hizmet veren Şen Hukuk Bürosu ve Av. Durdu Mehmet Şen hakkında detaylı bilgi. İzmir Bayraklı'da güvenilir ve profesyonel avukatlık hizmetleri.",
    url: "/hakkimizda",
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
