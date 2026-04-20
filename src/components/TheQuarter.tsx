"use client";

import { motion } from "framer-motion";
import { useI18n } from "./LandingPage";
import { renderGoldTitle } from "@/lib/renderGoldTitle";

export default function TheQuarter() {
  const { dict } = useI18n();
  const t = dict.quarter;

  const stats = [
    {
      value: t.stat3Value, unit: t.stat3Unit, label: t.stat3Label,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      value: t.stat4Value, unit: t.stat4Unit, label: t.stat4Label,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      value: t.stat5Value, unit: t.stat5Unit, label: t.stat5Label,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      value: t.stat6Value, unit: t.stat6Unit, label: t.stat6Label,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-navy text-white" id="quarter">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          {renderGoldTitle(t.title)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/70 max-w-3xl mx-auto mb-10 text-lg"
        >
          {t.subtitle}
        </motion.p>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-10"
        >
          <p className="text-white/80 text-lg leading-relaxed text-center">
            {t.description}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-gradient-to-b from-white/8 to-white/3 border border-gold/20 rounded-2xl p-6 text-center hover:border-gold/50 hover:from-white/12 transition-all duration-300 group"
            >
              <div className="flex justify-center mb-3 text-gold/60 group-hover:text-gold transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gold leading-none">
                {stat.value}
              </div>
              <div className="text-xs text-gold/60 font-semibold uppercase tracking-widest mt-1">
                {stat.unit}
              </div>
              <div className="text-xs text-white/50 mt-2 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Why the city promotes it + What's planned */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-gold mb-4">{t.whyTitle}</h3>
            <p className="text-white/70 leading-relaxed">{t.whyDesc}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-gold mb-4">{t.planned}</h3>
            <p className="text-white/70 leading-relaxed">{t.plannedDesc}</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
