import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Master Exam",
  description:
    "100-question, 4-hour closed-book simulation of the Interprovincial Red Seal Tower Crane exam. Weighted to the 2023 RSOS. 70% to pass.",
  path: "/test/master",
});

export default function MasterExamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
