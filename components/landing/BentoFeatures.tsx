"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BentoFeatures() {
    return (
        <section className="relative border-b border-border/50 py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_85%,rgba(17,159,196,0.12),transparent_38%)]" />
            <div className="relative mx-auto max-w-[1250px] px-6">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
                    <div className="lg:w-5/12 pt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-wider text-primary">
                                STRUCTURED INTERVIEW PRACTICE
                            </span>
                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-foreground leading-[1.1]">
                                From Concept Revision to Real Machine Coding Rounds
                            </h2>
                            <p className="mb-8 max-w-[90%] text-[15px] leading-relaxed text-muted-foreground">
                                Revise important concepts, solve curated interview questions, and practice real machine coding rounds in a focused, distraction-free environment.
                            </p>

                            {/* <Link
                                href="/practice"
                                className={cn(
                                    buttonVariants({ variant: "default", size: "default" }),
                                    "rounded-md px-6 h-10 font-medium bg-foreground text-background"
                                )}
                            >
                                Start Practicing
                            </Link> */}

                            <div className="mt-16 flex items-center gap-4 border-t border-border pt-6">
                                <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary/15">
                                    <span className="block h-2 w-2 rounded-[2px] bg-primary" />
                                </div>
                                <div>
                                    <p className="mr-1 inline-block align-middle text-[13px] font-medium text-muted-foreground">Live editor with preview and timers for real interview-style practice.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative h-[500px] overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-[0_15px_55px_rgba(16,32,56,0.12)]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                                alt="Platform UI Placeholder"
                                fill
                                className="object-cover opacity-70 transition-all duration-700"
                            />

                            {/* Floating UI element */}
                            <div className="absolute bottom-10 left-10 right-10 rounded-2xl border border-border/70 bg-background/85 p-5 shadow-2xl backdrop-blur md:right-auto md:w-[340px]">
                                <div className="mb-6 flex items-center gap-3 border-b border-border/50 pb-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                                        RC
                                    </div>
                                    <div>
                                        <p className="font-medium text-xs text-foreground">React Challenges</p>
                                    </div>
                                    <div className="ml-auto text-xs text-muted-foreground">22 Available</div>
                                </div>

                                <div className="space-y-4 text-xs font-medium">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span className="flex items-center gap-2">Difficulty</span>
                                        <span className="text-foreground">Advanced</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span className="flex items-center gap-2">Framework</span>
                                        <span className="text-foreground">Next.js 14</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span className="flex items-center gap-2">Modules</span>
                                        <span className="text-foreground">12 Sections</span>
                                    </div>
                                </div>
                                <div className="mt-6 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-primary">
                                    Includes scoring rubric + hints
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
