import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/ru", "/en"].map((path) => ({
    url: `https://barfin.org${path}`,
    lastModified: new Date("2026-09-15"),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
    alternates: {
      languages: {
        kk: "https://barfin.org/",
        ru: "https://barfin.org/ru",
        en: "https://barfin.org/en",
      },
    },
  }));
}
