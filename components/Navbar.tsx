"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    setActiveLink(window.location.pathname);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5 py-3 dark:border-b dark:border-slate-800"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4FD1C5] to-[#2B6CB0] flex items-center justify-center shadow-lg group-hover:shadow-[#4FD1C5]/40 transition-all duration-300 group-hover:scale-110">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span
            className={`font-bold text-lg tracking-tight transition-colors duration-300 dark:text-white text-[#0F172A]`}
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            My Portofolio<span className="text-[#4FD1C5]">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                activeLink === link.href
                  ? "text-[#4FD1C5] dark:text-[#4FD1C5]"
                  : "text-[#334155] dark:text-slate-300 hover:text-[#4FD1C5] dark:hover:text-[#4FD1C5]"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#4FD1C5] rounded-full transition-all duration-300 ${
                  activeLink === link.href ? "w-4" : "w-0 group-hover:w-4"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn-primary text-sm !py-2 !px-5"
          >
            Hire Me
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-[#0F172A] dark:bg-white rounded-full transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#0F172A] dark:bg-white rounded-full transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#0F172A] dark:bg-white rounded-full transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setMobileOpen(false);
              }}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeLink === link.href
                  ? "bg-[#4FD1C5]/10 text-[#4FD1C5]"
                  : "text-[#334155] dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#4FD1C5] dark:hover:text-[#4FD1C5]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-slate-800">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-primary text-sm flex-1 ml-4 justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Hire Me
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
