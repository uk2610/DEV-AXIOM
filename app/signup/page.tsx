"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { ProductShell } from "@/components/interview-ai/shared";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createAccount = async () => {
    setLoading(true);
    await authClient.signUp.email(
      { name, email, password, callbackURL: "/dashboard" },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: (ctx) => {
          toast.error(ctx.error.message || "Signup failed");
        },
        onResponse: () => setLoading(false),
      },
    );
  };

  return (
    <ProductShell>
      <main className="grid min-h-screen place-items-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-white text-black"><BrainCircuit className="size-6" /></div>
            <span className="text-sm font-semibold text-white">Axiom Interview AI</span>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Start tracking real AI interview progress.</p>
          <div className="mt-6 space-y-3">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-cyan-300/40" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-cyan-300/40" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-cyan-300/40" />
            <button onClick={createAccount} disabled={loading || !name || !email || password.length < 8} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black disabled:opacity-60">
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              Create account
            </button>
          </div>
          <p className="mt-5 text-sm text-slate-400">Already have an account? <Link href="/login" className="text-white">Login</Link></p>
        </div>
      </main>
    </ProductShell>
  );
}
