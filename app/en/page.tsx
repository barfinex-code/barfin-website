import type { Metadata } from "next";
import { Landing } from "../../components/Landing";
import { metadataFor } from "../../lib/seo";

export const metadata: Metadata = metadataFor("en", "/en");

export default function EnglishHome() {
  return <Landing locale="en" />;
}
