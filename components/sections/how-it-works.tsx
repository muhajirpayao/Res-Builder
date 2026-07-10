"use client";

import { motion } from "framer-motion";
import { UploadCloud, BrainCircuit, Wand2, FileOutput } from "lucide-react";

const steps = [
  { icon: UploadCloud, title: "Upload", desc: "Drop in your PDF, DOCX, or image — no formatting required." },
  { icon: BrainCircuit, title: "Analyze", desc: "AI reads your resume the way an ATS and a recruiter both would." },
  { icon: Wand2, title: "Improve", desc: "Review targeted suggestions and accept the ones you like." },
  { icon: FileOutput, title: "Generate", desc: "Download a polished, ATS-optimized resume in seconds." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
        <p className="mt-3 text-muted">Four steps between the resume you have and the one that gets replies.</p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative rounded-card border border-border bg-card p-6"
          >
            <span className="text-xs font-medium text-muted">Step {i + 1}</span>
            <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <step.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
