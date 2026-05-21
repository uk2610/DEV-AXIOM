"use client";

import Link from "next/link";
import { useState } from "react";
import { BrainCircuit, Mail } from "lucide-react";
import { ProductShell } from "@/components/interview-ai/shared";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <ProductShell>
      <main className="grid min-h-screen place-items-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-white text-black"><BrainCircuit className="size-6" /></div>
            <span className="text-sm font-semibold text-white">Axiom Interview AI</span>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Reset password</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your email and we will send reset instructions when email delivery is configured.</p>
          <div className="mt-6 space-y-3">
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-cyan-300/40" />
            <button onClick={() => setSent(true)} disabled={!email} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black disabled:opacity-60">
              <Mail className="size-4" /> Send reset link
            </button>
          </div>
          {sent ? <p className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm text-cyan-100">Reset flow queued for {email}. Connect SMTP in production.</p> : null}
          <p className="mt-5 text-sm text-slate-400"><Link href="/login" className="text-white">Back to login</Link></p>
        </div>
      </main>
    </ProductShell>
  );
}
