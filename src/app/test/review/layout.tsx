import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Question Bank",
  description:
    "Browse and review 1,250+ tower crane exam questions by topic, with explanations for every correct and incorrect answer.",
  path: "/test/review",
});

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
