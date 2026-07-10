"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  User,
  Settings,
  Sparkles,
  Menu,
  X,
  Crown,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/resume", label: "My Resume", icon: FileText },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const account = useAppStore((s) => s.account);
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);
  const resetFlow = useAppStore((s) => s.resetFlow);

  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2 px-1 font-semibold tracking-tight">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </span>
        ResumePilot
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-surface text-foreground" : "text-muted hover:bg-surface hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {!account?.isPremium && (
        <button
          onClick={openPremiumModal}
          className="mb-3 flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-3 py-3 text-left text-sm font-medium text-accent hover:bg-accent/10 cursor-pointer"
        >
          <Crown className="h-4 w-4 shrink-0" />
          Unlock ResumePilot Pro
        </button>
      )}

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            {(account?.fullName ?? "Guest").slice(0, 1).toUpperCase()}
          </div>
          <div className="text-xs">
            <p className="font-medium">{account?.fullName ?? "Guest User"}</p>
            <p className="text-muted">{account?.isPremium ? "Pro plan" : "Free plan"}</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
      <button
        onClick={() => {
          resetFlow();
          router.push("/");
        }}
        className="mt-4 flex items-center gap-2 text-xs text-muted hover:text-foreground cursor-pointer"
      >
        <LogOut className="h-3.5 w-3.5" /> Exit to homepage
      </button>
    </div>
  );
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-surface p-5 md:flex">
        <SidebarContent />
      </aside>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-5 py-3 backdrop-blur-md md:hidden">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          ResumePilot
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2 cursor-pointer">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 md:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              className="absolute inset-0 bg-black/50"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-72 bg-surface p-5 shadow-2xl"
              variants={{ open: { x: 0 }, closed: { x: "-100%" } }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-4 top-4 p-1.5 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
