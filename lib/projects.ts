import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "projects.json");

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
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as ProjectsFile;
}

export async function writeProjectsFile(data: ProjectsFile): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
