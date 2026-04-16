import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import LandingPage from "@/components/LandingPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://za-cpa.com";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function StructuredData({ dict, lang }: { dict: Awaited<ReturnType<typeof getDictionary>>; lang: Locale }) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "GATE Jerusalem",
    description: dict.hero.subtitle1 + " " + dict.hero.subtitle2,
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`,
    telephone: "+972-2-500-0275",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shazar Boulevard, Jerusalem Entrance",
      addressLocality: "Jerusalem",
      addressCountry: "IL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.789,
      longitude: 35.198,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GATE Jerusalem",
    url: `${SITE_URL}`,
    logo: `${SITE_URL}/logos/bsr.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+972-2-500-0275",
      contactType: "sales",
      availableLanguage: ["Hebrew", "English", "Arabic"],
    },
    sameAs: [],
  };

  const offersData = [
    { floor: 21, gross: 1550, net: 1131, price: 31775000, priceSqm: 20500 },
    { floor: 22, gross: 1550, net: 1131, price: 31775000, priceSqm: 20500 },
    { floor: 24, gross: 1550, net: 1131, price: 31775000, priceSqm: 20500 },
    { floor: 35, gross: 1700, net: 1241, price: 39950000, priceSqm: 23500 },
    { floor: 37, gross: 1700, net: 1241, price: 39950000, priceSqm: 23500 },
  ];

  const realEstateListings = offersData.map((f) => ({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${dict.floors.floor} ${f.floor} — GATE Jerusalem`,
    description: `${f.gross} ${dict.common.sqm} ${dict.floors.gross}, ~${f.net} ${dict.common.sqm} ${dict.floors.net}. ${dict.floors.parking}: 8.`,
    url: `${SITE_URL}/${lang}#floors`,
    image: `${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`,
    offers: {
      "@type": "Offer",
      price: f.price,
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {realEstateListings.map((listing, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listing) }}
        />
      ))}
    </>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <StructuredData dict={dict} lang={locale} />
      <LandingPage dict={dict} lang={locale} />
    </>
  );
}
