"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "./animated-number";

export function ScoreRing({
  score,
  size = 220,
  strokeWidth = 14,
  label = "Resume Score",
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = score >= 85 ? "var(--success)" : score >= 65 ? "var(--accent)" : "var(--warning)";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--border)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-semibold tracking-tight">
          <AnimatedNumber value={score} />
        </span>
        <span className="mt-1 text-xs text-muted">/ 100</span>
        <span className="mt-2 text-sm font-medium text-muted">{label}</span>
      </div>
    </div>
  );
}
