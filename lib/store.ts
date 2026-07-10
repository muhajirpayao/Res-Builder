"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_ANALYSIS, buildMockAnalysis } from "./mock-data";
import type { AppSettings, ResumeAnalysis, UserAccount, UserProfile } from "./types";

interface AppState {
  analysis: ResumeAnalysis;
  hasUploaded: boolean;
  isGuest: boolean;
  account: UserAccount | null;
  profile: UserProfile;
  settings: AppSettings;
  premiumModalOpen: boolean;
  accountModalOpen: boolean;

  setFile: (fileName: string) => void;
  acceptSuggestion: (id: string) => void;
  rejectSuggestion: (id: string) => void;
  editSuggestion: (id: string, after: string) => void;
  continueAsGuest: () => void;
  createAccount: (account: UserAccount) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
  openAccountModal: () => void;
  closeAccountModal: () => void;
  upgradeToPremium: () => void;
  resetFlow: () => void;
}

const defaultProfile: UserProfile = {
  targetRole: "Frontend Developer",
  country: "Philippines",
  industry: "Software & Technology",
  experienceLevel: "Mid-level (2-4 years)",
  careerGoal: "Land a remote frontend role at a product-led company within 6 months.",
};

const defaultSettings: AppSettings = {
  language: "English",
  notifications: true,
  emailDigest: false,
  compactMode: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      analysis: DEFAULT_ANALYSIS,
      hasUploaded: false,
      isGuest: false,
      account: null,
      profile: defaultProfile,
      settings: defaultSettings,
      premiumModalOpen: false,
      accountModalOpen: false,

      setFile: (fileName) =>
        set({ analysis: buildMockAnalysis(fileName), hasUploaded: true }),

      acceptSuggestion: (id) => {
        const { analysis } = get();
        const suggestion = analysis.suggestions.find((s) => s.id === id);
        if (!suggestion || suggestion.status === "accepted") return;
        const wasRejected = suggestion.status === "rejected";
        set({
          analysis: {
            ...analysis,
            score: Math.min(99, analysis.score + suggestion.impact),
            suggestions: analysis.suggestions.map((s) =>
              s.id === id ? { ...s, status: "accepted" } : s
            ),
          },
        });
        void wasRejected;
      },

      rejectSuggestion: (id) => {
        const { analysis } = get();
        set({
          analysis: {
            ...analysis,
            suggestions: analysis.suggestions.map((s) =>
              s.id === id ? { ...s, status: "rejected" } : s
            ),
          },
        });
      },

      editSuggestion: (id, after) => {
        const { analysis } = get();
        set({
          analysis: {
            ...analysis,
            suggestions: analysis.suggestions.map((s) =>
              s.id === id ? { ...s, after } : s
            ),
          },
        });
      },

      continueAsGuest: () => set({ isGuest: true }),

      createAccount: (account) => set({ account, accountModalOpen: false }),

      updateProfile: (profile) =>
        set((state) => ({ profile: { ...state.profile, ...profile } })),

      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),

      openPremiumModal: () => set({ premiumModalOpen: true }),
      closePremiumModal: () => set({ premiumModalOpen: false }),
      openAccountModal: () => set({ accountModalOpen: true }),
      closeAccountModal: () => set({ accountModalOpen: false }),

      upgradeToPremium: () =>
        set((state) => ({
          account: state.account
            ? { ...state.account, isPremium: true }
            : { fullName: "Guest User", email: "guest@resumepilot.app", isPremium: true },
          premiumModalOpen: false,
        })),

      resetFlow: () =>
        set({
          analysis: DEFAULT_ANALYSIS,
          hasUploaded: false,
        }),
    }),
    {
      name: "resumepilot-store",
      partialize: (state) => ({
        analysis: state.analysis,
        hasUploaded: state.hasUploaded,
        isGuest: state.isGuest,
        account: state.account,
        profile: state.profile,
        settings: state.settings,
      }),
    }
  )
);
