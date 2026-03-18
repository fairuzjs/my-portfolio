import { supabase } from "@/lib/supabase";

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string[];
  createdAt?: string;
  updatedAt?: string;
}

// === HELPER UNTUK DATABASE SUPABASE ===

export async function readProjectsFile(): Promise<{ projects: Project[] }> {
  // Ambil semua project dari Supabase, urutkan dari yang terbaru
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Gagal membaca dari Supabase:", error);
    return { projects: [] };
  }

  // Supabase returns null or undefined for empty arrays sometimes, default empty categories
  const projects = data.map(p => ({
    ...p,
    category: Array.isArray(p.category) ? p.category : p.category ? [p.category as string] : ["Web App"],
  }));

  return { projects: projects as Project[] };
}

export async function upsertProject(project: Project) {
  const { data, error } = await supabase
    .from("projects")
    .upsert(project)
    .select()
    .single();

  if (error) {
    console.error("Gagal menyimpan ke Supabase:", error);
    throw error;
  }

  return data;
}

export async function deleteProjectAction(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    console.error("Gagal menghapus di Supabase:", error);
    throw error;
  }
  return true;
}
