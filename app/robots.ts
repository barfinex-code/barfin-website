import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://barfin.org/sitemap.xml",
    host: "https://barfin.org",
  };
}
