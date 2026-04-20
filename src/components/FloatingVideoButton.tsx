"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "./LandingPage";

const YOUTUBE_ID = "pkOtGPrMGlU";

export default function FloatingVideoButton() {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            onClick={() => setVideoOpen(true)}
            aria-label={dict.hero.videoLabel}
            className="fixed bottom-24 left-5 z-50 group flex flex-col items-center gap-1.5"
          >
            {/* Pulsing ring */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-14 h-14 rounded-full bg-gold/30 animate-ping" />
              <div className="relative w-14 h-14 rounded-full bg-navy border-2 border-gold shadow-xl group-hover:bg-gold transition-colors duration-300 flex items-center justify-center">
                <svg className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-300" style={{ marginInlineStart: 2 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span className="text-white/80 text-[10px] font-semibold tracking-wider uppercase bg-navy/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
              סרטון
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
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
