"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const openAccountModal = useAppStore((s) => s.openAccountModal);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          ResumePilot
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={openAccountModal}>Login</Button>
          <Link href="/upload" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            Upload Resume
          </Link>
        </div>

        <button
          className="flex items-center justify-center rounded-full p-2 md:hidden cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-5 text-sm">
              <a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a>
              <a href="#testimonials" onClick={() => setOpen(false)}>Reviews</a>
              <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
              <div className="flex items-center justify-between pt-2">
                <ThemeToggle />
                <Button variant="ghost" size="sm" onClick={() => { setOpen(false); openAccountModal(); }}>Login</Button>
              </div>
              <Link
                href="/upload"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary" }), "justify-center")}
              >
                Upload Resume
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
