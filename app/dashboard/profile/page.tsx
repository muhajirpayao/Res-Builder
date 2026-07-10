"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const experienceLevels = ["Entry-level", "Mid-level (2-4 years)", "Senior (5-8 years)", "Lead / Principal"];

function Field({
  label, value, onChange, textarea,
}: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      )}
    </div>
  );
}

export default function ProfilePage() {
  const profile = useAppStore((s) => s.profile);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const [savedPulse, setSavedPulse] = useState(false);

  function handleChange(field: keyof typeof profile, value: string) {
    updateProfile({ [field]: value });
    setSavedPulse(true);
    setTimeout(() => setSavedPulse(false), 1200);
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-muted">Used to tailor AI suggestions to your goals.</p>
        </div>
        <AnimatePresence>
          {savedPulse && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-xs font-medium text-success"
            >
              <Check className="h-3.5 w-3.5" /> Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <Card>
        <CardHeader><CardTitle>Career goal</CardTitle></CardHeader>
        <CardContent>
          <Field label="What are you working toward?" textarea value={profile.careerGoal} onChange={(v) => handleChange("careerGoal", v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <Field label="Target role" value={profile.targetRole} onChange={(v) => handleChange("targetRole", v)} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Country" value={profile.country} onChange={(v) => handleChange("country", v)} />
            <Field label="Industry" value={profile.industry} onChange={(v) => handleChange("industry", v)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Experience level</label>
            <div className="flex flex-wrap gap-2">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleChange("experienceLevel", level)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    profile.experienceLevel === level
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
