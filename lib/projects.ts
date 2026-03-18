import { supabase } from "./supabase";

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsFile {
  projects: Project[];
}

export async function readProjectsFile(): Promise<ProjectsFile> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error reading projects from Supabase:", error);
    return { projects: [] };
  }

  return { projects: data as Project[] };
}

// Helper functions for API routes to update DB directly
export async function upsertProject(project: Partial<Project>) {
  const { data, error } = await supabase
    .from("projects")
    .upsert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProjectAction(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
