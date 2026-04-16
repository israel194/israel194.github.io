"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "./LandingPage";
import LegalModal from "./LegalModal";

type FontSize = "normal" | "large" | "xlarge";

export default function AccessibilityWidget() {
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Apply font size to root element
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "large") root.style.fontSize = "110%";
    else if (fontSize === "xlarge") root.style.fontSize = "125%";
    else root.style.fontSize = "";
  }, [fontSize]);

  // Apply high contrast
  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  // Apply underline links
  useEffect(() => {
    document.documentElement.classList.toggle("underline-links", underlineLinks);
  }, [underlineLinks]);

  // Close panel on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function resetAll() {
    setFontSize("normal");
    setHighContrast(false);
    setUnderlineLinks(false);
  }

  if (dismissed) return null;

  return (
    <>
      <div className="fixed bottom-24 right-4 z-[150] flex flex-col items-center gap-1" ref={panelRef}>
        {/* Dismiss X */}
        <button
          onClick={() => setDismissed(true)}
          className="w-5 h-5 rounded-full bg-white/80 hover:bg-white border border-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center shadow transition-all text-xs"
          aria-label="סגור כפתור נגישות"
        >
          ✕
        </button>

        {/* Accessibility panel */}
        {open && (
          <div className="absolute bottom-14 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Panel header */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between">
              <span className="text-white font-bold text-sm">{dict.accessibility.title}</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-lg leading-none"
                aria-label="סגור"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* Font size */}
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">גודל טקסט</div>
                <div className="flex gap-2">
                  {(["normal", "large", "xlarge"] as FontSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-1.5 rounded-lg border text-sm font-bold transition-all ${
                        fontSize === size
                          ? "bg-navy text-white border-navy"
                          : "bg-white text-navy border-gray-200 hover:border-navy"
                      }`}
                    >
                      {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setHighContrast((v) => !v)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    highContrast ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-200 hover:border-navy"
                  }`}
                >
                  <span>ניגודיות גבוהה</span>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${highContrast ? "border-white bg-white/20" : "border-gray-300"}`}>
                    {highContrast ? "✓" : ""}
                  </span>
                </button>

                <button
                  onClick={() => setUnderlineLinks((v) => !v)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    underlineLinks ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-200 hover:border-navy"
                  }`}
                >
                  <span>הדגשת קישורים</span>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${underlineLinks ? "border-white bg-white/20" : "border-gray-300"}`}>
                    {underlineLinks ? "✓" : ""}
                  </span>
                </button>
              </div>

              {/* Reset */}
              <button
                onClick={resetAll}
                className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
              >
                איפוס הגדרות
              </button>

              {/* Statement link */}
              <button
                onClick={() => { setShowStatement(true); setOpen(false); }}
                className="w-full py-2.5 bg-gold/10 hover:bg-gold/20 text-gold-dark text-xs font-semibold rounded-xl transition-colors"
              >
                הצהרת נגישות מלאה
              </button>
            </div>
          </div>
        )}

        {/* Main button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-12 h-12 rounded-full bg-navy shadow-lg hover:bg-navy-light border-2 border-gold/40 hover:border-gold transition-all flex items-center justify-center"
          aria-label={dict.accessibility.title}
          title={dict.accessibility.title}
        >
          <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6c1.1 0 2 .9 2 2v4l1.5 3H15l-1-2h-4l-1 2H7.5L9 14v-4c0-1.1.9-2 2-2h1zm-1 2v3h2v-3h-2z"/>
          </svg>
        </button>
      </div>

      {showStatement && (
        <LegalModal type="accessibility" onClose={() => setShowStatement(false)} />
      )}
    </>
  );
}
