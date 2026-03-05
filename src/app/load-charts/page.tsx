"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import loadChartData from "@/data/load-chart-questions.json";

export default function LoadChartsPage() {
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
              Practice reading actual manufacturer load charts. Each chart opens in a new tab 
              so you can reference it while answering questions.
            </p>
          </div>

          <div className="space-y-4">
            {loadChartData.charts.map((chart, index) => (
              <motion.div
                key={chart.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {chart.manufacturer}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold">
                      {chart.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {chart.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {chart.questions.length} questions
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={`/load-charts/${chart.pdfFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      View Chart
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <Link href={`/load-charts/${chart.id}`}>
                      <Button className="w-full sm:w-auto">
                        Start Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 border border-border rounded-lg bg-muted/20">
            <h3 className="font-semibold mb-2">How to Use</h3>
            <ol className="text-sm text-muted-foreground space-y-2">
              <li>1. Click "View Chart" to open the PDF load chart in a new browser tab</li>
              <li>2. Keep the chart open for reference</li>
              <li>3. Click "Start Quiz" to begin answering questions about that chart</li>
              <li>4. Use the load chart to find the correct answers</li>
            </ol>
          </div>

          <div className="mt-8 p-6 border border-accent/30 rounded-lg bg-accent/5">
            <h3 className="font-semibold text-accent mb-2">Add Your Own Charts</h3>
            <p className="text-sm text-muted-foreground">
              Place PDF files in the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">/public/load-charts/</code> folder. 
              Charts should match the filenames specified in the question bank.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
