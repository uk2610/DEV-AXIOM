import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Blocks, ShieldCheck, Timer, Workflow } from "lucide-react";

export default function Web3Page() {
    const roadmapPhases = [
        {
            phase: "Phase 1",
            title: "Core Chain Fundamentals",
            details:
                "Consensus, transactions, wallets, gas models, and basic smart contract lifecycle.",
        },
        {
            phase: "Phase 2",
            title: "Protocol & App Building",
            details:
                "Token standards, DeFi primitives, oracle integration, and production-ready architecture.",
        },
        {
            phase: "Phase 3",
            title: "Security & Scale",
            details:
                "Threat modeling, audit mindset, L2 tradeoffs, and high-scale backend integrations.",
        },
    ];

    const tracks = [
        {
            title: "Ethereum Developer Track",
            level: "Beginner to Advanced",
            href: "/web3/ethereum",
            status: "Available",
            points: ["EVM internals", "Solidity patterns", "Gas optimization"],
        },
        {
            title: "Solana Builder Track",
            level: "Intermediate to Advanced",
            href: "/web3/solana",
            status: "Available",
            points: ["Accounts model", "Programs in Rust", "Anchor workflow"],
        },
        {
            title: "Smart Contract Security",
            level: "Intermediate",
            href: "/coming-soon",
            status: "In Progress",
            points: ["Attack vectors", "Audit checklist", "Defense patterns"],
        },
        {
            title: "DeFi Systems Design",
            level: "Advanced",
            href: "/coming-soon",
            status: "In Progress",
            points: ["AMM mechanics", "Risk controls", "Protocol architecture"],
        },
    ];

    return (
        <div className="container mx-auto max-w-6xl px-6 py-20">
            <div className="mb-12 rounded-3xl border border-border/70 bg-card/70 p-8 backdrop-blur">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Workflow className="h-3.5 w-3.5" />
                    Web3 Roadmaps
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Structured Blockchain Learning Paths
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Move from fundamentals to protocol-level engineering using clear progression phases, deep-dive tracks, and practice-first checkpoints.
                </p>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {roadmapPhases.map((item) => (
                    <Card key={item.phase} className="border-border/60 bg-card/70">
                        <CardHeader className="space-y-2">
                            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                                {item.phase}
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm leading-relaxed">
                                {item.details}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {tracks.map((track) => (
                    <Link key={track.title} href={track.href} className="group">
                        <Card className="h-full border-border/70 bg-card/75 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                            <CardHeader>
                                <div className="mb-1 flex items-center justify-between gap-3">
                                    <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        {track.level}
                                    </span>
                                    <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                                        {track.status}
                                    </span>
                                </div>
                                <CardTitle className="text-xl tracking-tight transition-colors group-hover:text-primary">
                                    {track.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {track.points.map((point) => (
                                        <li key={point} className="flex items-center gap-2">
                                            <Blocks className="h-3.5 w-3.5 text-primary" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                                    Open Track <ArrowRight className="ml-1.5 h-4 w-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="border-border/70 bg-card/75">
                    <CardHeader>
                        <div className="mb-1 inline-flex items-center gap-2 text-primary">
                            <Timer className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Practice Layer</span>
                        </div>
                        <CardTitle className="text-lg">Timed Challenge Routine</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Pair each roadmap topic with timed coding sessions in Interview Prep for faster retention.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="border-border/70 bg-card/75">
                    <CardHeader>
                        <div className="mb-1 inline-flex items-center gap-2 text-primary">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Security Layer</span>
                        </div>
                        <CardTitle className="text-lg">Audit Mindset Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Every advanced track includes security checks, common exploit patterns, and mitigation references.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="border-border/70 bg-card/75">
                    <CardHeader>
                        <div className="mb-1 inline-flex items-center gap-2 text-primary">
                            <Workflow className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Execution Layer</span>
                        </div>
                        <CardTitle className="text-lg">Roadmap to Interview Flow</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <CardDescription>
                            Use roadmap modules as theory blocks, then apply immediately in interview-focused exercises.
                        </CardDescription>
                        <Link href="/interview-prep">
                            <Button size="sm" className="w-full">Go To Interview Prep</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
