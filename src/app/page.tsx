"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Award, HardHat, GraduationCap, Timer, FileSpreadsheet, Calculator, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import questionsData from "@/data/questions.json";

const QUESTION_COUNT = (questionsData as { id: number }[]).length;
const QUESTION_COUNT_LABEL = QUESTION_COUNT.toLocaleString("en-US");

const categories = [
  { name: "Load Charts & Parts of Line", count: 140, color: "bg-accent" },
  { name: "PDF Load Chart Practice", count: 201, color: "bg-accent", isCharts: true },
  { name: "Advanced Operations & Traps", count: 95, color: "bg-foreground" },
  { name: "Master Level Questions", count: 100, color: "bg-foreground" },
  { name: "Rigging & Sling Angles", count: 150, color: "bg-foreground" },
  { name: "Material Weight & Geometry", count: 80, color: "bg-foreground" },
  { name: "Structural & Mechanical", count: 70, color: "bg-foreground" },
  { name: "Gear, Drive & Capacity", count: 65, color: "bg-foreground" },
  { name: "Safety, Regulations & Comms", count: 60, color: "bg-foreground" },
  { name: "Weather & Environmental", count: 50, color: "bg-foreground" },
  { name: "Self-Erect & Remote Operation", count: 18, color: "bg-foreground" },
  { name: "Cab Controls & LMI", count: 48, color: "bg-foreground" },
  { name: "Test Blocks & Commissioning", count: 20, color: "bg-foreground" },
  { name: "12-Month Crane Certification", count: 20, color: "bg-foreground" },
  { name: "Tower Crane Erection", count: 20, color: "bg-foreground" },
  { name: "Climbing & Reconfiguration", count: 34, color: "bg-foreground" },
];

const features = [
  {
    label: "Practice",
    title: `${QUESTION_COUNT_LABEL} exam questions tagged to B.C. papers`,
    description: "Every question includes why the correct answer is right and why others are wrong.",
  },
  {
    label: "Charts",
    title: "Real manufacturer load charts (PDF)",
    description: "Practice reading actual Liebherr, Potain, WOLFF, Terex, Krøll, and Pecco load charts — flat-top, luffing, and self-erecting cranes.",
  },
  {
    label: "Pass",
    title: "70% pass rate mirrors real exam",
    description: "Practice tests simulate actual exam conditions with randomized questions.",
  },
];

const certificationSteps = [
  {
    step: "01",
    title: "Register",
    description: "Register with BC Crane Safety (required for every crane operator in B.C.), then enrol with SkilledTradesBC as an apprentice or trade qualifier with a sponsor employer.",
  },
  {
    step: "02",
    title: "Get Provisional Status",
    description: "Pass Fulford’s Level B provisional theory exam so you can operate under a written supervision plan while you train.",
  },
  {
    step: "03",
    title: "Train & Log Hours",
    description: "Complete two levels of technical training (175 + 140 hours) and 2,685 hours of work-based training. Log crane hours in SkillRecord Passport; your SkilledTradesBC sponsor reports apprenticeship hours in the Portal.",
  },
  {
    step: "04",
    title: "Pass Exams & Practical",
    description: "Pass SkilledTradesBC Level 1 and Level 2 exams, the Interprovincial Red Seal exam, and a Fulford practical assessment.",
  },
];

const examTopics = [
  { topic: "Occupational Skills", percentage: 11 },
  { topic: "Inspects & Maintains Crane", percentage: 21 },
  { topic: "Set-up, Calculations & Lift Planning", percentage: 23 },
  { topic: "Rigging", percentage: 17 },
  { topic: "Operates Crane", percentage: 28 },
];

const authorities = [
  {
    name: "WorkSafeBC",
    role: "Regulator",
    description: "OHS Regulation Part 14 (Cranes and Hoists) and Part 15 (Rigging) make operator certification mandatory and set the rules for lifts, signals, and equipment.",
    href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
  },
  {
    name: "BC Crane Safety",
    role: "Administrator",
    description: "Administers the B.C. and Yukon crane operator certification system. Registration is required before you train or operate. They do not deliver training or exams.",
    href: "https://bccranesafety.ca/",
  },
  {
    name: "SkilledTradesBC",
    role: "Apprenticeship",
    description: "Runs the Tower Crane Operator apprenticeship, Standardized Level Exams, the Red Seal exam sitting, and issues the B.C. Certificate of Qualification.",
    href: "https://skilledtradesbc.ca/tower-crane-operator",
  },
  {
    name: "Fulford Certification",
    role: "Testing partner",
    description: "Independent assessor for BC Crane Safety. Issues Level B provisional certificates and conducts the on-crane practical assessment for full-scope certification.",
    href: "https://fulford.ca/",
  },
  {
    name: "Red Seal Program",
    role: "National standard",
    description: "Sets the 2023 Red Seal Occupational Standard and the 100-question interprovincial exam. A Red Seal endorsement on your CofQ is recognized across Canada.",
    href: "https://www.red-seal.ca/eng/trades/tower-crane-op.shtml",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pt-14">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border bg-black overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-stretch lg:items-end pt-16 pb-12 lg:pt-24 lg:pb-16 min-w-0">
            {/* Left - Headline & CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8 min-w-0"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-2 py-1">BC Red Seal</span>
                <span className="text-xs sm:text-sm text-muted-foreground">Tower Crane Certification</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground max-w-3xl break-words">
                Master your<br />
                tower crane<br />
                <span className="text-accent">exam.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Practice with {QUESTION_COUNT_LABEL} questions tagged to Fulford Level B, SkilledTradesBC
                Level 1 and 2, Red Seal IP, and the load-chart practical — WorkSafeBC Part 14 and Part 15.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/test">
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                    Start Practice Test
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/load-charts">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Load Charts
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right - Stats Block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex w-full min-w-0 flex-col divide-y divide-x-0 border border-border sm:flex-row sm:divide-x sm:divide-y-0 lg:flex-col lg:divide-x-0 lg:divide-y shrink-0"
            >
              <div className="flex flex-1 flex-col gap-1 px-4 py-5 sm:min-w-0 sm:px-6 lg:px-8 lg:py-6">
                <div className="text-4xl sm:text-5xl font-display font-bold tabular-nums">{QUESTION_COUNT_LABEL}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="flex flex-1 flex-col gap-1 px-4 py-5 sm:min-w-0 sm:px-6 lg:px-8 lg:py-6">
                <div className="text-4xl sm:text-5xl font-display font-bold tabular-nums">70%</div>
                <div className="text-sm text-muted-foreground">Pass Mark</div>
              </div>
              <div className="flex flex-1 flex-col gap-1 px-4 py-5 sm:min-w-0 sm:px-6 lg:px-8 lg:py-6">
                <div className="text-4xl sm:text-5xl font-display font-bold tabular-nums">2023</div>
                <div className="text-sm text-muted-foreground">RSOS Exam</div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Strip - Coverage Tags */}
          <div className="border-t border-border py-5">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Covers</span>
              {["Real PDF load charts", "Capacity calculations", "Rigging fundamentals", "Crane operations", "Safety regulations"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Vox Style Cards */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="py-6 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0"
              >
                <span className="category-label">{feature.label}</span>
                <h3 className="font-display text-lg font-semibold mt-2 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Red Seal Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <span className="category-label">About</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">What is Red Seal Certification?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The <strong className="text-foreground">Red Seal Program</strong> is Canada’s interprovincial standard
                  of excellence in the skilled trades. A Red Seal endorsement on your provincial Certificate of Qualification
                  lets you work as a Tower Crane Operator in other Red Seal jurisdictions without rewriting the exam.
                </p>
                <p>
                  The current exam is based on the <strong className="text-foreground">2023 Red Seal Occupational Standard (RSOS)</strong>,
                  not the older National Occupational Analysis. Interprovincial exams were aligned to that standard in 2025.
                </p>
                <p>
                  In B.C., a Tower Crane Operator CofQ is still valid on its own. If you already hold one, you can add
                  the Red Seal endorsement by writing and passing the Interprovincial Red Seal exam through SkilledTradesBC.
                </p>
              </div>
            </div>
            <div className="bg-muted/30 p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Interprovincial Recognition</h3>
                  <p className="text-sm text-muted-foreground">Work in other Red Seal jurisdictions</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent flex items-center justify-center">
                  <HardHat className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">B.C. compulsory trade</h3>
                  <p className="text-sm text-muted-foreground">Skilled Trades Certification from July 5, 2027</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Career Advancement</h3>
                  <p className="text-sm text-muted-foreground">Higher wages and opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Does What */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="category-label">British Columbia</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Who runs certification in B.C.</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Five organizations share the system. Registration, testing, apprenticeship, and workplace law
              are separate jobs — mixing them up is a common source of bad exam-prep advice.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {authorities.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-background border border-border p-5 hover:border-accent transition-colors h-full"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-accent">{item.role}</span>
                <h3 className="font-display text-lg font-semibold mt-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SkilledTradesBC + SkillRecord Passport */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="category-label">Register and log hours</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">SkilledTradesBC and the Passport app</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Two official systems. SkilledTradesBC runs the apprenticeship and exams in a web portal.
              BC Crane Safety issues the SkillRecord Passport app for your crane logbook.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border border-border p-6 md:p-8 space-y-5 bg-background">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Apprenticeship</span>
                <h3 className="font-display text-2xl font-bold mt-1">SkilledTradesBC — Tower Crane Operator</h3>
                <p className="text-sm text-muted-foreground mt-3">
                  Two-level Red Seal trade. Register with a sponsor after BC Crane Safety registration.
                  Technical training is about nine weeks over two years (Level 1: 175 hours, Level 2: 140 hours).
                  Work-based training is 2,685 hours. Pass mark on level exams and the IP is 70%. No code book.
                </p>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  Book Level 1 SLE, Level 2 SLE, and the Red Seal IP; see results
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  Sponsors report work-based hours (every 3–6 months recommended)
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  Trade qualifier / challenge path: 3,000 crane-related hours
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  Compulsory trade after July 5, 2027 — apprentice, trade qualifier, or journeyperson
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://skilledtradesbc.ca/tower-crane-operator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-4 bg-accent text-accent-foreground text-sm font-bold hover:bg-accent/90"
                >
                  Tower Crane Operator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="https://portal.skilledtradesbc.ca/Account/Login/Register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-4 border border-border text-sm font-medium hover:bg-muted"
                >
                  Create a Portal account
                </a>
                <a
                  href="https://portal.skilledtradesbc.ca/Account/Login/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-4 border border-border text-sm font-medium hover:bg-muted"
                >
                  Portal sign-in
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                There is no SkilledTradesBC app on the App Store or Google Play. Hours toward your CofQ are reported in the{" "}
                <a
                  href="https://skilledtradesbc.ca/manage-apprenticeship-information-skilledtradesbc-portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-accent"
                >
                  SkilledTradesBC Portal
                </a>
                {" "}(mobile-friendly website). Customer service: 1-866-660-6011.
              </p>
            </div>

            <div className="border border-border p-6 md:p-8 space-y-5 bg-background">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Logbook app</span>
                  <h3 className="font-display text-2xl font-bold mt-1">SkillRecord Passport</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Free iOS and Android app provided to every BC Crane Safety member. This is the crane operator logbook
                (it replaced SkillRecord Logbook in April 2024). Provisional operators must keep a logbook; WorkSafeBC
                may ask to see it. SkilledTradesBC apprentices are expected to use it for operating hours.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  Log daily crane time, photos, and supervisor sign-offs
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  See your BC Crane Safety ID and current credentials
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  Sign in with the same email you used to register with BC Crane Safety
                </li>
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://apps.apple.com/ca/app/skillrecord-passport/id1606993730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Download SkillRecord Passport on the App Store"
                >
                  {/* Official Apple badge: https://toolbox.marketingtools.apple.com */}
                  <img
                    src="/images/store-badges/download-on-the-app-store-white.svg"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.skillrecord.skillspassport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Get SkillRecord Passport on Google Play"
                >
                  {/* Official Google Play badge: https://play.google.com/intl/en_us/badges/ */}
                  <img
                    src="/images/store-badges/get-it-on-google-play.png"
                    alt="Get it on Google Play"
                    width={134}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <a
                  href="https://bccranesafety.ca/resources/crane-operator-logbook/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-accent"
                >
                  Logbook &amp; Passport guide
                </a>
                <a
                  href="https://bccranesafety.ca/resources/crane-operator-logbook/skillrecord-passport-app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-accent"
                >
                  Get the app (BC Crane Safety)
                </a>
                <a
                  href="https://bccranesafety.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-accent"
                >
                  Register with BC Crane Safety first
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hour Requirements Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="category-label">Requirements</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">B.C. apprenticeship requirements</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Tower Crane Operator is a two-level Red Seal trade at SkilledTradesBC — not a three-level, 4,200-hour program.
              Technical training is typically nine weeks over two years.
            </p>
          </div>

          <div className="mb-10 border border-accent/40 bg-accent/5 p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Skilled Trades Certification</span>
                <h3 className="font-display text-xl font-semibold mt-1">Compulsory trade as of July 5, 2027</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
                  A one-year transition began July 6, 2026. After July 5, 2027, Tower Crane Operators in B.C. must be
                  a registered apprentice, a trade qualifier, or a certified journeyperson. Existing B.C. CofQ or
                  Red Seal holders already meet the requirement. Employers will also need a 2:1 apprentice-to-journeyperson ratio.
                </p>
              </div>
              <a
                href="https://skilledtradesbc.ca/skilledtradescertification"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent hover:underline shrink-0"
              >
                Official details
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-muted/20 border border-border p-6 text-center">
              <div className="text-5xl font-display font-bold text-accent">2,685</div>
              <div className="text-lg font-semibold mt-2">Work-Based Hours</div>
              <p className="text-sm text-muted-foreground mt-2">
                Apprenticeship hours logged with a sponsor, including at least 1,000 hours operating a tower crane
                with a mast of 90 ft or more, and 1,000 hours of documented rigging.
              </p>
            </div>
            <div className="bg-muted/20 border border-border p-6 text-center">
              <div className="text-5xl font-display font-bold">2</div>
              <div className="text-lg font-semibold mt-2">Technical Levels</div>
              <p className="text-sm text-muted-foreground mt-2">
                Level 1 is 175 hours (about 5 weeks) and Level 2 is 140 hours (about 4 weeks) at a
                SkilledTradesBC-designated training provider. Pass mark is 70% at each level.
              </p>
            </div>
            <div className="bg-muted/20 border border-border p-6 text-center">
              <div className="text-5xl font-display font-bold">3,000</div>
              <div className="text-lg font-semibold mt-2">Challenge Hours</div>
              <p className="text-sm text-muted-foreground mt-2">
                Experienced operators can apply as a trade qualifier with 3,000 crane-related hours
                (same 1,000-hour rigging and 90 ft mast operating minimums) instead of a full apprenticeship.
              </p>
            </div>
          </div>

          <div className="bg-muted/20 border border-border p-6">
            <h3 className="font-display text-xl font-semibold mb-4">What you still have to pass</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="font-medium">Fulford Level B</div>
                <div className="text-sm text-muted-foreground">40-question provisional theory exam, 70% to pass. Required to operate under supervision.</div>
              </div>
              <div>
                <div className="font-medium">Level 1 &amp; 2 SLEs</div>
                <div className="text-sm text-muted-foreground">SkilledTradesBC Standardized Level Exams. 70% each; Level 1 before Level 2.</div>
              </div>
              <div>
                <div className="font-medium">Red Seal IP Exam</div>
                <div className="text-sm text-muted-foreground">100 multiple-choice questions, 70% to pass, based on the 2023 RSOS.</div>
              </div>
              <div>
                <div className="font-medium">Fulford Practical</div>
                <div className="text-sm text-muted-foreground">On-crane full-scope assessment booked through Fulford after the written exams.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Path Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="category-label">Path to Certification</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How certification works in B.C.</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              BC Crane Safety registration first. Then SkilledTradesBC apprenticeship or challenge, Fulford testing, and the Red Seal exam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                <div className="border border-border p-6 h-full bg-background">
                  <div className="text-4xl font-display font-bold text-accent/30 mb-4">{item.step}</div>
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < certificationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Details Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="category-label">The Exam</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Red Seal Examination Details</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Interprovincial Red Seal exam for Tower Crane Operator has <strong className="text-foreground">100 multiple-choice questions</strong>,
                  each with four options. The pass mark is 70%. Questions are drawn from the 2023 RSOS, not the former NOA.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">100</div>
                    <div className="text-sm text-muted-foreground">Questions on exam</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">4 hrs</div>
                    <div className="text-sm text-muted-foreground">Typical time limit</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">70%</div>
                    <div className="text-sm text-muted-foreground">Passing score</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">MC</div>
                    <div className="text-sm text-muted-foreground">Four-option multiple choice</div>
                  </div>
                </div>
                <p>
                  In B.C. you sit the exam through SkilledTradesBC. No code book is provided. Formulas and acronyms
                  are supplied at the sitting. You must pass the Level 1 Standardized Level Exam before attempting the Red Seal exam.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-display text-xl font-semibold">Exam Topic Weighting</h3>
              <div className="space-y-4">
                {examTopics.map((item) => (
                  <div key={item.topic} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.topic}</span>
                      <span className="text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-4">
                Question counts from the official Red Seal Tower Crane Operator exam breakdown (2023 RSOS). Percentages shown are rounded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Master Exam Section */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="category-label">Simulation</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Master Exam</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Closed-book simulation of the Interprovincial exam: <strong className="text-foreground">100 questions</strong>,
                  4 hours, <strong className="text-foreground">70/100 to pass</strong>, weighted to the 2023 RSOS task counts.
                  No answer key until you submit. The official formula and acronym sheet is available during the sitting.
                </p>
                <p>
                  The paper is built like the real exam: A 11 · B 21 · C 23 · D 17 · E 28, including a few manufacturer
                  load-chart items in lift planning. Unanswered questions count as incorrect. Time expiry submits what you have —
                  you still pass if you have 70.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/test/master">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Timer className="mr-2 h-4 w-4" />
                    Start Master Exam
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background border border-border p-6 text-center">
                  <div className="text-4xl font-display font-bold">100</div>
                  <div className="text-sm text-muted-foreground mt-1">Questions</div>
                </div>
                <div className="bg-background border border-border p-6 text-center">
                  <div className="text-4xl font-display font-bold">4:00</div>
                  <div className="text-sm text-muted-foreground mt-1">Hours</div>
                </div>
                <div className="bg-background border border-border p-6 text-center">
                  <div className="text-4xl font-display font-bold">70%</div>
                  <div className="text-sm text-muted-foreground mt-1">Pass Rate</div>
                </div>
                <div className="bg-background border border-border p-6 text-center">
                  <div className="text-4xl font-display font-bold">1,300+</div>
                  <div className="text-sm text-muted-foreground mt-1">Question Bank</div>
                </div>
              </div>
              <div className="bg-background border border-border p-4 space-y-2">
                <div className="text-sm font-medium">Matches the IP sitting</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    2023 RSOS task counts (A 11 · B 21 · C 23 · D 17 · E 28)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Closed book — key and explanations after submit
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Formula and acronym sheet (as at the sitting)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Skip, flag, change answers; auto-submit at 4:00
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Results by major work activity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Load Chart Practice Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Description */}
            <div>
              <span className="category-label">Real Charts</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Load Chart Practice</h2>
              <p className="text-muted-foreground mt-4">
                Master reading <strong className="text-foreground">real manufacturer load charts</strong> from 6 leading brands.
                Open charts in a separate window, then answer questions exactly like you&apos;ll do on the job.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
                <div className="text-center p-4 bg-muted/30 border border-border">
                  <div className="text-3xl font-display font-bold">14</div>
                  <div className="text-xs text-muted-foreground mt-1">Charts</div>
                </div>
                <div className="text-center p-4 bg-muted/30 border border-border">
                  <div className="text-3xl font-display font-bold">201</div>
                  <div className="text-xs text-muted-foreground mt-1">Questions</div>
                </div>
                <div className="text-center p-4 bg-muted/30 border border-border">
                  <div className="text-3xl font-display font-bold">6</div>
                  <div className="text-xs text-muted-foreground mt-1">Brands</div>
                </div>
              </div>

              {/* Brands */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Liebherr", "Potain", "Terex", "WOLFF", "Krøll", "Pecco"].map((brand) => (
                  <span key={brand} className="px-3 py-1 text-xs font-medium bg-background border border-border">
                    {brand}
                  </span>
                ))}
              </div>

              <Link href="/load-charts">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Start Practicing
                </Button>
              </Link>
            </div>

            {/* Right: Charts by Type */}
            <div className="space-y-4">
              {/* Flat-Top & Hammerhead */}
              <div className="bg-muted/20 border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent" />
                    <h3 className="font-semibold text-sm">Flat-Top & Hammerhead</h3>
                  </div>
                  <span className="text-xs text-accent font-medium">8 charts</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Liebherr 470 EC-B</span>
                    <span className="text-muted-foreground">83m</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Liebherr 550 EC-H</span>
                    <span className="text-muted-foreground">81m</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Potain MDT 189</span>
                    <span className="text-muted-foreground">60m</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Potain MD 1600</span>
                    <span className="text-muted-foreground">80m</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Terex CTT 222-10</span>
                    <span className="text-muted-foreground">65m</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Terex SK 415-20</span>
                    <span className="text-muted-foreground">80m</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Krøll K630F</span>
                    <span className="text-muted-foreground">80m</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Pecco SK 180</span>
                    <span className="text-muted-foreground">60m</span>
                  </div>
                </div>
              </div>

              {/* Luffing Jib */}
              <div className="bg-muted/20 border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent" />
                    <h3 className="font-semibold text-sm">Luffing Jib</h3>
                  </div>
                  <span className="text-xs text-accent font-medium">4 charts</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Liebherr 195 HC-LH</span>
                    <span className="text-muted-foreground">55m</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/30">
                    <span>Liebherr NC-LH 12-55</span>
                    <span className="text-muted-foreground">55m</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>WOLFF 355 B US</span>
                    <span className="text-muted-foreground">60m</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Terex CTL 260A-18</span>
                    <span className="text-muted-foreground">60m</span>
                  </div>
                </div>
              </div>

              {/* Self-Erecting */}
              <div className="bg-muted/20 border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent" />
                    <h3 className="font-semibold text-sm">Self-Erecting</h3>
                  </div>
                  <span className="text-xs text-accent font-medium">2 charts</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="flex justify-between py-1.5">
                    <span>Liebherr 91 K</span>
                    <span className="text-muted-foreground">48m</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Potain Igo T 139</span>
                    <span className="text-muted-foreground">55m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="category-label">Topics</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">Question Categories</h2>
            <p className="text-sm text-muted-foreground mt-2">{QUESTION_COUNT_LABEL} questions across exam topics</p>
          </div>

          {/* Featured: Load Charts & PDF Practice */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {categories.slice(0, 2).map((category, index) => (
              <motion.div key={category.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * index }}>
                <Link href={(category as { isCharts?: boolean }).isCharts ? "/load-charts" : "/test/review"}>
                  <div className="bg-accent/5 border border-accent/20 p-5 h-full hover:border-accent transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      {(category as { isCharts?: boolean }).isCharts ? (
                        <FileSpreadsheet className="w-4 h-4 text-accent" />
                      ) : (
                        <Calculator className="w-4 h-4 text-accent" />
                      )}
                      <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">{category.name}</h3>
                    </div>
                    <p className="text-2xl font-display font-bold">
                      {(category as { isCharts?: boolean }).isCharts ? "14" : category.count}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {(category as { isCharts?: boolean }).isCharts ? "crane charts" : "questions"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* All Topics: Grouped by theme */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Topics</h3>
              <Link href="/test/review" className="text-xs font-medium hover:text-accent transition-colors flex items-center gap-1">
                Review all
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.slice(2).map((category, index) => (
                <motion.div key={category.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.02 * index }}>
                  <Link href="/test/review">
                    <div className="flex items-center justify-between p-3 bg-muted/20 border border-border hover:border-accent/50 hover:bg-muted/30 transition-colors group">
                      <span className="text-sm group-hover:text-accent transition-colors truncate pr-3">{category.name}</span>
                      <span className="text-sm font-semibold text-muted-foreground flex-shrink-0">{category.count}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left - Image Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-20 border border-border bg-muted/30 relative overflow-hidden">
                <Image
                  src="/images/resources3.png"
                  alt="Tower crane operator"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <span className="category-label">Certification</span>
                  <h3 className="font-display text-xl font-bold mt-2 text-white">Build Your Career</h3>
                  <p className="text-sm text-white/70 mt-2">B.C. CofQ plus Red Seal endorsement</p>
                </div>
              </div>
            </div>

            {/* Right - Resources */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <span className="category-label">Resources</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Official Resources</h2>
              </div>

              {/* Featured Resource */}
              <a
                href="https://bccranesafety.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border border-border hover:border-accent transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">Featured</span>
                    <h3 className="font-display text-xl font-bold mt-1 group-hover:text-accent transition-colors">BC Crane Safety</h3>
                    <p className="text-muted-foreground mt-2">Administers crane operator certification in B.C. and Yukon. Register here before you train or operate — they do not deliver exams.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent mt-1 transition-colors" />
                </div>
              </a>

              {/* Resource Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="https://skilledtradesbc.ca/tower-crane-operator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">SkilledTradesBC Tower Crane</h3>
                  <p className="text-sm text-muted-foreground mt-1">Trade page, exams, 2,685 hours, CofQ</p>
                </a>

                <a
                  href="https://portal.skilledtradesbc.ca/Account/Login/Register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">SkilledTradesBC Portal</h3>
                  <p className="text-sm text-muted-foreground mt-1">Register, hours, book exams</p>
                </a>

                <a
                  href="https://bccranesafety.ca/resources/crane-operator-logbook/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">SkillRecord Passport</h3>
                  <p className="text-sm text-muted-foreground mt-1">Free iOS &amp; Android crane logbook</p>
                </a>

                <a
                  href="https://www.red-seal.ca/eng/trades/towercrane_op/exam-information.shtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">Red Seal Program</h3>
                  <p className="text-sm text-muted-foreground mt-1">2023 RSOS and 100-question exam</p>
                </a>

                <a
                  href="https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-foreground/20 hover:border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">WorkSafeBC Part 14</h3>
                  <p className="text-sm text-muted-foreground mt-1">Cranes and hoists, operator certification</p>
                </a>

                <a
                  href="https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-15-rigging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-foreground/20 hover:border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">WorkSafeBC Part 15</h3>
                  <p className="text-sm text-muted-foreground mt-1">Rigging, slings, and hand signals</p>
                </a>

                <a
                  href="https://fulford.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-foreground/20 hover:border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">Fulford Certification</h3>
                  <p className="text-sm text-muted-foreground mt-1">Provisional exam and practical assessment</p>
                </a>
              </div>

              {/* Standards */}
              <div className="pt-6 border-t border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry Standards</span>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href="https://www.csagroup.org/store/product/Z248-17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors"
                  >
                    <span className="border-b border-transparent group-hover:border-accent">CSA Z248</span>
                    <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </a>
                  <a
                    href="https://www.asme.org/codes-standards/find-codes-standards/b30-3-tower-cranes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors"
                  >
                    <span className="border-b border-transparent group-hover:border-accent">ASME B30.3</span>
                    <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  WorkSafeBC Part 14.2 requires tower, hammerhead, and self-erecting tower cranes to meet CSA Z248.
                  Part 14.34.1 requires a valid operator certificate from a person acceptable to the Board — in B.C., that system is administered by BC Crane Safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <span className="category-label">Ready to Practice?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Start your exam preparation now
            </h2>
            <p className="text-muted-foreground">
              Practice questions, read real load charts, or simulate the full Red Seal exam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/test">
                <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                  Practice Test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/load-charts">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Load Charts
                </Button>
              </Link>
              <Link href="/test/master">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Timer className="mr-2 h-4 w-4" />
                  Master Exam
                </Button>
              </Link>
            </div>
            <Link href="/test/review" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors">
              Or browse all {questionsData.length} questions
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
