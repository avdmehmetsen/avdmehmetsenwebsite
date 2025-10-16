import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uzmanlık Alanları",
  description:
    "Ceza, Ticaret, Aile, İş Hukuku ve daha fazlası. Av. Durdu Mehmet Şen'in uzmanlık alanları ve sunduğu hukuki hizmetler.",
  alternates: {
    canonical: "/uzmanlik-alanlari",
  },
  openGraph: {
    title: "Uzmanlık Alanları | Av. Durdu Mehmet Şen",
    description:
      "Ceza, Ticaret, Aile, İş Hukuku ve daha fazlası. Av. Durdu Mehmet Şen'in uzmanlık alanları ve sunduğu hukuki hizmetler.",
    url: "/uzmanlik-alanlari",
  },
};

export default function UzmanlikAlanlariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
