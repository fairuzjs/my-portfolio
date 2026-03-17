"use client";

import { useState } from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/fairuzjs",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/danendra",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/draafrzz_",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6281387883915",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

function SocialIcon({ label, href, icon }: (typeof socialLinks)[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-11 h-11 flex items-center justify-center"
    >
      {/* Ripple ring on hover */}
      <span
        className={`
          absolute inset-0 rounded-xl border border-[#4FD1C5]/40
          transition-all duration-500 ease-out
          ${hovered ? "scale-125 opacity-0" : "scale-100 opacity-0"}
        `}
      />

      {/* Glow blur behind */}
      <span
        className={`
          absolute inset-0 rounded-xl bg-[#4FD1C5]/10
          blur-sm transition-opacity duration-300
          ${hovered ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Main button surface */}
      <span
        className={`
          relative z-10 w-11 h-11 rounded-xl flex items-center justify-center
          border transition-all duration-300 ease-out
          ${hovered
            ? "bg-[#4FD1C5]/10 border-[#4FD1C5]/40 -translate-y-1 shadow-[0_8px_20px_rgba(79,209,197,0.2)]"
            : "bg-gray-50 dark:bg-white/[0.03] border-gray-100 dark:border-white/[0.08]"
          }
        `}
      >
        {/* Icon — slides up & fades, replaced by label */}
        <span
          className={`
            absolute transition-all duration-200
            ${hovered ? "-translate-y-3 opacity-0 scale-75" : "translate-y-0 opacity-100 scale-100"}
            text-[#64748B] group-hover:text-[#4FD1C5]
          `}
        >
          {icon}
        </span>

        {/* Label slides up from below on hover */}
        <span
          className={`
            absolute text-[10px] font-semibold tracking-wide text-[#4FD1C5]
            transition-all duration-200
            ${hovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
          `}
        >
          {label}
        </span>
      </span>

      {/* Particle dots — top left & bottom right */}
      <span
        className={`
          absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-[#4FD1C5]
          transition-all duration-300 ease-out
          ${hovered ? "-translate-x-2 -translate-y-2 opacity-70 scale-100" : "translate-x-0 translate-y-0 opacity-0 scale-0"}
        `}
      />
      <span
        className={`
          absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-[#4FD1C5]
          transition-all duration-300 delay-75 ease-out
          ${hovered ? "translate-x-2 translate-y-2 opacity-70 scale-100" : "translate-x-0 translate-y-0 opacity-0 scale-0"}
        `}
      />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white relative overflow-hidden py-12 border-t border-gray-100 dark:border-transparent">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4FD1C5]/50 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#4FD1C5]/5 dark:bg-[#4FD1C5]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#2B6CB0]/5 dark:bg-[#2B6CB0]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-[#4FD1C5]/[0.05] dark:bg-[#4FD1C5]/[0.03] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center relative z-10">

        {/* Monogram / Logo */}
        <div className="mb-5 w-14 h-14 rounded-2xl bg-[#4FD1C5]/[0.07] border border-[#4FD1C5]/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#4FD1C5] tracking-tight leading-none select-none">
            D
          </span>
        </div>

        {/* Name */}
        <div className="mb-2">
          <span className="text-xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">Danendra</span>
          <span className="text-xl font-light text-[#4FD1C5]">.</span>
        </div>

        {/* Personal quote */}
        <p className="text-sm text-slate-500 italic mb-8 max-w-5xl leading-relaxed">
          "Terima kasih sudah berkunjung. Jika ada yang ingin disampaikan, silahkan hubungi saya melalui media sosial yang tersedia."
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-2 mb-10">
          {socialLinks.map((s) => (
            <SocialIcon key={s.label} {...s} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 dark:bg-white/[0.06] mb-5" />

        {/* Bottom bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-700">
          <span>© {year} Danendra. All rights reserved.</span>
          <span>
            Made with{" "}
            <span className="text-[#4FD1C5]">♥</span>
            {" "}using Next.js &amp; Tailwind
          </span>
        </div>

      </div>
    </footer>
  );
}