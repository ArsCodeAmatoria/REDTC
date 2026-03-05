"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, FileSpreadsheet } from "lucide-react";

interface HeaderProps {
  rightContent?: React.ReactNode;
}

const chartsByType = {
  "Flat-Top & Hammerhead": [
    { id: "liebherr-470-ec-b", name: "Liebherr 470 EC-B", specs: "83m · 20t" },
    { id: "liebherr-550-ec-h", name: "Liebherr 550 EC-H", specs: "81m · 20t" },
    { id: "potain-mdt-189", name: "Potain MDT 189", specs: "60m · 8t" },
    { id: "potain-md-1600", name: "Potain MD 1600", specs: "80m · 64t" },
    { id: "terex-ctt-222-10", name: "Terex CTT 222-10", specs: "65m · 10t" },
    { id: "terex-sk-415-20", name: "Terex SK 415-20", specs: "80m · 20t" },
    { id: "kroll-k630f", name: "Krøll K630F", specs: "80m · 24t" },
    { id: "pecco-sk-180", name: "Pecco SK 180", specs: "60m · 12.5t" },
  ],
  "Luffing Jib": [
    { id: "liebherr-195-hc-lh", name: "Liebherr 195 HC-LH", specs: "55m · 12t" },
    { id: "liebherr-nc-lh-12-55", name: "Liebherr NC-LH 12-55", specs: "55m · 12t" },
    { id: "wolff-355-b-us", name: "WOLFF 355 B US", specs: "60m · 28t" },
    { id: "terex-ctl-260a-18", name: "Terex CTL 260A-18", specs: "60m · 18t" },
  ],
  "Self-Erecting": [
    { id: "liebherr-91-k", name: "Liebherr 91 K", specs: "48m · 6t" },
    { id: "potain-igo-t-139", name: "Potain Igo T 139", specs: "55m · 8t" },
  ],
};

export function Header({ rightContent }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 min-h-[44px] min-w-[44px]">
            <div className="w-8 h-8 bg-accent flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-black text-accent-foreground">R</span>
            </div>
            <span className="font-display text-xl font-black tracking-tight hidden sm:block">REDTC</span>
          </Link>
          {rightContent ? (
            rightContent
          ) : (
            <nav className="flex items-center gap-1">
              <Link href="/test" className="px-3 py-2 min-h-[44px] flex items-center text-sm font-bold hover:bg-muted transition-colors">
                Practice
              </Link>
              <Link href="/test/master" className="px-3 py-2 min-h-[44px] flex items-center text-sm font-bold hover:bg-muted transition-colors">
                Master
              </Link>
              
              {/* Charts Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-3 py-2 min-h-[44px] flex items-center gap-1 text-sm font-bold hover:bg-muted transition-colors"
                >
                  Charts
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="absolute right-0 top-full mt-1 w-72 bg-background border border-border shadow-lg">
                    {/* View All Link */}
                    <Link 
                      href="/load-charts" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b border-border hover:bg-muted transition-colors"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-accent" />
                      View All Charts
                      <span className="ml-auto text-xs text-muted-foreground">14 charts</span>
                    </Link>
                    
                    {/* Charts by Type */}
                    <div className="max-h-[60vh] overflow-y-auto">
                      {Object.entries(chartsByType).map(([type, charts]) => (
                        <div key={type}>
                          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 uppercase tracking-wider">
                            {type}
                          </div>
                          {charts.map((chart) => (
                            <Link
                              key={chart.id}
                              href={`/load-charts/${chart.id}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-between px-4 py-2 text-sm hover:bg-muted transition-colors"
                            >
                              <span>{chart.name}</span>
                              <span className="text-xs text-muted-foreground">{chart.specs}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
