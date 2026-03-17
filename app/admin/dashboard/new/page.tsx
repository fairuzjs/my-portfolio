import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
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

          {/* Title */}
          <div className="min-w-0 flex-1">
            <h1
              className="text-[15px] font-extrabold text-slate-900 leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Tambah Proyek Baru
            </h1>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Isi detail proyek yang ingin ditambahkan
            </p>
          </div>

          {/* Breadcrumb — desktop */}
          <nav className="hidden md:flex items-center gap-1.5 text-[12px] text-slate-400 flex-shrink-0">
            <Link href="/admin/dashboard" className="hover:text-teal-600 transition-colors font-medium">
              Dashboard
            </Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-600 font-semibold">Tambah Proyek</span>
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <ProjectForm mode="new" />
      </main>
    </div>
  );
}