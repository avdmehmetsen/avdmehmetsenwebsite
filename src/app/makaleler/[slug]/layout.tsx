import type { Metadata } from "next";
import { getArticleMetaBySlug } from "@/services/articleService";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.avdurdumehmetsen.com.tr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getArticleMetaBySlug(slug).catch(() => null);

  const title = meta?.title ?? "Makale";
  const description =
    meta?.description ??
    "Av. Durdu Mehmet Şen – iş hukuku, aile hukuku ve diğer alanlarda bilgilendirici makaleler.";
  const canonical = `${siteUrl}/makaleler/${meta?.slug ?? slug}`;
  const ogImage = meta?.imageUrl || `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage }],
      authors: meta?.author ? [meta.author] : undefined,
      publishedTime: meta?.publishedAt,
      modifiedTime: meta?.modifiedAt ?? meta?.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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
