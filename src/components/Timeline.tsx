"use client";

import { motion } from "framer-motion";
import { useI18n } from "./LandingPage";

export default function Timeline() {
  const { dict } = useI18n();
  const t = dict.timeline;
  const milestones = [
    { year: "2022", event: t.m1, done: true },
    { year: "2023", event: t.m2, done: true },
    { year: "2025", event: t.m3, done: true },
    { year: "2027", event: t.m4, done: false },
    { year: "2029-30", event: t.m5, done: false },
  ];

  return (
    <section className="py-10 md:py-16 bg-warm-white" id="timeline">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-2xl md:text-3xl font-bold text-center text-navy mb-12">{t.title}</motion.h2>
        <div className="relative">
          <div className="absolute top-5 right-0 left-0 h-0.5 bg-gray-200 hidden md:block" />
          <div className="flex flex-col sm:grid sm:grid-cols-5 gap-6 md:gap-4">
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="text-center relative">
                <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${m.done ? "bg-gold text-navy" : "bg-gray-200 text-gray-400"}`}>
                  {m.done ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />}
                </div>
                <div className={`text-lg font-bold ${m.done ? "text-navy" : "text-gray-400"}`}>{m.year}</div>
                <div className={`text-xs mt-1 ${m.done ? "text-gray-600" : "text-gray-400"}`}>{m.event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
