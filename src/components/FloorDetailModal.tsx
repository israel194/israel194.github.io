"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "./LandingPage";
import { useCurrency } from "./CurrencyProvider";
import { getFloorData, getUnitPrice, type FloorUnit } from "@/lib/floorUnitsData";
import TabuIcon from "./TabuIcon";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

const directionLabels: Record<string, Record<string, string>> = {
  he: { SW: "דרום-מערב", NW: "צפון-מערב", NE: "צפון-מזרח", SE: "דרום-מזרח" },
  en: { SW: "South-West", NW: "North-West", NE: "North-East", SE: "South-East" },
  ar: { SW: "جنوب-غرب", NW: "شمال-غرب", NE: "شمال-شرق", SE: "جنوب-شرق" },
};

type SortKey = "model" | "direction" | "netSqm" | "balcony" | "shelter" | "pricingSqm" | "price";
type SortDir = "asc" | "desc";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="inline-block w-3 ms-1" />;
  return (
    <svg className={`w-3 h-3 inline-block ms-1 text-white/80 transition-transform ${dir === "desc" ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 2l4 5H2z" />
    </svg>
  );
}

export default function FloorDetailModal({
  floorNumber,
  onClose,
}: {
  floorNumber: number;
  onClose: () => void;
}) {
  const { dict, lang } = useI18n();
  const { fmtPrice } = useCurrency();
  const t = dict.floorDetail;
  const floor = getFloorData(floorNumber);

  const [sortKey, setSortKey] = useState<SortKey>("model");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterDirection, setFilterDirection] = useState<string>("all");
  const [filterModel, setFilterModel] = useState<string>("all");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!floor) return null;

  const dirs = directionLabels[lang] || directionLabels.en;

  // Get unique directions and models for filters
  const allDirections = [...new Set(floor.units.map((u) => u.direction))];
  const allModels = floor.units.map((u) => u.model);

  // Filter
  let filtered = floor.units;
  if (filterDirection !== "all") {
    filtered = filtered.filter((u) => u.direction === filterDirection);
  }
  if (filterModel !== "all") {
    filtered = filtered.filter((u) => u.model === filterModel);
  }

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let va: number | string;
    let vb: number | string;
    if (sortKey === "price") {
      va = getUnitPrice(a, floor.pricePerSqm);
      vb = getUnitPrice(b, floor.pricePerSqm);
    } else if (sortKey === "model" || sortKey === "direction") {
      va = a[sortKey];
      vb = b[sortKey];
    } else {
      va = a[sortKey];
      vb = b[sortKey];
    }
    if (va < vb) return sortDir === "asc" ? -1 : 1;
    if (va > vb) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function ThCell({ k, children, end }: { k: SortKey; children: React.ReactNode; end?: boolean }) {
    const active = sortKey === k;
    return (
      <th
        onClick={() => toggleSort(k)}
        className={`px-2 py-2.5 font-medium cursor-pointer select-none whitespace-nowrap ${end ? "text-end" : "text-start"}`}
      >
        {children}
        <SortIcon active={active} dir={sortDir} />
      </th>
    );
  }

  // Totals for filtered rows
  const totalNet = filtered.reduce((s, u) => s + u.netSqm, 0);
  const totalBalcony = filtered.reduce((s, u) => s + u.balcony, 0);
  const totalShelter = filtered.reduce((s, u) => s + u.shelter, 0);
  const totalPricing = filtered.reduce((s, u) => s + u.pricingSqm, 0);
  const totalPrice = filtered.reduce((s, u) => s + getUnitPrice(u, floor.pricePerSqm), 0);

  const hasActiveFilter = filterDirection !== "all" || filterModel !== "all";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4 md:p-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-4"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-navy text-white rounded-t-2xl px-6 py-4 flex items-center justify-between">
            <div className="flex-1 text-center">
              <h2 className="text-xl md:text-2xl font-bold">
                {t.floorPlan} {floorNumber}
              </h2>
              <p className="text-white/70 text-sm mt-0.5">
                {fmt(floor.grossSqm)} {dict.common.sqm} {t.gross}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabu Note */}
          <div className="mx-4 md:mx-6 mt-4 bg-gold/10 border border-gold/20 rounded-xl px-4 py-3 flex items-center justify-center gap-3">
            <TabuIcon className="w-5 h-5 text-gold-dark shrink-0" />
            <span className="text-sm text-navy font-medium text-center">{dict.floors.tabuNote}</span>
          </div>

          {/* Floor Plan PDF */}
          <div className="p-4 md:p-6">
            <div className="bg-gray-light rounded-xl overflow-hidden mb-6">
              <object
                data={floor.planPdf}
                type="application/pdf"
                className="w-full hidden md:block"
                style={{ height: "500px" }}
              >
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">{t.pdfFallback}</p>
                </div>
              </object>
              <div className="md:hidden flex flex-col items-center justify-center py-8">
                <svg className="w-12 h-12 mb-3 text-navy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-gray-500 mb-3">{t.viewPlanMobile}</p>
              </div>
              <div className="text-center pb-4">
                <a
                  href={floor.planPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t.downloadPlan}
                </a>
              </div>
            </div>

            {/* Area Table */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                <h3 className="text-lg font-bold text-navy text-center w-full">{t.areaTable}</h3>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <select
                    value={filterModel}
                    onChange={(e) => setFilterModel(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-navy focus:ring-1 focus:ring-gold focus:border-gold outline-none"
                  >
                    <option value="all">{t.allUnits}</option>
                    {allModels.map((m) => (
                      <option key={m} value={m}>{t.unit} {m}</option>
                    ))}
                  </select>

                  <select
                    value={filterDirection}
                    onChange={(e) => setFilterDirection(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-navy focus:ring-1 focus:ring-gold focus:border-gold outline-none"
                  >
                    <option value="all">{t.allDirections}</option>
                    {allDirections.map((d) => (
                      <option key={d} value={d}>{dirs[d]}</option>
                    ))}
                  </select>

                  {hasActiveFilter && (
                    <button
                      onClick={() => { setFilterModel("all"); setFilterDirection("all"); }}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      {t.clearFilters}
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile: card layout */}
              <div className="md:hidden flex flex-col gap-3">
                {sorted.map((unit) => {
                  const price = getUnitPrice(unit, floor.pricePerSqm);
                  return (
                    <div key={unit.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-navy/10 text-navy font-bold text-sm">{unit.model}</span>
                          <span className="text-gray-400 text-xs font-mono">{unit.id}</span>
                        </div>
                        <span className="text-xs text-gray-500">{dirs[unit.direction]}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div><span className="text-gray-400 text-xs">{t.netArea}</span><div className="font-medium">{fmt(unit.netSqm)}</div></div>
                        <div><span className="text-gray-400 text-xs">{t.pricingArea}</span><div className="font-medium text-navy">{fmt(unit.pricingSqm)}</div></div>
                        {unit.balcony > 0 && <div><span className="text-gray-400 text-xs">{t.balcony}</span><div className="text-gray-500">{fmt(unit.balcony)}</div></div>}
                        {unit.shelter > 0 && <div><span className="text-gray-400 text-xs">{t.shelter}</span><div className="text-gray-500">{fmt(unit.shelter)}</div></div>}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 text-end">
                        <span className="text-xs text-gray-400">{t.unitPrice}</span>
                        <div className="text-lg font-bold text-gold-dark">{fmtPrice(price)}</div>
                      </div>
                    </div>
                  );
                })}
                {sorted.length === 0 && (
                  <div className="py-8 text-center text-gray-400 text-sm">{t.noResults}</div>
                )}
                <div className="bg-navy/5 rounded-xl p-4 font-bold text-sm">
                  <div className="flex justify-between mb-1"><span>{t.total} {hasActiveFilter && `(${filtered.length}/${floor.units.length})`}</span></div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-400 text-xs font-normal">{t.netArea}</span><div>{fmt(totalNet)}</div></div>
                    <div><span className="text-gray-400 text-xs font-normal">{t.pricingArea}</span><div className="text-navy">{fmt(totalPricing)}</div></div>
                  </div>
                  <div className="mt-2 text-end text-gold-dark">{fmtPrice(totalPrice)}</div>
                </div>
              </div>

              {/* Desktop: table layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-navy text-white text-xs">
                      <th className="px-2 py-2.5 text-start font-medium">{t.unitId}</th>
                      <ThCell k="model">{t.unit}</ThCell>
                      <ThCell k="direction">{t.direction}</ThCell>
                      <ThCell k="netSqm" end>{t.netArea}</ThCell>
                      <ThCell k="balcony" end>{t.balcony}</ThCell>
                      <ThCell k="shelter" end>{t.shelter}</ThCell>
                      <ThCell k="pricingSqm" end>{t.pricingArea}</ThCell>
                      <ThCell k="price" end>{t.unitPrice}</ThCell>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((unit, i) => {
                      const price = getUnitPrice(unit, floor.pricePerSqm);
                      return (
                        <tr
                          key={unit.id}
                          className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"} hover:bg-gold/5 transition-colors`}
                        >
                          <td className="px-2 py-2.5 text-gray-400 text-xs font-mono">
                            {unit.id}
                          </td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-navy/10 text-navy font-bold text-xs">
                              {unit.model}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 text-gray-600 text-xs">
                            {dirs[unit.direction]}
                          </td>
                          <td className="px-2 py-2.5 text-end font-medium">
                            {fmt(unit.netSqm)}
                          </td>
                          <td className="px-2 py-2.5 text-end text-gray-500">
                            {unit.balcony > 0 ? fmt(unit.balcony) : "—"}
                          </td>
                          <td className="px-2 py-2.5 text-end text-gray-500">
                            {unit.shelter > 0 ? fmt(unit.shelter) : "—"}
                          </td>
                          <td className="px-2 py-2.5 text-end font-medium text-navy">
                            {fmt(unit.pricingSqm)}
                          </td>
                          <td className="px-2 py-2.5 text-end font-bold text-gold-dark">
                            {fmtPrice(price)}
                          </td>
                        </tr>
                      );
                    })}
                    {sorted.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-3 py-8 text-center text-gray-400 text-sm">{t.noResults}</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-navy/5 font-bold text-sm">
                      <td className="px-2 py-3" colSpan={3}>
                        {t.total} {hasActiveFilter && `(${filtered.length}/${floor.units.length})`}
                      </td>
                      <td className="px-2 py-3 text-end">{fmt(totalNet)}</td>
                      <td className="px-2 py-3 text-end text-gray-500">{totalBalcony > 0 ? fmt(totalBalcony) : "—"}</td>
                      <td className="px-2 py-3 text-end text-gray-500">{totalShelter > 0 ? fmt(totalShelter) : "—"}</td>
                      <td className="px-2 py-3 text-end text-navy">{fmt(totalPricing)}</td>
                      <td className="px-2 py-3 text-end text-gold-dark">{fmtPrice(totalPrice)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">{t.sqmNote}</p>
            </div>

            {/* Price Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-navy/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{t.pricePerSqm}</div>
                <div className="text-lg font-bold text-navy">{fmtPrice(floor.pricePerSqm)}</div>
              </div>
              <div className="bg-navy/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{t.totalFloorPrice}</div>
                <div className="text-lg font-bold text-gold-dark">{fmtPrice(floor.totalPrice)}</div>
              </div>
              <div className="bg-navy/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{t.parkingSpots}</div>
                <div className="text-lg font-bold text-navy">{floor.parking}</div>
                <div className="text-xs text-gray-400">{fmtPrice(250000)} + {t.vat}</div>
              </div>
              <div className="bg-navy/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{t.payment}</div>
                <div className="text-lg font-bold text-navy">30/70</div>
                <div className="text-xs text-gray-400">{t.paymentDesc}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact"
                onClick={() => {
                  sessionStorage.setItem("selectedFloor", String(floorNumber));
                  onClose();
                }}
                className="flex-1 text-center bg-gold hover:bg-gold-light text-navy font-bold py-3 px-6 rounded-xl transition-colors"
              >
                {t.cta} {floorNumber}
              </a>
              <a
                href={floor.planPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-navy hover:bg-navy-light text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                {t.downloadPlan}
              </a>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">{t.disclaimer}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
