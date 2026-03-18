"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import TagInput from "@/components/admin/TagInput";
import type { Project } from "@/lib/projects";

const CATEGORIES = ["Web App", "Full Stack", "Frontend", "Backend", "Mobile", "Other"];

interface ProjectFormProps {
  initialData?: Partial<Project>;
  mode: "new" | "edit";
  projectId?: string;
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 " +
  "text-slate-800 text-[13px] font-medium placeholder:text-slate-400 " +
  "outline-none transition-all duration-200 " +
  "focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-[13px] font-bold text-slate-900 mb-5">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
        />
        {title}
      </h2>
      {children}
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

export default function ProjectForm({ initialData, mode, projectId }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    images: initialData?.images ?? [],
    tags: initialData?.tags ?? [],
    liveUrl: initialData?.liveUrl ?? "",
    githubUrl: initialData?.githubUrl ?? "",
    featured: initialData?.featured ?? false,
    category: Array.isArray(initialData?.category) ? initialData.category : ["Web App"],
  });

  const set = (field: string, val: unknown) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const toggleCategory = (cat: string) => {
    setForm((prev) => {
      const isSelected = prev.category.includes(cat);
      if (isSelected) {
        // Prevent unselecting the last one
        return prev.category.length > 1 
            ? { ...prev, category: prev.category.filter(c => c !== cat) }
            : prev;
      }
      return { ...prev, category: [...prev.category, cat] };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Judul proyek wajib diisi."); return; }
    if (!form.description.trim()) { setError("Deskripsi wajib diisi."); return; }
    if (form.images.length === 0) { setError("Minimal satu gambar wajib diupload."); return; }

    setSaving(true);
    setError("");

    const url = mode === "new" ? "/api/projects" : `/api/projects/${projectId}`;
    const method = mode === "new" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Gagal menyimpan");
      setSaving(false);
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  };

  // ── Shared save button ──
  const SaveButton = () => (
    <button
      type="submit"
      disabled={saving}
      className="w-full py-3 rounded-xl text-white text-[13px] font-bold
        shadow-[0_3px_10px_rgba(13,148,136,0.25)]
        hover:shadow-[0_6px_18px_rgba(13,148,136,0.35)] hover:-translate-y-0.5
        disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none
        transition-all duration-200 flex items-center justify-center gap-2"
      style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
    >
      {saving ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Menyimpan...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          {mode === "new" ? "Simpan Proyek" : "Simpan Perubahan"}
        </>
      )}
    </button>
  );

  const CancelButton = () => (
    <button
      type="button"
      onClick={() => router.push("/admin/dashboard")}
      className="w-full py-2.5 rounded-xl bg-white border border-slate-200
        text-slate-600 text-[13px] font-semibold
        hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
    >
      Batal
    </button>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* Error banner */}
      {error && (
        <div className="mb-5 flex items-center gap-2.5 bg-red-50 border border-red-100
          text-red-600 rounded-xl px-4 py-3 text-[13px] font-medium">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth={2} strokeLinecap="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2} strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* ════ LEFT ════ */}
        <div className="flex flex-col gap-5">

          {/* Informasi Dasar */}
          <SectionCard title="Informasi Dasar">
            <div className="space-y-4">
              <div>
                <Label required>Judul Proyek</Label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Contoh: GoSummit – Ticketing System"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <Label required>Kategori</Label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const isSelected = form.category.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCategory(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                          isSelected 
                            ? "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100" 
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured toggle */}
              <div>
                <Label>Featured</Label>
                <button
                  type="button"
                  onClick={() => set("featured", !form.featured)}
                  className={`flex items-center gap-3 w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border
                    text-[13px] font-semibold transition-all duration-200 cursor-pointer
                    ${form.featured
                      ? "bg-teal-50 border-teal-200 text-teal-700"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  <span
                    className={`relative inline-flex w-9 h-5 rounded-full flex-shrink-0
                      transition-colors duration-200
                      ${form.featured
                        ? "bg-gradient-to-r from-teal-500 to-sky-600"
                        : "bg-slate-200"
                      }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm
                        transition-transform duration-200
                        ${form.featured ? "translate-x-4" : "translate-x-0.5"}`}
                    />
                  </span>
                  {form.featured ? "Tampilkan di home" : "Tidak featured"}
                </button>
              </div>


              {/* Description */}
              <div>
                <Label required>Deskripsi</Label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={4}
                  placeholder="Jelaskan proyek Anda — fitur utama, teknologi, dan dampaknya..."
                  required
                  className={inputCls + " resize-none leading-relaxed"}
                />
                <p className="text-[11px] text-slate-400 mt-1 text-right">
                  {form.description.length} karakter
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Links */}
          <SectionCard title="Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Live Demo URL</Label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                    </svg>
                  </span>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => set("liveUrl", e.target.value)}
                    placeholder="https://myproject.vercel.app"
                    className={inputCls + " pl-9"}
                  />
                </div>
              </div>
              <div>
                <Label>GitHub URL</Label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </span>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => set("githubUrl", e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className={inputCls + " pl-9"}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Tags */}
          <SectionCard title="Tech Stack / Tags">
            <TagInput value={form.tags} onChange={(tags) => set("tags", tags)} />
          </SectionCard>

          {/* Image upload — mobile only (shown below tags) */}
          <div className="lg:hidden">
            <SectionCard title="Gambar Proyek">
              <ImageUpload value={form.images} onChange={(urls) => set("images", urls)} />
            </SectionCard>
          </div>
        </div>

        {/* ════ RIGHT SIDEBAR — desktop only ════ */}
        <div className="hidden lg:flex flex-col gap-5">
          <SectionCard title="Gambar Proyek">
            <ImageUpload value={form.images} onChange={(urls) => set("images", urls)} />
          </SectionCard>

          {/* Sticky action buttons */}
          <div className="flex flex-col gap-2.5 sticky top-20">
            <SaveButton />
            <CancelButton />
            <p className="text-center text-[11px] text-slate-400 mt-0.5">
              {mode === "new"
                ? "Proyek akan langsung muncul di halaman Projects"
                : "Perubahan akan langsung diterapkan"}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile action buttons */}
      <div className="lg:hidden flex flex-col gap-2.5 mt-5">
        <SaveButton />
        <CancelButton />
      </div>
    </form>
  );
}