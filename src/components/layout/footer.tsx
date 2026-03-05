"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-display text-lg font-bold tracking-tight">
              REDTC
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
              className="underline-hover text-foreground"
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
