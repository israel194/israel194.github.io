"use client";

import { motion } from "framer-motion";
import { useI18n } from "./LandingPage";

export default function Developers() {
  const { dict } = useI18n();
  const t = dict.developers;
  const devs = [
    { name: "B.S.R Group", logo: "/logos/bsr.png", logoBg: "bg-navy", role: t.roleDeveloper },
    { name: "JTLV Fund", logo: "/logos/jtlv.png", logoBg: "bg-white border border-gray-200", role: t.roleInvestor },
    { name: "Yehuda Rahamim", logo: null, logoBg: "", role: t.roleContractor },
    { name: "BLK Architects", logo: "/logos/blk.png", logoBg: "bg-white border border-gray-200", role: t.architect },
    { name: "Bank Hapoalim", logo: "/logos/hapoalim.svg", logoBg: "bg-white border border-gray-200", role: t.bankBadge },
  ];

  return (
    <section className="py-10 md:py-16 bg-navy" id="developers">
      <div className="max-w-6xl mx-auto px-4">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-white/40 text-xs uppercase tracking-widest mb-6">{t.title}</motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {devs.map((dev, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.08 }} className="bg-gray-light rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <div className="h-12 flex items-center justify-center mb-3">
                {dev.logo ? (
                  <div className={`${dev.logoBg} rounded-lg h-12 w-full max-w-[140px] flex items-center justify-center px-3`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={dev.logo} alt={dev.name} className="max-h-8 max-w-full object-contain" />
                  </div>
                ) : (
                  <div className="bg-navy rounded-lg h-12 w-full max-w-[140px] flex items-center justify-center px-3">
                    <span className="text-white text-xs font-bold tracking-wide">{dev.name}</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 font-medium">{dev.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
