"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "./LandingPage";
import { useCurrency } from "./CurrencyProvider";
import FloorDetailModal from "./FloorDetailModal";

const floorsData = [
  { number: 21, pricePerSqm: 21000, grossSqm: 1550, netSqm: 1131, totalPrice: 32550000, parking: 8, zone: "Mid-High", badgeKey: "", sold: false, soldNote: "" },
  { number: 22, pricePerSqm: 21000, grossSqm: 1550, netSqm: 1131, totalPrice: 32550000, parking: 8, zone: "Mid-High", badgeKey: "", sold: false, soldNote: "" },
  { number: 24, pricePerSqm: 21000, grossSqm: 1550, netSqm: 1131, totalPrice: 32550000, parking: 8, zone: "Mid-High", badgeKey: "allElevators", sold: false, soldNote: "" },
  { number: 35, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, parking: 8, zone: "Premium High", badgeKey: "panoramic", sold: false, soldNote: "נותרו 2 יחידות" },
  { number: 33, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, parking: 8, zone: "Premium High", badgeKey: "", sold: true, soldNote: "" },
  { number: 37, pricePerSqm: 25000, grossSqm: 1700, netSqm: 1241, totalPrice: 42500000, parking: 8, zone: "Premium High", badgeKey: "panoramic", sold: false, soldNote: "נותרו 6 יחידות" },
];

function fmt(n: number) { return n.toLocaleString("en-US"); }

function TowerDiagram({ selectedFloor, onSelect }: { selectedFloor: number | null; onSelect: (n: number) => void }) {
  const { dict } = useI18n();
  const t = dict.floors;
  const available = [21, 22, 24, 33, 35, 37];
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-gray-400 mb-2 hidden md:block">{t.top}</div>
      <div className="hidden md:flex w-32 flex-col-reverse gap-[2px]">
        {Array.from({ length: 40 }, (_, i) => i + 1).map((f) => { const av = available.includes(f); const sel = selectedFloor === f; return <button key={f} onClick={() => av && onSelect(f)} className={`h-4 rounded-sm transition-all duration-200 ${sel ? "bg-gold scale-x-110 shadow-lg" : av ? "bg-gold/60 hover:bg-gold cursor-pointer hover:scale-x-105" : "bg-navy/15 cursor-default"}`} disabled={!av} />; })}
      </div>
      <div className="flex md:hidden flex-row flex-wrap gap-2 justify-center">
        {available.map((f) => { const sel = selectedFloor === f; return <button key={f} onClick={() => onSelect(f)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${sel ? "bg-gold text-navy shadow-lg scale-105" : "bg-gold/15 text-navy hover:bg-gold/30"}`}>{t.floor} {f}</button>; })}
      </div>
      <div className="text-xs text-gray-400 mt-2 hidden md:block">{t.bottom}</div>
      <div className="mt-3 hidden md:flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gold/60 inline-block" /> {t.available}</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-navy/15 inline-block" /> {t.sold}</span>
      </div>
    </div>
  );
}

export default function AvailableFloors() {
  const { dict } = useI18n();
  const { fmtPrice } = useCurrency();
  const t = dict.floors;
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [detailFloor, setDetailFloor] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 bg-white" id="floors">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-3xl md:text-4xl font-bold text-center text-navy mb-4">{t.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-500 mb-6 md:mb-12">{t.subtitle}</motion.p>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-center lg:sticky lg:top-24 w-full lg:w-auto"><TowerDiagram selectedFloor={selectedFloor} onSelect={setSelectedFloor} /></motion.div>
          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {floorsData.map((floor, i) => (
              <motion.div key={floor.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: Math.min(i * 0.08, 0.4) }} onClick={() => { if (!floor.sold && window.matchMedia("(min-width: 768px)").matches) { setSelectedFloor(floor.number); } else if (!floor.sold) { setDetailFloor(floor.number); } }} className={`floor-card flex flex-col h-full bg-white rounded-2xl p-6 shadow-md border-2 text-center relative overflow-hidden ${floor.sold ? "cursor-default opacity-75" : "cursor-pointer"} ${selectedFloor === floor.number ? "border-gold" : "border-transparent"}`}>

                {/* Sold diagonal ribbon */}
                {floor.sold && (
                  <>
                    <div className="absolute inset-0 bg-gray-900/40 rounded-2xl z-10" />
                    <div className="absolute top-6 -right-8 w-40 z-20 rotate-45 bg-red-600 text-white text-xs font-bold tracking-widest uppercase text-center py-1.5 shadow-lg">
                      נמכר
                    </div>
                  </>
                )}

                {/* Badge area — fixed min-height so all cards align */}
                <div className="flex items-center justify-center min-h-[32px] mb-3">
                  {floor.soldNote ? (
                    <div className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">{floor.soldNote}</div>
                  ) : floor.badgeKey ? (
                    <div className="bg-gold/10 text-gold-dark text-xs font-bold px-3 py-1 rounded-full">{t[floor.badgeKey as keyof typeof t]}</div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center mb-2 gap-1">
                  <h3 className="text-2xl font-bold text-navy">{t.floor} {floor.number}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${floor.zone === "Premium High" ? "bg-gold/20 text-gold-dark" : "bg-navy/10 text-navy"}`}>{floor.zone === "Premium High" ? t.premium : t.midHigh}</span>
                </div>
                <div className="bg-gold/8 border border-gold/20 rounded-xl px-4 py-3 mb-4">
                  <div className="text-xs text-gold-dark font-semibold uppercase tracking-wide mb-1">{t.fromUnit}</div>
                  <div className="text-2xl font-bold text-navy">{fmtPrice(floor.pricePerSqm)} <span className="text-sm font-normal text-gray-400">/ {dict.common.sqm}</span></div>
                  <div className="text-xs text-gray-500 mt-1">{t.unitRange}</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                  <div className="text-center"><span className="text-gray-400 text-xs">{t.gross}</span><div className="font-medium">{fmt(floor.grossSqm)} {dict.common.sqm}</div></div>
                  <div className="text-center"><span className="text-gray-400 text-xs">{t.parking}</span><div className="font-medium">{floor.parking} ({t.parkingExtra})</div></div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); if (!floor.sold) setDetailFloor(floor.number); }} disabled={floor.sold} className="mt-auto block w-full text-center bg-navy hover:bg-navy-light text-white text-sm font-medium py-3 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-default">{t.detailsFor} {floor.number}</button>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 rounded-2xl overflow-hidden shadow-2xl border border-white/10">

          {/* Header */}
          <div className="bg-navy px-6 md:px-10 py-8 flex flex-col items-center text-center gap-5">
            <h3 className="text-2xl font-bold text-white">{t.paymentTitle}</h3>
            <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-3 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/hapoalim.svg" alt="בנק הפועלים" className="h-8 w-auto" />
              <div className="w-px h-7 bg-gray-200" />
              <span className="text-gray-500 text-sm font-semibold">בנק מלווה רשמי</span>
            </div>
          </div>

          {/* Payment split — two columns */}
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-navy-light">
            <div className="px-10 py-10 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-6xl font-extrabold text-gold tracking-tight">30%</div>
                <div className="text-white/40 text-xs mt-1">בחתימת חוזה הרכישה</div>
              </div>
              <div className="text-white font-semibold">{t.atPurchase}</div>
            </div>
            <div className="px-10 py-10 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-6xl font-extrabold text-gold tracking-tight">70%</div>
                <div className="text-white/40 text-xs mt-1">2029–2030</div>
              </div>
              <div className="text-white font-semibold">{t.atDelivery}</div>
            </div>
          </div>

          {/* Trust strip — symmetric grid aligned under the two % columns */}
          <div className="bg-[#1a1e2e] grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center gap-2 px-8 py-5 text-center">
              <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-white/70 text-sm">ערבות בנקאית אישית לכל רוכש</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 px-8 py-5 text-center">
              <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-white/70 text-sm">ההשקעה מוגנת לאורך כל שלבי הבנייה</span>
            </div>
          </div>
        </motion.div>
      </div>
      {detailFloor && (
        <FloorDetailModal floorNumber={detailFloor} onClose={() => setDetailFloor(null)} />
      )}
    </section>
  );
}
