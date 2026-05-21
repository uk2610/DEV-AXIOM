"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, Code2, LineChart, Mic2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function ProductShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-screen bg-[#05060a] text-white selection:bg-cyan-300/20 selection:text-cyan-100",
        className,
      )}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_8%,rgba(89,89,255,0.16),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(38,214,255,0.12),transparent_28%),linear-gradient(180deg,#05060a_0%,#090b12_52%,#05060a_100%)]" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-cyan-200">
        <Sparkles className="size-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">{description}</p>
    </motion.div>
  );
}

export function PremiumCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_28%,rgba(54,224,255,0.12))] before:opacity-45",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export function MetricTile({
  label,
  value,
  trend,
  className,
}: {
  label: string;
  value: string;
  trend: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-white/10 bg-black/22 p-4", className)}>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-xs text-cyan-200">{trend}</p>
    </div>
  );
}

export function ProgressBar({
  label,
  value,
  tone = "cyan",
}: {
  label: string;
  value: number;
  tone?: "cyan" | "violet" | "blue" | "emerald";
}) {
  const tones = {
    cyan: "from-cyan-300 to-blue-400",
    violet: "from-violet-300 to-fuchsia-400",
    blue: "from-blue-300 to-indigo-400",
    emerald: "from-emerald-300 to-cyan-400",
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-300">{label}</span>
        <span className="text-slate-500">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-gradient-to-r", tones[tone])}
        />
      </div>
    </div>
  );
}

export function MiniLineChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 130" className={cn("h-full w-full", className)} aria-hidden="true">
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop stopColor="#67e8f9" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#67e8f9" stopOpacity="0.24" />
          <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 50, 80, 110].map((y) => (
        <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
      ))}
      <path d="M0 112 C38 94 54 104 86 77 C120 48 143 64 178 48 C213 32 232 58 266 36 C303 12 327 28 360 15 L360 130 L0 130 Z" fill="url(#area)" />
      <motion.path
        d="M0 112 C38 94 54 104 86 77 C120 48 143 64 178 48 C213 32 232 58 266 36 C303 12 327 28 360 15"
        fill="none"
        stroke="url(#line)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

export function RadarChart() {
  const points = "120,20 190,62 172,145 120,180 57,146 42,62";
  return (
    <svg viewBox="0 0 240 210" className="h-full w-full" aria-hidden="true">
      <polygon points="120,26 184,64 166,140 120,172 70,140 55,64" fill="none" stroke="rgba(255,255,255,.14)" />
      <polygon points="120,58 154,78 146,123 120,142 88,123 81,78" fill="none" stroke="rgba(255,255,255,.1)" />
      <polygon points={points} fill="rgba(103,232,249,.16)" stroke="#67e8f9" strokeWidth="2" />
      {["Systems", "Code", "Clarity", "Speed", "Depth", "Signals"].map((label, index) => {
        const coords = [
          [120, 12],
          [202, 58],
          [188, 158],
          [120, 202],
          [48, 158],
          [34, 58],
        ][index];
        return (
          <text key={label} x={coords[0]} y={coords[1]} textAnchor="middle" className="fill-slate-400 text-[10px]">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

export const navActions = [
  { href: "/interview", label: "Start Interview", icon: Mic2 },
  { href: "/dashboard", label: "View Dashboard", icon: LineChart },
  { href: "/coding", label: "Coding Round", icon: Code2 },
];

export function CTAButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/interview"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-black transition hover:bg-cyan-100"
      >
        Start Interview <ArrowRight className="size-4" />
      </Link>
      <Link
        href="#demo"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
      >
        Watch Demo
      </Link>
      <Link
        href="/dashboard"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/15"
      >
        View Dashboard
      </Link>
    </div>
  );
}

export function CapabilityList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        "OpenAI streaming response architecture",
        "Whisper voice transcription placeholder",
        "Resume parsing and role targeting",
        "AI evaluation, scoring, and coaching",
        "Emotion and confidence signal capture",
        "Session memory and adaptive follow-ups",
      ].map((item) => (
        <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle2 className="size-4 text-cyan-300" />
          {item}
        </div>
      ))}
    </div>
  );
}

export function AIOrb() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      className="relative grid size-28 place-items-center rounded-full border border-white/10 bg-[conic-gradient(from_90deg,rgba(103,232,249,.32),rgba(139,92,246,.24),rgba(59,130,246,.28),rgba(103,232,249,.32))] p-[1px]"
    >
      <div className="grid size-full place-items-center rounded-full bg-[#090b12]">
        <BrainCircuit className="size-10 text-cyan-200" />
      </div>
    </motion.div>
  );
}
