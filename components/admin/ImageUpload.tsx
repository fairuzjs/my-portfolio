"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | File[]) => {
    setUploading(true);
    setError("");
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Sebagian upload gagal");
        } else {
          newUrls.push(data.url);
        }
      } catch {
        setError("Gagal menghubungi server upload");
      }
    }

    if (newUrls.length > 0) onChange([...value, ...newUrls]);
    setUploading(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) upload(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) upload(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (idx: number) =>
    onChange(value.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">

      {/* ── Drop zone ── */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
          transition-all duration-200
          ${dragging
            ? "border-teal-400 bg-teal-50 scale-[1.01]"
            : "border-slate-200 bg-slate-50 hover:border-teal-300 hover:bg-teal-50/50"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-3">
            <svg className="animate-spin w-7 h-7 text-teal-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-[13px] font-semibold text-teal-600">Mengunggah gambar...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-700">
                Klik atau drag & drop gambar ke sini
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Mendukung banyak file sekaligus · JPG, PNG, WebP
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Error ── */}
      {error && (
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-red-500">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}

      {/* ── Image grid preview ── */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {value.map((url, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden aspect-video
                border border-slate-200 bg-slate-100 shadow-sm ring-offset-2 transition-all hover:ring-2 hover:ring-teal-500/30"
            >
              <Image
                src={url}
                alt={`Preview ${i + 1}`}
                fill
                className="object-cover"
              />

              {/* Hover overlay with Delete button */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100
                transition-all duration-200 flex items-center justify-center p-2">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                  className="w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-xl
                    flex items-center justify-center
                    scale-90 group-hover:scale-100 transition-all shadow-xl"
                  title="Hapus gambar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Position/Label Badge */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-0 transition-opacity">
                {i === 0 ? (
                  <span className="bg-teal-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                    Utama
                  </span>
                ) : (
                  <span className="bg-white/90 backdrop-blur-sm text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm border border-slate-200 uppercase tracking-wider">
                    #{i + 1}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Add more slot */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-video rounded-xl border-2 border-dashed border-slate-200
              flex flex-col items-center justify-center gap-1
              hover:border-teal-300 hover:bg-teal-50/50 transition-all duration-200
              text-slate-400 hover:text-teal-500 group"
          >
            <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-teal-200 flex items-center justify-center bg-white/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Tambah</span>
          </button>
        </div>
      )}
    </div>
  );
}