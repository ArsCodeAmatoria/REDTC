"use client";

import Link from "next/link";

interface HeaderProps {
  rightContent?: React.ReactNode;
}

export function Header({ rightContent }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="text-xl font-black text-accent-foreground">R</span>
            </div>
            <span className="font-display text-xl font-black tracking-tight hidden sm:block">REDTC</span>
          </Link>
          {rightContent ? (
            rightContent
          ) : (
            <nav className="flex items-center gap-1 sm:gap-3">
              <Link href="/test" className="px-3 py-2 text-sm font-bold hover:bg-muted transition-colors">
                Practice
              </Link>
              <Link href="/test/master" className="px-3 py-2 text-sm font-bold hover:bg-muted transition-colors hidden sm:block">
                Master
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
