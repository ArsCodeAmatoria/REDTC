"use client";

const FORMULAS: { name: string; full: string; abbr: string }[] = [
  { name: "Cube", full: "length × width × height × unit weight", abbr: "L × w × H × U.W." },
  { name: "Cylinder", full: "π × D²/4 × length × unit weight", abbr: "π × D²/4 × L × U.W." },
  { name: "Hollow ball", full: "π × D × D × thickness × unit weight", abbr: "π × D × D × T × U.W." },
  { name: "Load (share)", full: "y/z × weight", abbr: "y/z × W" },
  { name: "Pipe", full: "π × D × length × thickness × unit weight", abbr: "π × D × L × T × U.W." },
  { name: "Pipe (mean Ø)", full: "π × mean Ø × length × thickness × unit weight", abbr: "π × M.D. × L × T × U.W." },
  { name: "Plate steel", full: "length × width × thickness × unit weight", abbr: "L × w × T × U.W." },
  { name: "Solid cylinder", full: "π × r² × length", abbr: "π r² × L" },
  { name: "Stress", full: "width / (# slings × length / height)", abbr: "w / (# slings × L/H)" },
  { name: "Tandem lift", full: "weight × diameter = weight × diameter", abbr: "W × D = W × D" },
  { name: "Tension", full: "# lines × safe load / (2 × height)", abbr: "# lines × S.L. / (2 × H)" },
  { name: "Wedge", full: "width × length/2 × height × unit weight", abbr: "w × L/2 × H × U.W." },
];

const ACRONYMS: { abbr: string; name: string }[] = [
  { abbr: "COG", name: "centre of gravity" },
  { abbr: "CSA", name: "Canadian Standards Association" },
  { abbr: "ASME", name: "American Society of Mechanical Engineers" },
  { abbr: "LMI", name: "load moment indicator" },
  { abbr: "WLL", name: "working load limit" },
  { abbr: "OHS", name: "Occupational Health and Safety" },
  { abbr: "PPE", name: "personal protective equipment" },
  { abbr: "NDT", name: "non-destructive testing" },
  { abbr: "PSLP", name: "permissible single line pull" },
  { abbr: "IWRC", name: "independent wire rope core" },
  { abbr: "EIPS", name: "extra improved plough steel" },
  { abbr: "FLHA", name: "field level hazard assessment" },
];

interface FormulaSheetProps {
  open: boolean;
  onClose: () => void;
}

export function FormulaSheet({ open, onClose }: FormulaSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close formula sheet"
        onClick={onClose}
      />
      <div className="relative z-10 w-full sm:max-w-lg max-h-[85vh] overflow-y-auto bg-background border border-border p-5 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="category-label">Supplied at the sitting</p>
            <h2 className="font-display text-xl font-bold mt-1">Formulas & acronyms</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Same sheet Red Seal provides. π = 3.14. No code book.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 pr-2 font-medium">Shape</th>
              <th className="py-2 font-medium">Formula</th>
            </tr>
          </thead>
          <tbody>
            {FORMULAS.map((row) => (
              <tr key={row.name} className="border-b border-border/60 align-top">
                <td className="py-2 pr-2 font-medium whitespace-nowrap">{row.name}</td>
                <td className="py-2 font-mono text-[11px] leading-relaxed">{row.abbr}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <p className="text-xs font-medium mb-2">Acronyms</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {ACRONYMS.map((item) => (
              <div key={item.abbr} className="flex gap-2">
                <dt className="font-mono font-semibold w-12 shrink-0">{item.abbr}</dt>
                <dd className="text-muted-foreground">{item.name}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
