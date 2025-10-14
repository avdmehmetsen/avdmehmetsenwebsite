"use client";

/**
 * Schema.org JSON-LD Structured Data Component
 * SEO için zengin snippet'ler sağlar
 */

import { useEffect, useState } from "react";
import { getContactInfo } from "@/services/contactInfoService";
import { ContactInfo } from "@/types";

export default function StructuredData() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await getContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error("Error loading contact info:", error);
      }
    };
    loadContactInfo();
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": "https://avdmehmetsen.vercel.app/#organization",
    name: "Av. Durdu Mehmet Şen - Hukuk Bürosu",
    alternateName: "Şen Hukuk Bürosu",
    url: "https://avdmehmetsen.vercel.app",
    logo: "https://avdmehmetsen.vercel.app/images/logo.png",
    image: "https://avdmehmetsen.vercel.app/images/logo.png",
    description:
      "İzmir Bayraklı'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri. Ceza, Ticaret, Aile, İş Hukuku ve daha fazlası.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        contactInfo?.address ||
        "Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4. Halil Atilla Sitesi No:233 C Blok K:5 D:9",
      addressLocality: "Bayraklı",
      addressRegion: "İzmir",
      postalCode: "35000",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contactInfo?.latitude || "38.4652783",
      longitude: contactInfo?.longitude || "27.1906063",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone:
        contactInfo?.phone
          .replace(/\s/g, "")
          .replace(/[()]/g, "")
          .replace(/^(\+90)/, "$1-") || "+90-507-736-82-51",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
    telephone:
      contactInfo?.phone
        .replace(/\s/g, "")
        .replace(/[()]/g, "")
        .replace(/^(\+90)/, "$1-") || "+90-507-736-82-51",
    email: contactInfo?.email || "dmehmetsen@gmail.com",
    founder: {
      "@type": "Person",
      name: "Durdu Mehmet Şen",
      jobTitle: "Avukat",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "İzmir",
    },
    serviceType: [
      "Ceza Hukuku",
      "Ticaret Hukuku",
      "Aile Hukuku",
      "İş Hukuku",
      "Gayrimenkul Hukuku",
      "Miras Hukuku",
      "Medeni Hukuk",
      "Borçlar Hukuku",
      "İdare Hukuku",
      "Vergi Hukuku",
      "Sigorta Hukuku",
      "Bilişim Hukuku",
      "Tüketici Hukuku",
    ],
    sameAs: [
      // Sosyal medya hesapları eklenebilir
      // "https://www.linkedin.com/...",
      // "https://twitter.com/...",
      // "https://www.instagram.com/...",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
