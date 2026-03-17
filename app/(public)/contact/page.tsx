"use client";

import { useState, useEffect, FormEvent } from "react";
import SectionHeader from "@/components/SectionHeader";

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    ),
    label: "Email",
    value: "danendra@email.com",
    href: "mailto:danendra@email.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    ),
    label: "Lokasi",
    value: "Jakarta, Indonesia",
    href: "#",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/danendra",
    href: "https://linkedin.com/in/danendra",
  },
];

const faqs = [
  { q: "Berapa lama waktu pengerjaan proyek?", a: "Tergantung kompleksitas. Landing page 1–2 minggu, web app penuh bisa 1–3 bulan." },
  { q: "Apakah tersedia layanan maintenance?", a: "Ya! Saya menawarkan paket maintenance bulanan untuk memastikan situs tetap up-to-date." },
  { q: "Teknologi apa yang digunakan?", a: "React/Next.js untuk frontend, Node.js/PostgreSQL untuk backend. Disesuaikan kebutuhan." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-10 overflow-x-hidden">
      {/* Hero */}
      <section className="pt-20 pb-10 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#4FD1C5] opacity-[0.15] blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10" style={{ animation: "slideUp 0.8s ease-out forwards" }}>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#4FD1C5] uppercase mb-4">
            <span className="w-6 h-px bg-[#4FD1C5]" />
            Kontak
            <span className="w-6 h-px bg-[#4FD1C5]" />
          </span>
          <h1
            className="text-5xl font-extrabold text-[#0F172A] dark:text-white mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Mari <span className="gradient-text">Terhubung</span>
          </h1>
          <p className="text-[#475569] dark:text-slate-300 text-lg max-w-7xl mx-auto">
            Jika anda memiliki pertanyaan atau ingin bekerja sama? Hubungi saya!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 bg-[#F8FAFC] dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <div className="lg:col-span-2 section-fade">
            <h2
              className="text-2xl font-extrabold text-[#0F172A] dark:text-white mb-2"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Info Kontak
            </h2>
            <p className="text-[#64748B] dark:text-slate-400 text-sm mb-8 leading-relaxed">
              Saya biasanya merespons dalam 24 jam pada hari kerja.
            </p>
            <div className="space-y-4 mb-10">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-slate-700/50 hover:border-[#4FD1C5]/30 dark:hover:border-[#4FD1C5]/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FD1C5]/10 to-[#2B6CB0]/10 text-[#4FD1C5] flex items-center justify-center flex-shrink-0 group-hover:from-[#4FD1C5] group-hover:to-[#2B6CB0] group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8] dark:text-slate-400 font-medium">{info.label}</div>
                    <div className="text-[#0F172A] dark:text-slate-200 font-semibold text-sm">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-semibold text-sm text-[#0F172A] dark:text-white">Open To Work</span>
              </div>
              <p className="text-[#64748B] dark:text-slate-400 text-xs leading-relaxed">
                Saya terbuka untuk proyek freelance maupun posisi full-time. Mari hubungi saya!
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 section-fade">
            <div className="bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 p-8 hover:border-[#4FD1C5]/20 transition-all duration-300">
              {status === "sent" ? (
                <div
                  className="text-center py-12"
                  style={{ animation: "zoomIn 0.5s ease-out forwards" }}
                >
                  <span className="text-6xl block mb-4">✅</span>
                  <h3
                    className="text-2xl font-extrabold text-[#0F172A] dark:text-white mb-2"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Pesan Terkirim!
                  </h3>
                  <p className="text-[#64748B] dark:text-slate-400 mb-6">
                    Terima kasih! Saya akan menghubungi anda secepatnya.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-outline text-sm"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2
                    className="text-xl font-extrabold text-[#0F172A] dark:text-white mb-6"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Kirim Pesan
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] dark:text-slate-300 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-[#F8FAFC] dark:bg-slate-900/50 text-[#0F172A] dark:text-white text-sm outline-none focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] dark:text-slate-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-[#F8FAFC] dark:bg-slate-900/50 text-[#0F172A] dark:text-white text-sm outline-none focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] dark:text-slate-300 mb-2">
                      Subjek *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Diskusi Proyek, Kolaborasi, dll."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-[#F8FAFC] dark:bg-slate-900/50 text-[#0F172A] dark:text-white text-sm outline-none focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] dark:text-slate-300 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ceritakan proyek atau kebutuhan kamu..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-[#F8FAFC] dark:bg-slate-900/50 text-[#0F172A] dark:text-white text-sm outline-none focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-red-500 text-center mt-2">
                      ❌ Gagal mengirim pesan. Coba lagi.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
