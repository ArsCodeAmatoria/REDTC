"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="border-b-2 border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity"
        >
          Master TC
        </Link>
      </div>
    </header>
  );
}
