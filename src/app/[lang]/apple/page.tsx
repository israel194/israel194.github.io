import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import LandingPageApple from "@/components/LandingPageApple";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function ApplePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <LandingPageApple dict={dict} lang={lang as Locale} />;
}
