import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Şen Hukuk Bürosu ve Av. Durdu Mehmet Şen hakkında detaylı bilgi. İzmir Bayraklı'da güvenilir ve profesyonel hukuki danışmanlık.",
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    title: "Hakkımızda | Av. Durdu Mehmet Şen",
    description:
      "Şen Hukuk Bürosu ve Av. Durdu Mehmet Şen hakkında detaylı bilgi. İzmir Bayraklı'da güvenilir ve profesyonel hukuki danışmanlık.",
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
