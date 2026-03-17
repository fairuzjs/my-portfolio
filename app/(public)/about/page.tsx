"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { icons } from "@/components/TechIcons";

// ─── DATA ────────────────────────────────────────────────────────────────────

const skills: Record<string, { name: string; level: number; icon: React.ReactNode }[]> = {
  Frontend: [
    { name: "React",        level: 85, icon: icons.React },
    { name: "TypeScript",   level: 80, icon: icons.TypeScript },
    { name: "Tailwind CSS", level: 90, icon: icons.Tailwind },
    { name: "HTML & CSS",   level: 90, icon: icons.HTML },
  ],
  Backend: [
    { name: "Javascript", level: 90, icon: icons.Javascript },
    { name: "Flask",      level: 70, icon: icons.Flask },
    { name: "PHP",        level: 80, icon: icons.PHP },
  ],
  Database: [
    { name: "PostgreSQL", level: 80, icon: icons.Postgres },
    { name: "MySQL",      level: 90, icon: icons.MySQL },
  ],
  DevOps: [
    { name: "Git",    level: 90, icon: icons.Git },
    { name: "GitHub", level: 90, icon: icons.Github },
    { name: "Vercel", level: 90, icon: icons.Vercel },
  ],
};

const timeline = [
  {
    year: "2024 – Sekarang",
    role: "Web Developer",
    company: "Freelance",
    description: "Mengembangkan website untuk berbagai klien dengan menggunakan tech stack modern.",
    type: "work",
  },
  {
    year: "2022 – Sekarang",
    role: "Institut Teknologi Nasional",
    company: "Informatics Engineering",
    description: "Mempelajari dasar-dasar ilmu komputer, pemrograman, dan pengembangan perangkat lunak.",
    type: "education",
  },
  {
    year: "2019 – 2022",
    role: "SMA Negeri 5 Karawang",
    company: "Science Major",
    description: "Fokus pada mata pelajaran sains dan matematika, serta aktif dalam kegiatan ekstrakurikuler IPTEK.",
    type: "education",
  },
];

const values = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Precise & Focused",
    desc: "Memastikan setiap elemen kode dan desain bekerja dengan sempurna.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Optimal Performance",
    desc: "Mengutamakan kecepatan dan efisiensi dalam setiap aplikasi yang dikembangkan.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Collaborative",
    desc: "Bekerja sama untuk menciptakan solusi terbaik dan mempercepat proses pengembangan.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Continuous Learning",
    desc: "Selalu mengikuti perkembangan teknologi terbaru untuk menjaga kualitas proyek.",
  },
];

// ─── CATEGORY ICONS ──────────────────────────────────────────────────────────

function getCategoryIcon(category: string) {
  switch (category) {
    case "Frontend":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "Backend":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "Database":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "DevOps":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── ANIMATED SKILL BAR ───────────────────────────────────────────────────────

function SkillBar({ level, isVisible }: { level: number; isVisible: boolean }) {
  return (
    <div className="h-[3px] rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mt-auto">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#4FD1C5] to-[#2B6CB0] transition-all duration-700 ease-out"
        style={{ width: isVisible ? `${level}%` : "0%" }}
      />
    </div>
  );
}

// ─── SKILL CARD ───────────────────────────────────────────────────────────────

function SkillCard({
  name,
  level,
  icon,
  isVisible,
}: {
  name: string;
  level: number;
  icon: React.ReactNode;
  isVisible: boolean;
}) {
  return (
    <div className="group flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:border-[#4FD1C5]/40 dark:hover:border-[#4FD1C5]/30 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(79,209,197,0.1)] transition-all duration-200">
      {/* Top row: icon + name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700/60 flex items-center justify-center flex-shrink-0 text-[#4FD1C5]">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-700 font-bold text-[#0F172A] dark:text-white truncate leading-tight">
            {name}
          </p>
        </div>
      </div>
      {/* Progress bar + percentage */}
      <div className="flex flex-col gap-1.5">
        <SkillBar level={level} isVisible={isVisible} />
        <p className="text-[11px] font-bold text-[#4FD1C5] text-right leading-none">
          {level}%
        </p>
      </div>
    </div>
  );
}

// ─── ACCORDION ROW ────────────────────────────────────────────────────────────

function AccordionRow({
  category,
  skillList,
  isOpen,
  onToggle,
}: {
  category: string;
  skillList: { name: string; level: number; icon: React.ReactNode }[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const previewSkills = skillList.slice(0, 2);
  const extraCount = skillList.length - 2;

  return (
    <div
      className={`rounded-2xl bg-white dark:bg-slate-800/60 overflow-hidden transition-all duration-300
        ${isOpen
          ? "border border-[#4FD1C5]/35 shadow-[0_4px_24px_rgba(79,209,197,0.1)]"
          : "border border-slate-100 dark:border-slate-700/50 shadow-sm hover:border-[#4FD1C5]/25"
        }`}
    >
      {/* ── Header ── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-[18px] focus:outline-none"
      >
        {/* Left: icon + label */}
        <div className="flex items-center gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
              ${isOpen
                ? "bg-gradient-to-br from-[#4FD1C5] to-[#2B6CB0] text-white shadow-[0_4px_12px_rgba(79,209,197,0.35)]"
                : "bg-slate-100 dark:bg-slate-700 text-[#94A3B8]"
              }`}
          >
            {getCategoryIcon(category)}
          </div>
          <div className="text-left">
            <h3
              className={`text-[15px] font-bold tracking-wide transition-colors duration-200
                ${isOpen ? "text-[#0F172A] dark:text-white" : "text-[#64748B] dark:text-slate-400"}`}
            >
              {category}
            </h3>
            <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
              {skillList.length} teknologi
            </p>
          </div>
        </div>

        {/* Right: preview pills + chevron */}
        <div className="flex items-center gap-3">
          {/* Skill preview pills — visible when open */}
          <div
            className={`hidden sm:flex items-center gap-2 transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {previewSkills.map((s) => (
              <span
                key={s.name}
                className="text-[10px] font-semibold text-[#4FD1C5] bg-[#4FD1C5]/8 border border-[#4FD1C5]/20 rounded-full px-2.5 py-1 leading-none"
              >
                {s.name}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-[10px] font-semibold text-[#94A3B8] bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full px-2.5 py-1 leading-none">
                +{extraCount}
              </span>
            )}
          </div>

          {/* Chevron */}
          <div
            className={`transition-all duration-300 ${isOpen ? "text-[#4FD1C5] rotate-180" : "text-[#CBD5E1]"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </button>

      {/* ── Body ── */}
      <div
        className={`transition-all duration-350 ease-in-out overflow-hidden
          ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6">
          <div className="h-px bg-slate-100 dark:bg-slate-700/60 mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {skillList.map((skill) => (
              <SkillCard key={skill.name} {...skill} isVisible={isOpen} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [openCategory, setOpenCategory] = useState<string | null>("Frontend");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-[#F0FFFE] via-white to-[#EFF6FF] dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#4FD1C5]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#2B6CB0]/6 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* ── Left: text ── */}
          <div style={{ animation: "slideLeft 0.8s ease-out forwards" }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#4FD1C5] uppercase mb-5">
              <span className="w-6 h-px bg-[#4FD1C5]" />
              Tentang Saya
            </span>

            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] dark:text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Halo! Saya <span className="gradient-text">Danendra</span>
            </h1>

            <p className="text-sm font-medium text-[#94A3B8] mb-6 tracking-wide">
              Full Stack Developer · Bandung, Indonesia
            </p>

            {/* Description — removed text-justify */}
            <div className="space-y-3 text-[#475569] dark:text-slate-300 leading-relaxed text-[15px] mb-8">
              <p>
                Saya adalah seorang Full Stack Developer yang memiliki semangat tinggi dalam mengembangkan produk digital yang tidak hanya fungsional, tetapi juga estetis dan memberikan pengalaman pengguna yang menyenangkan.
              </p>
              <p>
                Meskipun masih dalam tahap awal karier, saya berfokus pada pengembangan keterampilan teknis yang mendalam dan berkomitmen memberikan kualitas terbaik dalam setiap proyek.
              </p>
              <p>
                Di luar pemrograman, saya menyukai pendakian gunung, fotografi alam, dan berbagi pengetahuan dengan komunitas developer lokal.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: "2+", label: "Tahun Pengalaman" },
                { value: "5+", label: "Proyek Selesai" },
                { value: "10+", label: "Tech Stack" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center py-3 px-2 rounded-xl bg-[#4FD1C5]/[0.06] border border-[#4FD1C5]/15 dark:bg-[#4FD1C5]/[0.04] dark:border-[#4FD1C5]/10"
                >
                  <p className="text-2xl font-extrabold text-[#0F172A] dark:text-white leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="/Resume - Danendra Fairuz Syahla.pdf"
                download
                className="inline-flex items-center gap-2 bg-[#4FD1C5] hover:bg-[#38B2AC] text-[#0F172A] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                Download CV
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" /><path d="M4 20h16" />
                </svg>
              </a>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-transparent text-[#0F172A] dark:text-white text-sm font-semibold px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-[#4FD1C5]/50 hover:text-[#4FD1C5] transition-all duration-200"
              >
                Lihat Projects →
              </a>
            </div>
          </div>

          {/* ── Right: photo ── */}
          <div
            className="flex justify-center"
            style={{ animation: "slideRight 0.8s ease-out 0.2s both" }}
          >
            <div className="relative">
              {/* Photo frame with gradient border */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 p-[3px] rounded-3xl bg-gradient-to-br from-[#4FD1C5] to-[#2B6CB0] shadow-[0_20px_60px_rgba(79,209,197,0.2)]">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <Image src="/myphoto2.jpeg" alt="Danendra" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1C5]/8 to-[#2B6CB0]/8" />
                </div>
              </div>

              {/* Floating badge: Open to work */}
              <div className="absolute -top-3 -right-4 flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-[#4FD1C5]/25 rounded-full px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-pulse" />
                <span className="text-[11px] font-bold text-[#0F172A] dark:text-white whitespace-nowrap">
                  Open to Work
                </span>
              </div>

              {/* Floating badge: tech */}
              <div className="absolute -bottom-4 -left-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <p className="text-[10px] text-[#94A3B8] font-medium mb-0.5">Main Stack</p>
                <p className="text-[13px] font-extrabold text-[#0F172A] dark:text-white leading-none">
                  React · Next.js
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VALUES
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-fade">
            <SectionHeader eyebrow="Prinsip" title="Apa yang Saya" highlight="Bisa?" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 section-fade">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:border-[#4FD1C5]/30 hover:bg-gradient-to-br hover:from-[#4FD1C5]/[0.04] hover:to-[#2B6CB0]/[0.04] transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Icon box — unified teal color */}
                <div className="w-10 h-10 rounded-xl bg-[#4FD1C5]/10 dark:bg-[#4FD1C5]/8 text-[#4FD1C5] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#4FD1C5]/15 transition-all duration-300">
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#0F172A] dark:text-white mb-1.5 text-sm leading-snug">
                  {v.title}
                </h3>
                <p className="text-[#64748B] dark:text-slate-400 text-xs leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILLS — Accordion (redesigned)
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#F8FAFC] dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-fade">
            <SectionHeader
              eyebrow="Keahlian"
              title="Tech Stack"
              highlight="Lengkap"
              description="Berbagai teknologi yang saya kuasai, dikelompokkan berdasarkan kategori."
            />
          </div>

          <div className="flex flex-col gap-3 section-fade">
            {Object.entries(skills).map(([category, skillList]) => (
              <AccordionRow
                key={category}
                category={category}
                skillList={skillList}
                isOpen={openCategory === category}
                onToggle={() =>
                  setOpenCategory(openCategory === category ? null : category)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TIMELINE
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="section-fade">
            <SectionHeader
              eyebrow="Perjalanan"
              title="Pengalaman &"
              highlight="Pendidikan"
              centered={false}
            />
          </div>

          <div className="relative section-fade">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#4FD1C5] via-[#2B6CB0] to-transparent" />

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-7 group">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110
                        ${item.type === "work"
                          ? "bg-gradient-to-br from-[#4FD1C5] to-[#38B2AC] shadow-[0_0_0_4px_rgba(79,209,197,0.12)]"
                          : "bg-gradient-to-br from-[#2B6CB0] to-[#4299E1] shadow-[0_0_0_4px_rgba(43,108,176,0.12)]"
                        }`}
                    >
                      <span className="text-white">
                        {item.type === "work" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 group-hover:border-[#4FD1C5]/25 group-hover:shadow-[0_4px_16px_rgba(79,209,197,0.07)] transition-all duration-300">
                    {/* Type badge */}
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 leading-none
                        ${item.type === "work"
                          ? "text-[#4FD1C5] bg-[#4FD1C5]/10"
                          : "text-[#2B6CB0] bg-[#2B6CB0]/10 dark:text-[#4299E1] dark:bg-[#2B6CB0]/20"
                        }`}
                    >
                      {item.type === "work" ? "Work" : "Education"}
                    </span>

                    <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">
                      {item.year}
                    </p>
                    <h3
                      className="font-bold text-[#0F172A] dark:text-white text-base mb-1 leading-snug"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {item.role}
                    </h3>
                    {/* Fixed: replaced orange with slate */}
                    <p className="text-[#475569] dark:text-slate-400 font-semibold text-sm mb-2">
                      {item.company}
                    </p>
                    <p className="text-[#64748B] dark:text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}