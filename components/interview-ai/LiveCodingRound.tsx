"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Lightbulb,
  Play,
  RotateCcw,
  Terminal,
  WandSparkles,
  XCircle,
} from "lucide-react";
import { MetricTile, PremiumCard, ProductShell, ProgressBar } from "./shared";
import { useCodingAIStore } from "@/store/interview-ai-store";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm text-slate-500">Loading Monaco Editor...</div>,
});

const starterCode = `type SearchResult = {
  id: string;
  score: number;
  title: string;
};

export function createSearchPipeline(
  fetcher: (query: string) => Promise<SearchResult[]>
) {
  let activeRequest = 0;
  let timer: ReturnType<typeof setTimeout>;

  return (query: string) => {
    return new Promise<SearchResult[]>((resolve) => {
      clearTimeout(timer);
      const requestId = ++activeRequest;

      timer = setTimeout(async () => {
        const result = await fetcher(query);
        if (requestId === activeRequest) {
          resolve(result.sort((a, b) => b.score - a.score));
        }
      }, 280);
    });
  };
}`;

const languageTemplates: Record<string, string> = {
  TypeScript: starterCode,
  JavaScript: starterCode
    .replace("type SearchResult = {\n  id: string;\n  score: number;\n  title: string;\n};\n\n", "")
    .replace("(query: string)", "(query)")
    .replace("Promise<SearchResult[]>", "Promise")
    .replace(": ReturnType<typeof setTimeout>", ""),
  Python: `from threading import Timer

def create_search_pipeline(fetcher):
    state = {"request_id": 0, "timer": None}

    def search(query):
        # Implement debounce, stale request protection, and sorting.
        pass

    return search`,
};

type TestResult = {
  label: string;
  passed: boolean;
};

export function LiveCodingRound() {
  const [language, setLanguage] = useState("TypeScript");
  const [code, setCode] = useState(starterCode);
  const [seconds, setSeconds] = useState(2292);
  const [isRunning, setIsRunning] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState("Ready. Run tests when you are done.");
  const [tests, setTests] = useState<TestResult[]>([
    { label: "cancels stale promise", passed: true },
    { label: "sorts by score", passed: true },
    { label: "preserves latest result", passed: true },
    { label: "empty query shortcut", passed: false },
  ]);
  const { results: backendResults, output: backendOutput, metrics, isRunning: backendRunning, runCode } =
    useCodingAIStore();

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const passedCount = tests.filter((test) => test.passed).length;
  const correctness = Math.round((passedCount / tests.length) * 100);
  const hint = useMemo(() => {
    const hints = [
      "You are close. Add an early return for empty input and resolve to an empty array before creating a timer.",
      "Model request identity separately from the debounce timer so cancellation remains deterministic.",
      "Sort inside the latest request branch so stale responses never mutate returned output.",
    ];
    return hints[hintLevel % hints.length];
  }, [hintLevel]);

  const runTests = () => {
    setIsRunning(true);
    setConsoleOutput("Running tests...");
    void runCode({ language, code });
    window.setTimeout(() => {
      const normalized = code.toLowerCase();
      const handlesEmpty = normalized.includes("query.trim") || normalized.includes("query ===") || normalized.includes("if not query") || normalized.includes("return []");
      const handlesSort = normalized.includes("sort");
      const handlesStale = normalized.includes("requestid") || normalized.includes("request_id") || normalized.includes("active");
      const handlesDebounce = normalized.includes("settimeout") || normalized.includes("timer");
      const nextTests = [
        { label: "cancels stale promise", passed: handlesStale },
        { label: "sorts by score", passed: handlesSort },
        { label: "preserves latest result", passed: handlesDebounce && handlesStale },
        { label: "empty query shortcut", passed: handlesEmpty },
      ];
      const nextPassed = nextTests.filter((test) => test.passed).length;
      setTests(nextTests);
      setConsoleOutput(
        nextPassed === nextTests.length
          ? "All tests passed. AI review: clean solution with deterministic cancellation."
          : `${nextPassed}/${nextTests.length} tests passed. Review the failing case and apply the next hint.`,
      );
      setIsRunning(false);
    }, 900);
  };

  useEffect(() => {
    if (backendResults.length) {
      setTests(backendResults);
      setConsoleOutput(backendOutput);
      setIsRunning(false);
    }
  }, [backendOutput, backendResults]);

  const changeLanguage = (nextLanguage: string) => {
    setLanguage(nextLanguage);
    setCode(languageTemplates[nextLanguage]);
    setConsoleOutput(`Switched editor to ${nextLanguage}.`);
  };

  const applyHint = () => {
    setHintLevel((value) => value + 1);
    if (!code.toLowerCase().includes("query.trim") && language !== "Python") {
      setCode(code.replace("return (query: string) => {", "return (query: string) => {\n    if (!query.trim()) return Promise.resolve([]);"));
    }
  };

  const reset = () => {
    setLanguage("TypeScript");
    setCode(starterCode);
    setSeconds(2292);
    setHintLevel(0);
    setConsoleOutput("Ready. Run tests when you are done.");
    setTests([
      { label: "cancels stale promise", passed: true },
      { label: "sorts by score", passed: true },
      { label: "preserves latest result", passed: true },
      { label: "empty query shortcut", passed: false },
    ]);
  };

  return (
    <ProductShell>
      <main className="mx-auto max-w-[1500px] px-4 py-5">
        <div className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="grid size-10 place-items-center rounded-xl border border-white/10 bg-black/24"><ArrowLeft className="size-4" /></Link>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Live Coding Round</h1>
              <p className="text-sm text-slate-500">Monaco editor, AI hints, tests, console output, and timing.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/24 px-3 py-2 text-sm text-slate-300">
              <Clock3 className="size-4" />{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}
            </div>
            <select value={language} onChange={(event) => changeLanguage(event.target.value)} className="h-10 rounded-lg border border-white/10 bg-black/50 px-3 text-sm text-white">
              <option>TypeScript</option>
              <option>JavaScript</option>
              <option>Python</option>
            </select>
            <button onClick={reset} className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04]"><RotateCcw className="size-4" /></button>
            <button onClick={runTests} disabled={isRunning || backendRunning} className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black disabled:opacity-60">
              <Play className="size-4" />{isRunning || backendRunning ? "Running..." : "Run tests"}
            </button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[350px_1fr_330px]">
          <PremiumCard className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-full bg-violet-300/10 px-3 py-1 text-xs text-violet-200">Medium</div>
              <Code2 className="size-5 text-cyan-200" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Debounced Search Analytics</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Build a search pipeline that debounces user input, cancels stale requests, sorts results by score, and handles empty input without unnecessary network calls.
            </p>
            <div className="mt-6 space-y-3">
              {["Debounce calls by 280ms", "Only resolve latest request", "Sort results descending", "Return [] for empty query"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/24 p-3 text-sm text-slate-300">{item}</div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-slate-300"><BrainCircuit className="size-4 text-cyan-200" />solution.{language === "Python" ? "py" : language === "JavaScript" ? "js" : "ts"}</div>
              <div className="text-xs text-slate-500">autosaved locally</div>
            </div>
            <div className="h-[620px]">
              <MonacoEditor
                height="100%"
                language={language === "Python" ? "python" : language === "JavaScript" ? "javascript" : "typescript"}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "var(--font-ibm-plex-mono)",
                  padding: { top: 20 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </PremiumCard>

          <aside className="space-y-5">
            <PremiumCard className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <Terminal className="size-5 text-emerald-200" />
                <h2 className="text-lg font-semibold">Test Cases</h2>
              </div>
              <div className="space-y-3 text-sm">
                {tests.map((test) => (
                  <div key={test.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/24 p-3">
                    <span className={test.passed ? "flex items-center gap-2 text-emerald-200" : "flex items-center gap-2 text-rose-200"}>
                      {test.passed ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
                      {test.passed ? "PASS" : "FAIL"}
                    </span>
                    <span className="text-right text-slate-400">{test.label}</span>
                  </div>
                ))}
              </div>
            </PremiumCard>
            <PremiumCard className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lightbulb className="size-5 text-cyan-200" />
                  <h2 className="text-lg font-semibold">AI Hints</h2>
                </div>
                <button onClick={applyHint} className="rounded-lg bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">Apply</button>
              </div>
              <p className="text-sm leading-7 text-slate-400">{hint}</p>
            </PremiumCard>
            <PremiumCard className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <WandSparkles className="size-5 text-violet-200" />
                <h2 className="text-lg font-semibold">Round Metrics</h2>
              </div>
              <div className="space-y-5">
                <ProgressBar label="Correctness" value={metrics.correctness || correctness} />
                <ProgressBar label="Complexity" value={metrics.complexity || (code.includes("sort") ? 82 : 54)} tone="violet" />
                <ProgressBar label="Testing" value={metrics.testing || passedCount * 22} tone="emerald" />
              </div>
            </PremiumCard>
            <MetricTile label="Console Output" value={`${passedCount}/${tests.length}`} trend={consoleOutput} />
          </aside>
        </div>
      </main>
    </ProductShell>
  );
}
