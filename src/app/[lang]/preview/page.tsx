import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import LandingPagePreview from "@/components/LandingPagePreview";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <LandingPagePreview dict={dict} lang={lang as Locale} />;
}
