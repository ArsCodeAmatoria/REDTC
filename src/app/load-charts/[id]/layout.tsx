import type { Metadata } from "next";
import loadChartData from "@/data/load-chart-questions.json";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

export function generateMetadata({ params }: Props): Metadata {
  const chart = loadChartData.charts.find((c) => c.id === params.id);

  if (!chart) {
    return pageMetadata({
      title: "Load Chart",
      description: "Practice reading a manufacturer tower crane load chart.",
      path: `/load-charts/${params.id}`,
    });
  }

  return pageMetadata({
    title: `${chart.name} Load Chart`,
    description: `Practice reading the ${chart.manufacturer} ${chart.model} load chart. ${chart.questions.length} questions covering capacity, deductions, and lift planning.`,
    path: `/load-charts/${chart.id}`,
  });
}

export default function LoadChartQuizLayout({ children }: Props) {
  return children;
}
