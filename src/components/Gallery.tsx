"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { renderGoldTitle } from "@/lib/renderGoldTitle";
import { useI18n } from "./LandingPage";

const imageSrcs = [
  "/images/Gate_v10_hi-res_0821.jpg",
  "/images/Gate_v1_hi-res_0821.jpg",
  "/images/Gate_v4__hi-res_0821.jpg",
  "/images/Gate_v5_hi-res_0904-副本-1.jpg",
  "/images/Gate_0115-.jpg",
  "/images/713f56_13fe64f9758e417d94a6b28e928e8acd~mv2.avif",
  "/images/713f56_3529ee945be34cc18f7fc741ef12009b~mv2.avif",
  "/images/713f56_3990337465c44833a86a47e2670d43f4~mv2.avif",
  "/images/713f56_a2927142c2f14532b04b4f002ae71ed8~mv2.avif",
];

const altKeys = ["render1", "render2", "render3", "render4", "render5", "render6", "render7", "render8", "render9"] as const;

export default function Gallery() {
  const { dict } = useI18n();
  const images = imageSrcs.map((src, i) => ({ src, alt: dict.alt[altKeys[i]] }));
  const t = dict.gallery;
  const [selected, setSelected] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null || selected === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      setSelected(delta > 0 ? (selected + 1) % images.length : (selected - 1 + images.length) % images.length);
    }
    touchStart.current = null;
  };

  return (
    <section className="py-12 md:py-20 bg-navy" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          {renderGoldTitle(t.title)}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-white/60 mb-6 md:mb-12">{t.subtitle}</motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: Math.min(i * 0.08, 0.4) }} onClick={() => setSelected(i)} className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <div className={`relative ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"} className="object-cover transition-transform duration-500 group-hover:scale-105" loading={i === 0 ? undefined : "lazy"} priority={i === 0} />
              </div>
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 flex items-center justify-center">
                <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer">
            <button onClick={() => setSelected(null)} className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors z-10"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <button onClick={(e) => { e.stopPropagation(); setSelected((selected - 1 + images.length) % images.length); }} className="absolute right-2 md:right-8 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            <button onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % images.length); }} className="absolute left-2 md:left-8 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
            <motion.div key={selected} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="relative max-w-5xl w-full aspect-video cursor-default"><Image src={images[selected].src} alt={images[selected].alt} fill className="object-contain rounded-lg" sizes="90vw" priority /></motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setSelected(i); }} aria-label={`Image ${i + 1} of ${images.length}`} className={`rounded-full transition-all ${i === selected ? "w-2.5 h-2.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
