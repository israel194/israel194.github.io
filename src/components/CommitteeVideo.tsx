"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "./LandingPage";

const FB_VIDEO_URL = "https://www.facebook.com/EdenJerusalem/videos/2305304023226972/";

export default function CommitteeVideo() {
  const { dict } = useI18n();
  const [active, setActive] = useState(false);

  return (
    <section className="bg-navy-light py-16 border-t border-white/10">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-widest text-gold/70 mb-3"
        >
          מסמך רשמי
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-2xl md:text-3xl font-bold text-white mb-3"
        >
          {dict.quarter.videoFacebook}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-white/50 text-sm mb-8 max-w-md mx-auto"
        >
          הוועדה המקומית לתכנון ובנייה ירושלים — אישור ורשמי של פרויקט רובע הכניסה
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-sm aspect-[9/16] cursor-pointer group border border-white/10"
          onClick={() => !active && setActive(true)}
        >
          {active ? (
            <iframe
              src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(FB_VIDEO_URL)}&show_text=false&width=320&height=568`}
              title="ועדת תכנון רובע הכניסה ירושלים"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <>
              <div className="w-full h-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                <svg className="w-20 h-20 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/50 group-hover:bg-gold/80 group-hover:border-gold flex items-center justify-center shadow-xl transition-all duration-300">
                  <svg className="w-7 h-7 text-white" style={{ marginInlineStart: 3 }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white/80 text-xs font-medium tracking-wider uppercase">לחצו לצפייה</span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
