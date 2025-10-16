import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Makaleler",
  description:
    "Hukuk dünyasından güncel yazılar, analizler ve yorumlar. Ceza, Ticaret, Aile ve İş Hukuku hakkında bilgilendirici makaleler.",
  alternates: {
    canonical: "/makaleler",
  },
  openGraph: {
    title: "Makaleler | Av. Durdu Mehmet Şen",
    description:
      "Hukuk dünyasından güncel yazılar, analizler ve yorumlar. Ceza, Ticaret, Aile ve İş Hukuku hakkında bilgilendirici makaleler.",
    url: "/makaleler",
  },
};

export default function MakalelerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
