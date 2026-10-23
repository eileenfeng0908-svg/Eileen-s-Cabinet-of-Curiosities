import type { Metadata, Viewport } from "next";
import { DM_Mono, Fraunces, Inter, Send_Flowers } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";

// Fraunces: a soft, slightly "wonky" old-style display face with optical sizes.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// DM Mono: the typewriter voice of archival labels and catalogue numbers.
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

// Send Flowers: a curly, hand-drawn script for accent words only
// (the free stand-in for Whimsy May).
const sendFlowers = Send_Flowers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-send-flowers",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — A Personal Digital Archive`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — A Personal Digital Archive`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f2e9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmMono.variable} ${sendFlowers.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <div aria-hidden className="paper-grain" />
      </body>
    </html>
  );
}
