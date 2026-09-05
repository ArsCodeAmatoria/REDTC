import type { MetadataRoute } from "next";
import loadChartData from "@/data/load-chart-questions.json";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/test`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/test/master`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/test/review`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/load-charts`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const charts: MetadataRoute.Sitemap = loadChartData.charts.map((chart) => ({
    url: `${SITE_URL}/load-charts/${chart.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...charts];
}
