"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ScoreRing } from "@/components/ui/score-ring";
import { ConfidenceMeter } from "@/components/results/confidence-meter";
import { HealthGrid } from "@/components/results/health-grid";
import { ProblemsList } from "@/components/results/problems-list";
import { AtsRadarChart } from "@/components/results/ats-radar-chart";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
  const analysis = useAppStore((s) => s.analysis);

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-2 text-sm font-medium text-muted">
          <FileCheck2 className="h-4 w-4 text-accent" />
          {analysis.fileName}
        </div>
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-card border border-border bg-card p-8 text-center"
          >
            <ScoreRing score={analysis.score} />
            <p className="mt-4 text-xs text-muted">
              Up from <span className="font-medium text-foreground">{analysis.previousScore}</span> on your last review
            </p>
          </motion.div>

          <div className="space-y-6">
            <ConfidenceMeter analysis={analysis} />
            <AtsRadarChart data={analysis.atsBreakdown} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Resume health</h2>
          <HealthGrid categories={analysis.healthCategories} />
        </div>

        <div className="mt-8">
          <ProblemsList problems={analysis.problems} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-card border border-border bg-surface p-6 sm:flex-row"
        >
          <div>
            <p className="text-sm font-semibold">Ready to fix what&apos;s holding your score back?</p>
            <p className="mt-1 text-xs text-muted">Review {analysis.suggestions.length} AI suggestions, tailored to your resume.</p>
          </div>
          <Link href="/suggestions" className={cn(buttonVariants({ size: "lg" }), "group w-full sm:w-auto")}>
            View AI Suggestions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
