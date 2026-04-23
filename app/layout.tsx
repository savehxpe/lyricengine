import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rap Stitch — saveHXPE",
  description:
    "Rap Stitch Engine v2.0 — hip-hop ghostwriting & rhyme-map architecture for saveHXPE. Maseru Noir.",
  metadataBase: new URL("https://rapstitch.vercel.app"),
  openGraph: {
    title: "Rap Stitch — saveHXPE",
    description:
      "Stitch, flex, sing. Production-grade lyric engine built in the Maseru Noir aesthetic.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${spaceGrotesk.variable}`}
    >
      <body className="noise-bg min-h-screen font-mono">{children}</body>
    </html>
  );
}
