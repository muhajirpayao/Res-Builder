"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const languages = ["English", "Filipino", "Spanish", "Japanese"];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${checked ? "bg-accent" : "bg-border"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your appearance and preferences.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-3 text-xs font-medium text-muted">Theme</p>
          <div className="flex gap-2">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-3 text-xs font-medium transition-colors cursor-pointer ${
                  mounted && theme === opt.value ? "border-accent bg-accent/10 text-accent" : "border-border text-muted hover:text-foreground"
                }`}
              >
                <opt.icon className="h-4 w-4" />
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Compact mode</p>
              <p className="text-xs text-muted">Reduce spacing across the dashboard.</p>
            </div>
            <Toggle checked={settings.compactMode} onChange={(v) => updateSettings({ compactMode: v })} label="Compact mode" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Language</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => updateSettings({ language: lang })}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  settings.language === lang ? "border-accent bg-accent/10 text-accent" : "border-border text-muted hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Push notifications</p>
              <p className="text-xs text-muted">Get notified when a resume review finishes.</p>
            </div>
            <Toggle checked={settings.notifications} onChange={(v) => updateSettings({ notifications: v })} label="Push notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly email digest</p>
              <p className="text-xs text-muted">A summary of your resume progress.</p>
            </div>
            <Toggle checked={settings.emailDigest} onChange={(v) => updateSettings({ emailDigest: v })} label="Weekly email digest" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
