import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetim Paneli | Av. Durdu Mehmet Şen",
  description: "Admin yönetim paneli",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
