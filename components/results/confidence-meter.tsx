"use client";

import { motion } from "framer-motion";
import { Gauge, ShieldCheck } from "lucide-react";
import type { ResumeAnalysis } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";

const readinessColor: Record<string, string> = {
  Low: "var(--danger)",
  Moderate: "var(--warning)",
  High: "var(--success)",
  "Very High": "var(--success)",
};

export function ConfidenceMeter({ analysis }: { analysis: ResumeAnalysis }) {
  const color = readinessColor[analysis.interviewReadiness] ?? "var(--accent)";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted">
          <Gauge className="h-4 w-4" />
          AI Confidence Meter
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted">ATS Compatibility</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              <AnimatedNumber value={analysis.atsCompatibility} suffix="%" />
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Interview Readiness</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight" style={{ color }}>
              {analysis.interviewReadiness}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Resume Score</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              <AnimatedNumber value={analysis.score} />
              <span className="text-base font-normal text-muted">/100</span>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
        >
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted">
            {analysis.confidenceSummary}
            <span className="mt-1 block text-xs text-muted/80">
              This is a helpful estimate based on patterns from similar resumes — not a guarantee of interviews or offers.
            </span>
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
