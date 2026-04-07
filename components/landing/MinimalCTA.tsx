"use client";

import Link from "next/link";

export function MinimalCTA() {
    return (
        <section className="border-b border-border/50 py-24">
            <div className="mx-auto max-w-[1250px] px-6">
                <div className="mb-12 text-center md:text-left">
                    <span className="mb-4 block text-[10px] font-semibold uppercase tracking-wider text-primary">
                       FREE & OPEN SOURCE
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
                        Interview Prep for Developers
                    </h2>
                    <p className="text-muted-foreground text-[15px] max-w-lg mx-auto md:mx-0">
                        Dev Axioms is a free, open-source platform to revise concepts, explore real interview questions, and practice machine coding rounds — without paywalls.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Practice Card */}
                    <div className="rounded-3xl border border-border bg-gradient-to-br from-primary to-cyan-700 p-8 text-primary-foreground shadow-xl md:p-12">
                        <div className="mb-8">
                            <div className="mb-8 inline-block rounded-md border border-white/20 bg-white/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/70">
                                MACHINE CODING PRACTICE
                            </div>
                            <h3 className="text-2xl font-medium mb-3">Hands-on Practice</h3>
                            <p className="max-w-xs text-sm leading-relaxed text-white/75">Jump into realistic coding rounds with starter code, timer pressure, and curated progression paths.</p>
                        </div>
                        {/* <div className="flex items-end gap-2 mb-10">
                            <span className="text-4xl leading-none font-medium -tracking-wider">Start Practicing</span>
                        </div> */}
                        <Link
                            href="/practice"
                            className="flex h-12 w-full items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-slate-900 transition-opacity hover:opacity-90 md:inline-flex md:w-auto"
                        >
                            Explore Questions
                        </Link>
                    </div>

                    {/* Resources Card */}
                    <div className="rounded-3xl border border-border bg-card/85 p-8 shadow-[0_10px_38px_rgba(16,30,52,0.08)] backdrop-blur md:p-12">
                        <div className="mb-8">
                            <div className="mb-8 inline-block rounded-md border border-border bg-background px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                ROADMAPS & THEORY
                            </div>
                            <h3 className="mb-3 text-2xl font-medium text-foreground">Structured Learning Tracks</h3>
                            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Move through curated docs and roadmap-style paths that connect concepts directly to interview outcomes.</p>
                        </div>
                        {/* <div className="flex flex-col gap-2 mb-10 text-foreground">
                            <span className="text-4xl leading-none font-medium -tracking-wider">Explore Docs</span>
                        </div> */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/web-dev/html-css/basic-html"
                                className="flex h-12 w-full items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background transition-opacity hover:opacity-90 md:inline-flex md:w-auto"
                            >
                                View Docs
                            </Link>
                            <Link
                                href="/web3"
                                className="flex h-12 w-full items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium text-foreground transition-opacity hover:bg-muted md:inline-flex md:w-auto"
                            >
                                View Roadmaps
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
