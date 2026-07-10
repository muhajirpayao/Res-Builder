export type InterviewReadiness = "Low" | "Moderate" | "High" | "Very High";

export interface HealthCategory {
  id: string;
  label: string;
  score: number;
  icon: string;
  summary: string;
}

export interface ResumeProblem {
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  description: string;
}

export interface Suggestion {
  id: string;
  category: string;
  title: string;
  before: string;
  after: string;
  impact: number;
  status: "pending" | "accepted" | "rejected";
}

export interface TimelinePoint {
  label: string;
  score: number;
  date: string;
}

export interface SkillItem {
  name: string;
  detected: boolean;
}

export interface ResumeAnalysis {
  fileName: string;
  score: number;
  previousScore: number;
  atsCompatibility: number;
  interviewReadiness: InterviewReadiness;
  confidenceSummary: string;
  healthCategories: HealthCategory[];
  problems: ResumeProblem[];
  suggestions: Suggestion[];
  skills: SkillItem[];
  timeline: TimelinePoint[];
  atsBreakdown: { subject: string; value: number; fullMark: number }[];
}

export interface UserAccount {
  fullName: string;
  email: string;
  isPremium: boolean;
}

export interface UserProfile {
  targetRole: string;
  country: string;
  industry: string;
  experienceLevel: string;
  careerGoal: string;
}

export interface AppSettings {
  language: string;
  notifications: boolean;
  emailDigest: boolean;
  compactMode: boolean;
}
