"use client";

import { useState, useEffect } from "react";
import { useI18n } from "./LandingPage";
import ShareButton from "./ShareButton";

export default function Navbar() {
  const { dict } = useI18n();
  const t = dict.nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const links = [
    { href: "#why", label: t.why },
    { href: "#quarter", label: t.quarter },
    { href: "#building", label: t.building },
    { href: "#floors", label: t.floors },
    { href: "#gallery", label: t.gallery },
    { href: "#location", label: t.location },
    { href: "#contact", label: t.contact },
  ];

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 50) setMobileOpen(false);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={`fixed top-11 right-0 left-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-[#1a2744]/96 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.35)] pb-7 border-b border-white/8"
          : "bg-transparent pb-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo — fixed width to balance the CTA on the other side */}
        <a href="#" className="flex flex-col leading-none lg:w-32">
          <span className="text-white font-bold text-2xl tracking-[0.2em] uppercase">
            GATE<span className="text-gold">.</span>
          </span>
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium mt-0.5">
            Jerusalem
          </span>
        </a>

        {/* Desktop Links — centered */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[15px] tracking-wide transition-all duration-200 pb-0.5 ${
                  isActive
                    ? "text-gold font-semibold"
                    : "text-white/80 hover:text-white font-normal"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-px bg-gold transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* CTA + Share */}
        <div className="hidden lg:flex items-center justify-end gap-4">
          <ShareButton />
          <a
            href="#contact"
            className="relative whitespace-nowrap bg-gold hover:bg-[#d4b85e] text-navy font-bold text-[15px] tracking-wide px-7 py-3 rounded transition-all duration-200 shadow-[0_2px_12px_rgba(201,168,76,0.3)] hover:shadow-[0_4px_20px_rgba(201,168,76,0.45)] hover:-translate-y-px active:translate-y-0"
          >
            {t.cta}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-2 -me-2 rounded-md hover:bg-white/8 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 -z-10" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#1a2744]/98 backdrop-blur-md border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 pt-3 pb-5">
            <div className="flex flex-col">
              {links.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-3 text-sm border-b border-white/6 transition-colors ${
                      isActive ? "text-gold font-medium" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />}
                  </a>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center bg-gold text-navy font-bold text-sm py-3.5 rounded tracking-wide shadow-[0_2px_12px_rgba(201,168,76,0.3)]"
              >
                {t.cta}
              </a>
              <div className="flex items-center justify-center w-12 h-12 rounded bg-white/5 border border-white/10">
                <ShareButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
