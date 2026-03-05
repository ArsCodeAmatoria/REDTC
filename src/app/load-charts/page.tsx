"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ExternalLink, ArrowRight, BookOpen, CheckCircle, Building2, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import loadChartData from "@/data/load-chart-questions.json";

interface ChartSpec {
  maxCapacity?: string;
  maxJibLength?: string;
  tipCapacity?: string;
  maxHoistHeight?: string;
  maxTowerHeight?: string;
  loadMoment?: string;
}

interface Chart {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  type?: string;
  pdfFile: string;
  description: string;
  specifications?: ChartSpec;
  questions: Array<{ id: number }>;
}

type ChartSection = {
  title: string;
  description: string;
  icon: React.ReactNode;
  charts: Chart[];
};

function ChartCard({ chart, index }: { chart: Chart; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border border-border rounded-lg p-5 hover:border-accent/50 transition-colors bg-background"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              {chart.manufacturer}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold">
            {chart.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {chart.description}
          </p>
          
          {chart.specifications && (
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
              {chart.specifications.maxCapacity && (
                <span className="text-muted-foreground">
                  <span className="text-foreground font-medium">Max:</span> {chart.specifications.maxCapacity}
                </span>
              )}
              {chart.specifications.maxJibLength && (
                <span className="text-muted-foreground">
                  <span className="text-foreground font-medium">Jib:</span> {chart.specifications.maxJibLength}
                </span>
              )}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            {chart.questions.length} questions
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <a
            href={`/load-charts/${chart.pdfFile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-muted transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            Open PDF
            <ExternalLink className="h-3 w-3" />
          </a>
          <Link href={`/load-charts/${chart.id}`}>
            <Button size="sm" className="w-full">
              Start Quiz
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoadChartsPage() {
  const charts = loadChartData.charts as Chart[];
  
  const flatTopCharts = charts
    .filter(c => c.type === "flat-top" || c.type === "hammerhead")
    .sort((a, b) => {
      if (a.manufacturer !== b.manufacturer) {
        return a.manufacturer.localeCompare(b.manufacturer);
      }
      return a.name.localeCompare(b.name);
    });
  
  const luffingCharts = charts
    .filter(c => c.type === "luffing")
    .sort((a, b) => {
      if (a.manufacturer !== b.manufacturer) {
        return a.manufacturer.localeCompare(b.manufacturer);
      }
      return a.name.localeCompare(b.name);
    });
  
  const selfErectCharts = charts
    .filter(c => c.type === "self-erecting")
    .sort((a, b) => {
      if (a.manufacturer !== b.manufacturer) {
        return a.manufacturer.localeCompare(b.manufacturer);
      }
      return a.name.localeCompare(b.name);
    });

  const sections: ChartSection[] = [
    {
      title: "Flat-Top & Hammerhead Cranes",
      description: "Horizontal jib cranes with trolley travel. Common on large construction sites.",
      icon: <Building2 className="h-5 w-5" />,
      charts: flatTopCharts,
    },
    {
      title: "Luffing Jib Cranes",
      description: "Variable angle jibs for tight urban sites. Minimizes swing radius.",
      icon: <TrendingUp className="h-5 w-5" />,
      charts: luffingCharts,
    },
    {
      title: "Self-Erecting Cranes",
      description: "Compact cranes that fold for transport and erect themselves on site.",
      icon: <Zap className="h-5 w-5" />,
      charts: selfErectCharts,
    },
  ];

  const totalQuestions = charts.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <div className="min-h-screen pt-14">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Load Chart Practice
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2">
              Real Load Chart Reading
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Practice reading actual manufacturer load charts from Liebherr, Potain, and WOLFF. 
              {charts.length} crane charts with {totalQuestions} questions.
            </p>
          </div>

          {/* How to Use Section */}
          <div className="mb-10 p-6 border border-border rounded-lg bg-muted/20">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              How to Use This Section
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-bold">1</span>
                  <span className="font-medium">Open the Chart</span>
                </div>
                <p className="text-sm text-muted-foreground pl-8">
                  Click &quot;Open PDF&quot; to view the load chart in a new browser tab.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-bold">2</span>
                  <span className="font-medium">Start the Quiz</span>
                </div>
                <p className="text-sm text-muted-foreground pl-8">
                  Answer questions by referencing the chart. Switch between tabs as needed.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-bold">3</span>
                  <span className="font-medium">Learn Chart Reading</span>
                </div>
                <p className="text-sm text-muted-foreground pl-8">
                  Questions cover capacity lookups, deductions, and lift planning.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Tip:</strong> Use two monitors or split your screen — chart on one side, quiz on the other.
              </p>
            </div>
          </div>

          {/* Chart Sections */}
          <div className="space-y-10">
            {sections.map((section, sectionIndex) => (
              section.charts.length > 0 && (
                <div key={section.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center text-accent">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {section.charts.map((chart, index) => (
                      <ChartCard key={chart.id} chart={chart} index={index} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Skills Covered */}
          <div className="mt-10 p-6 border border-border rounded-lg">
            <h3 className="font-semibold mb-4">Skills You&apos;ll Practice</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Reading capacity at specific radii</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Finding maximum radius for loads</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Hook block and rigging deductions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Chart modes (LM 1, Load-Plus, Boost)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Reeving configurations (2-fall, 4-fall)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Level luffing and sway control</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Metric vs Imperial unit conversions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">ANSI vs FEM vs EN standards</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Real-world lift planning</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
