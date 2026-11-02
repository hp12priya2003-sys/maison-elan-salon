import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAISON ÉLAN — Your Hair. Your Signature.",
  description:
    "A considered approach to beautiful hair. Discover signature cuts, colour, restorative rituals and occasion styling at MAISON ÉLAN.",
  applicationName: "MAISON ÉLAN",
  keywords: ["luxury salon", "hair studio", "hair colour", "balayage", "hair styling", "beauty atelier"],
  openGraph: {
    title: "MAISON ÉLAN — Your Hair. Your Signature.",
    description: "Thoughtful styling, beautiful transformations and rituals designed around you.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f0e9"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
