import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    FileText,
    FolderKanban,
    Puzzle,
    Sparkles,
} from "lucide-react";

const playgrounds = [
    {
        title: "Practice Arena",
        description:
            "Solve coding problems with editor, timer, and solution review flow.",
        href: "/practice",
        icon: Puzzle,
        badge: "Core",
    },
    {
        title: "Markdown Lab",
        description:
            "Write and preview markdown/MDX with your in-house editor experience.",
        href: "/md-editor",
        icon: FileText,
        badge: "Live",
    },
    {
        title: "File Manager Lab",
        description:
            "Create, edit, and manage project-like file trees in-browser.",
        href: "/file-manager",
        icon: FolderKanban,
        badge: "Interactive",
    },
    {
        title: "Web Dev Track",
        description:
            "Deep theory and interview-focused docs to pair with your practice sessions.",
        href: "/web-dev",
        icon: BookOpen,
        badge: "Docs",
    },
];

const buildFlow = [
    {
        title: "Read",
        description: "Understand the concept from web-dev docs and examples.",
    },
    {
        title: "Practice",
        description: "Solve interview-focused coding problems with timer and hints.",
    },
    {
        title: "Ship",
        description: "Prototype ideas in labs and convert knowledge into projects.",
    },
];

export default function PlaygroundsHubPage() {
    return (
        <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.16),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,0.14),transparent_40%),linear-gradient(180deg,rgba(2,6,23,0.03),transparent_45%)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
                <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
                <div className="space-y-5 text-center md:text-left">
                    <p className="text-sm font-semibold tracking-[0.24em] text-emerald-500 uppercase">
                        Dev Axioms Labs
                    </p>
                    <h1 className="text-4xl font-extrabold tracking-tight text-balance md:text-6xl [font-family:ui-rounded,Charter,'Avenir_Next',Avenir,sans-serif]">
                        Turn Theory Into Shipping Skills
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed md:mx-0 md:text-lg">
                        This is your execution layer for Dev Axioms. Learn from docs,
                        practice under pressure, and build with real tools in one continuous
                        workflow.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                        <Link
                            href="/practice"
                            className={buttonVariants({ variant: "default", size: "lg" })}
                        >
                            Start Practicing
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link
                            href="/web-dev"
                            className={buttonVariants({ variant: "outline", size: "lg" })}
                        >
                            Explore Docs
                        </Link>
                    </div>
                    <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-medium tracking-wide uppercase md:justify-start">
                        <span className="rounded-full border px-3 py-1">Interview Ready</span>
                        <span className="rounded-full border px-3 py-1">Hands-On First</span>
                        <span className="rounded-full border px-3 py-1">Project Mindset</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {playgrounds.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group bg-card/70 hover:bg-card flex flex-col gap-4 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                                        <Icon className="h-3.5 w-3.5" />
                                        {item.badge}
                                    </div>
                                    <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="rounded-2xl border bg-card/60 p-5 md:p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <h2 className="text-xl font-semibold md:text-2xl">How To Use This Best</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {buildFlow.map((step, index) => (
                            <article
                                key={step.title}
                                className="rounded-xl border bg-background/60 p-4"
                            >
                                <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                                    Step {index + 1}
                                </p>
                                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                    <div className="text-muted-foreground flex items-center gap-2 rounded-xl border bg-background/70 p-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Route-backed labs only
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 rounded-xl border bg-background/70 p-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Reusable editor components
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 rounded-xl border bg-background/70 p-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Interview-oriented learning path
                    </div>
                </div>
            </div>

        </section>
    );
}
