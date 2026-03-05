"use client";

import Link from "next/link";
import { FileSpreadsheet, BookOpen, GraduationCap, ListChecks } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="text-lg font-black text-accent-foreground">R</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight">REDTC</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Red Seal Tower Crane exam preparation. Master load charts, safety protocols, and operational knowledge.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>1000+ Questions</span>
              <span>•</span>
              <span>14 Load Charts</span>
            </div>
          </div>

          {/* Practice */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Practice</h3>
            <nav className="space-y-3">
              <Link href="/test" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="w-4 h-4" />
                Quick Quiz
              </Link>
              <Link href="/test/master" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <GraduationCap className="w-4 h-4" />
                Master Mode
              </Link>
              <Link href="/test/review" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ListChecks className="w-4 h-4" />
                Review All
              </Link>
            </nav>
          </div>

          {/* Load Charts */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Load Charts</h3>
            <nav className="space-y-3">
              <Link href="/load-charts" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <FileSpreadsheet className="w-4 h-4" />
                All Charts
              </Link>
              <div className="text-xs text-muted-foreground space-y-1 mt-2 pl-6">
                <p>Liebherr • Potain • Terex</p>
                <p>WOLFF • Krøll • Pecco</p>
              </div>
            </nav>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Topics Covered</h3>
            <div className="text-xs text-muted-foreground space-y-1.5">
              <p>Rigging & Load Calculations</p>
              <p>Crane Setup & Assembly</p>
              <p>Safety & Regulations</p>
              <p>Electrical Systems</p>
              <p>Signals & Communication</p>
              <p>Weather & Site Conditions</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} REDTC. For educational purposes only.
          </p>
          <p className="text-xs text-muted-foreground">
            Not affiliated with any certification body.
          </p>
        </div>
      </div>
    </footer>
  );
}
