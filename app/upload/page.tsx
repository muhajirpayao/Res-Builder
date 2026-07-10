import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResumeDropzone } from "@/components/upload/dropzone";
import { ThemeToggle } from "@/components/theme-toggle";

export default function UploadPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <ThemeToggle />
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 pb-24 sm:px-8">
        <h1 className="text-balance text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Upload your resume
        </h1>
        <p className="mt-3 text-center text-muted">
          We&apos;ll scan it for ATS compatibility, grammar, formatting, and interview readiness.
        </p>

        <div className="mt-10 w-full">
          <ResumeDropzone />
        </div>
      </div>
    </main>
  );
}
