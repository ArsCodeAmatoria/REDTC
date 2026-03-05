"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-accent-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">REDTC</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/test" className="hover:text-foreground transition-colors">
                Practice Test
              </Link>
              <Link href="/test/review" className="hover:text-foreground transition-colors">
                Question Bank
              </Link>
            </nav>
          </div>
          <p className="text-sm text-muted-foreground">
            Made by{" "}
            <a
              href="https://bigfootcrane.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              Bigfoot Crane
            </a>
            {" "}– 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
