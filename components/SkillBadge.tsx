"use client";

import { ReactNode } from "react";

interface SkillBadgeProps {
  name: string;
  level: number; // 0–100
  icon?: ReactNode;
  category?: string;
}

const categoryColors: Record<string, { bg: string; bar: string; text: string }> = {
  Frontend: { bg: "bg-[#4FD1C5]/10 dark:bg-[#4FD1C5]/20", bar: "from-[#4FD1C5] to-[#38B2AC]", text: "text-[#0D9488] dark:text-[#4FD1C5]" },
  Backend:  { bg: "bg-[#2B6CB0]/10 dark:bg-[#2B6CB0]/20", bar: "from-[#2B6CB0] to-[#4299E1]", text: "text-[#1D4ED8] dark:text-[#63B3ED]" },
  Database: { bg: "bg-[#FF6600]/10 dark:bg-[#FF6600]/20", bar: "from-[#FF6600] to-[#FF8533]", text: "text-[#EA580C] dark:text-[#FBD38D]" },
  DevOps:   { bg: "bg-purple-100 dark:bg-purple-900/30",   bar: "from-purple-500 to-purple-400", text: "text-purple-700 dark:text-purple-300" },
  Other:    { bg: "bg-gray-100 dark:bg-slate-800",         bar: "from-gray-400 to-gray-500",     text: "text-gray-600 dark:text-gray-300"  },
};

export default function SkillBadge({ name, level, icon, category = "Other" }: SkillBadgeProps) {
  const colors = categoryColors[category] ?? categoryColors.Other;

  return (
    <div className={`${colors.bg} rounded-xl p-4 hover:scale-105 transition-transform duration-300 group`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-xl" aria-hidden>
              {icon}
            </span>
          )}
          <span className={`font-semibold text-sm ${colors.text}`}>{name}</span>
        </div>
        <span className={`text-xs font-bold ${colors.text}`}>{level}%</span>
      </div>
      {/* Progress bar */}
      <div className="relative h-1.5 bg-white/60 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all duration-1000 ease-out`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
