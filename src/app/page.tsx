"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ChevronRight, Award, HardHat, FileText, GraduationCap, Shield, Timer, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import questionsData from "@/data/questions.json";

const categories = [
  { name: "Safety & Legislation", count: 20, color: "bg-accent" },
  { name: "Load Charts & Calculations", count: 30, color: "bg-foreground" },
  { name: "Rigging & Slinging", count: 30, color: "bg-foreground" },
  { name: "Crane Components", count: 30, color: "bg-foreground" },
  { name: "Site Operations", count: 30, color: "bg-foreground" },
  { name: "Inspection & Maintenance", count: 20, color: "bg-foreground" },
  { name: "Climbing & Erection", count: 20, color: "bg-foreground" },
  { name: "Troubleshooting", count: 20, color: "bg-foreground" },
];

const features = [
  {
    label: "Practice",
    title: "305 exam questions with detailed explanations",
    description: "Every question includes why the correct answer is right and why others are wrong.",
  },
  {
    label: "Learn",
    title: "Aligned with BC Red Seal standards",
    description: "Questions based on WorkSafeBC regulations and certification requirements.",
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
    title: "Register as Apprentice",
    description: "Sign up with SkilledTradesBC (formerly ITA) and find a sponsor employer.",
  },
  {
    step: "02",
    title: "Complete Work Hours",
    description: "Accumulate 4,200 hours of supervised on-the-job training operating tower cranes.",
  },
  {
    step: "03",
    title: "Technical Training",
    description: "Complete required technical training levels at an approved training provider.",
  },
  {
    step: "04",
    title: "Pass Red Seal Exam",
    description: "Write and pass the interprovincial Red Seal certification examination.",
  },
];

const examTopics = [
  { topic: "Occupational Skills", percentage: 12 },
  { topic: "Crane Setup & Dismantling", percentage: 18 },
  { topic: "Crane Operations", percentage: 40 },
  { topic: "Rigging", percentage: 18 },
  { topic: "Maintenance & Troubleshooting", percentage: 12 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pt-14">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-accent-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-black tracking-tight hidden sm:block">REDTC</span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-3">
              <Link href="/test" className="px-3 py-2 text-sm font-bold hover:bg-muted transition-colors">
                Practice
              </Link>
              <Link href="/test/master" className="px-3 py-2 text-sm font-bold hover:bg-muted transition-colors hidden sm:block">
                Master
              </Link>
              <Link href="/test/review" className="px-3 py-2 text-sm font-bold hover:bg-muted transition-colors">
                Questions
              </Link>
              <div className="w-px h-6 bg-border mx-2 hidden sm:block" />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="border-b border-border">
        {/* Hero Image */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden">
          <Image
            src="/images/header1.png"
            alt="Tower crane against sky"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-2 py-1">BC Red Seal</span>
                  <span className="text-sm text-foreground/80">Tower Crane Certification</span>
                </div>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground drop-shadow-sm">
                  Master your tower crane exam
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Below Image */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-10 lg:py-12 lg:border-r border-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Practice with 305 questions including Master Level problems covering advanced calculations, 
                  structural engineering, and emergency scenarios.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/test">
                    <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                      Start Practice Test
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/test/master">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      <Timer className="mr-2 h-4 w-4" />
                      Master Exam
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="px-4 sm:px-6 lg:px-8 py-10 lg:py-12 bg-muted/30">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="category-label">Test Format</span>
                  <p className="text-sm text-muted-foreground mt-1">Updated for 2026 standards</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-4xl font-display font-bold">305</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-display font-bold">10</div>
                    <div className="text-sm text-muted-foreground">Per Test</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-display font-bold">70%</div>
                    <div className="text-sm text-muted-foreground">To Pass</div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-3">
                  <p className="text-sm font-medium">What you&apos;ll learn:</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {["Load charts & calculations", "Safety regulations", "Rigging fundamentals", "Crane operations"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  The <strong className="text-foreground">Red Seal Program</strong> is the Canadian interprovincial standard 
                  of excellence in skilled trades. A Red Seal endorsement on your provincial/territorial trade certificate 
                  allows you to practice your trade in any province or territory in Canada without additional examination.
                </p>
                <p>
                  For <strong className="text-foreground">Tower Crane Operators</strong>, the Red Seal certification 
                  demonstrates that you have met the national standard of competency for safely operating tower cranes 
                  on construction sites across Canada.
                </p>
                <p>
                  The certification is recognized nationwide and is often required by major construction companies, 
                  making it essential for career advancement in the crane operation industry.
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
                  <p className="text-sm text-muted-foreground">Work anywhere in Canada</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent flex items-center justify-center">
                  <HardHat className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Industry Standard</h3>
                  <p className="text-sm text-muted-foreground">Required by major employers</p>
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

      {/* Hour Requirements Section */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="category-label">Requirements</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Hour Requirements for Certification</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              In British Columbia, Tower Crane Operators must complete a structured apprenticeship program 
              before being eligible to write the Red Seal examination.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background border border-border p-6 text-center">
              <div className="text-5xl font-display font-bold text-accent">4,200</div>
              <div className="text-lg font-semibold mt-2">Work Hours</div>
              <p className="text-sm text-muted-foreground mt-2">
                Minimum on-the-job training hours required under supervision of a certified journeyperson
              </p>
            </div>
            <div className="bg-background border border-border p-6 text-center">
              <div className="text-5xl font-display font-bold">3</div>
              <div className="text-lg font-semibold mt-2">Levels of Training</div>
              <p className="text-sm text-muted-foreground mt-2">
                Technical training levels completed at approved institutions throughout apprenticeship
              </p>
            </div>
            <div className="bg-background border border-border p-6 text-center">
              <div className="text-5xl font-display font-bold">2-3</div>
              <div className="text-lg font-semibold mt-2">Years Duration</div>
              <p className="text-sm text-muted-foreground mt-2">
                Typical time to complete the full apprenticeship program depending on work availability
              </p>
            </div>
          </div>

          <div className="bg-background border border-border p-6">
            <h3 className="font-display text-xl font-semibold mb-4">Hour Breakdown by Level</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">1</div>
                <div>
                  <div className="font-medium">Level 1</div>
                  <div className="text-sm text-muted-foreground">0 - 1,400 hours</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">2</div>
                <div>
                  <div className="font-medium">Level 2</div>
                  <div className="text-sm text-muted-foreground">1,400 - 2,800 hours</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">3</div>
                <div>
                  <div className="font-medium">Level 3</div>
                  <div className="text-sm text-muted-foreground">2,800 - 4,200 hours</div>
                </div>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How to Get Your Red Seal</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <span className="category-label">The Exam</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Red Seal Examination Details</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Red Seal examination for Tower Crane Operators is a comprehensive test that evaluates your 
                  knowledge and understanding of all aspects of tower crane operation.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">120</div>
                    <div className="text-sm text-muted-foreground">Questions on exam</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">4 hrs</div>
                    <div className="text-sm text-muted-foreground">Time limit</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">70%</div>
                    <div className="text-sm text-muted-foreground">Passing score</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="text-2xl font-display font-bold">MC</div>
                    <div className="text-sm text-muted-foreground">Multiple choice</div>
                  </div>
                </div>
                <p>
                  Questions are drawn from the National Occupational Analysis (NOA) and cover theory, safety, 
                  calculations, and practical knowledge required for competent tower crane operation.
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
                * Percentages based on National Occupational Analysis for Tower Crane Operator trade.
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
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Master Exam Mode</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ready to test yourself under real exam conditions? Our <strong className="text-foreground">Master Exam</strong> simulates 
                  the actual Red Seal certification examination with 120 questions and a strict 4-hour time limit.
                </p>
                <p>
                  This comprehensive test draws from our entire question bank of 305 questions, covering all exam topics 
                  including advanced load calculations, structural engineering concepts, rigging mastery, and emergency scenarios.
                </p>
                <p>
                  The timer cannot be paused once started, and unanswered questions count as incorrect — just like the real exam. 
                  Use this mode when you&apos;re ready for a full dress rehearsal before your certification day.
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
                  <div className="text-4xl font-display font-bold">120</div>
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
                  <div className="text-4xl font-display font-bold">305</div>
                  <div className="text-sm text-muted-foreground mt-1">Question Bank</div>
                </div>
              </div>
              <div className="bg-background border border-border p-4 space-y-2">
                <div className="text-sm font-medium">Master Exam includes:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Countdown timer with low-time warning
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Randomized question selection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Auto-submit when time expires
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    Detailed results breakdown
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="category-label">Topics</span>
              <h2 className="font-display text-2xl font-bold mt-1">Question Categories</h2>
            </div>
            <Link href="/test/review" className="hidden sm:flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors">
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link href="/test/review">
                  <div className="bg-background p-5 h-full card-hover group">
                    <div className="flex items-start justify-between">
                      <div className={`w-2 h-2 mt-1 ${index === 0 ? 'bg-accent' : 'bg-muted-foreground/30'}`} />
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-medium mt-3 group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count}+ questions</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left - Image Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-20 border border-border bg-muted/30">
                <Image
                  src="/images/resources3.png"
                  alt="Tower crane operator"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="p-6 border-t border-border">
                  <span className="category-label">Certification</span>
                  <h3 className="font-display text-xl font-bold mt-2">Build Your Career</h3>
                  <p className="text-sm text-muted-foreground mt-2">Red Seal opens doors across Canada</p>
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
                className="block bg-accent p-6 hover:bg-accent/90 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground/70">Featured</span>
                    <h3 className="font-display text-xl font-bold text-accent-foreground mt-1">BC Crane Safety</h3>
                    <p className="text-accent-foreground/80 mt-2">Provincial authority for crane operator certification in British Columbia</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-accent-foreground mt-1" />
                </div>
              </a>

              {/* Resource Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="https://skilledtradesbc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">SkilledTradesBC</h3>
                  <p className="text-sm text-muted-foreground mt-1">Apprenticeship registration</p>
                </a>

                <a
                  href="https://www.red-seal.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">Red Seal Program</h3>
                  <p className="text-sm text-muted-foreground mt-1">National exam standards</p>
                </a>

                <a
                  href="https://www.worksafebc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-foreground/20 hover:border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">WorkSafeBC</h3>
                  <p className="text-sm text-muted-foreground mt-1">Safety regulations</p>
                </a>

                <a
                  href="https://fulford.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border-l-4 border-foreground/20 hover:border-accent bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-bold group-hover:text-accent transition-colors">Fulford Certification</h3>
                  <p className="text-sm text-muted-foreground mt-1">Training in Western Canada</p>
                </a>
              </div>

              {/* Standards */}
              <div className="pt-6 border-t border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry Standards</span>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href="https://www.asme.org/codes-standards/find-codes-standards/b30-series-safety-standard-cranes-derricks-hoists-hooks-jacks-slings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors"
                  >
                    <span className="border-b border-transparent group-hover:border-accent">ASME B30</span>
                    <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </a>
                  <a
                    href="https://www.csagroup.org/store/product/Z248-17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors"
                  >
                    <span className="border-b border-transparent group-hover:border-accent">CSA Z248</span>
                    <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </a>
                </div>
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
              Choose a quick 10-question practice or simulate the full Red Seal exam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/test">
                <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                  Practice Test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/test/master">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Timer className="mr-2 h-4 w-4" />
                  Master Exam (4 hrs)
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
