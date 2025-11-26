import type { Metadata } from "next";
import { getArticlesByTag } from "@/services/articleService";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.avdurdumehmetsen.com.tr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  // Decode tag slug to readable name (capitalize first letter of each word)
  const displayTag = decodeURIComponent(tag)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `#${displayTag} Etiketi - Makaleler`;
  const description = `#${displayTag} etiketiyle işaretlenmiş makaleler.`;
  const url = `${siteUrl}/makaleler/etiket/${tag}`;

  // Check article count for robots directive
  const articles = await getArticlesByTag(tag);
  const shouldNoIndex = !articles || articles.length < 2;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title,
      description,
      type: "website",
    },
    robots: shouldNoIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export default function TagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

