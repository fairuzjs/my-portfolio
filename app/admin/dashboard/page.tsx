"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  category: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ─── Category badge color map ─────────────────────────────────────────────────

const categoryStyle: Record<string, { text: string; bg: string; border: string }> = {
  "Full Stack": {
    text: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  Frontend: {
    text: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
  },
  Backend: {
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  Mobile: {
    text: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
};

function getCategoryStyle(category: string) {
  return (
    categoryStyle[category] ?? {
      text: "text-slate-600",
      bg: "bg-slate-100",
      border: "border-slate-200",
    }
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon,
  iconBg,
  iconBorder,
}: {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:border-teal-100 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg} border ${iconBorder}`}>
          {icon}
        </div>
      </div>
      <p className="text-4xl font-extrabold text-slate-900 leading-none mb-1">{value}</p>
      <p className="text-[12px] text-slate-400">{sub}</p>
    </div>
  );
}

// ─── Message Detail Modal ─────────────────────────────────────────────────────

function MessageModal({
  msg,
  onClose,
  onDelete,
}: {
  msg: Message;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  const fmt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(msg.createdAt));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold text-slate-900 leading-tight truncate">
              {msg.subject}
            </h3>
            <p className="text-[12px] text-slate-400 mt-0.5">{fmt}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sender info */}
        <div className="px-6 py-4 border-b border-slate-50 flex flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama</p>
            <p className="text-[13px] font-semibold text-slate-800">{msg.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
            <a
              href={`mailto:${msg.email}`}
              className="text-[13px] font-semibold text-teal-600 hover:underline"
            >
              {msg.email}
            </a>
          </div>
        </div>

        {/* Message body */}
        <div className="px-6 py-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pesan</p>
          <p className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-wrap">
            {msg.message}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          <a
            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white px-4 py-2 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Balas Email
          </a>
          <button
            onClick={() => onDelete(msg.id)}
            className="text-[12px] font-bold text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200"
          >
            Hapus Pesan
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgLoading, setMsgLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");

  // ── Fetch projects ──
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects ?? []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch messages ──
  const fetchMessages = useCallback(async () => {
    setMsgLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data.messages ?? []);
    } catch {
      setMessages([]);
    } finally {
      setMsgLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchMessages();
  }, [fetchProjects, fetchMessages]);

  // ── Toggle featured ──
  const toggleFeatured = async (project: Project) => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      fetchProjects();
    } catch {}
  };

  // ── Delete project ──
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setDeleteId(null);
      fetchProjects();
    } catch {}
  };

  // ── Open message (mark as read) ──
  const openMessage = async (msg: Message) => {
    setSelectedMsg(msg);
    if (!msg.read) {
      try {
        await fetch("/api/messages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: msg.id }),
        });
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        );
      } catch {}
    }
  };

  // ── Delete message ──
  const handleDeleteMessage = async (id: string) => {
    try {
      await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setSelectedMsg(null);
    } catch {}
  };

  // ── Logout ──
  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  };

  // ── Derived stats ──
  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const categoryCount = new Set(projects.map((p) => p.category)).size;
  const unreadCount = messages.filter((m) => !m.read).length;

  // ── Filtered list ──
  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ══════════════════════════════════════
          TOPBAR
      ══════════════════════════════════════ */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(13,148,136,0.3)]"
              style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
            >
              <span className="text-[13px] font-extrabold text-white select-none">D</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[14px] font-bold text-slate-900">Admin Space</span>
              <span className="text-[12px] text-slate-400 ml-2">Manajemen Proyek</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-500
                hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 bg-white
                hover:bg-slate-50 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Lihat Portfolio
            </Link>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="text-[12px] font-bold text-red-500 bg-red-50 border border-red-200
                px-3 py-1.5 rounded-lg hover:bg-red-100 hover:border-red-300
                transition-all duration-200 disabled:opacity-60"
            >
              {logoutLoading ? "..." : "Logout"}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ── Gradient banner header ── */}
        <div
          className="relative rounded-2xl p-5 sm:p-7 mb-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/8 pointer-events-none" />
          <div className="absolute -bottom-8 right-20 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />
          <h1
            className="text-xl sm:text-2xl font-extrabold text-white mb-1 relative z-10"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Dashboard Overview
          </h1>
          <p className="text-[13px] text-white/60 relative z-10">
            Kelola semua portfolio, proyek, dan pesan masuk di sini.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Proyek"
            value={totalProjects}
            sub="projects total"
            iconBg="bg-teal-50"
            iconBorder="border-teal-200"
            icon={
              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
          />
          <StatCard
            label="Featured"
            value={featuredCount}
            sub="ditampilkan di home"
            iconBg="bg-amber-50"
            iconBorder="border-amber-200"
            icon={
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
          />
          <StatCard
            label="Kategori"
            value={categoryCount}
            sub="kategori berbeda"
            iconBg="bg-blue-50"
            iconBorder="border-blue-200"
            icon={
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            }
          />
          <StatCard
            label="Pesan Masuk"
            value={messages.length}
            sub={unreadCount > 0 ? `${unreadCount} belum dibaca` : "semua sudah dibaca"}
            iconBg="bg-rose-50"
            iconBorder="border-rose-200"
            icon={
              <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
          />
        </div>

        {/* ── Tab Navigation ── */}
        <div className="flex items-center gap-1 mb-4 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
              activeTab === "projects"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Daftar Proyek
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`relative px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
              activeTab === "messages"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Pesan Masuk
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* ══════════════════════════════════════
            PROJECTS TAB
        ══════════════════════════════════════ */}
        {activeTab === "projects" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Card header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-50">
              <h2 className="text-[15px] font-bold text-slate-900">Daftar Proyek</h2>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" strokeWidth={2} />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth={2} strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari proyek..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200
                      text-[13px] text-slate-600 placeholder:text-slate-400
                      outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10
                      transition-all duration-200 w-44 sm:w-52"
                  />
                </div>
                {/* Add button */}
                <Link
                  href="/admin/dashboard/new"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                    text-white text-[12px] font-bold
                    shadow-[0_2px_8px_rgba(13,148,136,0.25)]
                    hover:shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:-translate-y-0.5
                    transition-all duration-200"
                  style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span className="hidden xs:inline">Tambah Proyek</span>
                  <span className="xs:hidden">Tambah</span>
                </Link>
              </div>
            </div>

            {/* ── Table — desktop ── */}
            <div className="hidden md:block">
              {/* Table head */}
              <div className="grid grid-cols-[2fr_120px_1fr_72px_80px] gap-3 px-5 py-3 bg-slate-50 border-b border-slate-100">
                {["Proyek", "Kategori", "Tags", "Status", "Aksi"].map((h, i) => (
                  <span key={h}
                    className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest ${i >= 3 ? "text-center" : ""} ${i === 4 ? "text-right" : ""}`}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-50">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-[2fr_120px_1fr_72px_80px] gap-3 px-5 py-4 animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3 bg-slate-100 rounded w-3/4" />
                          <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="h-6 bg-slate-100 rounded-lg w-20 self-center" />
                      <div className="flex gap-1.5 self-center">
                        <div className="h-5 bg-slate-100 rounded w-14" />
                        <div className="h-5 bg-slate-100 rounded w-12" />
                      </div>
                      <div className="h-5 w-5 bg-slate-100 rounded mx-auto self-center" />
                      <div className="flex gap-1.5 justify-end self-center">
                        <div className="w-7 h-7 bg-slate-100 rounded-lg" />
                        <div className="w-7 h-7 bg-slate-100 rounded-lg" />
                      </div>
                    </div>
                  ))
                ) : filtered.length === 0 ? (
                  <div className="py-16 text-center">
                    <span className="text-3xl block mb-2">📭</span>
                    <p className="text-[13px] text-slate-400">
                      {search ? "Proyek tidak ditemukan." : "Belum ada proyek. Tambahkan sekarang!"}
                    </p>
                  </div>
                ) : (
                  filtered.map((project) => {
                    const catStyle = getCategoryStyle(project.category);
                    const thumb = project.images?.[0] || "/placeholder.png";
                    const previewTags = project.tags.slice(0, 2);
                    const extraTags = project.tags.length - 2;

                    return (
                      <div
                        key={project.id}
                        className="grid grid-cols-[2fr_120px_1fr_72px_80px] gap-3 px-5 py-3.5
                          hover:bg-slate-50/80 border border-transparent hover:border-slate-100
                          rounded-xl mx-1 transition-all duration-150 items-center"
                      >
                        {/* Project info */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                            <Image src={thumb} alt={project.title} width={40} height={40} className="object-cover w-full h-full" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-bold text-slate-800 truncate leading-tight mb-0.5">
                              {project.title}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {project.description.slice(0, 60)}...
                            </p>
                          </div>
                        </div>

                        {/* Category */}
                        <span className={`text-[11px] font-600 font-semibold px-2.5 py-1 rounded-lg border w-fit
                          ${catStyle.text} ${catStyle.bg} ${catStyle.border}`}>
                          {project.category}
                        </span>

                        {/* Tags */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {previewTags.map((tag) => (
                            <span key={tag}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md
                                bg-slate-100 text-slate-500 border border-slate-200">
                              {tag}
                            </span>
                          ))}
                          {extraTags > 0 && (
                            <span className="text-[10px] font-bold text-teal-600">+{extraTags}</span>
                          )}
                        </div>

                        {/* Featured toggle */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleFeatured(project)}
                            title={project.featured ? "Unfeature" : "Set featured"}
                            className="transition-transform hover:scale-110 duration-150"
                          >
                            <svg className="w-5 h-5" fill={project.featured ? "#F59E0B" : "none"}
                              stroke={project.featured ? "#F59E0B" : "#CBD5E1"} strokeWidth={2} viewBox="0 0 24 24">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/dashboard/edit/${project.id}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center
                              border border-slate-200 bg-white text-slate-400
                              hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50
                              transition-all duration-150"
                            title="Edit"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => setDeleteId(project.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center
                              border border-slate-200 bg-white text-slate-400
                              hover:text-red-500 hover:border-red-200 hover:bg-red-50
                              transition-all duration-150"
                            title="Hapus"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                              <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── Cards — mobile ── */}
            <div className="md:hidden divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 animate-pulse flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-100 rounded w-3/4" />
                      <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                      <div className="h-2 bg-slate-100 rounded w-1/3" />
                    </div>
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="text-3xl block mb-2">📭</span>
                  <p className="text-[13px] text-slate-400">
                    {search ? "Proyek tidak ditemukan." : "Belum ada proyek."}
                  </p>
                </div>
              ) : (
                filtered.map((project) => {
                  const catStyle = getCategoryStyle(project.category);
                  const thumb = project.images?.[0] || "/placeholder.png";

                  return (
                    <div key={project.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-3">
                        {/* Thumbnail */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                          <Image src={thumb} alt={project.title} width={48} height={48} className="object-cover w-full h-full" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-[13px] font-bold text-slate-800 leading-tight truncate">
                              {project.title}
                            </p>
                            {/* Featured toggle */}
                            <button onClick={() => toggleFeatured(project)} className="flex-shrink-0">
                              <svg className="w-4 h-4" fill={project.featured ? "#F59E0B" : "none"}
                                stroke={project.featured ? "#F59E0B" : "#CBD5E1"} strokeWidth={2} viewBox="0 0 24 24">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </button>
                          </div>

                          {/* Category + tags */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border
                              ${catStyle.text} ${catStyle.bg} ${catStyle.border}`}>
                              {project.category}
                            </span>
                            {project.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 2 && (
                              <span className="text-[10px] font-bold text-teal-600">+{project.tags.length - 2}</span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/projects/${project.id}/edit`}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold
                                text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg
                                hover:bg-teal-100 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteId(project.id)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold
                                text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg
                                hover:bg-red-100 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                              </svg>
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Row count footer */}
            {!loading && filtered.length > 0 && (
              <div className="px-5 py-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Menampilkan {filtered.length} dari {totalProjects} proyek
                </span>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Reset filter
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            MESSAGES TAB
        ══════════════════════════════════════ */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-bold text-slate-900">Pesan Masuk</h2>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full
                    bg-rose-100 text-rose-600 text-[11px] font-bold border border-rose-200">
                    {unreadCount} baru
                  </span>
                )}
              </div>
              <button
                onClick={fetchMessages}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-500
                  hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 bg-white
                  hover:bg-slate-50 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Refresh
              </button>
            </div>

            {/* Message list */}
            {msgLoading ? (
              <div className="divide-y divide-slate-50">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 px-5 py-4 animate-pulse">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="h-3 bg-slate-100 rounded w-1/4" />
                        <div className="h-2.5 bg-slate-100 rounded w-16" />
                      </div>
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                      <div className="h-2.5 bg-slate-100 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="py-20 text-center">
                <span className="text-4xl block mb-3">📬</span>
                <p className="text-[14px] font-semibold text-slate-400">Belum ada pesan masuk</p>
                <p className="text-[12px] text-slate-300 mt-1">Pesan dari form kontak akan muncul di sini</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {messages.map((msg) => {
                  const fmt = new Intl.DateTimeFormat("id-ID", {
                    day: "numeric", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  }).format(new Date(msg.createdAt));

                  return (
                    <button
                      key={msg.id}
                      onClick={() => openMessage(msg)}
                      className={`w-full text-left flex items-start gap-4 px-5 py-4 transition-all duration-150
                        hover:bg-slate-50 group ${!msg.read ? "bg-rose-50/30" : ""}`}
                    >
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 text-[13px] font-extrabold
                        ${!msg.read
                          ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-[0_2px_8px_rgba(244,63,94,0.3)]"
                          : "bg-slate-100 text-slate-400"
                        }`}>
                        {msg.name.charAt(0).toUpperCase()}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`text-[13px] font-bold truncate ${!msg.read ? "text-slate-900" : "text-slate-700"}`}>
                              {msg.name}
                            </span>
                            {!msg.read && (
                              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-rose-500" />
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">{fmt}</span>
                        </div>

                        <p className={`text-[12px] mb-1 truncate ${!msg.read ? "font-semibold text-slate-800" : "text-slate-600"}`}>
                          {msg.subject}
                        </p>

                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[11px] text-slate-400 truncate flex-1">
                            {msg.email} · {msg.message.slice(0, 60)}{msg.message.length > 60 ? "..." : ""}
                          </p>
                          <svg className="w-4 h-4 text-slate-300 flex-shrink-0 group-hover:text-teal-400 transition-colors"
                            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            {!msgLoading && messages.length > 0 && (
              <div className="px-5 py-3 border-t border-slate-50">
                <span className="text-[11px] text-slate-400">
                  Total {messages.length} pesan · {unreadCount} belum dibaca
                </span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════
          DELETE CONFIRMATION MODAL
      ══════════════════════════════════════ */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </div>
            <h3 className="text-[16px] font-bold text-slate-900 mb-1">Hapus Proyek?</h3>
            <p className="text-[13px] text-slate-500 mb-6">
              Tindakan ini tidak dapat dibatalkan. Proyek akan dihapus secara permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600
                  text-[13px] font-semibold hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white
                  text-[13px] font-bold hover:bg-red-600 transition-colors
                  shadow-[0_2px_8px_rgba(239,68,68,0.3)]"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          MESSAGE DETAIL MODAL
      ══════════════════════════════════════ */}
      {selectedMsg && (
        <MessageModal
          msg={selectedMsg}
          onClose={() => setSelectedMsg(null)}
          onDelete={handleDeleteMessage}
        />
      )}

    </div>
  );
}