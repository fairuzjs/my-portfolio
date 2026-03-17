import Image from "next/image";
import Link from "next/link";
import { icons } from "@/components/TechIcons";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export default function ProjectCard({
  id,
  title,
  description,
  images,
  tags,
  liveUrl,
  githubUrl,
  featured = false,
}: ProjectCardProps) {
  const thumbnail = images && images.length > 0 ? images[0] : "/placeholder.png";

  return (
    <div
      className={`group relative flex flex-col h-full rounded-2xl overflow-hidden
        bg-white dark:bg-white/[0.03] border transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        ${featured
          ? "border-[#4FD1C5]/30 dark:border-[#4FD1C5]/25 shadow-sm"
          : "border-gray-100 dark:border-white/[0.07] hover:border-[#4FD1C5]/30 dark:hover:border-[#4FD1C5]/25"
        }`}
    >
      {/* Invisible full-card link for navigation */}
      <Link
        href={`/projects/${id}`}
        className="absolute inset-0 z-10"
        aria-label={`Detail proyek ${title}`}
      />

      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-800/60">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 to-slate-900/60
          opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

        {/* Arrow icon — slides in from top-right on hover */}
        <div className="absolute top-3 right-3 z-20
          translate-x-3 -translate-y-3 opacity-0
          group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg
            flex items-center justify-center text-[#4FD1C5]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>

        {/* Featured badge — bottom-left inside image, glassmorphism */}
        {featured && (
          <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1.5
            bg-[#4FD1C5]/15 border border-[#4FD1C5]/35 backdrop-blur-sm
            rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] flex-shrink-0" />
            <span className="text-[10px] font-bold text-[#4FD1C5] tracking-wide">Featured</span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Title */}
        <h3
          className="font-bold text-[15px] text-[#0F172A] dark:text-slate-100 leading-snug
            group-hover:text-[#4FD1C5] transition-colors duration-250"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-[#64748B] dark:text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* Tags — unified adaptive style */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] font-semibold
                px-2 py-1 rounded-md
                bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.08]
                text-[#64748B] dark:text-slate-400 group-hover:border-[#4FD1C5]/30 dark:group-hover:border-[#4FD1C5]/15
                transition-colors duration-200"
            >
              {icons[tag] && (
                <span className="flex items-center shrink-0 w-3 h-3 opacity-80 dark:opacity-70">
                  {icons[tag]}
                </span>
              )}
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/[0.06] shrink-0" />

        {/* ── Action Buttons — always same height row, Live Demo flex-1, GitHub fixed width ── */}
        <div className="flex items-center gap-2.5 shrink-0 z-20">

          {/* Live Demo — takes all remaining space; shows placeholder if no URL */}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5
                text-[12px] font-bold text-[#4FD1C5]
                bg-[#4FD1C5]/[0.08] border border-[#4FD1C5]/20
                py-2 rounded-lg
                hover:bg-[#4FD1C5]/[0.15] hover:border-[#4FD1C5]/40
                transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Live Demo
            </a>
          ) : (
            /* Empty spacer so GitHub button always stays at the right */
            <div className="flex-1" />
          )}

          {/* GitHub — fixed size, always right-aligned */}
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg
                bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.08] text-slate-400 dark:text-slate-500
                hover:text-[#0F172A] dark:hover:text-slate-100 hover:border-gray-200 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/[0.08]
                transition-all duration-200 group/git z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover/git:scale-110 transition-transform duration-200">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          ) : (
            /* Fixed-size spacer so Live Demo doesn't stretch awkwardly */
            <div className="flex-shrink-0 w-9" />
          )}

        </div>
      </div>
    </div>
  );
}