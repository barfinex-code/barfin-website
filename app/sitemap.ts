import type { MetadataRoute } from "next";
import { CONTENT_UPDATED_AT, SITE_URL, localePaths } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    kk: `${SITE_URL}/`,
    ru: `${SITE_URL}/ru`,
    en: `${SITE_URL}/en`,
    "x-default": `${SITE_URL}/`,
  };
  return Object.values(localePaths).map((path) => ({
    url: new URL(path, SITE_URL).href,
    lastModified: new Date(CONTENT_UPDATED_AT),
    alternates: { languages },
  }));
}
