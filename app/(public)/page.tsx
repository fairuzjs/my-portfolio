import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import HomeClientEffects from "@/components/HomeClientEffects";
import Hero3DBackground from "@/components/Hero3DBackground";
import type { Project } from "@/lib/projects";
import { readProjectsFile } from "@/lib/projects";
import { icons } from "@/components/TechIcons";

// ─── Skills grouped by category ──────────────────────────────────────────────

const skillGroups = [
  {
    category: "Frontend & Backend",
    skills: [
      { name: "React", level: 85, icon: icons.React },
      { name: "Tailwind CSS", level: 90, icon: icons.Tailwind },
      { name: "Javascript", level: 90, icon: icons.Javascript },
    ],
  },
  {
    category: "Database & Tools",
    skills: [
      { name: "PostgreSQL",    level: 80, icon: icons.Postgres },
      { name: "MySQL", level: 90, icon: icons.MySQL },
      { name: "Git", level: 90, icon: icons.Git },
    ],
  },
];

// ─── Data fetching ────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const data = await readProjectsFile();
    return (data.projects ?? []).filter((p) => p.featured).slice(0, 3);
  } catch {
    return [];
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="overflow-x-hidden">
      {/* Shimmer keyframe for name gradient animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
      <HomeClientEffects />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-[#F0FFFE] via-white to-[#EFF6FF] dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900">
        {/* ── Background decoration ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Three.js 3D background — opacity reduced so shapes feel atmospheric, not distracting */}
          <div className="opacity-40 dark:opacity-30">
            <Hero3DBackground />
          </div>

          {/* Subtle teal grid */}
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(#4FD1C5 1px, transparent 1px), linear-gradient(90deg, #4FD1C5 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Ambient glows */}
          <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-[#4FD1C5]/10 dark:bg-[#4FD1C5]/7 blur-[100px]" />
          <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-[#2B6CB0]/8 dark:bg-[#2B6CB0]/7 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#4FD1C5]/[0.05] dark:bg-[#4FD1C5]/[0.04] blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* ── Left: text ── */}
          <div style={{ animation: "slideUp 0.9s ease-out forwards" }}>

            {/* Available badge */}
            <div className="inline-flex items-center gap-2 bg-[#4FD1C5]/10 border border-[#4FD1C5]/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-pulse" />
              <span className="text-sm font-semibold text-[#4FD1C5]">Available for work</span>
            </div>

            {/* ── Headline — restructured, no more "Sebagai" break line ── */}
            <h1
              className="font-extrabold leading-tight mb-4"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              <span className="block text-5xl sm:text-6xl text-[#0F172A] dark:text-white mb-1">
                Halo, Saya
              </span>
              <span
                className="block text-5xl sm:text-6xl mb-4"
                style={{
                  background: "linear-gradient(90deg, #4FD1C5 0%, #2B6CB0 50%, #4FD1C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                Danendra Fairuz
              </span>
            </h1>

            {/* Role as a pill badge — replaces the standalone "Web Developer" heading line */}
            <div className="inline-flex items-center gap-2.5 bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-sm bg-gradient-to-br from-[#4FD1C5] to-[#2B6CB0]" />
              <span className="text-[15px] font-semibold text-[#64748B] dark:text-slate-400 tracking-wide">
                Full Stack Developer
              </span>
            </div>

            <p className="text-[#475569] dark:text-slate-300 text-[17px] leading-relaxed mb-8 max-w-md">
              Ahli dalam membangun website modern, cepat, dan scalable.
              Berfokus pada user experience dengan menggunakan Tech Stack modern.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn-primary">
                Lihat Proyek Saya
              </Link>
              <Link href="/contact" className="btn-outline">
                Hubungi Saya
              </Link>
            </div>
          </div>

          {/* ── Right: photo ── */}
          <div
            className="flex justify-center"
            style={{ animation: "zoomIn 1s ease-out 0.3s both" }}
          >
            <div className="relative">
              {/* Rotating dashed rings — reduced border width & opacity vs original */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[#4FD1C5]/20 scale-110 animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[#2B6CB0]/15 scale-125 animate-spin"
                style={{ animationDuration: "35s", animationDirection: "reverse" }}
              />

              {/* Gradient border frame */}
              <div
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-[3px] shadow-[0_20px_60px_rgba(79,209,197,0.15)] dark:shadow-[0_0_60px_rgba(79,209,197,0.15)]"
                style={{
                  background: "linear-gradient(135deg,#4FD1C5,#2B6CB0)",
                  animation: "float 4s ease-in-out infinite",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1C5]/10 to-[#2B6CB0]/10 z-10 rounded-full" />
                  <Image
                    src="/myphoto.jpeg"
                    alt="Danendra – Full Stack Developer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating badge — Main Stack */}
              <div className="absolute -top-2 -right-4 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-[#4FD1C5]/25 rounded-xl px-3 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-0.5">Main Stack</p>
                <p className="text-[12px] font-bold text-[#0F172A] dark:text-white leading-none">React · Next.js</p>
              </div>

              {/* Floating badge — Experience */}
              <div className="absolute -bottom-2 -left-6 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-[#2B6CB0]/30 rounded-xl px-3 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-0.5">Proyek</p>
                <p className="text-[12px] font-bold text-[#0F172A] dark:text-white leading-none">5+ Selesai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#475569] animate-bounce">
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED PROJECTS
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-slate-900 border-y border-gray-100 dark:border-transparent">
        <div className="max-w-6xl mx-auto px-6">

          {/* Centered header with "Lihat Semua" link below on mobile or integrated better */}
          <div className="section-fade text-center mb-12">
            <SectionHeader
              eyebrow="Portfolio"
              title="Proyek"
              highlight="Unggulan"
              description="Kumpulan proyek yang baru-baru ini saya bangun."
              centered={true}
            />

          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 section-fade">
              {featuredProjects.map((project) => (
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
          ) : (
            <div className="text-center py-16 section-fade">
              <span className="text-4xl block mb-3">📭</span>
              <p className="text-[#64748B] text-sm">
                Belum ada proyek featured. Tambahkan di admin dashboard!
              </p>
            </div>
          )}

          {/* Unified "Lihat Semua" button at the bottom */}
          <div className="text-center mt-12 section-fade">
            <Link href="/projects" className="btn-outline">
              Lihat Semua Proyek
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILLS — category-grouped pill rows
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 dark:bg-[#0F172A] border-y border-gray-100 dark:border-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-fade">
            <SectionHeader
              eyebrow="Keahlian"
              title="Tech Stack"
              highlight="Favorit"
              description="Tech Stack yang sering saya gunakan untuk membangun website."
            />
          </div>
 
          {/* Two-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 section-fade">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-6 hover:border-[#4FD1C5]/30 dark:hover:border-[#4FD1C5]/20 shadow-sm dark:shadow-none transition-all duration-300"
              >
                {/* Card header: category label + count badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    {/* Accent bar */}
                    <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#4FD1C5] to-[#2B6CB0]" />
                    <h3 className="text-[13px] font-bold uppercase tracking-widest text-[#475569] dark:text-slate-300">
                      {group.category}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-[#4FD1C5] dark:text-[#4FD1C5]/60 bg-[#4FD1C5]/10 dark:bg-[#4FD1C5]/[0.06] border border-[#4FD1C5]/20 dark:border-[#4FD1C5]/10 rounded-full px-2.5 py-0.5">
                    {group.skills.length} skills
                  </span>
                </div>
 
                {/* Skill rows with inline progress bar */}
                <div className="flex flex-col gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] hover:border-[#4FD1C5]/30 dark:hover:border-[#4FD1C5]/25 hover:bg-white dark:hover:bg-[#4FD1C5]/[0.03] transition-all duration-200 cursor-default"
                    >
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] flex items-center justify-center flex-shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-[#4FD1C5] group-hover:border-[#4FD1C5]/30 dark:group-hover:border-[#4FD1C5]/20 transition-all duration-200">
                        {skill.icon}
                      </div>
 
                      {/* Name + bar */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-300 group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors duration-200 truncate">
                            {skill.name}
                          </span>
                          <span className="text-[11px] font-bold text-[#4FD1C5] ml-3 flex-shrink-0">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="h-[3px] rounded-full bg-gray-200 dark:bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#4FD1C5] to-[#2B6CB0]"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
 
          {/* Centered footer link */}
          <div className="mt-10 text-center section-fade">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#4FD1C5]
                border border-[#4FD1C5]/20 bg-[#4FD1C5]/[0.04] rounded-lg px-5 py-2.5
                hover:bg-[#4FD1C5]/[0.08] hover:border-[#4FD1C5]/35 transition-all duration-200 shadow-sm dark:shadow-none"
            >
              Lihat keahlian lengkap di About
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#4FD1C5]/10 dark:bg-[#4FD1C5]/8 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#2B6CB0]/10 dark:bg-[#2B6CB0]/8 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 section-fade">
          <span className="inline-block bg-[#4FD1C5]/10 text-[#0D9488] dark:text-[#4FD1C5] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-[#4FD1C5]/20">
            Mari Berkolaborasi
          </span>

          <h2
            className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] dark:text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Punya Proyek yang{" "}
            <span className="gradient-text">Menarik?</span>
          </h2>

          <p className="text-[#475569] dark:text-[#94A3B8] text-lg mb-10 leading-relaxed">
            Saya selalu terbuka untuk diskusi tentang proyek baru, ide kreatif,
            atau kesempatan untuk menjadi bagian dari tim Anda.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Kirim Pesan
            </Link>
            <Link href="/projects" className="btn-outline">
              Lihat Portofolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}