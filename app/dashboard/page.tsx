"use client";

import { motion } from "framer-motion";
import { FileText, Flame, TrendingUp } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { dashboardStats } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { TimelineChart } from "@/components/results/timeline-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  const analysis = useAppStore((s) => s.analysis);
  const account = useAppStore((s) => s.account);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back{account?.fullName ? `, ${account.fullName.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted">Here&apos;s how your resume is performing.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-card border border-border bg-card p-6"
        >
          <ScoreRing score={analysis.score} size={168} strokeWidth={11} />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted"><FileText className="h-3.5 w-3.5" /> Resumes analyzed</div>
              <p className="mt-2 text-2xl font-semibold"><AnimatedNumber value={dashboardStats.resumesAnalyzed} /></p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted"><TrendingUp className="h-3.5 w-3.5" /> Best score</div>
              <p className="mt-2 text-2xl font-semibold"><AnimatedNumber value={dashboardStats.bestScore} /></p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted"><Flame className="h-3.5 w-3.5" /> Day streak</div>
              <p className="mt-2 text-2xl font-semibold"><AnimatedNumber value={dashboardStats.streakDays} /></p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-3">
            <CardHeader><CardTitle>Recent resume</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{analysis.fileName}</p>
                  <p className="text-xs text-muted">Score {analysis.score}/100 · Updated today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Quick actions</h2>
        <QuickActions />
      </div>

      <TimelineChart data={analysis.timeline} />
    </div>
  );
}
