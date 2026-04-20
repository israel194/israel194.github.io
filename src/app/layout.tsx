import type { Metadata } from "next";
import { Heebo, Inter, Noto_Sans_Arabic, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  variable: "--font-frank",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://za-cpa.com"),
  title: "GATE Jerusalem — Office Floors for Sale",
  description:
    "Office floors for sale in GATE Tower, Jerusalem. 1,550-1,700 sqm, LEED certified, 32 min to Tel Aviv. 30/70 payment terms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${heebo.variable} ${inter.variable} ${notoArabic.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
