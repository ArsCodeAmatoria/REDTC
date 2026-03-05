"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ChartDisplayProps {
  questionText: string;
}

interface LoadChartRow {
  radius: string;
  gear1: string;
  gear2: string;
  gear3: string;
}

interface HoistChartRow {
  gear: string;
  maxLoad: string;
  speed: string;
}

function parseLoadChart(chartString: string): { rows: LoadChartRow[]; hookWeight: string } | null {
  const match = chartString.match(/LOAD CHART:\s*(.+?)\s*\(Hook block = (\d+)\s*kg\)/);
  if (!match) return null;

  const [, dataStr, hookWeight] = match;
  const segments = dataStr.split("|").map((s) => s.trim());
  
  const rows: LoadChartRow[] = [];
  for (const seg of segments) {
    const radiusMatch = seg.match(/(\d+)m→G1:(\d+)\/G2:(\d+)\/G3:(\d+)/);
    if (radiusMatch) {
      rows.push({
        radius: `${radiusMatch[1]} m`,
        gear1: formatNumber(radiusMatch[2]),
        gear2: formatNumber(radiusMatch[3]),
        gear3: formatNumber(radiusMatch[4]),
      });
    }
  }

  return rows.length > 0 ? { rows, hookWeight: `${hookWeight} kg` } : null;
}

function parseHoistChart(chartString: string): { rows: HoistChartRow[]; hookRigging: string } | null {
  const match = chartString.match(/HOIST CHART:\s*(.+?)\s*\|\s*Hook \+ rigging = (\d+)\s*kg/);
  if (!match) return null;

  const [, dataStr, hookRigging] = match;
  const segments = dataStr.split("|").map((s) => s.trim());

  const rows: HoistChartRow[] = [];
  for (const seg of segments) {
    const gearMatch = seg.match(/Gear (\d+) = ([\d,]+)\s*kg\s*\((\w+)\)/);
    if (gearMatch) {
      rows.push({
        gear: `Gear ${gearMatch[1]}`,
        maxLoad: `${gearMatch[2]} kg`,
        speed: gearMatch[3],
      });
    }
  }

  return rows.length > 0 ? { rows, hookRigging: `${hookRigging} kg` } : null;
}

function formatNumber(numStr: string): string {
  const num = parseInt(numStr, 10);
  return num.toLocaleString() + " kg";
}

interface RiggingAngleRow {
  angle: string;
  multiplier: string;
}

interface MaterialDensityRow {
  material: string;
  density: string;
}

function parseRiggingAngle(chartString: string): { rows: RiggingAngleRow[] } | null {
  if (!chartString.startsWith("RIGGING ANGLE MULTIPLIERS:")) return null;
  
  const rows: RiggingAngleRow[] = [
    { angle: "90°", multiplier: "1.0×" },
    { angle: "60°", multiplier: "1.15×" },
    { angle: "45°", multiplier: "1.41×" },
    { angle: "30°", multiplier: "2.0×" },
  ];
  
  return { rows };
}

function parseMaterialDensities(chartString: string): { rows: MaterialDensityRow[] } | null {
  if (!chartString.startsWith("MATERIAL DENSITIES:")) return null;
  
  const rows: MaterialDensityRow[] = [
    { material: "Concrete", density: "2,400 kg/m³" },
    { material: "Steel", density: "7,850 kg/m³" },
  ];
  
  return { rows };
}

function parsePartsOfLine(chartString: string): boolean {
  return chartString.startsWith("PARTS OF LINE FORMULA:");
}

function parseCapacityRule(chartString: string): boolean {
  return chartString.startsWith("CAPACITY RULE:");
}

function parseWindReduction(chartString: string): boolean {
  return chartString.startsWith("WIND REDUCTION FORMULA:");
}

function parseSailArea(chartString: string): boolean {
  return chartString.startsWith("SAIL AREA FORMULA:");
}

function parseLightningDistance(chartString: string): boolean {
  return chartString.startsWith("LIGHTNING DISTANCE:");
}

function parseOverlapRule(chartString: string): boolean {
  return chartString.startsWith("OVERLAP RULE:") || chartString.startsWith("OVERLAP FORMULA:");
}

function parseClearanceRule(chartString: string): boolean {
  return chartString.startsWith("CLEARANCE RULE:");
}

function parsePowerlineRule(chartString: string): boolean {
  return chartString.startsWith("POWERLINE RULE:");
}

function parseTotalLoadRule(chartString: string): boolean {
  return chartString.startsWith("TOTAL LOAD RULE:");
}

function parseOperatorRule(chartString: string): boolean {
  return chartString.startsWith("OPERATOR RULE:");
}

function extractQuestionText(fullText: string): string {
  if (fullText.startsWith("LOAD CHART:")) {
    const match = fullText.match(/\(Hook block = \d+\s*kg\)\s*—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("HOIST CHART:")) {
    const match = fullText.match(/Hook \+ rigging = \d+\s*kg\s*—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("RIGGING ANGLE MULTIPLIERS:")) {
    const match = fullText.match(/RIGGING ANGLE MULTIPLIERS:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("MATERIAL DENSITIES:")) {
    const match = fullText.match(/MATERIAL DENSITIES:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("PARTS OF LINE FORMULA:")) {
    const match = fullText.match(/PARTS OF LINE FORMULA:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("CAPACITY RULE:")) {
    const match = fullText.match(/CAPACITY RULE:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("WIND REDUCTION FORMULA:")) {
    const match = fullText.match(/WIND REDUCTION FORMULA:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("SAIL AREA FORMULA:")) {
    const match = fullText.match(/SAIL AREA FORMULA:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("LIGHTNING DISTANCE:")) {
    const match = fullText.match(/LIGHTNING DISTANCE:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("OVERLAP RULE:") || fullText.startsWith("OVERLAP FORMULA:")) {
    const match = fullText.match(/OVERLAP (?:RULE|FORMULA):[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("CLEARANCE RULE:")) {
    const match = fullText.match(/CLEARANCE RULE:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("POWERLINE RULE:")) {
    const match = fullText.match(/POWERLINE RULE:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("TOTAL LOAD RULE:")) {
    const match = fullText.match(/TOTAL LOAD RULE:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  if (fullText.startsWith("OPERATOR RULE:")) {
    const match = fullText.match(/OPERATOR RULE:[^—]+—\s*(.+)/);
    return match ? match[1] : fullText;
  }
  return fullText;
}

export function ChartDisplay({ questionText }: ChartDisplayProps) {
  const loadChart = parseLoadChart(questionText);
  const hoistChart = parseHoistChart(questionText);
  const riggingAngle = parseRiggingAngle(questionText);
  const materialDensities = parseMaterialDensities(questionText);
  const partsOfLine = parsePartsOfLine(questionText);
  const capacityRule = parseCapacityRule(questionText);
  const windReduction = parseWindReduction(questionText);
  const sailArea = parseSailArea(questionText);
  const lightningDistance = parseLightningDistance(questionText);
  const overlapRule = parseOverlapRule(questionText);
  const clearanceRule = parseClearanceRule(questionText);
  const powerlineRule = parsePowerlineRule(questionText);
  const totalLoadRule = parseTotalLoadRule(questionText);
  const operatorRule = parseOperatorRule(questionText);
  const actualQuestion = extractQuestionText(questionText);

  if (operatorRule) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Operator Rule
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Control motion with the <span className="text-green-400">motor</span> — hold position with the <span className="text-yellow-400">brake</span>
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (overlapRule) {
    const isFormula = questionText.startsWith("OVERLAP FORMULA:");
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {isFormula ? "Overlap Formula" : "Overlap Rule"}
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            {isFormula ? (
              "Overlap = (Jib A + Jib B) − Tower Distance"
            ) : (
              <><span className="text-red-400">&gt;18 m (60 ft)</span> overlap requires anti-collision</>
            )}
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (clearanceRule) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Clearance Rule
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Minimum <span className="text-yellow-400">2 ft</span> from structures
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (powerlineRule) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Powerline Rule
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Minimum <span className="text-red-400">10 ft</span> from lines under 50 kV
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Higher voltages require greater distance
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (totalLoadRule) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Total Load Rule
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Max Load = Chart Capacity − Hook Block − Rigging
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (sailArea) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Sail Area Formula
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Area = Length × Width
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Large flat loads act like sails in wind
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (lightningDistance) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Lightning Distance Rule
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            <span className="text-yellow-400">5 seconds</span> between flash and thunder ≈ <span className="text-yellow-400">1 mile</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Distance = Seconds ÷ 5
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (windReduction) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Wind Reduction Formula
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Safe Load = Chart Capacity × (1 - <span className="text-yellow-400">Reduction%</span>)
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Example: 20% reduction → multiply by 0.80
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (capacityRule) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Capacity Rule
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Safe Load = <span className="text-red-400">LOWEST</span> of:
          </div>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Radius Capacity (load chart)</li>
            <li>• Gear/Hoist Capacity</li>
          </ul>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (partsOfLine) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Parts of Line Formula
            </span>
          </div>
          <div className="font-mono text-sm sm:text-base text-foreground">
            Line Tension = Total Load ÷ Parts of Line
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Total Load = Load + Rigging + Hook Block
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (riggingAngle) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Rigging Angle Multipliers
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-foreground">Sling Angle</TableHead>
                <TableHead className="text-xs font-semibold text-foreground text-right">Tension Multiplier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riggingAngle.rows.map((row, i) => (
                <TableRow key={i} className="border-border/30 hover:bg-muted/50">
                  <TableCell className="font-medium text-xs sm:text-sm">{row.angle}</TableCell>
                  <TableCell className="text-right text-xs sm:text-sm tabular-nums">
                    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${
                      row.angle === "90°" 
                        ? "bg-green-500/10 text-green-400" 
                        : row.angle === "60°" 
                        ? "bg-green-500/10 text-green-400"
                        : row.angle === "45°"
                        ? "bg-yellow-500/10 text-yellow-400" 
                        : "bg-red-500/10 text-red-400"
                    }`}>
                      {row.multiplier}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (materialDensities) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Material Densities
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-foreground">Material</TableHead>
                <TableHead className="text-xs font-semibold text-foreground text-right">Density</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialDensities.rows.map((row, i) => (
                <TableRow key={i} className="border-border/30 hover:bg-muted/50">
                  <TableCell className="font-medium text-xs sm:text-sm">{row.material}</TableCell>
                  <TableCell className="text-right text-xs sm:text-sm tabular-nums">{row.density}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (loadChart) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Load Chart (Metric)
            </span>
            <span className="text-xs text-muted-foreground">
              Hook block: {loadChart.hookWeight}
            </span>
          </div>
          <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-foreground w-20">Radius</TableHead>
                  <TableHead className="text-xs font-semibold text-foreground text-right">Gear 1</TableHead>
                  <TableHead className="text-xs font-semibold text-foreground text-right">Gear 2</TableHead>
                  <TableHead className="text-xs font-semibold text-foreground text-right">Gear 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadChart.rows.map((row, i) => (
                  <TableRow key={i} className="border-border/30 hover:bg-muted/50">
                    <TableCell className="font-medium text-xs sm:text-sm">{row.radius}</TableCell>
                    <TableCell className="text-right text-xs sm:text-sm tabular-nums">{row.gear1}</TableCell>
                    <TableCell className="text-right text-xs sm:text-sm tabular-nums">{row.gear2}</TableCell>
                    <TableCell className="text-right text-xs sm:text-sm tabular-nums">{row.gear3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  if (hoistChart) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Hoist Chart
            </span>
            <span className="text-xs text-muted-foreground">
              Hook + rigging: {hoistChart.hookRigging}
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-foreground">Gear</TableHead>
                <TableHead className="text-xs font-semibold text-foreground text-right">Max Load</TableHead>
                <TableHead className="text-xs font-semibold text-foreground text-right">Speed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hoistChart.rows.map((row, i) => (
                <TableRow key={i} className="border-border/30 hover:bg-muted/50">
                  <TableCell className="font-medium text-xs sm:text-sm">{row.gear}</TableCell>
                  <TableCell className="text-right text-xs sm:text-sm tabular-nums">{row.maxLoad}</TableCell>
                  <TableCell className="text-right text-xs sm:text-sm">
                    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${
                      row.speed === "Slow" 
                        ? "bg-red-500/10 text-red-400" 
                        : row.speed === "Medium" 
                        ? "bg-yellow-500/10 text-yellow-400" 
                        : "bg-green-500/10 text-green-400"
                    }`}>
                      {row.speed}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {actualQuestion}
        </h2>
      </div>
    );
  }

  return (
    <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
      {questionText}
    </h2>
  );
}

export function hasChart(questionText: string): boolean {
  return questionText.startsWith("LOAD CHART:") || 
         questionText.startsWith("HOIST CHART:") ||
         questionText.startsWith("RIGGING ANGLE MULTIPLIERS:") ||
         questionText.startsWith("MATERIAL DENSITIES:") ||
         questionText.startsWith("PARTS OF LINE FORMULA:") ||
         questionText.startsWith("CAPACITY RULE:") ||
         questionText.startsWith("WIND REDUCTION FORMULA:") ||
         questionText.startsWith("SAIL AREA FORMULA:") ||
         questionText.startsWith("LIGHTNING DISTANCE:") ||
         questionText.startsWith("OVERLAP RULE:") ||
         questionText.startsWith("OVERLAP FORMULA:") ||
         questionText.startsWith("CLEARANCE RULE:") ||
         questionText.startsWith("POWERLINE RULE:") ||
         questionText.startsWith("TOTAL LOAD RULE:") ||
         questionText.startsWith("OPERATOR RULE:");
}
