"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Gauge, LineChart, MessageSquareText, Sparkles, TrendingUp } from "lucide-react";
import { MetricTile, MiniLineChart, PremiumCard, ProductShell, ProgressBar, RadarChart } from "./shared";

export function InterviewAnalytics() {
  const [mode, setMode] = useState<"technical" | "communication" | "coding">("technical");
  const multipliers = {
    technical: [92, 84, 76, 88],
    communication: [96, 89, 82, 91],
    coding: [86, 78, 69, 81],
  }[mode];

  return (
    <ProductShell>
      <main className="mx-auto max-w-[1400px] px-4 py-5">
        <div className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="grid size-10 place-items-center rounded-xl border border-white/10 bg-black/24"><ArrowLeft className="size-4" /></Link>
            <div>
              <p className="text-sm text-cyan-200">Advanced interview intelligence</p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Analytics</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg border border-white/10 bg-black/24 p-1">
              {(["technical", "communication", "coding"] as const).map((item) => (
                <button key={item} onClick={() => setMode(item)} className={`rounded-md px-3 py-1.5 text-xs capitalize transition ${mode === item ? "bg-white text-black" : "text-slate-400 hover:text-white"}`}>
                  {item}
                </button>
              ))}
            </div>
            <Link href="/dashboard" className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-black">Back to dashboard</Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricTile label="Readiness Delta" value={`+${Math.max(10, multipliers[0] - 74)}%`} trend={`${mode} focus`} />
          <MetricTile label="Communication" value={`${multipliers[1]}`} trend="clarity benchmark" />
          <MetricTile label="Coding Accuracy" value={`${multipliers[2]}%`} trend="+22% trend" />
          <MetricTile label="Weak Topics Fixed" value={`${Math.floor(multipliers[3] / 8)}`} trend="this month" />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[.78fr_1.22fr]">
          <PremiumCard className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Strengths vs Weaknesses</h2>
              <Gauge className="size-5 text-cyan-200" />
            </div>
            <div className="h-80"><RadarChart /></div>
          </PremiumCard>
          <PremiumCard className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Improvement Trend</h2>
              <TrendingUp className="size-5 text-violet-200" />
            </div>
            <div className="h-80"><MiniLineChart /></div>
          </PremiumCard>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-3">
          <PremiumCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <MessageSquareText className="size-5 text-cyan-200" />
              <h2 className="text-lg font-semibold">Communication Analytics</h2>
            </div>
            <div className="space-y-5">
              <ProgressBar label="Answer Structure" value={multipliers[0]} />
              <ProgressBar label="Pacing" value={multipliers[1]} tone="violet" />
              <ProgressBar label="Filler Word Control" value={multipliers[2]} tone="blue" />
              <ProgressBar label="Conciseness" value={multipliers[3]} tone="emerald" />
            </div>
          </PremiumCard>

          <PremiumCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <LineChart className="size-5 text-violet-200" />
              <h2 className="text-lg font-semibold">Coding Performance</h2>
            </div>
            <div className="space-y-5">
              <ProgressBar label="Correctness" value={mode === "coding" ? 91 : 86} />
              <ProgressBar label="Complexity Analysis" value={mode === "technical" ? 88 : 78} tone="violet" />
              <ProgressBar label="Testing Discipline" value={mode === "coding" ? 83 : 69} tone="blue" />
              <ProgressBar label="Debug Velocity" value={mode === "coding" ? 87 : 81} tone="emerald" />
            </div>
          </PremiumCard>

          <PremiumCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <Sparkles className="size-5 text-cyan-200" />
              <h2 className="text-lg font-semibold">AI-Generated Insights</h2>
            </div>
            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p className="rounded-xl border border-white/10 bg-black/24 p-3">Your strongest answers explain tradeoffs before implementation details.</p>
              <p className="rounded-xl border border-white/10 bg-black/24 p-3">Coding rounds lose points when test strategy is delayed until the end.</p>
              <p className="rounded-xl border border-white/10 bg-black/24 p-3">Behavioral stories are improving, but impact metrics need tighter framing.</p>
            </div>
          </PremiumCard>
        </div>

        <PremiumCard className="mt-5 p-5">
          <div className="mb-5 flex items-center gap-3">
            <BrainCircuit className="size-5 text-cyan-200" />
            <h2 className="text-lg font-semibold">Personalized Learning Suggestions</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {["Run async JavaScript drill", "Practice 2-minute architecture summary", "Redo failed medium problem", "Record ownership story"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-black/24 p-4 text-sm text-slate-300">{item}</div>
            ))}
          </div>
        </PremiumCard>
      </main>
    </ProductShell>
  );
}
