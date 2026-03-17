import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { readProjectsFile } from "@/lib/projects";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditPageProps) {
  const { id } = await params;
  const data = await readProjectsFile();
  const project = data.projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-teal-500/20">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">

          {/* Back button */}
          <Link
            href="/admin/dashboard"
            className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0
              bg-slate-50 border border-slate-200 text-slate-500
              hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600
              transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* Title + project name */}
          <div className="min-w-0 flex-1">
            <h1
              className="text-[15px] font-extrabold text-slate-900 leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Edit Proyek
            </h1>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[200px] sm:max-w-sm">
              {project.title}
            </p>
          </div>

          {/* Editing badge */}
          <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest
            text-amber-600 bg-amber-50 border border-amber-200
            px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
            Editing
          </span>

          {/* Breadcrumb — desktop */}
          <nav className="hidden md:flex items-center gap-1.5 text-[12px] text-slate-400 flex-shrink-0">
            <Link href="/admin/dashboard" className="hover:text-teal-600 transition-colors font-medium">
              Dashboard
            </Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-600 font-semibold truncate max-w-[180px]">
              {project.title}
            </span>
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <ProjectForm mode="edit" projectId={id} initialData={project} />
      </main>
    </div>
  );
}