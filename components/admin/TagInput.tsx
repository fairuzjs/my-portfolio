"use client";

import { useState, KeyboardEvent } from "react";
import { icons } from "@/components/TechIcons";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const SUGGESTED_TAGS = Object.keys(icons).filter(
  (key) => key !== "React / Next.js" && key !== "HTML & CSS"
);

export default function TagInput({ value, onChange }: TagInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = SUGGESTED_TAGS.filter(
    (t) => t.toLowerCase().includes(input.toLowerCase()) && !value.includes(t)
  );

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="space-y-2.5">

      {/* ── Tag input box ── */}
      <div
        className="flex flex-wrap gap-2 p-3 min-h-[46px]
          border border-slate-200 rounded-xl bg-slate-50
          focus-within:bg-white focus-within:border-teal-500
          focus-within:ring-2 focus-within:ring-teal-500/10
          transition-all duration-200"
      >
        {/* Existing tags */}
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold
              text-teal-700 bg-teal-50 border border-teal-200
              pl-2.5 pr-1.5 py-1 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center
                text-teal-400 hover:text-white hover:bg-teal-500
                transition-all duration-150"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
                className="w-2.5 h-2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </span>
        ))}

        {/* Text input */}
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
          onKeyDown={handleKey}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={value.length === 0 ? "Ketik tag lalu tekan Enter..." : "Tambah lagi..."}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-[13px]
            text-slate-800 placeholder:text-slate-400 font-medium"
        />
      </div>

      {/* ── Suggestions dropdown ── */}
      {showSuggestions && input && filteredSuggestions.length > 0 && (
        <div className="border border-slate-200 rounded-xl bg-white shadow-lg
          overflow-hidden max-h-44 overflow-y-auto z-10 relative">
          {filteredSuggestions.slice(0, 8).map((tag) => (
            <button
              key={tag}
              type="button"
              onMouseDown={() => addTag(tag)}
              className="w-full text-left px-4 py-2.5 text-[13px] font-medium
                text-slate-600 hover:bg-teal-50 hover:text-teal-700
                transition-colors duration-150 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* ── Popular tag chips ── */}
      {value.length === 0 && !input && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] text-slate-400 font-medium self-center mr-1">
            Populer:
          </span>
          {SUGGESTED_TAGS.slice(0, 8).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg
                bg-slate-100 text-slate-500 border border-slate-200
                hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200
                transition-all duration-150"
            >
              + {tag}
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      <p className="text-[11px] text-slate-400">
        Tekan{" "}
        <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">
          Enter
        </kbd>{" "}
        atau{" "}
        <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">
          ,
        </kbd>{" "}
        untuk menambah ·{" "}
        <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">
          Backspace
        </kbd>{" "}
        untuk hapus terakhir
      </p>
    </div>
  );
}