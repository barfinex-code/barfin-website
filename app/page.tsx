import type { Metadata } from "next";
import { Landing } from "../components/Landing";
import { metadataFor } from "../lib/content";

export const metadata: Metadata = metadataFor("kk", "/");

export default function Home() {
  return <Landing locale="kk" />;
}
