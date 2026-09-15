import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

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
      <body className={`${manrope.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
