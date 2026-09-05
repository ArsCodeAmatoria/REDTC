import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Load Chart Practice",
  description:
    "Practice reading real Liebherr, Potain, WOLFF, Terex, Krøll, and Pecco load charts — flat-top, luffing, and self-erecting cranes.",
  path: "/load-charts",
});

export default function LoadChartsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
