import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CreateAccountModal } from "@/components/modals/create-account-modal";
import { PremiumModal } from "@/components/modals/premium-modal";

export const metadata: Metadata = {
  title: "ResumePilot — Land More Interviews with AI",
  description:
    "Upload your resume and get an AI-powered review in under a minute. ATS scoring, interview readiness, and actionable suggestions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          {children}
          <CreateAccountModal />
          <PremiumModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
