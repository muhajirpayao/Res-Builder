"use client";

import { motion } from "framer-motion";
import { Gauge, ScanLine, Sparkles, Target } from "lucide-react";

const features = [
  { icon: ScanLine, title: "ATS-first scanning", desc: "See exactly what applicant tracking systems see before a recruiter ever does." },
  { icon: Sparkles, title: "Line-by-line suggestions", desc: "Accept, edit, or reject AI rewrites for every weak bullet point." },
  { icon: Gauge, title: "Interview Readiness score", desc: "A confidence estimate for how your resume will perform, not just a raw score." },
  { icon: Target, title: "Built for real roles", desc: "Suggestions are matched to your target role and industry, not generic advice." },
];

export function FeatureStrip() {
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-none sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="border-border bg-background p-7 sm:border-r sm:last:border-r-0"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
              <f.icon className="h-4 w-4" />
            </span>
            <h3 className="mt-4 text-sm font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
