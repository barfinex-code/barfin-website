import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource/ibm-plex-mono/cyrillic-ext-400.css";
import "@fontsource/ibm-plex-mono/cyrillic-ext-500.css";
import "@fontsource/ibm-plex-mono/cyrillic-400.css";
import "@fontsource/ibm-plex-mono/cyrillic-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://barfin.org"),
  title: {
    default: "Barfin Network Limited — Болашақты жасайтын технологиялар",
    template: "%s · Barfin Network Limited",
  },
  description: "Мүмкін емес идеяларды жұмыс істейтін цифрлық жүйелерге айналдырамыз.",
  applicationName: "Barfin Network Limited",
  creator: "Barfin Network Limited",
  publisher: "Barfin Network Limited",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Barfin Network Limited",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barfin Network Limited",
    description: "Болашақ алдымен ғажайып сияқты көрінеді.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061016",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
