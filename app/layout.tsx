import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وزير الحلو | Wazeer ElHelw",
  description:
    "A cinematic bilingual website for Wazeer ElHelw, a premium Middle Eastern dessert and dairy brand rooted in Cairo and Amman.",
  keywords: [
    "وزير الحلو",
    "Wazeer ElHelw",
    "Arabic desserts",
    "Middle Eastern desserts",
    "rice pudding",
    "Oriental sweets",
    "dairy desserts"
  ],
  openGraph: {
    title: "وزير الحلو | Wazeer ElHelw",
    description:
      "Luxury Arabic dessert storytelling meets modern polish.",
    type: "website",
    locale: "ar_EG"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
