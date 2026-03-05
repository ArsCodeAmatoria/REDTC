"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 min-h-[44px]">
              <div className="w-6 h-6 bg-accent flex items-center justify-center">
                <span className="text-sm font-black text-accent-foreground">R</span>
              </div>
              <span className="font-display text-lg font-bold tracking-tight">REDTC</span>
            </Link>
            <p className="text-sm text-muted-foreground">© 2026</p>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex items-center justify-center gap-6 text-sm text-muted-foreground border-t border-border pt-6 sm:border-0 sm:pt-0">
            <Link href="/test" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">
              Practice Test
            </Link>
            <Link href="/test/master" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">
              Master Exam
            </Link>
            <Link href="/test/review" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">
              Question Bank
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
