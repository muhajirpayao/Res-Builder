"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, FileCheck2, Gauge, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export function Hero() {
  const continueAsGuest = useAppStore((s) => s.continueAsGuest);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent)]" />

      <div className="mx-auto max-w-4xl px-5 pb-20 pt-20 text-center sm:px-8 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          AI resume review, under a minute
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Land More Interviews with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted"
        >
          Upload your resume and receive an AI-powered review in under one minute — ATS scoring, interview readiness, and suggestions you can accept in one click.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/upload" className={cn(buttonVariants({ size: "lg" }), "group")}>
            Upload Resume
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/upload"
            onClick={() => continueAsGuest()}
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            Continue as Guest
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <div className="animate-float rounded-2xl border border-border bg-card p-5 text-left shadow-xl sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted">
                <FileCheck2 className="h-4 w-4 text-accent" />
                Jordan_Reyes_Resume.pdf
              </div>
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">Analysis complete</span>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs text-muted">Resume Score</p>
                <p className="mt-1 text-2xl font-semibold">91<span className="text-sm font-normal text-muted">/100</span></p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs text-muted">ATS Compatibility</p>
                <p className="mt-1 text-2xl font-semibold">96%</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="flex items-center gap-1 text-xs text-muted"><Gauge className="h-3 w-3" /> Interview Readiness</p>
                <p className="mt-1 text-2xl font-semibold text-success">High</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 hidden rotate-3 rounded-xl border border-border bg-card px-4 py-3 text-xs font-medium shadow-lg sm:flex sm:items-center sm:gap-2">
            <ArrowUpRight className="h-3.5 w-3.5 text-success" />
            +7 suggestions accepted
          </div>
        </motion.div>
      </div>
    </section>
  );
}
