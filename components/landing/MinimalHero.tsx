"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MinimalHero() {
    return (
        <section className="relative overflow-hidden border-b border-border/50 pt-20 pb-16 md:pt-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(17,159,196,0.14),transparent_36%),radial-gradient(circle_at_84%_8%,rgba(233,171,75,0.12),transparent_35%)]" />
            <div className="relative mx-auto max-w-[1250px] px-6">
                {/* Text Content - Left Aligned */}
                <div className="max-w-4xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                            Full-Stack Interview Lab
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mb-6 text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-[3.8rem]"
                    >
                        Build Real Interview Confidence,
                        <span className="block text-primary">Not Just Theoretical Knowledge</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                                className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground"
                    >
                              Dev Axioms combines guided roadmaps, timed practice sets, and live coding rounds so you can train like an actual interview environment, from beginner to advanced.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/practice"
                            className={cn(
                                buttonVariants({ size: "default" }),
                                "rounded-md px-8 h-11 text-sm font-medium bg-foreground text-background"
                            )}
                        >
                            Start Practicing
                        </Link>
                        <Link
                            href="/web-dev/html-css/basic-html"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "default" }),
                                "rounded-md px-8 h-11 text-sm font-medium bg-transparent border-border hover:bg-muted"
                            )}
                        >
                            Explore Learning Paths
                        </Link>
                    </motion.div>
                </div>

                {/* Imagery - Two Columns */}
                <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="group relative h-[250px] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-[0_10px_45px_rgba(15,30,55,0.08)] transition-all duration-700 md:h-[350px]"
                    >
                        <Image
                            src="/banner.png"
                            alt="Interactive Editor"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-8 opacity-0 transition-all duration-500 group-hover:opacity-100">
                            <div className="text-white w-full">
                                <p className="font-semibold text-base mb-1 tracking-tight">Practice Questions</p>
                                <p className="max-w-xs text-[13px] leading-relaxed text-white/75">Solve role-based interview challenges with timed rounds and multiple difficulty tracks.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="group relative h-[250px] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-[0_10px_45px_rgba(15,30,55,0.08)] transition-all duration-700 md:h-[350px]"
                    >
                        <Image
                            src="/banner2.png"
                            alt="Dev Axioms Documentation"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-8 opacity-0 transition-all duration-500 group-hover:opacity-100">
                            <div className="text-white w-full">
                                <p className="mb-1 text-base font-semibold tracking-tight">Roadmaps and Theory</p>
                                <p className="max-w-xs text-[13px] leading-relaxed text-white/75">Follow structured concept maps covering fundamentals, architecture, and interview essentials.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                    className="grid grid-cols-1 gap-3 rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur md:grid-cols-3"
                >
                    {[
                        { label: "Question Tracks", value: "8 Languages" },
                        { label: "Difficulty Levels", value: "Beginner to Advanced" },
                        { label: "Practice Mode", value: "Timer + Editor + Preview" },
                    ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-border/50 bg-background/70 p-4">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                            <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
