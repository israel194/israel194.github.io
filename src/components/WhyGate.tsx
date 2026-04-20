"use client";

import { motion } from "framer-motion";
import { useI18n } from "./LandingPage";
import { renderGoldTitle } from "@/lib/renderGoldTitle";

export default function WhyGate() {
  const { dict } = useI18n();
  const t = dict.why;
  const reasons = [
    { title: t.location, description: t.locationDesc, featured: false, icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { title: t.transport, description: t.transportDesc, featured: true, icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
    { title: t.business, description: t.businessDesc, featured: false, icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  ];

  return (
    <section className="py-12 md:py-16 bg-warm-white" id="why">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-3xl md:text-4xl font-bold text-center text-navy mb-10">
          {renderGoldTitle(t.title)}
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {reasons.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.15 }} className={`rounded-2xl p-8 text-center transition-shadow duration-300 ${r.featured ? "bg-navy text-white shadow-xl ring-1 ring-gold/30 md:scale-[1.03]" : "bg-gray-light hover:shadow-lg"}`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${r.featured ? "bg-gold text-navy" : "bg-navy text-gold"}`}>{r.icon}</div>
              <h3 className={`text-xl font-bold mb-4 ${r.featured ? "text-white" : "text-navy"}`}>{r.title}</h3>
              <p className={`leading-relaxed ${r.featured ? "text-white/80" : "text-gray-600"}`}>{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
