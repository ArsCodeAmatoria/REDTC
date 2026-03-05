"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ExternalLink, ArrowRight, Download, BookOpen, MousePointer, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import loadChartData from "@/data/load-chart-questions.json";

interface ChartSpec {
  maxCapacity?: string;
  maxJibLength?: string;
  tipCapacity?: string;
  maxHoistHeight?: string;
}

interface Chart {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  pdfFile: string;
  description: string;
  specifications?: ChartSpec;
  questions: Array<{ id: number }>;
}

export default function LoadChartsPage() {
  const charts = loadChartData.charts as Chart[];

  return (
    <div className="min-h-screen pt-14">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              Practice reading actual manufacturer load charts. Open the PDF in a separate tab 
              and answer questions based on real chart data.
            </p>
          </div>

          {/* How to Use Section */}
          <div className="mb-8 p-6 border border-border rounded-lg bg-muted/20">
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
                  Click "Open PDF" to view the load chart in a new browser tab. Keep it open for reference.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-bold">2</span>
                  <span className="font-medium">Start the Quiz</span>
                </div>
                <p className="text-sm text-muted-foreground pl-8">
                  Click "Start Quiz" and answer questions. Switch between tabs to find answers in the chart.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-bold">3</span>
                  <span className="font-medium">Learn Chart Reading</span>
                </div>
                <p className="text-sm text-muted-foreground pl-8">
                  Questions cover capacity lookups, radius limits, deductions, and lift planning scenarios.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Tip:</strong> Use two monitors or split your screen — chart on one side, quiz on the other. 
                This simulates real-world conditions where operators must reference charts while planning lifts.
              </p>
            </div>
          </div>

          {/* Charts List */}
          <div className="space-y-4">
            {charts.map((chart, index) => (
              <motion.div
                key={chart.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-accent uppercase tracking-wider">
                        {chart.manufacturer}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold">
                      {chart.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {chart.description}
                    </p>
                    
                    {/* Specifications */}
                    {chart.specifications && (
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
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
                        {chart.specifications.tipCapacity && (
                          <span className="text-muted-foreground">
                            <span className="text-foreground font-medium">Tip:</span> {chart.specifications.tipCapacity}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      {chart.questions.length} questions
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <a
                      href={`/load-charts/${chart.pdfFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Open PDF
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <Link href={`/load-charts/${chart.id}`}>
                      <Button className="w-full">
                        Start Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Covered */}
          <div className="mt-8 p-6 border border-border rounded-lg">
            <h3 className="font-semibold mb-4">Skills You'll Practice</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Reading capacity at specific radii</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Finding maximum radius for a given load</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Deducting hook block and rigging weight</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Understanding chart modes (LM 1, Load-Plus)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Interpreting chart notes and limitations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Real-world lift planning calculations</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
