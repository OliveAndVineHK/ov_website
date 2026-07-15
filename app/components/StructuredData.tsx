const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oliveandvinehk.com";

const siteUrl = baseUrl.replace(/\/$/, "");

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Olive & Vine",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: "Olive & Vine provides accounting and advisory solutions to businesses in Hong Kong.",
  email: "contact@oliveandvinehk.com",
  telephone: "+852 6042 3884",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Room 580, Level 5, K11 Atelier, 728 King's Road, Quarry Bay",
    addressLocality: "Hong Kong",
    addressCountry: "HK",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Olive & Vine",
  url: siteUrl,
  description: "Olive & Vine provides accounting and advisory solutions to businesses in Hong Kong.",
  publisher: {
    "@type": "Organization",
    name: "Olive & Vine",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
  },
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
