"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "./LandingPage";
import { useCurrency } from "./CurrencyProvider";
import FloorDetailModal from "./FloorDetailModal";
import TabuIcon from "./TabuIcon";

const floorsData = [
  { number: 21, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, parking: 8, zone: "Mid-High", badgeKey: "" },
  { number: 22, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, parking: 8, zone: "Mid-High", badgeKey: "" },
  { number: 24, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, parking: 8, zone: "Mid-High", badgeKey: "allElevators" },
  { number: 35, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, parking: 8, zone: "Premium High", badgeKey: "panoramic" },
  { number: 37, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, parking: 8, zone: "Premium High", badgeKey: "panoramic" },
];

function fmt(n: number) { return n.toLocaleString("en-US"); }

function TowerDiagram({ selectedFloor, onSelect }: { selectedFloor: number | null; onSelect: (n: number) => void }) {
  const { dict } = useI18n();
  const t = dict.floors;
  const available = [21, 22, 24, 35, 37];
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
          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {floorsData.map((floor, i) => (
              <motion.div key={floor.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: Math.min(i * 0.08, 0.4) }} onClick={() => { if (window.matchMedia("(min-width: 768px)").matches) { setSelectedFloor(floor.number); } else { setDetailFloor(floor.number); } }} className={`floor-card cursor-pointer bg-white rounded-2xl p-6 shadow-md border-2 text-center ${selectedFloor === floor.number ? "border-gold" : "border-transparent"}`}>
                {floor.badgeKey && <div className="bg-gold/10 text-gold-dark text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">{t[floor.badgeKey as keyof typeof t]}</div>}
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
                <div className="bg-navy/5 rounded-lg px-3 py-2 mb-4 flex items-center justify-center gap-2">
                  <TabuIcon className="w-4 h-4 text-gold-dark shrink-0" />
                  <span className="text-xs text-navy/70 font-medium">{t.tabuNote}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setDetailFloor(floor.number); }} className="block w-full text-center bg-navy hover:bg-navy-light text-white text-sm font-medium py-3 rounded-lg transition-colors">{t.detailsFor} {floor.number}</button>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 bg-navy rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6 text-gold">{t.paymentTitle}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-gold">30%</div><div className="text-white/70 text-sm mt-1">{t.atPurchase}</div></div>
            <div><div className="text-3xl font-bold text-gold">70%</div><div className="text-white/70 text-sm mt-1">{t.atDelivery}</div></div>
            <div><div className="text-3xl font-bold text-gold">{fmtPrice(250000)}</div><div className="text-white/70 text-sm mt-1">{t.perParking}</div></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div><div className="flex justify-center mb-2"><img src="/logos/hapoalim.svg" alt="Bank Hapoalim" className="h-5 w-auto brightness-0 invert" /></div><div className="text-white/70 text-sm mt-1">{t.lendingBank}</div></div>
          </div>
        </motion.div>
      </div>
      {detailFloor && (
        <FloorDetailModal floorNumber={detailFloor} onClose={() => setDetailFloor(null)} />
      )}
    </section>
  );
}
