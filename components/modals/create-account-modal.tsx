"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

export function CreateAccountModal({ redirectTo = "/dashboard" }: { redirectTo?: string }) {
  const router = useRouter();
  const open = useAppStore((s) => s.accountModalOpen);
  const close = useAppStore((s) => s.closeAccountModal);
  const createAccount = useAppStore((s) => s.createAccount);
  const continueAsGuest = useAppStore((s) => s.continueAsGuest);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createAccount({
      fullName: fullName || "Guest User",
      email: email || "guest@resumepilot.app",
      isPremium: false,
    });
    router.push(redirectTo);
  }

  function handleSkip() {
    continueAsGuest();
    close();
    router.push(redirectTo);
  }

  return (
    <Modal open={open} onClose={close} labelledBy="create-account-title">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </span>
        <h2 id="create-account-title" className="mt-4 text-xl font-semibold tracking-tight">
          Create your free account
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          Save your resume history and pick up right where you left off.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium text-muted">Full name</label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jordan Reyes"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-muted">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>

        <Button type="submit" className="w-full">Continue</Button>
        <button
          type="button"
          onClick={handleSkip}
          className="w-full text-center text-sm text-muted hover:text-foreground cursor-pointer"
        >
          Skip for now
        </button>
      </form>
    </Modal>
  );
}
