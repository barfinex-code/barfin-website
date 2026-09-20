import type { Metadata } from "next";
import type { Locale } from "./content";
import { overview } from "./overview";

export const SITE_URL = "https://barfin.org";
export const CONTENT_UPDATED_AT = "2026-09-20";
export const localePaths: Record<Locale, string> = { kk: "/", ru: "/ru", en: "/en" };
const ogLocales: Record<Locale, string> = { kk: "kk_KZ", ru: "ru_RU", en: "en_US" };

const searchCopy: Record<Locale, { title: string; description: string; imageAlt: string }> = {
  ru: {
    title: "ИИ, финтех и цифровые продукты",
    description: "Barfin Network Limited — технологическая компания из Астаны. Развиваем ИИ, финтех и образовательные продукты: Barfinex и BaniBanani.",
    imageAlt: "Barfin Network Limited — цифровые продукты и технологии",
  },
  en: {
    title: "AI, fintech and digital products",
    description: "Barfin Network Limited is a technology company in Astana, Kazakhstan. Explore our work in AI, fintech and education through Barfinex and BaniBanani.",
    imageAlt: "Barfin Network Limited — digital products and technology",
  },
  kk: {
    title: "ЖИ, финтех және цифрлық өнімдер",
    description: "Barfin Network Limited — Астанадағы технологиялық компания. Жасанды интеллект, финтех және білім беру: Barfinex пен BaniBanani жобаларымен танысыңыз.",
    imageAlt: "Barfin Network Limited — цифрлық өнімдер мен технологиялар",
  },
};

export function metadataFor(locale: Locale, path = localePaths[locale]): Metadata {
  const copy = searchCopy[locale];
  const title = `${copy.title} · Barfin Network Limited`;
  const image = { url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: copy.imageAlt };
  return {
    title: { absolute: title },
    description: copy.description,
    alternates: {
      canonical: new URL(path, SITE_URL).href,
      languages: {
        kk: `${SITE_URL}/`,
        ru: `${SITE_URL}/ru`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/`,
      },
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      type: "website",
      siteName: "Barfin Network Limited",
      title,
      description: copy.description,
      url: new URL(path, SITE_URL).href,
      locale: ogLocales[locale],
      alternateLocale: Object.entries(ogLocales).filter(([key]) => key !== locale).map(([, value]) => value),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [image] },
  };
}

export function structuredDataFor(locale: Locale) {
  const copy = overview[locale];
  const url = new URL(localePaths[locale], SITE_URL).href;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Barfin Network Limited",
        legalName: "Barfin Network Limited",
        url: `${SITE_URL}/`,
        description: copy.focus.intro,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
        address: { "@type": "PostalAddress", addressLocality: "Astana", addressCountry: "KZ" },
        identifier: { "@type": "PropertyValue", propertyID: "BIN", value: "221040900321" },
        brand: copy.projects.items.map((project) => ({ "@id": `${SITE_URL}/#${project.id}` })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: "Barfin Network Limited",
        alternateName: "Barfin",
        inLanguage: ["kk", "ru", "en"],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${searchCopy[locale].title} · Barfin Network Limited`,
        description: searchCopy[locale].description,
        inLanguage: locale,
        dateModified: CONTENT_UPDATED_AT,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": organizationId },
        about: { "@id": organizationId },
        mentions: copy.projects.items.map((project) => ({ "@id": `${SITE_URL}/#${project.id}` })),
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og.png`, width: 1200, height: 630 },
      },
      ...copy.projects.items.map((project) => ({
        "@type": "Brand",
        "@id": `${SITE_URL}/#${project.id}`,
        name: project.name,
        url: project.href,
        description: project.body,
      })),
    ],
  };
}

// Escape HTML-sensitive characters even though the data is editorial, not input.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
