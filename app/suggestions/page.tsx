"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SuggestionCard } from "@/components/suggestions/suggestion-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SuggestionsPage() {
  const analysis = useAppStore((s) => s.analysis);
  const acceptedCount = analysis.suggestions.filter((s) => s.status === "accepted").length;

  return (
    <main className="min-h-screen pb-28">
      <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-accent" />
            AI Suggestions
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted">Score</span>
              <motion.span
                key={analysis.score}
                initial={{ scale: 1.15, color: "var(--success)" }}
                animate={{ scale: 1, color: "var(--foreground)" }}
                className="text-base font-semibold"
              >
                <AnimatedNumber value={analysis.score} duration={0.6} />
              </motion.span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Review your improvements</h1>
        <p className="mt-1.5 text-sm text-muted">
          {acceptedCount} of {analysis.suggestions.length} suggestions accepted. Accept, edit, or reject each one.
        </p>

        <div className="mt-8 space-y-5">
          {analysis.suggestions.map((s, i) => (
            <SuggestionCard key={s.id} suggestion={s} index={i} />
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <p className="text-xs text-muted hidden sm:block">
            You can always come back and adjust these later.
          </p>
          <Link href="/generate" className={cn(buttonVariants({ size: "lg" }), "group w-full sm:w-auto")}>
            Generate Professional Resume
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
