"use client";

import { useState } from "react";
import { useI18n } from "./LandingPage";
import LegalModal from "./LegalModal";

type ModalType = "privacy" | "accessibility" | null;

export default function Footer() {
  const { dict } = useI18n();
  const t = dict.footer;
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="bg-navy-light py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-white/30">
            <button onClick={() => setModal("privacy")} className="hover:text-gold transition-colors cursor-pointer">{t.privacy}</button>
            <span>|</span>
            <a href="#" className="hover:text-gold transition-colors">{t.terms}</a>
            <span>|</span>
            <button onClick={() => setModal("accessibility")} className="hover:text-gold transition-colors cursor-pointer">{t.accessibility}</button>
          </div>
          <div className="text-center text-xs text-white/50 max-w-3xl mx-auto leading-relaxed">{t.disclaimer}</div>
          <div className="text-center text-xs text-white/30 mt-4">&copy; 2026 GATE Jerusalem. כל הזכויות שמורות.</div>
        </div>
      </footer>

      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </>
  );
}
