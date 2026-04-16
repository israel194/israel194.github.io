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

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    // Close the tab; if browser blocks it, navigate away
    window.close();
    setTimeout(() => {
      window.location.href = "about:blank";
    }, 200);
  }

  if (!visible) return null;

  return (
    <>
      <div
        role="dialog"
        aria-label={t.text}
        className="fixed bottom-0 inset-x-0 z-[200] bg-navy/97 backdrop-blur-sm border-t border-gold/20 shadow-2xl"
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 text-white/85 text-sm leading-relaxed">
            {t.text}{" "}
            <button
              onClick={() => setShowPrivacy(true)}
              className="underline underline-offset-2 text-gold hover:text-gold-light transition-colors"
            >
              {t.learnMore}
            </button>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 rounded-lg border border-white/30 text-white/70 hover:text-white hover:border-white/60 text-sm transition-all"
            >
              {t.decline}
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 rounded-lg bg-gold hover:bg-gold-light text-navy font-bold text-sm transition-all shadow"
            >
              {t.accept}
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
