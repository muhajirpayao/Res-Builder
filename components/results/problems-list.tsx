"use client";

import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { ResumeProblem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const severityConfig = {
  high: { icon: AlertTriangle, color: "var(--danger)", label: "High impact" },
  medium: { icon: AlertCircle, color: "var(--warning)", label: "Medium impact" },
  low: { icon: Info, color: "var(--muted)", label: "Low impact" },
};

export function ProblemsList({ problems }: { problems: ResumeProblem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Problems found</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {problems.map((problem, i) => {
          const config = severityConfig[problem.severity];
          const Icon = config.icon;
          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card">
                <Icon className="h-4 w-4" style={{ color: config.color }} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{problem.title}</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: `color-mix(in srgb, ${config.color} 14%, transparent)`, color: config.color }}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{problem.description}</p>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
