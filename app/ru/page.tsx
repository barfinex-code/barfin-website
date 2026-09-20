import type { Metadata } from "next";
import { Landing } from "../../components/Landing";
import { metadataFor } from "../../lib/seo";

export const metadata: Metadata = metadataFor("ru", "/ru");

export default function RussianHome() {
  return <Landing locale="ru" />;
}
