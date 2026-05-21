"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrainCircuit, Loader2, LogIn } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import { authClient, signIn } from "@/lib/auth-client";
import { ProductShell } from "@/components/interview-ai/shared";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const from = params?.get("from") ?? "/dashboard";

  const callbackURL =
    typeof window !== "undefined" ? `${window.location.origin}${decodeURIComponent(from)}` : "/dashboard";

  const handleEmailLogin = async () => {
    setLoading(true);
    await signIn.email(
      { email, password, callbackURL: from },
      {
        onSuccess: () => router.push(from),
        onError: (ctx) => {
          toast.error(ctx.error.message || "Login failed");
        },
        onResponse: () => setLoading(false),
      },
    );
  };

  const handleSocial = async (provider: "google" | "github") => {
    setLoading(true);
    await signIn.social({
      provider,
      callbackURL,
      fetchOptions: {
        onError: () => {
          toast.error("Social sign-in is not configured yet.");
          setLoading(false);
        },
      },
    });
  };

  return (
    <ProductShell>
      <main className="grid min-h-screen place-items-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-white text-black"><BrainCircuit className="size-6" /></div>
            <div>
              <p className="text-sm font-semibold text-white">Axiom Interview AI</p>
              <p className="text-xs text-slate-500">Production SaaS auth</p>
            </div>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to continue your AI interview training.</p>

          <div className="mt-6 grid gap-3">
            <button onClick={() => handleSocial("google")} disabled={loading} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-white transition hover:bg-white/[0.08]">
              <FaGoogle /> Continue with Google
            </button>
            <button onClick={() => handleSocial("github")} disabled={loading} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-white transition hover:bg-white/[0.08]">
              <FaGithub /> Continue with GitHub
            </button>
          </div>

          <div className="my-6 h-px bg-white/10" />
          <div className="space-y-3">
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-cyan-300/40" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-cyan-300/40" />
            <button onClick={handleEmailLogin} disabled={loading || !email || !password} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black disabled:opacity-60">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
              Login
            </button>
          </div>

          <div className="mt-5 flex justify-between text-sm text-slate-400">
            <Link href="/signup" className="hover:text-white">Create account</Link>
            <Link href="/forgot-password" className="hover:text-white">Forgot password?</Link>
          </div>
        </div>
      </main>
    </ProductShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-black text-white"><Loader2 className="animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
