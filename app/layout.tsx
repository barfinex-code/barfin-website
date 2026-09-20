import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource/ibm-plex-mono/cyrillic-ext-400.css";
import "@fontsource/ibm-plex-mono/cyrillic-ext-500.css";
import "@fontsource/ibm-plex-mono/cyrillic-400.css";
import "@fontsource/ibm-plex-mono/cyrillic-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./globals.css";
import "./editorial.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://barfin.org"),
  title: { default: "Barfin Network Limited", template: "%s · Barfin Network Limited" },
  applicationName: "Barfin Network Limited",
  creator: "Barfin Network Limited",
  publisher: "Barfin Network Limited",
  icons: { icon: "/icon.png", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061016",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Middleware derives this from the URL, never the visitor's language or a
  // user-supplied value. The initial server HTML has the correct language.
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-barfin-locale");
  const locale = requestedLocale === "ru" || requestedLocale === "en" ? requestedLocale : "kk";
  return <html lang={locale}><body>{children}</body></html>;
}
