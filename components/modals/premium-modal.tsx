"use client";

import { Check, Crown, Download, Gauge, History, Sparkles, Target, Zap } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

const benefits = [
  { icon: Download, label: "Unlimited downloads" },
  { icon: Sparkles, label: "Unlimited AI reviews" },
  { icon: Gauge, label: "Advanced ATS optimization" },
  { icon: History, label: "Full resume history" },
  { icon: Target, label: "Job match scoring" },
  { icon: Zap, label: "Priority AI processing" },
];

export function PremiumModal() {
  const open = useAppStore((s) => s.premiumModalOpen);
  const close = useAppStore((s) => s.closePremiumModal);
  const upgrade = useAppStore((s) => s.upgradeToPremium);

  return (
    <Modal open={open} onClose={close} labelledBy="premium-title">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Crown className="h-5 w-5" />
        </span>
        <h2 id="premium-title" className="mt-4 text-xl font-semibold tracking-tight">
          Unlock ResumePilot Pro
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          Everything you need to keep improving, review after review.
        </p>
      </div>

      <ul className="space-y-3">
        {benefits.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon className="h-3.5 w-3.5" />
            </span>
            {label}
            <Check className="ml-auto h-4 w-4 text-success" />
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-center">
        <p className="text-3xl font-semibold tracking-tight">
          $5<span className="text-base font-normal text-muted">/month</span>
        </p>
        <p className="mt-1 text-xs text-muted">Cancel anytime. No commitment.</p>
      </div>

      <div className="mt-6 space-y-2.5">
        <Button className="w-full" variant="accent" onClick={upgrade}>Upgrade to Pro</Button>
        <button
          type="button"
          onClick={close}
          className="w-full text-center text-sm text-muted hover:text-foreground cursor-pointer"
        >
          Maybe later
        </button>
      </div>
    </Modal>
  );
}
