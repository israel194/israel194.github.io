"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "./LandingPage";

const YOUTUBE_ID = "pkOtGPrMGlU";

const HERO_IMAGES = [
  "/images/Gate_v1_hi-res_0821.jpg",
  "/images/Gate_v10_hi-res_0821.jpg",
  "/images/Gate_v5_hi-res_0904-副本-1.jpg",
  "/images/Gate_v4__hi-res_0821.jpg",
  "/images/Gate_0115-.jpg",
];

const KEN_BURNS = [
  { scale: [1, 1.03], x: ["0%", "-1%"], y: ["0%", "-1%"] },
  { scale: [1.03, 1], x: ["-1%", "1%"], y: ["0%", "0%"] },
  { scale: [1, 1.03], x: ["1%", "-0.5%"], y: ["-0.5%", "1%"] },
  { scale: [1.03, 1], x: ["0%", "1%"], y: ["1%", "-0.5%"] },
  { scale: [1, 1.03], x: ["-0.5%", "0.5%"], y: ["0.5%", "-1%"] },
];

export default function Hero() {
  const { dict } = useI18n();
  const t = dict.hero;
  const [index, setIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (videoOpen) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [videoOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const kb = KEN_BURNS[index % KEN_BURNS.length];

  return (
    <>
      {/* Full-bleed slideshow */}
      <section className="relative h-screen overflow-hidden bg-navy">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: kb.scale, x: kb.x, y: kb.y }}
              transition={{ duration: 5.5, ease: "easeInOut" }}
            >
              <Image
                src={HERO_IMAGES[index]}
                alt={dict.alt.heroMain}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                quality={85}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent pointer-events-none z-10" />

        {/* Centered play button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4"
        >
          <button
            onClick={() => setVideoOpen(true)}
            className="group flex flex-col items-center gap-3"
            aria-label={t.videoLabel}
          >
            {/* Pulsing ring + play icon */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-24 h-24 rounded-full bg-gold/30 animate-ping" />
              <span className="absolute w-20 h-20 rounded-full bg-gold/20" />
              <div className="relative w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/60 group-hover:bg-gold/80 group-hover:border-gold flex items-center justify-center shadow-2xl transition-all duration-300">
                <svg className="w-8 h-8 text-white" style={{ marginInlineStart: 4 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span className="text-white/90 text-sm font-medium tracking-widest uppercase drop-shadow-lg group-hover:text-gold transition-colors duration-300">
              {t.videoLabel}
            </span>
          </button>
        </motion.div>

        {/* Dot indicators */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? "bg-white scale-125" : "bg-white/40"}`}
            />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-white/60">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Headline + CTAs below image */}
      <section className="bg-navy py-8 text-center px-4">
        <motion.h1 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white mb-2">
          {t.title1}<br /><span className="text-gold">{t.title2}</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
          <a href="#floors" className="bg-gold hover:bg-gold-light text-navy font-bold text-sm px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]">{t.cta}</a>
          <a href="#quarter" className="border-2 border-white/30 hover:border-gold text-white hover:text-gold font-medium text-sm px-8 py-3 rounded-lg transition-colors duration-300">{t.ctaQuarter}</a>
        </motion.div>
      </section>

      {/* YouTube video modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
              aria-label="סגור"
            >
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="סרטון פרויקט GATE ירושלים"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
