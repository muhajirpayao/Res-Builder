"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResumeAnalysis } from "@/lib/types";

export function AtsRadarChart({ data }: { data: ResumeAnalysis["atsBreakdown"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume health breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px] p-2 sm:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted)", fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="value"
              stroke="var(--accent)"
              fill="var(--accent)"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
