"use client";

import { useEffect } from "react";
import { useI18n } from "./LandingPage";

type ModalType = "privacy" | "accessibility";

interface Props {
  type: ModalType;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: Props) {
  const { dict, lang } = useI18n();
  const isRtl = lang === "he" || lang === "ar";
  const t = type === "privacy" ? dict.privacy : dict.accessibility;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const isPrivacy = type === "privacy";
  const p = dict.privacy;
  const a = dict.accessibility;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-[#0f1e3d] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0f1e3d] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 id="modal-title" className="text-white font-bold text-xl">{t.title}</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6 text-white/80 text-sm leading-relaxed">
          <p>{t.intro}</p>

          {isPrivacy ? (
            <>
              <Section title={p.collect}><p>{p.collectDesc}</p></Section>
              <Section title={p.use}><p>{p.useDesc}</p></Section>
              <Section title={p.security}><p>{p.securityDesc}</p></Section>
              <Section title={p.rights}><p>{p.rightsDesc}</p></Section>
              <Section title={p.cookies}><p>{p.cookiesDesc}</p></Section>
              <Section title={p.contact}><p>{p.contactDesc}</p></Section>
            </>
          ) : (
            <>
              <Section title={a.standard}><p>{a.standardDesc}</p></Section>
              <Section title={a.features}>
                <ul className="space-y-2 mt-2">
                  {[a.feature1, a.feature2, a.feature3, a.feature4, a.feature5, a.feature6, a.feature7].map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title={a.contact}>
                <p>{a.contactDesc}</p>
                <p className="mt-2">{a.phone}</p>
                <p>{a.email}</p>
                <p className="mt-2 text-white/50">{a.response}</p>
              </Section>
            </>
          )}

          <p className="text-white/30 text-xs pt-2 border-t border-white/10">{t.date}</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-gold font-semibold text-base mb-2">{title}</h3>
      {children}
    </div>
  );
}
