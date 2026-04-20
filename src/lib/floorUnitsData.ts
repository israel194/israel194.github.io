export interface FloorUnit {
  id: string;
  model: string;
  netSqm: number;
  pricingSqm: number;
  balcony: number;
  shelter: number;
  direction: string;
}

export interface FloorData {
  number: number;
  pricePerSqm: number;
  grossSqm: number;
  netSqm: number;
  totalPrice: number;
  parking: number;
  zone: string;
  badgeKey: string;
  planPdf: string;
  units: FloorUnit[];
}

// Directions: SW = דר'-מע', NW = צפ'-מע', NE = צפ'-מז', SE = דר'-מז'
const DIR = { A: "SW", B: "SW", C: "NW", D: "NW", E: "NE", F: "NE", G: "SE", H: "SE" };

// Helper to build a unit
function u(id: string, model: string, net: number, pricing: number, balcony = 0, shelter = 0): FloorUnit {
  return { id, model, netSqm: net, pricingSqm: pricing, balcony, shelter, direction: DIR[model as keyof typeof DIR] };
}

// Floor 21 — from טבלאות-שטחים-summary.md (units 145-152)
const floor21Units: FloorUnit[] = [
  u("145", "A", 114, 156),
  u("146", "B", 131, 180),
  u("147", "C", 152, 235, 7, 23),
  u("148", "D", 141, 195, 3, 0),
  u("149", "E", 114, 156),
  u("150", "F", 131, 180),
  u("151", "G", 153, 236, 7, 23),
  u("152", "H", 141, 195, 3, 0),
];

// Floor 22 — from טבלאות-שטחים-summary.md (units 153-160)
const floor22Units: FloorUnit[] = [
  u("153", "A", 114, 156),
  u("154", "B", 131, 180),
  u("155", "C", 152, 235, 7, 23),
  u("156", "D", 143, 197, 2, 0),
  u("157", "E", 114, 156),
  u("158", "F", 131, 180),
  u("159", "G", 153, 236, 7, 23),
  u("160", "H", 143, 197, 2, 0),
];

// Floor 24 — from טבלאות-שטחים-summary.md (units 169-172)
const floor24Units: FloorUnit[] = [
  u("169-1", "A", 114, 156),
  u("169-2", "B", 131, 180),
  u("170-1", "C", 152, 236, 9, 23),
  u("170-2", "D", 146, 200),
  u("171-1", "E", 114, 156),
  u("171-2", "F", 131, 180),
  u("172-1", "G", 153, 237, 9, 23),
  u("172-2", "H", 146, 200),
];

// Floor 35 — from טבלאות-שטחים-summary.md
const floor35Units: FloorUnit[] = [
  u("221-1", "A", 114, 156),
  u("221-2", "B", 131, 180),
  u("222-1", "C", 179, 233, 3, 23),
  u("222-2", "D", 165, 228),
  u("223-1", "E", 114, 156),
  u("223-2", "F", 166, 229),
  u("224-1", "G", 214, 281, 3, 21),
  u("224-2", "H", 166, 228),
];

// Floor 37 — from טבלאות-שטחים-summary.md
const floor37Units: FloorUnit[] = [
  u("221-1", "A", 114, 156),
  u("221-2", "B", 131, 180),
  u("222-1", "C", 152, 232, 3, 23),
  u("222-2", "D", 169, 232),
  u("223-1", "E", 114, 156),
  u("223-2", "F", 166, 228),
  u("224-1", "G", 189, 281, 3, 21),
  u("224-2", "H", 169, 232),
];

export const floorsDetailData: FloorData[] = [
  {
    number: 21,
    pricePerSqm: 21000,
    grossSqm: 1550,
    netSqm: 1131,
    totalPrice: 32193000, // 1533 pricingSqm × 21,000
    parking: 8,
    zone: "Mid-High",
    badgeKey: "",
    planPdf: "/plans/floor-21.pdf",
    units: floor21Units,
  },
  {
    number: 22,
    pricePerSqm: 21000,
    grossSqm: 1550,
    netSqm: 1131,
    totalPrice: 32277000, // 1537 pricingSqm × 21,000
    parking: 8,
    zone: "Mid-High",
    badgeKey: "",
    planPdf: "/plans/floor-22.pdf",
    units: floor22Units,
  },
  {
    number: 24,
    pricePerSqm: 21000,
    grossSqm: 1550,
    netSqm: 1131,
    totalPrice: 32445000, // 1545 pricingSqm × 21,000
    parking: 8,
    zone: "Mid-High",
    badgeKey: "allElevators",
    planPdf: "/plans/floor-24.pdf",
    units: floor24Units,
  },
  {
    number: 35,
    pricePerSqm: 23500,
    grossSqm: 1700,
    netSqm: 1249,
    totalPrice: 39738500, // 1691 pricingSqm × 23,500
    parking: 8,
    zone: "Premium High",
    badgeKey: "panoramic",
    planPdf: "/plans/floor-35.pdf",
    units: floor35Units,
  },
  {
    number: 37,
    pricePerSqm: 25000,
    grossSqm: 1700,
    netSqm: 1249,
    totalPrice: 42425000, // 1697 pricingSqm × 25,000
    parking: 8,
    zone: "Premium High",
    badgeKey: "panoramic",
    planPdf: "/plans/floor-37.pdf",
    units: floor37Units,
  },
];

export function getFloorData(floorNumber: number): FloorData | undefined {
  return floorsDetailData.find((f) => f.number === floorNumber);
}

export function getUnitPrice(unit: FloorUnit, pricePerSqm: number): number {
  return unit.pricingSqm * pricePerSqm;
}
