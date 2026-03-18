"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

const CATEGORIES = ["Semua", "Web App", "Full Stack", "Frontend", "Backend", "Mobile", "Other"];

export default function ProjectsClientGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const aciveIndicator = (isActive: boolean) => isActive ? (
    <div className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-transparent via-[#4FD1C5] to-transparent opacity-80" />
  ) : null;

  const filtered =
    activeCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category && p.category.includes(activeCategory));

  return (
    <>
      {/* Filter tabs */}
      <div className="flex justify-center mb-10 w-full overflow-hidden">
        <div className="inline-flex flex-nowrap md:flex-wrap items-center md:justify-center gap-1.5 p-1.5 rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-100 dark:border-slate-700/50 shadow-sm overflow-x-auto no-scrollbar max-w-full px-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative shrink-0 ${activeCategory === cat
                  ? "text-[#0F172A] dark:text-white bg-gray-100/80 dark:bg-slate-700/80 shadow-sm"
                  : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
            >
              {aciveIndicator(activeCategory === cat)}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="text-[#64748B] dark:text-slate-400">Tidak ada proyek dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              images={project.images}
              tags={project.tags}
              liveUrl={project.liveUrl || undefined}
              githubUrl={project.githubUrl || undefined}
              featured={project.featured}
            />
          ))}
        </div>
      )}
    </>
  );
}
