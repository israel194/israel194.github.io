"use client";

import { type Dictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { I18nCtx } from "./LandingPage";
import CurrencyProvider from "./CurrencyProvider";
import { useCurrency } from "./CurrencyProvider";
import FloatingVideoButton from "./FloatingVideoButton";
import FloorDetailModal from "./FloorDetailModal";

/* ─── Apple tokens ─────────────────────────────────────── */
// bg: #fff / #f5f5f7   text: #1d1d1f   secondary: #6e6e73
// accent (gold): #9a7940   cta-blue: #0066cc

const YOUTUBE_ID  = "pkOtGPrMGlU";
const HERO_IMAGES = [
  "/images/Gate_v1_hi-res_0821.jpg",
  "/images/Gate_v10_hi-res_0821.jpg",
  "/images/Gate_v5_hi-res_0904-副本-1.jpg",
  "/images/Gate_v4__hi-res_0821.jpg",
  "/images/Gate_0115-.jpg",
];

/* ─── Fade-in wrapper ───────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
function AppleHero({ dict }: { dict: Dictionary }) {
  const [idx, setIdx]           = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (videoOpen) return;
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, [videoOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && setVideoOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Image crossfade */}
        <AnimatePresence mode="sync">
          <motion.div key={idx} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}>
            <Image src={HERO_IMAGES[idx]} alt="GATE Jerusalem" fill sizes="100vw"
              className="object-cover opacity-80" priority={idx === 0} quality={90} />
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Center text — Apple style */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/60 text-sm font-medium tracking-[0.3em] uppercase mb-6">
            GATE · Jerusalem
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
            {dict.hero.title1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="text-white/70 text-xl md:text-2xl mt-6 font-light max-w-xl">
            {dict.hero.subtitle1}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <a href="#floors"
              className="bg-white text-black font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/90 transition-all duration-300">
              {dict.hero.cta}
            </a>
            <button onClick={() => setVideoOpen(true)}
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 group">
              <span className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white transition-colors duration-300">
                <svg className="w-4 h-4" style={{ marginInlineStart: 2 }} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
              {dict.hero.videoLabel}
            </button>
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-300 ${i === idx ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* Video modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}>
            <button onClick={() => setVideoOpen(false)} aria-label="סגור"
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }} onClick={e => e.stopPropagation()}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden">
              <iframe src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="GATE Jerusalem" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Stats ─────────────────────────────────────────────── */
function AppleStats({ dict }: { dict: Dictionary }) {
  const stats = [
    { n: "40",   label: dict.stats.floors,    sub: dict.stats.floorsDesc },
    { n: "1,550+", label: dict.stats.sqm,     sub: dict.stats.sqmDesc },
    { n: "13",   label: dict.stats.elevators, sub: dict.stats.elevatorsDesc },
    { n: "32",   label: dict.stats.trainTime, sub: dict.stats.trainTimeDesc },
    { n: "₪10B", label: dict.stats.infrastructure, sub: dict.stats.infrastructureDesc },
  ];
  return (
    <section className="bg-[#f5f5f7] py-12 border-b border-[#d2d2d7]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#d2d2d7] rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}
              className="bg-[#f5f5f7] flex flex-col items-center justify-center text-center px-4 py-8">
              <div className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">{s.n}</div>
              <div className="text-xs font-semibold text-[#1d1d1f] mt-2">{s.label}</div>
              <div className="text-[10px] text-[#6e6e73] mt-0.5">{s.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why ───────────────────────────────────────────────── */
function AppleWhy({ dict }: { dict: Dictionary }) {
  const t = dict.why;
  const items = [
    { title: t.location,  body: t.locationDesc },
    { title: t.transport, body: t.transportDesc },
    { title: t.business,  body: t.businessDesc },
  ];
  return (
    <section className="bg-white py-24 md:py-32" id="why">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
            למה <span className="text-[#9a7940]">GATE</span> ירושלים?
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="bg-[#f5f5f7] rounded-3xl p-8 h-full flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[#9a7940]/15 flex items-center justify-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#9a7940]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4 leading-snug">{item.title}</h3>
                <p className="text-[#6e6e73] text-sm leading-relaxed flex-1">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Quarter ───────────────────────────────────────────── */
function AppleQuarter({ dict }: { dict: Dictionary }) {
  const t = dict.quarter;
  const stats = [
    { value: t.stat3Value, unit: t.stat3Unit, label: t.stat3Label,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { value: t.stat4Value, unit: t.stat4Unit, label: t.stat4Label,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { value: t.stat5Value, unit: t.stat5Unit, label: t.stat5Label,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg> },
    { value: t.stat6Value, unit: t.stat6Unit, label: t.stat6Label,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];
  return (
    <section className="bg-[#1d1d1f] text-white py-24 md:py-32" id="quarter">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#9a7940] mb-4">{t.subtitle}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">{t.title.replace(/{gold}|{\/gold}/g, "")}</h2>
          <p className="text-white/50 mt-5 max-w-3xl mx-auto text-lg">{t.description}</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden mb-12">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-[#1d1d1f] flex flex-col items-center text-center px-6 py-10 gap-3">
              <div className="text-[#9a7940]">{s.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">{s.value}</div>
              <div className="text-xs font-semibold text-[#9a7940] uppercase tracking-widest">{s.unit}</div>
              <div className="text-[11px] text-white/40 leading-snug">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-lg font-semibold text-[#9a7940] mb-3">{t.whyTitle}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{t.whyDesc}</p>
          </Reveal>
          <Reveal delay={0.1} className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-lg font-semibold text-[#9a7940] mb-3">{t.planned}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{t.plannedDesc}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Floors ─────────────────────────────────────────────── */
function fmt(n: number) { return n.toLocaleString("he-IL"); }

function AppleFloorCard({ floor, dict }: {
  floor: { number: number; pricePerSqm: number; grossSqm: number; zone: string; sold: boolean; soldNote: string; badgeKey: string; onDetail: () => void };
  dict: Dictionary;
}) {
  const { fmtPrice } = useCurrency();
  const t = dict.floors;
  const isPremium = floor.zone === "Premium High";
  return (
    <div className={`relative rounded-3xl overflow-hidden border transition-shadow duration-300 hover:shadow-xl ${floor.sold ? "opacity-60" : ""} ${isPremium ? "border-[#9a7940]/40" : "border-[#d2d2d7]"} bg-white`}>
      {floor.sold && (
        <div className="absolute top-5 -right-7 w-32 rotate-45 bg-[#1d1d1f] text-white text-[10px] font-bold tracking-widest uppercase text-center py-1 z-10">נמכר</div>
      )}
      {(floor.soldNote || floor.badgeKey) && !floor.sold && (
        <div className="px-6 pt-6">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#9a7940] bg-[#9a7940]/10 px-3 py-1 rounded-full">
            {floor.soldNote || t[floor.badgeKey as keyof typeof t]}
          </span>
        </div>
      )}
      <div className="px-6 py-6">
        <div className={`text-xs font-semibold mb-1 ${isPremium ? "text-[#9a7940]" : "text-[#6e6e73]"}`}>
          {isPremium ? t.premium : t.midHigh}
        </div>
        <div className="text-3xl font-bold text-[#1d1d1f] mb-1">{t.floor} {floor.number}</div>
        <div className="text-[#6e6e73] text-sm mb-5">{fmt(floor.grossSqm)} מ"ר ברוטו</div>
        <div className="border-t border-[#f5f5f7] pt-5">
          <div className="text-[10px] uppercase tracking-widest text-[#6e6e73] mb-1">{t.fromUnit}</div>
          <div className="text-2xl font-bold text-[#1d1d1f]">
            {fmtPrice(floor.pricePerSqm)} <span className="text-sm font-normal text-[#6e6e73]">/ מ"ר</span>
          </div>
          <div className="text-[11px] text-[#6e6e73] mt-1">{t.unitRange}</div>
        </div>
        {!floor.sold && (
          <button onClick={floor.onDetail} className="mt-5 w-full text-center text-xs font-semibold text-[#9a7940] border border-[#9a7940]/30 rounded-xl py-2.5 hover:bg-[#9a7940]/8 transition-colors">
            {t.detailsFor} {floor.number}
          </button>
        )}
      </div>
    </div>
  );
}

function AppleFloors({ dict }: { dict: Dictionary }) {
  const [detailFloor, setDetailFloor] = useState<number | null>(null);
  const rawFloors = [
    { number: 21, pricePerSqm: 21000, grossSqm: 1550, zone: "Mid-High",     sold: false, soldNote: "", badgeKey: "" },
    { number: 22, pricePerSqm: 21000, grossSqm: 1550, zone: "Mid-High",     sold: false, soldNote: "", badgeKey: "" },
    { number: 24, pricePerSqm: 21000, grossSqm: 1550, zone: "Mid-High",     sold: false, soldNote: "", badgeKey: "allElevators" },
    { number: 35, pricePerSqm: 23500, grossSqm: 1700, zone: "Premium High", sold: false, soldNote: "נותרו 2 יחידות", badgeKey: "panoramic" },
    { number: 33, pricePerSqm: 23500, grossSqm: 1700, zone: "Premium High", sold: true,  soldNote: "", badgeKey: "" },
    { number: 37, pricePerSqm: 25000, grossSqm: 1700, zone: "Premium High", sold: false, soldNote: "נותרו 6 יחידות", badgeKey: "panoramic" },
  ];
  const floors = rawFloors.map(f => ({ ...f, onDetail: () => setDetailFloor(f.number) }));
  return (
    <section className="bg-[#f5f5f7] py-24 md:py-32" id="floors">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight">{dict.floors.title}</h2>
          <p className="text-[#6e6e73] mt-4 text-lg max-w-xl mx-auto">{dict.floors.subtitle}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {floors.map((f, i) => (
            <Reveal key={f.number} delay={i * 0.08}>
              <AppleFloorCard floor={f} dict={dict} />
            </Reveal>
          ))}
        </div>

        {/* Payment */}
        <Reveal delay={0.2} className="mt-12 bg-white rounded-3xl overflow-hidden border border-[#d2d2d7]">
          <div className="px-8 py-8 text-center border-b border-[#f5f5f7]">
            <p className="text-xs uppercase tracking-widest text-[#6e6e73] mb-3">{dict.floors.paymentTitle}</p>
            <div className="flex items-center justify-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/hapoalim.svg" alt="בנק הפועלים" className="h-7 w-auto" />
              <span className="text-[#6e6e73] text-sm border-r border-[#d2d2d7] pr-4">בנק מלווה רשמי</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 divide-x divide-x-reverse divide-[#f5f5f7]">
            <div className="px-10 py-8 text-center">
              <div className="text-5xl font-bold text-[#1d1d1f] tracking-tight">30%</div>
              <div className="text-[#6e6e73] text-sm mt-2">{dict.floors.atPurchase}</div>
              <div className="text-[11px] text-[#6e6e73]/60 mt-1">בחתימת חוזה</div>
            </div>
            <div className="px-10 py-8 text-center">
              <div className="text-5xl font-bold text-[#1d1d1f] tracking-tight">70%</div>
              <div className="text-[#6e6e73] text-sm mt-2">{dict.floors.atDelivery}</div>
              <div className="text-[11px] text-[#6e6e73]/60 mt-1">2029–2030</div>
            </div>
          </div>
          <div className="px-8 py-4 bg-[#f5f5f7] text-center border-t border-[#d2d2d7]">
            <p className="text-[11px] text-[#6e6e73] flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              ערבות בנקאית אישית לכל רוכש — ההשקעה מוגנת לאורך כל שלבי הבנייה
            </p>
          </div>
        </Reveal>
      </div>
      {detailFloor && <FloorDetailModal floorNumber={detailFloor} onClose={() => setDetailFloor(null)} />}
    </section>
  );
}

/* ─── Gallery ─────────────────────────────────────────────── */
const GALLERY = [
  "/images/Gate_v10_hi-res_0821.jpg",
  "/images/Gate_v1_hi-res_0821.jpg",
  "/images/Gate_v4__hi-res_0821.jpg",
  "/images/Gate_v5_hi-res_0904-副本-1.jpg",
  "/images/Gate_0115-.jpg",
  "/images/713f56_13fe64f9758e417d94a6b28e928e8acd~mv2.avif",
];

function AppleGallery({ dict }: { dict: Dictionary }) {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <section className="bg-black py-24 md:py-32" id="gallery">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{dict.gallery.title.replace(/{gold}|{\/gold}/g, "")}</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">{dict.gallery.subtitle}</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((src, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <button onClick={() => setSel(i)}
                className={`relative overflow-hidden rounded-2xl group w-full ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image src={src} alt="GATE" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {sel !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSel(null)}>
            <button onClick={() => setSel(null)} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <motion.div key={sel} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
              <Image src={GALLERY[sel]} alt="GATE" fill className="object-contain" sizes="90vw" priority />
            </motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {GALLERY.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setSel(i); }}
                  className={`rounded-full transition-all ${i === sel ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Location ──────────────────────────────────────────── */
const MAP_LAT = "31.7890";
const MAP_LNG = "35.2030";

function AppleLocation({ dict }: { dict: Dictionary }) {
  const t = dict.location;
  const alt = dict.alt;
  const destinations = [
    { time: "5",  name: t.lightRail,      hook: t.lightRailHook,      mode: t.byFoot, images: ["/images/locations/light-rail-2.jpg", "/images/locations/light-rail-3.jpg"],                                                            altText: alt.locationLightRail },
    { time: "10", name: t.knesset,        hook: t.knessetHook,        mode: t.byFoot, images: ["/images/locations/knesset-1.jpg", "/images/locations/knesset-2.jpg", "/images/locations/knesset-3.jpg"],                               altText: alt.locationKnesset },
    { time: "10", name: t.sacherPark,     hook: t.sacherParkHook,     mode: t.byFoot, images: ["/images/locations/sacher-park-2.jpg", "/images/locations/sacher-park-3.jpg"],                                                          altText: alt.locationSacherPark },
    { time: "15", name: t.machaneYehuda,  hook: t.machaneYehudaHook,  mode: t.byFoot, images: ["/images/locations/machane-yehuda-2.jpg", "/images/locations/machane-yehuda-4.jpg", "/images/locations/machane-yehuda-6.jpg"],           altText: alt.locationMachaneYehuda },
    { time: "15", name: t.oldCity,        hook: t.oldCityHook,        mode: t.byRail, images: ["/images/locations/old-city-1.jpg", "/images/locations/old-city-2.jpg", "/images/locations/old-city-3.jpg"],                            altText: alt.locationOldCity },
    { time: "32", name: t.train,          hook: t.trainHook,          mode: t.byTrain, images: ["/images/locations/tel-aviv-1.jpg", "/images/locations/tel-aviv-2.jpg"],                                                               altText: alt.locationTrain },
  ];
  return (
    <section className="bg-white py-24 md:py-32" id="location">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight">{t.title}</h2>
          <p className="text-[#6e6e73] mt-4 max-w-xl mx-auto">{t.subtitle}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((d, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <LocationCard d={d} dict={dict} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <h3 className="text-lg font-semibold text-[#1d1d1f] text-center mb-6">{t.mapTitle}</h3>
          <div className="rounded-3xl overflow-hidden border border-[#d2d2d7] aspect-[16/7]">
            <iframe
              src={`https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`}
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="GATE Jerusalem Location"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LocationCard({ d, dict }: { d: { time: string; name: string; hook: string; mode: string; images: string[]; altText: string }; dict: Dictionary }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % d.images.length), 4000);
    return () => clearInterval(t);
  }, [d.images.length]);
  return (
    <div className="relative rounded-2xl overflow-hidden h-60 group">
      <AnimatePresence mode="sync">
        <motion.div key={idx} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <Image src={d.images[idx]} alt={d.altText} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      <div className="absolute top-3 end-3 z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
        <span className="text-[#9a7940]">{d.time} {dict.common.min}</span>
        <span className="text-white/40">|</span>
        <span className="text-white/70">{d.mode}</span>
      </div>
      <div className="absolute bottom-0 start-0 end-0 p-4 z-20">
        <h3 className="text-white font-semibold text-base">{d.name}</h3>
        <p className="text-white/60 text-xs mt-0.5 leading-relaxed">{d.hook}</p>
      </div>
    </div>
  );
}

/* ─── Trust / Partners ──────────────────────────────────── */
function ApplePartners({ dict }: { dict: Dictionary }) {
  const logos = [
    { src: "/logos/bsr.png",       alt: "B.S.R Group",    bg: "bg-[#1a2744]" },
    { src: "/logos/jtlv.png",      alt: "JTLV Fund",      bg: "bg-white" },
    { src: "/logos/blk.png",       alt: "BLK Architects", bg: "bg-white" },
    { src: "/logos/hapoalim.svg",  alt: "בנק הפועלים",   bg: "bg-white" },
  ];
  const trust = [dict.trust.years, dict.trust.projects, dict.trust.sales, dict.trust.leed];
  return (
    <section className="bg-white py-20 border-t border-[#d2d2d7]">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#6e6e73]">{dict.developers.title}</p>
        </Reveal>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          {logos.map((l, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className={`${l.bg} rounded-2xl px-6 py-4 flex items-center justify-center shadow-sm border border-[#f5f5f7] h-16 w-36`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.alt} className="max-h-8 max-w-full object-contain" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust stats */}
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-x-reverse divide-[#d2d2d7] border-t border-[#d2d2d7] pt-8">
          {trust.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-6 md:px-10 py-3 text-[#1d1d1f]">
              <svg className="w-3.5 h-3.5 text-[#9a7940]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span className="text-sm font-medium whitespace-nowrap">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────── */
function AppleFAQ({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const items = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
    { q: t.q6, a: t.a6 },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-[#f5f5f7] py-20 border-t border-[#d2d2d7]">
      <div className="max-w-2xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight">{t.title}</h2>
        </Reveal>
        <div className="bg-white rounded-3xl divide-y divide-[#f5f5f7] shadow-sm overflow-hidden">
          {items.map((item, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-7 py-6 text-start gap-4">
                <span className="text-[#1d1d1f] font-medium">{item.q}</span>
                <svg className={`w-5 h-5 text-[#6e6e73] shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                    <p className="px-7 pb-6 text-[#6e6e73] text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ───────────────────────────────────────────── */
function AppleContact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const form = e.currentTarget;
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) });
      if (res.ok) { setSubmitted(true); form.reset(); }
    } finally { setLoading(false); }
  }

  return (
    <section className="bg-white py-24 md:py-32 border-t border-[#d2d2d7]" id="contact">
      <div className="max-w-xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight">{t.title} <span className="text-[#9a7940]">{t.titleHighlight}</span></h2>
          <p className="text-[#6e6e73] mt-4">{t.subtitle}</p>
        </Reveal>

        {submitted ? (
          <div className="text-center py-12 bg-[#f5f5f7] rounded-3xl">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{t.successTitle}</h3>
            <p className="text-[#6e6e73] text-sm">{t.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="access_key" value="50c491ee-83db-4906-bb6f-3b3a287cbbab" />
            <input type="hidden" name="subject" value="GATE Jerusalem — Apple Preview Inquiry" />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="name" required placeholder={t.namePlaceholder}
                className="col-span-2 sm:col-span-1 w-full px-4 py-3.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#6e6e73] text-sm focus:outline-none focus:ring-2 focus:ring-[#9a7940]/40 border border-transparent focus:border-[#9a7940]/30 transition" />
              <input type="tel" name="phone" required placeholder="050-0000000" dir="ltr"
                className="col-span-2 sm:col-span-1 w-full px-4 py-3.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#6e6e73] text-sm focus:outline-none focus:ring-2 focus:ring-[#9a7940]/40 border border-transparent focus:border-[#9a7940]/30 transition" />
            </div>
            <input type="email" name="email" required placeholder="email@example.com" dir="ltr"
              className="w-full px-4 py-3.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#6e6e73] text-sm focus:outline-none focus:ring-2 focus:ring-[#9a7940]/40 border border-transparent focus:border-[#9a7940]/30 transition" />
            <select name="floor_interest"
              className="w-full px-4 py-3.5 bg-[#f5f5f7] rounded-xl text-[#6e6e73] text-sm focus:outline-none focus:ring-2 focus:ring-[#9a7940]/40 border border-transparent focus:border-[#9a7940]/30 transition">
              <option value="all">{t.allFloors}</option>
              {[21,22,24,35,37].map(f => <option key={f} value={f}>קומה {f}</option>)}
            </select>
            <textarea name="message" rows={3} placeholder={t.messagePlaceholder}
              className="w-full px-4 py-3.5 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder-[#6e6e73] text-sm focus:outline-none focus:ring-2 focus:ring-[#9a7940]/40 border border-transparent focus:border-[#9a7940]/30 transition resize-none" />
            <button type="submit" disabled={loading}
              className="w-full bg-[#1d1d1f] hover:bg-[#3d3d3f] text-white font-semibold text-sm py-4 rounded-xl transition-all duration-300 disabled:opacity-50">
              {loading ? t.sending : t.submit}
            </button>
          </form>
        )}

        <div className="mt-8 flex items-center justify-center gap-5 text-sm text-[#6e6e73]">
          <a href="tel:0546302880" className="flex items-center gap-1.5 hover:text-[#1d1d1f] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            02-500-0275
          </a>
          <span className="text-[#d2d2d7]">|</span>
          <a href={`https://wa.me/972546302880`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#1d1d1f] transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────── */
function AppleFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7] py-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-[11px] text-[#6e6e73] max-w-3xl mx-auto leading-relaxed mb-4">{dict.footer.disclaimer}</p>
        <p className="text-[11px] text-[#6e6e73]">&copy; 2026 GATE Jerusalem · כל הזכויות שמורות</p>
      </div>
    </footer>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
function AppleNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl border-b border-[#d2d2d7] shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className={`font-bold text-lg tracking-widest uppercase transition-colors ${scrolled ? "text-[#1d1d1f]" : "text-white"}`}>GATE</span>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {[["#why","למה GATE"],["#floors","קומות"],["#gallery","גלריה"],["#contact","צור קשר"]].map(([href, label]) => (
            <a key={href} href={href} className={`transition-colors hover:text-[#9a7940] ${scrolled ? "text-[#1d1d1f]" : "text-white/80"}`}>{label}</a>
          ))}
        </div>
        <a href="#contact" className={`text-xs font-semibold px-5 py-2 rounded-full transition-all ${scrolled ? "bg-[#1d1d1f] text-white hover:bg-[#3d3d3f]" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"}`}>
          לפרטים
        </a>
      </div>
    </nav>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export default function LandingPageApple({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <I18nCtx.Provider value={{ dict, lang }}>
      <CurrencyProvider lang={lang}>

        {/* Preview banner */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] bg-[#1d1d1f]/90 backdrop-blur-md text-white text-xs font-medium px-5 py-2.5 rounded-full shadow-xl flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#9a7940] animate-pulse" />
          הדמיית Apple Style
          <a href="/he" className="text-[#9a7940] hover:underline">← חזרה למקורי</a>
        </div>

        <AppleNav />
        <AppleHero dict={dict} />
        <AppleStats dict={dict} />
        <AppleWhy dict={dict} />
        <AppleQuarter dict={dict} />
        <AppleFloors dict={dict} />
        <AppleGallery dict={dict} />
        <AppleLocation dict={dict} />
        <ApplePartners dict={dict} />
        <AppleFAQ dict={dict} />
        <AppleContact dict={dict} />
        <AppleFooter dict={dict} />
        <FloatingVideoButton />
      </CurrencyProvider>
    </I18nCtx.Provider>
  );
}
