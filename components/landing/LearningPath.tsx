"use client";

import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Revise Core Concepts",
        description: "Quickly revise HTML, CSS, JavaScript, React, and more with focused, MDN-style documentation built for interview revision.",
        iconPath: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9l3 3-3 3" />
                <path d="M13 15h2" />
            </svg>
        )
    },
    {
        title: "Understand Architecture",
        description: "Simple, diagram-driven blogs that break down complex architectures and real-world frontend patterns.",
        iconPath: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        )
    },
    {
        title: "Machine Coding Rounds",
        description: "Solve real React machine coding problems in a live sandbox with editor, console, preview, and timer tracking.",
        iconPath: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        )
    }
];

export function LearningPath() {
    return (
        <section className="border-b border-border/50 py-24">
            <div className="mx-auto max-w-[1250px] px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <span className="mb-4 block text-[10px] font-semibold uppercase tracking-wider text-primary">
                            INTERVIEW PREPARATION FLOW
                        </span>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-foreground">
                        Revise. Practice. <br className="hidden md:block" />Crack Developer Interviews.
                        </h2>
                        <p className="text-muted-foreground text-[15px] max-w-sm leading-relaxed">
                            A clear path to prepare for developer interviews without jumping across multiple platforms.
                        </p>
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card/80 p-8 text-center shadow-[0_8px_35px_rgba(12,25,48,0.08)]"
                        >
                            <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-primary/70 via-primary to-amber-400/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="mb-6 flex h-32 w-full items-center justify-center rounded-lg border border-border bg-muted/30 text-foreground/80 opacity-70">
                                {feature.iconPath}
                            </div>
                            <h3 className="mb-3 text-[15px] font-semibold text-foreground">{feature.title}</h3>
                            <p className="max-w-[250px] text-xs leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
