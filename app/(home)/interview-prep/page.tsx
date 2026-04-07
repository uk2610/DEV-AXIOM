import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Code2, Layers3, NotebookText, Timer } from "lucide-react";

const prepPillars = [
  {
    title: "DSA Sprint",
    description: "Short daily cycles of easy-medium-hard sets with strict timing and review notes.",
    icon: BrainCircuit,
    cta: "/practice",
    label: "Coding Rounds",
  },
  {
    title: "Frontend Machine Coding",
    description: "Component architecture, state management decisions, and clean implementation speed.",
    icon: Code2,
    cta: "/practice?difficulty=Medium",
    label: "UI Execution",
  },
  {
    title: "System Design Readiness",
    description: "API boundaries, scaling tradeoffs, caching, reliability, and interview storytelling.",
    icon: Layers3,
    cta: "/web-dev",
    label: "Architecture",
  },
];

const weeklyPlan = [
  { day: "Mon", focus: "Problem Solving", duration: "90 min", action: "2 Easy + 1 Medium + notes" },
  { day: "Tue", focus: "Machine Coding", duration: "120 min", action: "1 UI build with timer" },
  { day: "Wed", focus: "System Design", duration: "75 min", action: "One architecture walkthrough" },
  { day: "Thu", focus: "Problem Solving", duration: "90 min", action: "1 Medium + 1 Hard" },
  { day: "Fri", focus: "Behavioral + Resume", duration: "60 min", action: "STAR stories and impact bullets" },
];

export default function InterviewPrepPage() {
  return (
    <div className="container mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-8 backdrop-blur">
        <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">Interview Prep System</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Train For Interviews With A Real Workflow
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          This section is intentionally different from Roadmaps: it is execution-first. Pick a sprint track,
          run timed sessions, and finish each week with measurable outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {prepPillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.title} className="border-border/70 bg-card/80">
              <CardHeader>
                <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Icon className="h-3.5 w-3.5" />
                  {pillar.label}
                </div>
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {pillar.description}
                </CardDescription>
                <Link href={pillar.cta}>
                  <Button variant="outline" className="w-full justify-between">
                    Start Track <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[1.25fr_1fr]">
        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Timer className="h-5 w-5 text-primary" />
              Weekly Interview Sprint Plan
            </CardTitle>
            <CardDescription>
              Run this baseline plan, then increase Hard problems and design depth every two weeks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyPlan.map((item) => (
                <div
                  key={item.day}
                  className="flex flex-col gap-2 rounded-xl border border-border/70 bg-background/60 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.day} - {item.focus}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                  <Badge variant="secondary" className="w-fit">{item.duration}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <NotebookText className="h-5 w-5 text-primary" />
              Session Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Define target role before starting each set.</li>
              <li>Use a strict timer and avoid pausing.</li>
              <li>Write post-session notes: mistakes and retries.</li>
              <li>Re-solve failed questions after 48 hours.</li>
            </ul>
            <Link href="/practice" className="mt-5 block">
              <Button className="w-full">Open Practice Arena</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
