"use client";

import { motion } from "framer-motion";
import { useI18n } from "./LandingPage";

export default function TrustBar() {
  const { dict } = useI18n();
  const t = dict.trust;

  const items = [
    { label: t.years,    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: t.projects, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { label: t.sales,    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
    { label: t.leed,     icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  ];

  return (
    <section className="bg-champagne border-y border-navy/8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-0 divide-x divide-x-reverse divide-navy/10"
        >
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-navy/65 px-5 md:px-8 py-5">
              <span className="text-gold">{item.icon}</span>
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">{item.label}</span>
            </div>
          ))}

          {/* Hapoalim — prominent, separated */}
          <div className="flex items-center gap-3 px-5 md:px-8 py-4">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-navy/8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/hapoalim.svg" alt="בנק הפועלים" className="h-6 w-auto" />
              <span className="text-xs text-gray-400 font-medium hidden md:inline">בנק מלווה</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
