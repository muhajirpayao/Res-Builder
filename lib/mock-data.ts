import type { ResumeAnalysis, TimelinePoint } from "./types";

export const AI_LOADING_STEPS = [
  {
    id: "read",
    label: "Reading resume...",
    detail: "Parsing document structure and layout",
    checks: ["Personal information detected", "Contact details verified", "Section headings mapped"],
  },
  {
    id: "extract",
    label: "Extracting skills...",
    detail: "Cross-referencing against 40,000+ industry skills",
    checks: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: "ats",
    label: "Evaluating ATS compatibility...",
    detail: "Simulating applicant tracking system parsing",
    checks: ["Standard headings found", "Parsable font detected", "No tables blocking extraction"],
  },
  {
    id: "improve",
    label: "Finding improvements...",
    detail: "Comparing against top-performing resumes in your field",
    checks: ["7 suggestions created", "3 weak action verbs found", "2 missing metrics identified"],
  },
  {
    id: "score",
    label: "Calculating your score...",
    detail: "Weighing 12 ranking factors",
    checks: ["Resume score calculated", "Interview readiness estimated"],
  },
] as const;

const baseTimeline: TimelinePoint[] = [
  { label: "First upload", score: 64, date: "Jun 02" },
  { label: "After edits", score: 76, date: "Jun 14" },
  { label: "Latest review", score: 91, date: "Today" },
];

export function buildMockAnalysis(fileName: string): ResumeAnalysis {
  return {
    fileName,
    score: 84,
    previousScore: 71,
    atsCompatibility: 92,
    interviewReadiness: "High",
    confidenceSummary:
      "Based on your current resume, we estimate a strong chance of passing an initial ATS screening for roles matching your skills. This is a helpful estimate, not a guarantee — improving the suggestions below will raise your odds further.",
    healthCategories: [
      { id: "ats", label: "ATS", score: 92, icon: "scan-line", summary: "Parses cleanly in most applicant tracking systems." },
      { id: "grammar", label: "Grammar", score: 88, icon: "spell-check", summary: "Minor passive-voice issues found." },
      { id: "formatting", label: "Formatting", score: 81, icon: "layout-panel-top", summary: "Consistent spacing, one section is dense." },
      { id: "projects", label: "Projects", score: 76, icon: "folder-kanban", summary: "Strong projects, could use measurable outcomes." },
      { id: "experience", label: "Experience", score: 85, icon: "briefcase", summary: "Well-structured, verbs could be stronger." },
      { id: "skills", label: "Skills", score: 90, icon: "sparkles", summary: "Skills align well with target roles." },
      { id: "achievements", label: "Achievements", score: 68, icon: "trophy", summary: "Few quantified achievements detected." },
    ],
    problems: [
      { id: "p1", title: "Weak Summary", severity: "high", description: "Your summary reads generically and doesn't highlight your strongest wins." },
      { id: "p2", title: "Missing GitHub", severity: "medium", description: "Recruiters in tech roles expect a linked portfolio or GitHub." },
      { id: "p3", title: "Weak Action Verbs", severity: "medium", description: "Words like 'helped' and 'worked on' undersell your impact." },
      { id: "p4", title: "Missing Numbers", severity: "high", description: "Only 2 of 9 bullet points include a measurable result." },
      { id: "p5", title: "Passive Voice", severity: "low", description: "3 bullet points use passive phrasing that reduces clarity." },
    ],
    suggestions: [
      {
        id: "s1",
        category: "Summary",
        title: "Rewrite your professional summary",
        before: "Frontend developer with experience building web applications using React and modern tools.",
        after: "Frontend developer who has shipped 12+ production apps in React and TypeScript, improving load times by up to 40% for local businesses.",
        impact: 4,
        status: "pending",
      },
      {
        id: "s2",
        category: "Experience",
        title: "Strengthen a weak bullet point",
        before: "Helped build the company website and worked on some backend features.",
        after: "Built and shipped the company's customer-facing website, reducing page load time by 35% and increasing mobile conversions by 18%.",
        impact: 3,
        status: "pending",
      },
      {
        id: "s3",
        category: "Achievements",
        title: "Quantify a project outcome",
        before: "Created a racing game with custom levels and characters.",
        after: "Designed and shipped a procedurally generated racing game with 6 levels, reaching 4.8★ across 1,200+ downloads.",
        impact: 3,
        status: "pending",
      },
      {
        id: "s4",
        category: "Formatting",
        title: "Tighten a dense section",
        before: "Skills: JavaScript, React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Supabase, Git, Figma, Framer Motion, REST APIs",
        after: "Grouped into 3 clear categories: Frontend, Backend, and Tools — improving scan time for recruiters.",
        impact: 2,
        status: "pending",
      },
      {
        id: "s5",
        category: "Contact",
        title: "Add a portfolio link",
        before: "Email · Phone · City",
        after: "Email · Phone · City · github.com/you · yourportfolio.dev",
        impact: 2,
        status: "pending",
      },
      {
        id: "s6",
        category: "Grammar",
        title: "Fix passive voice",
        before: "The dashboard was redesigned by me to improve usability.",
        after: "Redesigned the dashboard, cutting average task completion time from 45s to 22s.",
        impact: 2,
        status: "pending",
      },
      {
        id: "s7",
        category: "Experience",
        title: "Lead with stronger action verbs",
        before: "Responsible for maintaining the codebase and fixing bugs.",
        after: "Maintained and refactored a 40k-line codebase, cutting reported bugs by 27% quarter over quarter.",
        impact: 3,
        status: "pending",
      },
    ],
    skills: [
      { name: "React", detected: true },
      { name: "TypeScript", detected: true },
      { name: "Tailwind CSS", detected: true },
      { name: "Node.js", detected: true },
      { name: "Supabase", detected: true },
      { name: "Next.js", detected: true },
      { name: "GraphQL", detected: false },
      { name: "Docker", detected: false },
    ],
    timeline: baseTimeline,
    atsBreakdown: [
      { subject: "Keywords", value: 88, fullMark: 100 },
      { subject: "Formatting", value: 81, fullMark: 100 },
      { subject: "Headings", value: 95, fullMark: 100 },
      { subject: "Length", value: 90, fullMark: 100 },
      { subject: "Readability", value: 84, fullMark: 100 },
      { subject: "File Type", value: 100, fullMark: 100 },
    ],
  };
}

export const DEFAULT_ANALYSIS = buildMockAnalysis("Your_Resume.pdf");

export const dashboardStats = {
  resumesAnalyzed: 3,
  totalDownloads: 5,
  bestScore: 91,
  streakDays: 4,
};

export const testimonials = [
  {
    name: "Amara Chen",
    role: "Product Designer",
    quote: "I went from zero callbacks to three interviews in a week after fixing what ResumePilot flagged.",
  },
  {
    name: "Diego Fuentes",
    role: "Backend Engineer",
    quote: "The ATS breakdown alone was worth it — I had no idea my formatting was getting silently rejected.",
  },
  {
    name: "Priya Nair",
    role: "Marketing Lead",
    quote: "It reads like a senior recruiter reviewed my resume, not a generic checker.",
  },
];

export const faqs = [
  {
    q: "Is my resume stored anywhere?",
    a: "In this preview, everything runs in your browser only — nothing is uploaded to a server.",
  },
  {
    q: "What file types are supported?",
    a: "PDF, DOCX, and common image formats like PNG and JPG.",
  },
  {
    q: "How is the score calculated?",
    a: "We weigh ATS compatibility, grammar, formatting, achievements, and role relevance into a single score out of 100.",
  },
  {
    q: "Do I need an account to try it?",
    a: "No — you can continue as a guest and create an account later to save your results.",
  },
];
