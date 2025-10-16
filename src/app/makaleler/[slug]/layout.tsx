import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Slug'ı temiz bir başlığa çevirelim (SEO için)
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,
    alternates: {
      canonical: `/makaleler/${params.slug}`,
    },
    openGraph: {
      url: `/makaleler/${params.slug}`,
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
