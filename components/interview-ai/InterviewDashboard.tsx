"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BarChart3, BrainCircuit, CalendarDays, Code2, Flame, LayoutDashboard, Mic2, Settings, Sparkles, Target, Trophy } from "lucide-react";
import { MetricTile, MiniLineChart, PremiumCard, ProductShell, ProgressBar, RadarChart, fadeUp, stagger } from "./shared";

const history = [
  ["System Design", "Realtime comments platform", "91", "Today"],
  ["Coding", "Debounced search analytics", "84", "Yesterday"],
  ["Behavioral", "Conflict and ownership", "88", "May 18"],
  ["Frontend", "React state architecture", "79", "May 17"],
];

export function InterviewDashboard() {
  const [range, setRange] = useState("30d");
  const [selectedHistory, setSelectedHistory] = useState(history[0]);
  const rangeBoost = range === "7d" ? 3 : range === "30d" ? 12 : 21;

  return (
    <ProductShell>
      <div className="mx-auto grid min-h-screen max-w-[1440px] gap-5 px-4 py-5 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <main className="space-y-5">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-cyan-200">Interview readiness cockpit</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">Dashboard</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Track interviews, skill movement, weak topics, recommendations, streaks, and AI evaluation quality from one focused surface.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-lg border border-white/10 bg-black/24 p-1">
                {["7d", "30d", "90d"].map((item) => (
                  <button key={item} onClick={() => setRange(item)} className={`rounded-md px-3 py-1.5 text-xs transition ${range === item ? "bg-white text-black" : "text-slate-400 hover:text-white"}`}>
                    {item}
                  </button>
                ))}
              </div>
              <Link href="/interview" className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-black">Start mock interview</Link>
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricTile label="Overall Readiness" value={`${74 + rangeBoost}%`} trend={`+${rangeBoost}% over ${range}`} />
            <MetricTile label="Interview Streak" value="18d" trend="4 sessions this week" />
            <MetricTile label="Technical Score" value={`${80 + Math.floor(rangeBoost / 2)}`} trend="+6 point lift" />
            <MetricTile label="Communication" value={`${85 + Math.floor(rangeBoost / 2)}`} trend="top 14% benchmark" />
          </motion.div>

          <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
            <PremiumCard className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">AI Evaluation Trend</h2>
                  <p className="text-sm text-slate-500">Score, confidence, and technical depth across recent rounds.</p>
                </div>
                <BarChart3 className="size-5 text-cyan-200" />
              </div>
              <div className="h-72"><MiniLineChart /></div>
            </PremiumCard>

            <PremiumCard className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Skill Progress</h2>
                <Trophy className="size-5 text-violet-200" />
              </div>
              <div className="space-y-5">
                <ProgressBar label="Problem Solving" value={87} />
                <ProgressBar label="System Design" value={74} tone="violet" />
                <ProgressBar label="Behavioral Clarity" value={91} tone="emerald" />
                <ProgressBar label="Code Quality" value={82} tone="blue" />
              </div>
            </PremiumCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[.85fr_1.15fr]">
            <PremiumCard className="p-5">
              <h2 className="mb-5 text-lg font-semibold">Interview History</h2>
              <div className="space-y-3">
                {history.map(([type, title, score, date]) => (
                  <button key={title} onClick={() => setSelectedHistory([type, title, score, date])} className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${selectedHistory[1] === title ? "border-cyan-300/35 bg-cyan-300/10" : "border-white/10 bg-black/24 hover:bg-white/[0.05]"}`}>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-1 text-xs text-slate-500">{type} - {date}</p>
                    </div>
                    <div className="rounded-lg bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{score}</div>
                  </button>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Weak Topic Analysis</h2>
                <Target className="size-5 text-cyan-200" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-5">
                  <ProgressBar label="Distributed caching tradeoffs" value={58} tone="violet" />
                  <ProgressBar label="Async race conditions" value={64} />
                  <ProgressBar label="Complexity communication" value={69} tone="blue" />
                  <ProgressBar label="Edge case enumeration" value={55} tone="emerald" />
                </div>
                <div className="rounded-xl border border-white/10 bg-black/24 p-4">
                  <h3 className="text-sm font-semibold">Recommended Improvements</h3>
                  <p className="mt-2 text-xs text-cyan-200">Selected: {selectedHistory[1]} ({selectedHistory[2]})</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                    <li>Run two medium async JavaScript rounds.</li>
                    <li>Practice latency and consistency tradeoffs.</li>
                    <li>Record a 90-second STAR ownership story.</li>
                    <li>Revisit failed test cases after 48 hours.</li>
                  </ul>
                </div>
              </div>
            </PremiumCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            <PremiumCard className="p-5">
              <h2 className="mb-4 text-lg font-semibold">Confidence Analysis</h2>
              <div className="h-56"><RadarChart /></div>
            </PremiumCard>
            <PremiumCard className="p-5 xl:col-span-2">
              <h2 className="mb-4 text-lg font-semibold">AI Coaching Queue</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["Resume Parser", "Generate questions from project impact bullets."],
                  ["Whisper Voice", "Transcribe and score pacing in the next session."],
                  ["Memory Layer", "Carry weak topics into adaptive follow-ups."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-black/24 p-4">
                    <Sparkles className="mb-4 size-5 text-cyan-200" />
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>
        </main>
      </div>
    </ProductShell>
  );
}

function Sidebar() {
  const items = [
    ["Overview", LayoutDashboard, "/dashboard"],
    ["Interview", Mic2, "/interview"],
    ["Coding", Code2, "/coding"],
    ["Analytics", BarChart3, "/analytics"],
    ["Streaks", Flame, "/dashboard"],
    ["Schedule", CalendarDays, "/dashboard"],
    ["Settings", Settings, "/dashboard"],
  ] as const;

  return (
    <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:sticky lg:top-20">
      <Link href="/" className="mb-6 flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-white text-black"><BrainCircuit className="size-5" /></div>
        <div>
          <p className="text-sm font-semibold">Axiom AI</p>
          <p className="text-xs text-slate-500">Interview OS</p>
        </div>
      </Link>
      <nav className="space-y-1">
        {items.map(([label, Icon, href], index) => (
          <Link key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${index === 0 ? "bg-white text-black" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"}`}>
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
