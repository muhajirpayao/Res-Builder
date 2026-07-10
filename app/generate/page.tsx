"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Download, FileOutput, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ui/score-ring";

const STAGES = ["Formatting...", "Optimizing ATS...", "Building PDF...", "Preparing download..."];

export default function GeneratePage() {
  const analysis = useAppStore((s) => s.analysis);
  const openAccountModal = useAppStore((s) => s.openAccountModal);
  const account = useAppStore((s) => s.account);
  const [stageIndex, setStageIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (stageIndex < STAGES.length) {
      const t = setTimeout(() => setStageIndex((i) => i + 1), 650);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDone(true);
  }, [stageIndex]);

  function handleOpen() {
    if (!account) {
      openAccountModal();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-md text-center">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <FileOutput className="h-7 w-7" />
              </span>
              <h1 className="mt-6 text-2xl font-semibold tracking-tight">Generating your resume</h1>
              <p className="mt-1.5 text-sm text-muted">Applying {analysis.suggestions.filter((s) => s.status === "accepted").length} accepted improvements.</p>

              <div className="mt-8 space-y-3 text-left">
                {STAGES.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                    {i < stageIndex ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : i === stageIndex ? (
                      <Loader2 className="h-5 w-5 animate-spin text-accent" />
                    ) : (
                      <span className="h-5 w-5 rounded-full border border-border" />
                    )}
                    <span className={`text-sm ${i <= stageIndex ? "text-foreground" : "text-muted"}`}>{stage}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col items-center">
                <ScoreRing score={analysis.score} size={160} strokeWidth={10} label="Final Score" />
              </div>
              <h1 className="mt-6 text-2xl font-semibold tracking-tight">Your resume is ready</h1>
              <p className="mt-1.5 text-sm text-muted">
                Optimized, ATS-friendly, and ready to send to your next application.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button size="lg" onClick={handleOpen}>
                  <Download className="h-4 w-4" /> Open Resume
                </Button>
                <p className="text-xs text-muted">
                  {account ? "Saved to your ResumePilot account." : "Create a free account to save and download your resume."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
