"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Check, Sparkles } from "lucide-react";
import { AI_LOADING_STEPS } from "@/lib/mock-data";

export function AiLoading() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
  const [done, setDone] = useState(false);

  const currentStep = AI_LOADING_STEPS[stepIndex];

  useEffect(() => {
    if (done) return;
    if (checkedCount < currentStep.checks.length) {
      const t = setTimeout(() => setCheckedCount((c) => c + 1), 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (stepIndex < AI_LOADING_STEPS.length - 1) {
        setStepIndex((i) => i + 1);
        setCheckedCount(0);
      } else {
        setDone(true);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [checkedCount, currentStep, stepIndex, done]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => router.push("/results"), 1100);
      return () => clearTimeout(t);
    }
  }, [done, router]);

  const overallProgress = done
    ? 100
    : ((stepIndex + checkedCount / currentStep.checks.length) / AI_LOADING_STEPS.length) * 100;

  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-col items-center text-center">
        <motion.span
          animate={{ rotate: done ? 0 : 360 }}
          transition={{ duration: 2.4, repeat: done ? 0 : Infinity, ease: "linear" }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent"
        >
          {done ? <Sparkles className="h-7 w-7" /> : <BrainCircuit className="h-7 w-7" />}
        </motion.span>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          {done ? "Resume Ready" : "Analyzing your resume"}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          {done ? "Redirecting to your results..." : "This usually takes under a minute."}
        </p>
      </div>

      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${overallProgress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>

      <div className="mt-8 min-h-[220px] rounded-2xl border border-border bg-card p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <BrainCircuit className="h-4 w-4 text-accent" />
              {currentStep.label}
            </div>
            <p className="mt-1 text-xs text-muted">{currentStep.detail}</p>

            <ul className="mt-4 space-y-2.5">
              {currentStep.checks.map((check, i) => (
                <AnimatePresence key={check}>
                  {i < checkedCount && (
                    <motion.li
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success/15 text-success">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      {check}
                    </motion.li>
                  )}
                </AnimatePresence>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {AI_LOADING_STEPS.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 rounded-full transition-all ${
              i <= stepIndex ? "w-6 bg-accent" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
