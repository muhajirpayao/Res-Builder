import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              ResumePilot
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              AI-powered resume review that helps you land more interviews, one honest suggestion at a time.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><a href="#how-it-works" className="hover:text-foreground">How it works</a></li>
              <li><Link href="/upload" className="hover:text-foreground">Upload resume</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><a href="#testimonials" className="hover:text-foreground">Reviews</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ResumePilot. All rights reserved.</p>
          <p>Built for people who want their next interview, not just a score.</p>
        </div>
      </div>
    </footer>
  );
}
