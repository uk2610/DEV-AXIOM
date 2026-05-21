"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Activity,
  AudioLines,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  FileText,
  LineChart,
  MessagesSquare,
  Mic2,
  Network,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  AIOrb,
  CTAButtons,
  CapabilityList,
  MetricTile,
  MiniLineChart,
  PremiumCard,
  ProductShell,
  ProgressBar,
  RadarChart,
  SectionHeading,
  fadeUp,
  stagger,
} from "./shared";

const features = [
  ["AI Mock Interviews", "Role-specific simulations that adapt to your answers in real time.", BrainCircuit],
  ["Voice-Based Interviews", "Practice spoken delivery with live transcription and pacing analysis.", Mic2],
  ["Resume-Based Questions", "Generate targeted questions from your background, projects, and role.", FileText],
  ["Real-Time Feedback", "Receive structured coaching across clarity, depth, correctness, and confidence.", Sparkles],
  ["Coding Environment", "Run coding rounds with hints, tests, console output, and review notes.", Code2],
  ["Behavioral Training", "Sharpen STAR stories, leadership examples, and recruiter conversations.", MessagesSquare],
  ["AI Follow-Ups", "Dynamic probing questions expose gaps before real interviewers do.", Network],
  ["Analytics Dashboard", "Track skill trajectory, weak topics, streaks, and improvement velocity.", BarChart3],
  ["Performance Tracking", "Turn every mock into measurable progress and a next action plan.", TrendingUp],
  ["Learning Suggestions", "Personalized drills based on missed concepts and communication signals.", Target],
] as const;

const logos = ["Linear", "Vercel", "OpenAI", "Stripe", "Notion", "Anthropic"];

export function AxiomInterviewLanding() {
  return (
    <ProductShell>
      <main className="overflow-hidden">
        <Hero />
        <StatsStrip />
        <Features />
        <DashboardPreview />
        <InterviewPreview />
        <CodingPreview />
        <AnalyticsPreview />
        <CapabilityShowcase />
        <ArchitectureShowcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </ProductShell>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-6 pt-20 md:pt-28">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[10%] top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-[1250px] items-center gap-12 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur"
          >
            <span className="size-2 rounded-full bg-emerald-300" />
            AI interview simulator for serious candidates
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold leading-[0.98] tracking-tight text-white md:text-7xl"
          >
            Master Technical Interviews with AI-Powered Precision
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Practice realistic interviews, receive intelligent feedback, and improve your communication, coding, and problem-solving skills with advanced AI simulations.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <CTAButtons />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            {["No credit card", "Built for SWE loops", "Voice + code + analytics"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-cyan-300" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} id="demo">
          <PremiumCard className="p-4 md:p-5">
            <div className="rounded-xl border border-white/10 bg-[#080a11]/95 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AIOrb />
                  <div>
                    <p className="text-sm font-semibold text-white">Axiom AI Interviewer</p>
                    <p className="text-xs text-slate-500">Senior frontend system design loop</p>
                  </div>
                </div>
                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">Live</div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-xs uppercase text-slate-500">Current Question</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      Walk me through how you would design a collaborative code review tool with realtime comments, permissions, and offline recovery.
                    </p>
                  </div>
                  <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-cyan-100">
                      <AudioLines className="size-4" />
                      Live transcription
                    </div>
                    <p className="text-sm leading-6 text-slate-300">
                      “I would begin by separating document state from comment events, then use optimistic updates with a conflict log...”
                    </p>
                  </div>
                  <div className="flex h-16 items-end gap-1 rounded-xl border border-white/10 bg-black/30 p-3">
                    {Array.from({ length: 32 }).map((_, index) => (
                      <motion.span
                        key={index}
                        animate={{ height: [`${20 + (index % 5) * 8}%`, `${48 + (index % 7) * 6}%`, `${18 + (index % 4) * 9}%`] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.03 }}
                        className="w-full rounded-full bg-gradient-to-t from-cyan-400 to-violet-300"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <MetricTile label="Interview Score" value="86" trend="+14 pts this week" />
                  <ProgressBar label="Communication" value={91} />
                  <ProgressBar label="Technical Depth" value={84} tone="violet" />
                  <ProgressBar label="Confidence" value={78} tone="emerald" />
                  <div className="rounded-xl border border-white/10 bg-black/24 p-4">
                    <p className="mb-3 text-xs font-medium text-slate-500">AI Insight</p>
                    <p className="text-sm leading-6 text-slate-300">Strong decomposition. Add clearer latency targets and one failure-mode tradeoff.</p>
                  </div>
                </div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-[1250px] border-y border-white/10 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-slate-500">
          {logos.map((logo) => (
            <span key={logo} className="font-semibold tracking-tight text-slate-400">{logo}</span>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["42k+", "AI interviews completed"],
            ["89%", "users improved in 14 days"],
            ["3.8x", "faster weak-topic discovery"],
            ["24/7", "adaptive coaching loops"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <SectionHeading
        eyebrow="Interview intelligence layer"
        title="Everything a serious candidate needs in one focused cockpit"
        description="Axiom turns mock interviews into measurable, repeatable training loops across voice, code, behavioral storytelling, and technical depth."
      />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto grid max-w-[1250px] gap-4 md:grid-cols-2 lg:grid-cols-5">
        {features.map(([title, description, Icon]) => (
          <PremiumCard key={title} className="p-5 lg:min-h-52">
            <div className="mb-5 grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.06]">
              <Icon className="size-5 text-cyan-200" />
            </div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
          </PremiumCard>
        ))}
      </motion.div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="px-6 py-24">
      <SectionHeading
        eyebrow="Dashboard"
        title="A full SaaS command center for interview readiness"
        description="Track history, streaks, skill progress, weak topics, recommended drills, and AI evaluation trends without visual noise."
      />
      <div className="mx-auto max-w-[1250px]">
        <PremiumCard className="p-4 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
            <aside className="rounded-xl border border-white/10 bg-black/24 p-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-white text-black"><BrainCircuit className="size-5" /></div>
                <div>
                  <p className="text-sm font-semibold">Axiom</p>
                  <p className="text-xs text-slate-500">Interview OS</p>
                </div>
              </div>
              {["Overview", "Mock Sessions", "Coding Rounds", "Resume AI", "Analytics", "Coaching"].map((item, index) => (
                <div key={item} className={`mb-2 rounded-lg px-3 py-2 text-sm ${index === 0 ? "bg-white text-black" : "text-slate-400"}`}>{item}</div>
              ))}
            </aside>
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                <MetricTile label="Readiness" value="84%" trend="+9% MoM" />
                <MetricTile label="Streak" value="18d" trend="best: 31d" />
                <MetricTile label="Technical" value="88" trend="+6 pts" />
                <MetricTile label="Confidence" value="76" trend="+11 pts" />
              </div>
              <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
                <div className="rounded-xl border border-white/10 bg-black/24 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Improvement Trend</h3>
                    <span className="text-xs text-slate-500">Last 8 interviews</span>
                  </div>
                  <div className="h-52"><MiniLineChart /></div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/24 p-5">
                  <h3 className="mb-4 text-sm font-semibold">Weak Topic Analysis</h3>
                  <div className="space-y-4">
                    <ProgressBar label="Distributed Systems" value={61} tone="violet" />
                    <ProgressBar label="Async JavaScript" value={72} />
                    <ProgressBar label="Tradeoff Framing" value={68} tone="blue" />
                    <ProgressBar label="Edge Cases" value={57} tone="emerald" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}

function InterviewPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-[1250px] items-center gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Live AI sessions"
            title="Practice the pressure, not just the questions"
            description="A realistic interview workspace with AI interviewer, user response, voice input, live transcript, timer, progress, and follow-up generation."
          />
          <Link href="/interview" className="mx-auto mt-[-1rem] flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">
            Open Interview Room <ChevronRight className="size-4" />
          </Link>
        </div>
        <PremiumCard className="p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/24 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">AI Interviewer</span>
                <BadgeCheck className="size-4 text-cyan-300" />
              </div>
              <p className="text-sm leading-6 text-slate-300">“Let’s go deeper. How would your design behave when two users edit the same comment offline?”</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/24 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">Candidate Response</span>
                <Mic2 className="size-4 text-violet-300" />
              </div>
              <p className="text-sm leading-6 text-slate-300">Transcript confidence is high. Pace is steady. Answer includes one missing recovery path.</p>
            </div>
            <div className="md:col-span-2 rounded-xl border border-white/10 bg-black/24 p-5">
              <ProgressBar label="Interview Progress" value={64} />
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <MetricTile label="Timer" value="18:42" trend="system design" />
                <MetricTile label="Confidence" value="82%" trend="voice signal" />
                <MetricTile label="Follow-ups" value="3" trend="adaptive" />
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}

function CodingPreview() {
  return (
    <section className="px-6 py-24">
      <SectionHeading
        eyebrow="Live coding"
        title="A modern coding round built for interview loops"
        description="Problem statement, Monaco-style editor, tests, console output, AI hints, difficulty badges, timer, and language selector in a focused workspace."
      />
      <div className="mx-auto max-w-[1250px]">
        <PremiumCard className="p-4">
          <div className="grid min-h-[520px] overflow-hidden rounded-xl border border-white/10 lg:grid-cols-[330px_1fr_300px]">
            <div className="border-b border-white/10 bg-black/30 p-5 lg:border-b-0 lg:border-r">
              <div className="mb-3 inline-flex rounded-full bg-violet-300/10 px-3 py-1 text-xs text-violet-200">Medium</div>
              <h3 className="text-xl font-semibold">Debounced Search Analytics</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">Implement a search aggregator that batches keystrokes, cancels stale requests, and ranks recent results.</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p>Test 1: cancels stale promise</p>
                <p>Test 2: preserves latest result</p>
                <p>Test 3: handles empty input</p>
              </div>
            </div>
            <div className="bg-[#0b0f18] p-5 font-mono text-sm">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
                <span>solution.ts</span>
                <span>TypeScript</span>
              </div>
              <pre className="overflow-hidden leading-7 text-slate-300">{`export function createSearchPipeline(fetcher) {
  let activeRequest = 0;
  let timer: ReturnType<typeof setTimeout>;

  return (query: string) => new Promise((resolve) => {
    clearTimeout(timer);
    const requestId = ++activeRequest;

    timer = setTimeout(async () => {
      const result = await fetcher(query);
      if (requestId === activeRequest) resolve(result);
    }, 280);
  });
}`}</pre>
            </div>
            <div className="border-t border-white/10 bg-black/30 p-5 lg:border-l lg:border-t-0">
              <h4 className="text-sm font-semibold">AI Hint</h4>
              <p className="mt-3 text-sm leading-6 text-slate-400">Model request identity separately from the debounce timer so cancellation remains deterministic.</p>
              <div className="mt-6 rounded-xl border border-emerald-300/15 bg-emerald-300/10 p-4 text-sm text-emerald-100">
                Console: 7 passed, 1 pending
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}

function AnalyticsPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-[1250px] gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <PremiumCard className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Skill Radar</h3>
          <div className="h-80"><RadarChart /></div>
        </PremiumCard>
        <div>
          <SectionHeading
            eyebrow="Advanced analytics"
            title="Know exactly why your interviews improve"
            description="Radar charts, trend lines, communication analytics, coding metrics, strengths versus weaknesses, and AI-generated coaching insights."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricTile label="Clarity Lift" value="+23%" trend="last 30 days" />
            <MetricTile label="Bug Rate" value="-31%" trend="coding rounds" />
            <MetricTile label="STAR Quality" value="92" trend="behavioral" />
            <MetricTile label="Depth Score" value="88" trend="technical loops" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityShowcase() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-[1250px] gap-8 rounded-3xl border border-white/10 bg-white/[0.035] p-8 md:p-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
            <Zap className="size-3.5" />
            AI architecture ready
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Built for real AI workflows, not static mockups</h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            The interface includes clean placeholders for OpenAI evaluation, Whisper transcription, resume parsing, adaptive session memory, streaming AI responses, and coaching assistant workflows.
          </p>
        </div>
        <CapabilityList />
      </div>
    </section>
  );
}

function ArchitectureShowcase() {
  return (
    <section className="px-6 py-24">
      <SectionHeading
        eyebrow="Engineering depth"
        title="Production architecture behind the interview OS"
        description="This build includes real API boundaries, auth-aware routes, database models, state orchestration, streaming AI, resume ingestion, and coding evaluation hooks."
      />
      <div className="mx-auto grid max-w-[1250px] gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          ["OpenAI streaming", "Server route streams coaching chunks to the client for ChatGPT-style feedback rendering."],
          ["Whisper transcription", "Voice upload route sends microphone audio to Whisper when OPENAI_API_KEY is configured."],
          ["Session orchestration", "Start, answer, feedback, history, and stream APIs persist interview state and turns."],
          ["Database design", "Drizzle and Prisma schemas cover users, sessions, questions, answers, feedback, coding, analytics, resumes, subscriptions, and activity logs."],
          ["State handling", "Zustand stores coordinate interview flow, coding execution, analytics loading, errors, and optimistic UI."],
          ["Scalable APIs", "Structured responses, validation, rate limiting, fallback AI behavior, and deployable env configuration."],
        ].map(([title, copy]) => (
          <PremiumCard key={title} className="p-6">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
          </PremiumCard>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24">
      <SectionHeading eyebrow="Loved by candidates" title="Practice that feels closer to the real loop" description="Premium feedback loops for people preparing for technical, behavioral, and coding interviews." />
      <div className="mx-auto grid max-w-[1250px] gap-4 md:grid-cols-3">
        {[
          ["Priya S.", "Frontend Engineer", "The follow-up questions exposed the exact gaps I kept missing in senior interviews."],
          ["Marcus L.", "Full-stack Candidate", "It feels like a polished product team built my prep dashboard. The analytics changed how I practiced."],
          ["Elena R.", "New Grad SWE", "Voice scoring helped me stop rambling and structure answers with confidence."],
        ].map(([name, role, quote]) => (
          <PremiumCard key={name} className="p-6">
            <p className="text-sm leading-7 text-slate-300">“{quote}”</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-cyan-200 to-violet-300 text-sm font-bold text-black">{name[0]}</div>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            </div>
          </PremiumCard>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24">
      <SectionHeading eyebrow="Pricing" title="Start focused. Scale when your prep gets serious." description="Simple pricing cards for a production SaaS feel, with the Pro plan highlighted for interview season." />
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {[
          ["Starter", "$0", "5 mock interviews", "Basic analytics", "Community templates"],
          ["Pro", "$19", "Unlimited AI interviews", "Voice + coding analysis", "Resume question generation"],
          ["Team", "$59", "Shared candidate workspace", "Hiring loop templates", "Admin analytics"],
        ].map(([plan, price, a, b, c], index) => (
          <PremiumCard key={plan} className={`p-6 ${index === 1 ? "border-cyan-300/30 bg-cyan-300/[0.07]" : ""}`}>
            <p className="text-sm font-semibold">{plan}</p>
            <p className="mt-4 text-4xl font-semibold">{price}<span className="text-sm text-slate-500">/mo</span></p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              {[a, b, c].map((item) => <p key={item} className="flex items-center gap-2"><Check className="size-4 text-cyan-300" />{item}</p>)}
            </div>
            <Link href="/interview" className="mt-7 inline-flex h-10 w-full items-center justify-center rounded-lg bg-white text-sm font-semibold text-black">Get Started</Link>
          </PremiumCard>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="px-6 py-24">
      <SectionHeading eyebrow="FAQ" title="Built for candidates who care about precision" description="A few common questions answered directly." />
      <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.035]">
        {[
          ["Does this connect to real AI?", "The UI is structured for OpenAI streaming, response evaluation, Whisper transcription, and session memory integration."],
          ["Can I practice coding and behavioral interviews?", "Yes. The product includes dedicated surfaces for coding rounds, behavioral training, voice interviews, and analytics."],
          ["Is it responsive?", "The layouts use responsive grids, stable spacing, and mobile-friendly controls across the landing page and app screens."],
        ].map(([q, a]) => (
          <div key={q} className="p-6">
            <h3 className="font-semibold text-white">{q}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-[1100px] rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.08),rgba(103,232,249,.08),rgba(139,92,246,.08))] p-8 text-center md:p-14">
        <ShieldCheck className="mx-auto mb-5 size-10 text-cyan-200" />
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Walk into your next loop already calibrated.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">Run one AI interview today, inspect your scorecard, and turn weak signals into a deliberate plan.</p>
        <div className="mt-8 flex justify-center"><CTAButtons /></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-[1250px] flex-col justify-between gap-6 text-sm text-slate-500 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-white text-black"><BrainCircuit className="size-5" /></div>
          <span className="font-semibold text-slate-300">Axiom Interview AI</span>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href="#features">Features</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#testimonials">Testimonials</Link>
          <Link href="mailto:hello@axiom.ai">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
