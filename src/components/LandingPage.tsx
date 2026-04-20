"use client";

import { type Dictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n";
import { createContext, useContext } from "react";

import CurrencyProvider from "./CurrencyProvider";
import Navbar from "./Navbar";
import Hero from "./Hero";
import StatsBar from "./StatsBar";
import WhyGate from "./WhyGate";
import TheQuarter from "./TheQuarter";
import AvailableFloors from "./AvailableFloors";
import Gallery from "./Gallery";
import Features from "./Features";
import Location from "./Location";
import Timeline from "./Timeline";
import Developers from "./Developers";
import TrustBar from "./TrustBar";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import StickyMobileCTA from "./StickyMobileCTA";
import LanguageSwitcher from "./LanguageSwitcher";
import AccessibilityWidget from "./AccessibilityWidget";
import CommitteeVideo from "./CommitteeVideo";
import FloatingVideoButton from "./FloatingVideoButton";
import CookieBanner from "./CookieBanner";

interface I18nContext {
  dict: Dictionary;
  lang: Locale;
}

export const I18nCtx = createContext<I18nContext>(null!);

export function useI18n() {
  return useContext(I18nCtx);
}

export default function LandingPage({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <I18nCtx.Provider value={{ dict, lang }}>
      <CurrencyProvider lang={lang}>
        <main>
          <LanguageSwitcher />
          <Navbar />
          <Hero />
          <StatsBar />
          <WhyGate />
          <TheQuarter />
          <Features />
          <AvailableFloors />
          <Gallery />
          <Location />
          <Timeline />
          <Developers />
          <TrustBar />
          <ContactForm />
          <FAQ />
          <CommitteeVideo />
          <Footer />
          <WhatsAppButton />
          <FloatingVideoButton />
          <StickyMobileCTA />
          <AccessibilityWidget />
          <CookieBanner />
        </main>
      </CurrencyProvider>
    </I18nCtx.Provider>
  );
}
