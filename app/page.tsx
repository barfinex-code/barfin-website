import type { Metadata } from "next";
import { Landing } from "../components/Landing";
import { metadataFor } from "../lib/seo";

export const metadata: Metadata = metadataFor("kk", "/");

export default function Home() {
  return <Landing locale="kk" />;
}
