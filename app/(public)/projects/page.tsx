import type { Project } from "@/lib/projects";
import ProjectsClientGrid from "@/components/ProjectsClientGrid";

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/projects`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.projects ?? [];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="pt-28 pb-12 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#4FD1C5] opacity-[0.15] blur-[100px]" />
        <div
          className="max-w-6xl mx-auto px-6 text-center relative z-10"
          style={{ animation: "slideUp 0.8s ease-out forwards" }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#4FD1C5] uppercase mb-4">
            <span className="w-6 h-px bg-[#4FD1C5]" />
            Portfolio
            <span className="w-6 h-px bg-[#4FD1C5]" />
          </span>
          <h1
            className="text-5xl font-extrabold text-[#0F172A] dark:text-white mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Semua <span className="gradient-text">Proyek</span>
          </h1>
          <p className="text-[#475569] dark:text-slate-300 text-lg max-w-7xl mx-auto">
            Koleksi proyek yang sudah saya bangun, silahkan lihat!
          </p>
        </div>
      </section>

      {/* Projects with client-side filtering */}
      <section className="py-10 bg-[#F8FAFC] dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <ProjectsClientGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}
