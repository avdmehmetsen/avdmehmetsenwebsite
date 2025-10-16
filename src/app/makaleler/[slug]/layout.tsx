import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Next.js 15'te params bir Promise
  const { slug } = await params;

  // Slug'ı temiz bir başlığa çevirelim (SEO için)
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,
    alternates: {
      canonical: `/makaleler/${slug}`,
    },
    openGraph: {
      url: `/makaleler/${slug}`,
      type: "article",
    },
  };
}

export default function MakaleDetayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
