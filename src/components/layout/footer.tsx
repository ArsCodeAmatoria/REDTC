"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop: Single row | Mobile: Stacked */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-h-[44px]">
            <div className="w-6 h-6 bg-accent flex items-center justify-center">
              <span className="text-sm font-black text-accent-foreground">R</span>
            </div>
            <span className="font-display text-lg font-bold tracking-tight">REDTC</span>
          </Link>
          
          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/test" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">
              Practice
            </Link>
            <Link href="/test/master" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">
              Master
            </Link>
            <Link href="/test/review" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">
              Review
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
