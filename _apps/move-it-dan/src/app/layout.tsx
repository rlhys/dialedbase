import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.summary,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.summary,
    url: `https://${site.domain}`,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} ${condensed.variable} h-full antialiased`}
    >
      <body className="atmosphere relative flex min-h-full flex-col font-sans text-ink">
        <SmoothScroll>
          <Header />
          <main className="flex-1 pb-24 lg:pb-0">{children}</main>
          <Footer />
          <MobileCtaBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
