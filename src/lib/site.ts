import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://redtc.vercel.app";

export const SITE_NAME = "REDTC";

export const SITE_TITLE = "REDTC — Red Seal Tower Crane Exam Practice";

export const SITE_DESCRIPTION =
  "Practice for your B.C. Red Seal Tower Crane Operator exam with 1,250+ questions tagged to Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, and real manufacturer load charts.";

export const SITE_KEYWORDS = [
  "tower crane",
  "red seal",
  "tower crane operator",
  "exam practice",
  "certification",
  "BC Crane Safety",
  "SkilledTradesBC",
  "Fulford",
  "load charts",
  "British Columbia",
  "crane operator exam",
  "Red Seal IP",
];

export const OG_IMAGE_ALT = "Tower crane operator — REDTC Red Seal exam practice";

export const OG_IMAGE = {
  url: `${SITE_URL}/og.jpg`,
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
  type: "image/jpeg",
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
