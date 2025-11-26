type ArticleJsonLdProps = {
  meta: {
    title: string;
    description?: string;
    imageUrl?: string;
    slug: string;
    author?: string;
    publishedAt?: string;
    modifiedAt?: string;
  };
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.avdurdumehmetsen.com.tr";

export default function ArticleJsonLd({ meta }: ArticleJsonLdProps) {
  const imageUrl =
    meta.imageUrl && !meta.imageUrl.startsWith("http")
      ? `${siteUrl}${meta.imageUrl}`
      : meta.imageUrl;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    image: imageUrl ? [imageUrl] : undefined,
    author: meta.author
      ? [
          {
            "@type": "Person",
            name: meta.author,
          },
        ]
      : undefined,
    datePublished: meta.publishedAt,
    dateModified: meta.modifiedAt ?? meta.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/makaleler/${meta.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

