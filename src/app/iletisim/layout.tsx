import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Av. Durdu Mehmet Şen Hukuk Bürosu iletişim bilgileri. İzmir Bayraklı'da ofisimiz, telefon ve e-posta bilgilerimiz.",
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    title: "İletişim | Av. Durdu Mehmet Şen",
    description:
      "Av. Durdu Mehmet Şen Hukuk Bürosu iletişim bilgileri. İzmir Bayraklı'da ofisimiz, telefon ve e-posta bilgilerimiz.",
    url: "/iletisim",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
