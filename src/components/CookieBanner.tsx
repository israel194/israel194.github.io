"use client";

import { useState, useEffect } from "react";
import { useI18n } from "./LandingPage";
import LegalModal from "./LegalModal";

const STORAGE_KEY = "gate_cookie_consent";

export default function CookieBanner() {
  const { dict } = useI18n();
  const t = dict.cookieBanner;
  const [visible, setVisible] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  // Per Amendment 13: user may decline non-essential cookies and still use the site.
  // Since we only use essential cookies, "essential only" = same as accepting.
  function essentialOnly() {
    localStorage.setItem(STORAGE_KEY, "essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        className="fixed bottom-0 inset-x-0 z-[200] bg-navy border-t-2 border-gold/30 shadow-2xl"
      >
        <div className="max-w-5xl mx-auto px-4 py-5">
          {/* Title */}
          <p className="text-gold font-bold text-sm mb-2">{t.title}</p>

          {/* Body */}
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            {t.text}{" "}
            <button
              onClick={() => setShowPrivacy(true)}
              className="underline underline-offset-2 text-gold hover:text-gold-light transition-colors"
            >
              {t.learnMore}
            </button>
          </p>

          {/* Buttons — equally prominent per Amendment 13 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={essentialOnly}
              className="flex-1 px-5 py-2.5 rounded-lg border-2 border-white/30 text-white font-semibold text-sm hover:border-white/60 hover:bg-white/5 transition-all"
            >
              {t.essentialOnly}
            </button>
            <button
              onClick={accept}
              className="flex-1 px-5 py-2.5 rounded-lg border-2 border-gold bg-gold hover:bg-gold-light text-navy font-bold text-sm transition-all shadow"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>

      {showPrivacy && (
        <LegalModal type="privacy" onClose={() => setShowPrivacy(false)} />
      )}
    </>
  );
}
