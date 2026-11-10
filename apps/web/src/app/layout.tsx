import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/shell/providers";
import { densityBootScript } from "@/lib/preferences-boot";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "PropertyPilot", template: "%s | PropertyPilot" },
  description: "Vendor insurance tracking and site operations for commercial property teams.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#10151b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: densityBootScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
