import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readProjectsFile } from "@/lib/projects";
import ProjectDetailSlider from "../../../../components/ProjectDetailSlider";
import { icons } from "@/components/TechIcons";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await readProjectsFile();
  const project = data.projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div className="min-h-screen pb-20 pt-24 sm:pt-28 relative bg-slate-50 dark:bg-[#0F172A]">
      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#4FD1C5]/10 dark:bg-[#4FD1C5]/6 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#2B6CB0]/10 dark:bg-[#2B6CB0]/6 blur-[90px]" />
      </div>

      {/* ── Breadcrumb ── */}
      <nav className="max-w-5xl mx-auto px-6 pt-4 pb-6 relative z-20">
        <ol className="flex items-center gap-2 text-sm font-medium">
          <li>
            <Link
              href="/projects"
              className="text-slate-500 hover:text-[#4FD1C5] transition-colors duration-200"
            >
              Projects
            </Link>
          </li>
          <li>
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li className="text-[#0F172A] dark:text-slate-300 font-semibold truncate max-w-[160px] sm:max-w-md">
            {project.title}
          </li>
        </ol>
      </nav>

      {/* ── Main card ── */}
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.07] rounded-2xl overflow-hidden shadow-sm dark:shadow-none">

          {/* ── Image / Slider ── */}
          <div className="relative w-full bg-gray-50 dark:bg-slate-800/60 border-b border-gray-100 dark:border-white/[0.06]">
            {project.images && project.images.length > 1 ? (
              <ProjectDetailSlider images={project.images} title={project.title} />
            ) : (
              <div className="relative w-full aspect-video sm:aspect-[21/9]">
                <Image
                  src={project.images?.[0] || "/placeholder.png"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            {/* Bottom gradient fade into card */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-[#0F172A] to-transparent z-10 pointer-events-none" />
          </div>

          {/* ── Content ── */}
          <div className="px-6 py-8 sm:px-10 sm:py-10">

            {/* Category badge + Title */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 bg-[#4FD1C5]/8 border border-[#4FD1C5]/20
                text-[#4FD1C5] text-[11px] font-bold uppercase tracking-widest
                px-3 py-1 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] flex-shrink-0" />
                {Array.isArray(project.category) ? project.category.join(", ") : project.category}
              </span>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-slate-100 leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {project.title}
              </h1>
            </div>

            {/* Tags — unified dark style */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold
                    px-2.5 py-1.5 rounded-lg
                    bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.08] text-[#64748B] dark:text-slate-400"
                >
                  {icons[tag] && (
                    <span className="flex items-center justify-center shrink-0 w-3.5 h-3.5 opacity-80">
                      {icons[tag]}
                    </span>
                  )}
                  {tag}
                </span>
              ))}
            </div>

            {/* ── Info row: Tipe · Kategori · Tech Stack count ── */}
            <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-xl
              bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]">

              {/* Tipe */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">
                  Tipe
                </p>
                <p className="text-[13px] font-semibold text-slate-300 leading-tight">
                  Web Application
                </p>
              </div>

              {/* Kategori */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">
                  Kategori
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.category) ? project.category.map(cat => (
                    <span key={cat} className="inline-block px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-teal-100">
                      {cat}
                    </span>
                  )) : (
                    <span className="inline-block px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-teal-100">
                      {project.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Tech Stack count — from project.tags.length */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">
                  Tech Stack
                </p>
                <p className="leading-none">
                  <span className="text-[22px] font-extrabold text-[#0F172A] dark:text-slate-100">
                    {project.tags.length}
                  </span>
                  <span className="text-[12px] font-medium text-[#64748B] dark:text-slate-500 ml-1.5">
                    teknologi
                  </span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-white/[0.06] mb-8" />

            {/* Description */}
            <div className="mb-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-4">
                Tentang Proyek
              </p>
              <div className="space-y-4">
                {project.description.split("\n").map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="text-[15px] text-[#475569] dark:text-slate-400 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-white/[0.06] mb-8" />

            {/* ── Action Buttons ── */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Live Demo — teal solid */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4FD1C5] hover:bg-[#38B2AC]
                    text-[#0F172A] text-sm font-bold px-6 py-3 rounded-xl
                    transition-all duration-200 hover:-translate-y-0.5
                    hover:shadow-[0_8px_24px_rgba(79,209,197,0.25)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Lihat Live Demo
                </a>
              )}

              {/* Source Code — adaptive ghost */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2
                    bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.1] text-[#475569] dark:text-slate-300
                    text-sm font-semibold px-6 py-3 rounded-xl
                    hover:bg-gray-100 dark:hover:bg-white/[0.08] hover:border-gray-200 dark:hover:border-white/[0.2] hover:text-[#0F172A] dark:hover:text-white
                    transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Source Code
                </a>
              )}

              {/* Back link — right-aligned */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold
                  text-[#64748B] hover:text-[#0F172A] dark:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200 ml-auto"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
                </svg>
                Kembali ke Projects
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}