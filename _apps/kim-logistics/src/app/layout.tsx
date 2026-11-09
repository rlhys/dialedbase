import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { brand } from "@/content/site";
import "./globals.css";

/** Geometric operator voice: Space Grotesk display + IBM Plex body. Distinct from Move It Dan. */
const display = Space_Grotesk({
  variable: "--font-kim-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans({
  variable: "--font-kim-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} | Removals in Coventry`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: `${brand.name} | Removals in Coventry`,
    description: brand.description,
    url: brand.url,
    siteName: brand.name,
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/fleet.jpg", alt: "Kim Logistics removal vans" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-ink">
        <SmoothScroll>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
