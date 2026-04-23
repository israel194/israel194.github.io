import { notFound } from "next/navigation";
import { locales, dirMap, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://israel194.github.io/gate";

const metadataMap: Record<Locale, Metadata> = {
  he: {
    title: "GATE ירושלים — קומות משרדים למכירה במגדל 40 קומות בכניסה לעיר",
    description:
      "5 קומות משרדים אחרונות למכירה במגדל GATE בכניסה לירושלים. 1,550-1,700 מ״ר, חניון, תקן LEED, 32 דק׳ מתל אביב.",
    alternates: {
      canonical: `${SITE_URL}/he`,
    },
    openGraph: {
      title: "GATE ירושלים — 5 קומות משרדים אחרונות למכירה",
      description:
        "מגדל 40 קומות בכניסה לירושלים. 1,550-1,700 מ״ר, תקן LEED, 13 מעליות, 32 דק׳ מתל אביב. תנאי תשלום 30/70.",
      url: `${SITE_URL}/he`,
      siteName: "GATE Jerusalem",
      locale: "he_IL",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`,
          width: 1200,
          height: 630,
          alt: "GATE Jerusalem — מגדל משרדים 40 קומות",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GATE ירושלים — 5 קומות משרדים אחרונות למכירה",
      description:
        "מגדל 40 קומות בכניסה לירושלים. 1,550-1,700 מ״ר, תקן LEED, 32 דק׳ מתל אביב.",
      images: [`${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`],
    },
  },
  en: {
    title: "GATE Jerusalem — Office Floors for Sale in 40-Story Tower",
    description:
      "5 last office floors for sale in GATE Tower at Jerusalem's entrance. 1,550-1,700 sqm, LEED certified, 32 min to Tel Aviv.",
    alternates: {
      canonical: `${SITE_URL}/en`,
      languages: {
        he: `${SITE_URL}/he`,
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
        "x-default": `${SITE_URL}/he`,
      },
    },
    openGraph: {
      title: "GATE Jerusalem — Last 5 Office Floors for Sale",
      description:
        "40-story tower at Jerusalem's entrance. 1,550-1,700 sqm, LEED certified, 13 elevators, 32 min to Tel Aviv. 30/70 payment terms.",
      url: `${SITE_URL}/en`,
      siteName: "GATE Jerusalem",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`,
          width: 1200,
          height: 630,
          alt: "GATE Jerusalem — 40-Story Office Tower",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GATE Jerusalem — Last 5 Office Floors for Sale",
      description:
        "40-story tower at Jerusalem's entrance. 1,550-1,700 sqm, LEED certified, 32 min to Tel Aviv.",
      images: [`${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`],
    },
  },
  ar: {
    title: "GATE القدس — طوابق مكاتب للبيع في برج 40 طابقاً",
    description:
      "5 طوابق مكاتب أخيرة للبيع في برج GATE عند مدخل القدس. 1,550-1,700 م²، شهادة LEED، 32 دقيقة لتل أبيب.",
    alternates: {
      canonical: `${SITE_URL}/ar`,
      languages: {
        he: `${SITE_URL}/he`,
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
        "x-default": `${SITE_URL}/he`,
      },
    },
    openGraph: {
      title: "GATE القدس — آخر 5 طوابق مكاتب للبيع",
      description:
        "برج 40 طابقاً عند مدخل القدس. 1,550-1,700 م²، شهادة LEED، 13 مصعداً، 32 دقيقة لتل أبيب. شروط دفع 30/70.",
      url: `${SITE_URL}/ar`,
      siteName: "GATE Jerusalem",
      locale: "ar_AE",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`,
          width: 1200,
          height: 630,
          alt: "GATE القدس — برج مكاتب 40 طابقاً",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GATE القدس — آخر 5 طوابق مكاتب للبيع",
      description:
        "برج 40 طابقاً عند مدخل القدس. 1,550-1,700 م²، شهادة LEED، 32 دقيقة لتل أبيب.",
      images: [`${SITE_URL}/images/Gate_v1_hi-res_0821.jpg`],
    },
  },
};

export async function generateStaticParams() {
  return [{ lang: "he" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metadataMap[lang as Locale] || metadataMap.he;
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dir = dirMap[locale];

  return (
    <div lang={locale} dir={dir} className="min-h-full flex flex-col">
      {children}
    </div>
  );
}
