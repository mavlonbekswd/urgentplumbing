import type { Metadata, Viewport } from "next";
import { Barlow, Source_Sans_3 } from "next/font/google";
import { business } from "@/data/business";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

// Fonts are downloaded at build time and served from this domain — no requests to Google
// from visitors' browsers.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} | Local Plumbing & Drainage`,
    template: `%s | ${business.name}`,
  },
  description: `Local plumbing and drainage for homes and businesses across ${business.base.town} and surrounding areas. Call ${business.phone.display}.`,
  applicationName: business.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: business.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#014373",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${barlow.variable} ${sourceSans.variable}`}>
      <body className="pb-callbar">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
