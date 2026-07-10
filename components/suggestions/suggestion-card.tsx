"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Check, Pencil, TrendingUp, X } from "lucide-react";
import type { Suggestion } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

export function SuggestionCard({ suggestion, index }: { suggestion: Suggestion; index: number }) {
  const acceptSuggestion = useAppStore((s) => s.acceptSuggestion);
  const rejectSuggestion = useAppStore((s) => s.rejectSuggestion);
  const editSuggestion = useAppStore((s) => s.editSuggestion);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(suggestion.after);

  const isAccepted = suggestion.status === "accepted";
  const isRejected = suggestion.status === "rejected";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-card border bg-card p-6 transition-colors ${
        isAccepted ? "border-success/40" : isRejected ? "border-border opacity-60" : "border-border"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="accent">{suggestion.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted">
            <TrendingUp className="h-3 w-3" /> +{suggestion.impact} pts
          </span>
        </div>
        {isAccepted && (
          <Badge variant="success">
            <Check className="h-3 w-3" /> Accepted
          </Badge>
        )}
        {isRejected && <Badge variant="default">Rejected</Badge>}
      </div>

      <h3 className="mt-3 text-sm font-semibold">{suggestion.title}</h3>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted">Before</p>
          <p className="mt-1.5 text-sm text-muted line-through decoration-border">{suggestion.before}</p>
        </div>
        <div className="flex justify-center text-muted">
          <ArrowDown className="h-4 w-4" />
        </div>
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-accent">After</p>
          {editing ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background p-2 text-sm outline-none focus:border-accent"
            />
          ) : (
            <p className="mt-1.5 text-sm">{suggestion.after}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.div key="edit-actions" className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button
                size="sm"
                onClick={() => {
                  editSuggestion(suggestion.id, draft);
                  setEditing(false);
                  acceptSuggestion(suggestion.id);
                }}
              >
                Save & accept
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </motion.div>
          ) : (
            <motion.div key="default-actions" className="flex flex-wrap gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button size="sm" onClick={() => acceptSuggestion(suggestion.id)} disabled={isAccepted}>
                <Check className="h-3.5 w-3.5" /> Accept
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
              <Button size="sm" variant="ghost" onClick={() => rejectSuggestion(suggestion.id)} disabled={isRejected}>
                <X className="h-3.5 w-3.5" /> Reject
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
