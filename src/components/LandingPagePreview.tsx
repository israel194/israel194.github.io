"use client";

import { type Dictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n";
import { useState } from "react";
import { motion } from "framer-motion";

import { I18nCtx } from "./LandingPage";
import CurrencyProvider from "./CurrencyProvider";
import Navbar from "./Navbar";
import Hero from "./Hero";
import StatsBar from "./StatsBar";
import WhyGate from "./WhyGate";
import AvailableFloors from "./AvailableFloors";
import Gallery from "./Gallery";
import Location from "./Location";
import Developers from "./Developers";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import StickyMobileCTA from "./StickyMobileCTA";
import FloatingVideoButton from "./FloatingVideoButton";

function MiniAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-start gap-4">
        <span className="text-navy font-semibold text-sm">{q}</span>
        <svg className={`w-4 h-4 text-gold shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <p className="text-gray-600 text-sm pb-4 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function LandingPagePreview({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.faq;
  const top3 = [
    { q: t.q1, a: t.a1 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
  ];

  return (
    <I18nCtx.Provider value={{ dict, lang }}>
      <CurrencyProvider lang={lang}>

        {/* Preview banner */}
        <div className="fixed top-0 inset-x-0 z-[300] bg-gold text-navy text-center text-xs font-bold py-2 tracking-wide shadow-md">
          📐 הדמיית מבנה מוצע — preview בלבד &nbsp;|&nbsp;
          <a href="/he" className="underline">חזרה לאתר המקורי</a>
        </div>

        <main className="pt-8">
          <Navbar />
          <Hero />
          <StatsBar />
          <WhyGate />
          <AvailableFloors />
          <Gallery />
          <Location />
          <Developers />

          {/* Mini FAQ — 3 שאלות בלבד */}
          <section className="py-10 bg-warm-white">
            <div className="max-w-2xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-navy text-center mb-8"
              >
                {t.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl px-6 shadow-sm border border-navy/5"
              >
                {top3.map((item, i) => <MiniAccordion key={i} q={item.q} a={item.a} />)}
              </motion.div>
            </div>
          </section>

          <ContactForm />
          <Footer />
          <WhatsAppButton />
          <StickyMobileCTA />
          <FloatingVideoButton />
        </main>
      </CurrencyProvider>
    </I18nCtx.Provider>
  );
}
