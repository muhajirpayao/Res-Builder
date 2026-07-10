"use client";

import Link from "next/link";
import { Download, RefreshCcw, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

export function QuickActions() {
  const account = useAppStore((s) => s.account);
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);

  const actions = [
    {
      icon: Download,
      label: "Download Resume",
      onClick: () => {
        if (!account?.isPremium) openPremiumModal();
      },
    },
    { icon: RefreshCcw, label: "Generate Again", href: "/upload" },
    { icon: Sparkles, label: "View Suggestions", href: "/suggestions" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {actions.map((action) => {
        const content = (
          <Card className="p-4 transition-shadow hover:shadow-md cursor-pointer">
            <CardContent className="flex items-center gap-3 p-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                <action.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{action.label}</span>
            </CardContent>
          </Card>
        );
        return action.href ? (
          <Link href={action.href} key={action.label}>{content}</Link>
        ) : (
          <button key={action.label} onClick={action.onClick} className="text-left cursor-pointer">
            {content}
          </button>
        );
      })}
    </div>
  );
}
