"use client";

import { motion } from "framer-motion";
import { useI18n } from "./LandingPage";

export default function Grants() {
  const { dict } = useI18n();
  const t = dict.grants;
  const grants = [
    { amount: t.grant1, label: t.grant1Desc },
    { amount: t.grant2, label: t.grant2Desc },
    { amount: t.grant3, label: t.grant3Desc },
    { amount: t.grant4, label: t.grant4Desc },
  ];

  return (
    <section className="py-12 md:py-16 bg-navy" id="grants">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-3xl md:text-4xl font-bold text-center text-white mb-4">{t.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-white/60 mb-8">{t.subtitle}</motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {grants.map((g, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-3">{g.amount}</div>
              <p className="text-white/70 text-sm">{g.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="mt-8"><a href="#contact" className="inline-block bg-gold hover:bg-gold-light text-navy font-bold text-lg px-10 py-4 rounded-lg transition-colors duration-300">{t.ctaButton}</a></div>
        </motion.div>
      </div>
    </section>
  );
}
