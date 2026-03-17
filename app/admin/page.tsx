"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Login gagal");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F0FDFA 0%, #E0F2FE 50%, #F0F9FF 100%)" }}
    >
      {/* ── Decorative blobs ── */}
      <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-teal-500/10 pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[280px] h-[280px] rounded-full bg-sky-500/8 pointer-events-none" />
      <div className="absolute top-1/2 left-[5%] w-20 h-20 rounded-full bg-teal-400/6 pointer-events-none" />

      <div className="w-full max-w-sm relative z-10" style={{ animation: "fadeIn 0.5s ease-out forwards" }}>

        {/* ── Logo + header ── */}
        <div className="text-center mb-7">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_8px_24px_rgba(13,148,136,0.3)]"
            style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
          >
            <span className="text-2xl font-extrabold text-white tracking-tight select-none">D</span>
          </div>
          <h1
            className="text-[22px] font-extrabold text-slate-900 mb-1.5 tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Admin Space
          </h1>
          <p className="text-[13px] text-slate-500 font-medium">
            Masukkan password untuk mengakses dashboard
          </p>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-7 sm:p-8">

          {/* Error message */}
          {error && (
            <div className="mb-5 flex items-center gap-2.5 bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm font-medium border border-red-100">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth={2} strokeLinecap="round" />
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2} strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin..."
                  required
                  autoFocus
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 bg-slate-50
                    text-slate-800 text-sm font-medium placeholder:text-slate-400
                    outline-none transition-all duration-200
                    focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors p-1"
                >
                  {showPw ? (
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-sm
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(13,148,136,0.3)]
                disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none
                flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#0D9488,#0369A1)" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Masuk...
                </>
              ) : (
                "Akses Dashboard"
              )}
            </button>
          </form>

          {/* Footer row */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Restricted Access</span>
            <Link
              href="/"
              className="text-[12px] font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1"
            >
              Kembali ke Web
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}