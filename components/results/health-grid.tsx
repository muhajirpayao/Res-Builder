"use client";

import { motion } from "framer-motion";
import type { HealthCategory } from "@/lib/types";
import { iconMap } from "./icon-map";

export function HealthGrid({ categories }: { categories: HealthCategory[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((cat, i) => {
        const Icon = iconMap[cat.icon];
        const color = cat.score >= 85 ? "var(--success)" : cat.score >= 65 ? "var(--accent)" : "var(--warning)";
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="rounded-card border border-border bg-card p-5 text-left transition-shadow hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                {Icon && <Icon className="h-4 w-4" style={{ color }} />}
              </span>
              <span className="text-lg font-semibold" style={{ color }}>{cat.score}</span>
            </div>
            <p className="mt-3 text-sm font-medium">{cat.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{cat.summary}</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                animate={{ width: `${cat.score}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
              />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
