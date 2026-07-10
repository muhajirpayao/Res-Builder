"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Image as ImageIcon, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

const ACCEPTED = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};

export function ResumeDropzone() {
  const router = useRouter();
  const setFile = useAppStore((s) => s.setFile);
  const [file, setLocalFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;
    setLocalFile(f);
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 22 + 8);
        if (next >= 100) {
          clearInterval(interval);
          setUploading(false);
        }
        return next;
      });
    }, 220);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    maxFiles: 1,
    multiple: false,
  });

  function handleContinue() {
    if (!file) return;
    setFile(file.name);
    router.push("/analyzing");
  }

  function handleRemove() {
    setLocalFile(null);
    setProgress(0);
    setUploading(false);
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-20 text-center transition-colors ${
                isDragActive ? "border-accent bg-accent/5" : "border-border bg-surface hover:bg-border/20"
              }`}
            >
              <input {...getInputProps()} aria-label="Upload resume file" />
              <motion.span
                animate={{ y: isDragActive ? -6 : 0 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent"
              >
                <UploadCloud className="h-7 w-7" />
              </motion.span>
              <p className="mt-6 text-lg font-medium">
                {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
              </p>
              <p className="mt-1.5 text-sm text-muted">or click to browse — PDF, DOCX, PNG, or JPG</p>
              <p className="mt-6 text-xs text-muted">Your file never leaves your browser in this preview.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                {file.type.startsWith("image") ? <ImageIcon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <button onClick={handleRemove} aria-label="Remove file" className="shrink-0 rounded-full p-1 text-muted hover:bg-surface cursor-pointer">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted">{(file.size / 1024).toFixed(0)} KB</p>

                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-surface">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted">
                  {uploading ? `Uploading... ${Math.round(progress)}%` : "Upload complete"}
                </p>
              </div>
            </div>

            <Button className="mt-6 w-full" disabled={uploading} onClick={handleContinue}>
              {uploading ? "Preparing..." : "Analyze My Resume"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
