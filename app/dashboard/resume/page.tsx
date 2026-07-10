"use client";

import Link from "next/link";
import { Download, RefreshCcw } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ScoreRing } from "@/components/ui/score-ring";
import { ConfidenceMeter } from "@/components/results/confidence-meter";
import { HealthGrid } from "@/components/results/health-grid";
import { ProblemsList } from "@/components/results/problems-list";
import { AtsRadarChart } from "@/components/results/ats-radar-chart";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MyResumePage() {
  const analysis = useAppStore((s) => s.analysis);
  const account = useAppStore((s) => s.account);
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Resume</h1>
          <p className="mt-1 text-sm text-muted">{analysis.fileName}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/upload" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
            <RefreshCcw className="h-3.5 w-3.5" /> Generate again
          </Link>
          <Button size="sm" onClick={() => { if (!account?.isPremium) openPremiumModal(); }}>
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-card border border-border bg-card p-8">
          <ScoreRing score={analysis.score} />
        </div>
        <div className="space-y-6">
          <ConfidenceMeter analysis={analysis} />
          <AtsRadarChart data={analysis.atsBreakdown} />
        </div>
      </div>

      <HealthGrid categories={analysis.healthCategories} />
      <ProblemsList problems={analysis.problems} />
    </div>
  );
}
