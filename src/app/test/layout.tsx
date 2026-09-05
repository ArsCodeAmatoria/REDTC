import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Practice Tests",
  description:
    "Choose a paper — Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, or mixed practice. Instant explanations after every question.",
  path: "/test",
});

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
