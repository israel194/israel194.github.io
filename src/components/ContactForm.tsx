"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "./LandingPage";

const floorOptions = [
  { value: "21", grossSqm: "1,550", price: "₪31,775,000" },
  { value: "22", grossSqm: "1,550", price: "₪31,775,000" },
  { value: "24", grossSqm: "1,550", price: "₪31,775,000" },
  { value: "35", grossSqm: "1,700", price: "₪39,950,000" },
  { value: "37", grossSqm: "1,700", price: "₪39,950,000" },
];

export default function ContactForm() {
  const { dict } = useI18n();
  const t = dict.contact;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const floor = sessionStorage.getItem("selectedFloor");
    if (floor && selectRef.current) { selectRef.current.value = floor; sessionStorage.removeItem("selectedFloor"); }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError(false);
    const form = e.currentTarget;
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) });
      if (res.ok) { setSubmitted(true); form.reset(); } else { setError(true); }
    } catch { setError(true); } finally { setLoading(false); }
  }

  function copyPhone() { navigator.clipboard.writeText("0546302880"); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <section className="py-12 md:py-20 bg-navy" id="contact">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          {t.title} <span className="text-gold">{t.titleHighlight}</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-white/60 mb-6 md:mb-12">{t.subtitle}</motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-5 md:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
              <h3 className="text-2xl font-bold text-navy mb-2">{t.successTitle}</h3>
              <p className="text-gray-500">{t.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="access_key" value="50c491ee-83db-4906-bb6f-3b3a287cbbab" />
              <input type="hidden" name="subject" value="GATE Jerusalem — New Inquiry" />
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-navy mb-2">{t.name} *</label><input type="text" name="name" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all text-navy" placeholder={t.namePlaceholder} /></div>
                <div><label className="block text-sm font-medium text-navy mb-2">{t.phone} *</label><input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all text-navy" placeholder="050-0000000" dir="ltr" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-navy mb-2">{t.email} *</label><input type="email" name="email" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all text-navy" placeholder="email@example.com" dir="ltr" /></div>
                <div><label className="block text-sm font-medium text-navy mb-2">{t.company}</label><input type="text" name="company" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all text-navy" placeholder={t.companyPlaceholder} /></div>
              </div>
              <div><label className="block text-sm font-medium text-navy mb-2">{t.floorInterest}</label>
                <select name="floor_interest" ref={selectRef} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all text-navy bg-white">
                  <option value="all">{t.allFloors}</option>
                  {floorOptions.map((f) => (
                    <option key={f.value} value={f.value}>{dict.floors.floor} {f.value} — {f.grossSqm} {dict.common.sqm} — {f.price}</option>
                  ))}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-navy mb-2">{t.message}</label><textarea name="message" rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all text-navy resize-none" placeholder={t.messagePlaceholder} /></div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm text-center">{t.errorMessage}</div>}
              <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-light text-navy font-bold text-lg py-4 rounded-lg transition-all duration-300 disabled:opacity-60 hover:shadow-lg">{loading ? t.sending : t.submit}</button>
            </form>
          )}
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="tel:0546302880" className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <span className="font-medium">02-500-0275</span>
          </a>
          <a href="https://wa.me/972546302880?text=Hi%2C%20I%27m%20interested%20in%20GATE%20Jerusalem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white px-6 py-3 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            <span className="font-medium">WhatsApp</span>
          </a>
          <button onClick={copyPhone} className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="font-medium">{copied ? t.copied : t.copyNumber}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
